import axios from "axios";

const API_BASE = "https://api.github.com";

const token = "";

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    Accept: "application/vnd.github.v3+json",
    ...(token ? { Authorization: `token ${token}` } : {}),
  },
  timeout: 15000,
});

export type GitHubUser = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name?: string;
  bio?: string;
  followers: number;
  following: number;
  public_repos: number;
};

export type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description?: string;
  stargazers_count: number;
  language: string;
  forks_count: number;
};


export const fetchUser = async (username: string, options?: any) => {
  const response = await client.get<GitHubUser>(`/users/${username}`, options);
  return response.data;
};


export const fetchRepos = async (
  username: string,
  page = 1,
  per_page = 30,
  options?: any
) => {
  const response = await client.get<GitHubRepo[]>(
    `/users/${username}/repos`,
    {
      params: { page, per_page, sort: "pushed" },
      ...options,
    }
  );
  return response.data;
};
