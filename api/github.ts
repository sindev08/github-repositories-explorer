import type { IGithubRepo, IGithubUser } from "types/global";
import axiosInstance from "./axiosInstance";

// Search user by username (max 5 results)
export const searchUsers = async (username: string): Promise<IGithubUser[]> => {
  try {
    const response = await axiosInstance.get(`/search/users`, {
      params: { q: username, per_page: 5 },
    });

    return response.data.items;
  } catch (error) {
    console.error("Error fetching users: ", error);
    return [];
  }
};

// Get repository by username
export const getUserRepos = async (
  username: string
): Promise<IGithubRepo[]> => {
  try {
    const response = await axiosInstance.get(`/users/${username}/repos`);

    return response.data;
  } catch (error) {
    console.error("Error fetching repos: ", error);
    return [];
  }
};
