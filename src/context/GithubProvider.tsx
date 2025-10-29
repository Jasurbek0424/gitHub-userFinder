import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useRef,
} from "react";
import axios from "axios";
import { fetchUser, fetchRepos, GitHubRepo, GitHubUser } from "../api/github";
import { getCache, setCache } from "../utils/cache";
import { GithubState } from "./types";

type Action =
  | { type: "SET_USERNAME"; username: string | null }
  | { type: "SET_USER"; user: GitHubUser | null }
  | { type: "SET_REPOS"; repos: GitHubRepo[]; append?: boolean }
  | { type: "SET_LOADING_USER"; v: boolean }
  | { type: "SET_LOADING_REPOS"; v: boolean }
  | { type: "SET_ERROR"; error: string | null }
  | { type: "SET_PAGE"; page: number }
  | { type: "SET_HAS_MORE"; hasMore: boolean }
  | { type: "RESET" };

const initialState: GithubState = {
  user: null,
  repos: [],
  loadingUser: false,
  loadingRepos: false,
  error: null,
  page: 1,
  hasMoreRepos: false,
  username: null,
};

function reducer(state: GithubState, action: Action): GithubState {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.username };
    case "SET_USER":
      return { ...state, user: action.user };
    case "SET_REPOS":
      return {
        ...state,
        repos: action.append ? [...state.repos, ...action.repos] : action.repos,
      };
    case "SET_LOADING_USER":
      return { ...state, loadingUser: action.v };
    case "SET_LOADING_REPOS":
      return { ...state, loadingRepos: action.v };
    case "SET_ERROR":
      return { ...state, error: action.error };
    case "SET_PAGE":
      return { ...state, page: action.page };
    case "SET_HAS_MORE":
      return { ...state, hasMoreRepos: action.hasMore };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

const GithubContext = createContext<null | {
  state: GithubState;
  searchUser: (username: string) => Promise<void>;
  loadMoreRepos: () => Promise<void>;
  clear: () => void;
}>(null);

export const GithubProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState); //@ts-ignore
  const cancelSourceRef = useRef<axios.CancelTokenSource | null>(null); //@ts-ignore
  const reposCancelRef = useRef<axios.CancelTokenSource | null>(null);

  const searchUser = useCallback(async (username: string) => {
    cancelSourceRef.current?.cancel("New user search"); //@ts-ignore
    cancelSourceRef.current = axios.CancelToken.source();

    dispatch({ type: "SET_ERROR", error: null });
    dispatch({ type: "SET_LOADING_USER", v: true });
    dispatch({ type: "SET_USERNAME", username });

    try {
      const cacheKeyUser = `user_${username}`;
      const cachedUser = getCache<any>(cacheKeyUser);
      let user: GitHubUser;

      if (cachedUser) user = cachedUser;
      else {
        user = await fetchUser(username, { cancelToken: cancelSourceRef.current.token });
        setCache(cacheKeyUser, user);
      }

      dispatch({ type: "SET_USER", user });
      dispatch({ type: "SET_PAGE", page: 1 });
      dispatch({ type: "SET_REPOS", repos: [], append: false });

      reposCancelRef.current?.cancel("New user - repos"); //@ts-ignore
      reposCancelRef.current = axios.CancelToken.source();
      const cacheKeyRepos = `repos_${username}_page_1`;
      const cachedRepos = getCache<any>(cacheKeyRepos);
      let repos =
        cachedRepos ??
        (await fetchRepos(username, 1, 30, { cancelToken: reposCancelRef.current.token }));
      if (!cachedRepos) setCache(cacheKeyRepos, repos);

      dispatch({ type: "SET_REPOS", repos, append: false });
      dispatch({ type: "SET_HAS_MORE", hasMore: repos.length === 30 });
    } catch (err: any) { //@ts-ignore
      if (axios.isCancel(err)) return;

      let message = "Something went wrong, please try again.";
      //@ts-ignore
      if (axios.isAxiosError(err)) {
        if (err.code === "ECONNABORTED" || err.message?.includes("timeout")) {
          message = "Something went wrong, check your network connection.";
        } else if (err.response?.status === 403) {
          message = "GitHub API rate limit reached. Please try again later.";
        } else if (err.response?.status === 404) {
          message = "User not found.";
        }
      }

      dispatch({ type: "SET_ERROR", error: message });
      dispatch({ type: "SET_USER", user: null });
      dispatch({ type: "SET_REPOS", repos: [], append: false });
      dispatch({ type: "SET_HAS_MORE", hasMore: false });
    } finally {
      dispatch({ type: "SET_LOADING_USER", v: false });
    }
  }, []);

  const loadMoreRepos = useCallback(async () => {
    const username = state.username;
    if (!username || state.loadingRepos || !state.hasMoreRepos) return;

    reposCancelRef.current?.cancel("Load more repos"); //@ts-ignore
    reposCancelRef.current = axios.CancelToken.source();

    const nextPage = state.page + 1;
    dispatch({ type: "SET_LOADING_REPOS", v: true });

    try {
      const cacheKey = `repos_${username}_page_${nextPage}`;
      const cached = getCache<any>(cacheKey);
      let repos =
        cached ??
        (await fetchRepos(username, nextPage, 30, { cancelToken: reposCancelRef.current.token }));
      if (!cached) setCache(cacheKey, repos);

      dispatch({ type: "SET_REPOS", repos, append: true });
      dispatch({ type: "SET_PAGE", page: nextPage });
      dispatch({ type: "SET_HAS_MORE", hasMore: repos.length === 30 });
    } catch (err: any) { //@ts-ignore
      if (axios.isCancel(err)) return;
      
      let message = "Something went wrong, please try again."; //@ts-ignore
      if (axios.isAxiosError(err)) {
        if (err.code === "ECONNABORTED" || err.message?.includes("timeout")) {
          message = "Something went wrong, check your network connection.";
        } else if (err.response?.status === 403) {
          message = "GitHub API rate limit reached. Please try again later.";
        }
      }

      dispatch({ type: "SET_ERROR", error: message });
    } finally {
      dispatch({ type: "SET_LOADING_REPOS", v: false });
    }
  }, [state.username, state.loadingRepos, state.page, state.hasMoreRepos]);

  const clear = useCallback(() => {
    cancelSourceRef.current?.cancel();
    reposCancelRef.current?.cancel();
    dispatch({ type: "RESET" });
  }, []);

  return (
    <GithubContext.Provider value={{ state, searchUser, loadMoreRepos, clear }}>
      {children}
    </GithubContext.Provider>
  );
};

export const useGithub = () => {
  const ctx = useContext(GithubContext);
  if (!ctx) throw new Error("useGithub must be used inside GithubProvider");
  return ctx;
};
