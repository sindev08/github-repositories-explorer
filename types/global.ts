export interface IGithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface IGithubRepo {
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
}
