import { GitHubRepo, GitHubUser } from '../api/github';

export type GithubState = {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  loadingUser: boolean;
  loadingRepos: boolean;
  error: string | null;
  page: number;
  hasMoreRepos: boolean;
  username: string | null;
};
