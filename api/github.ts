// src/api/github.ts
import axiosInstance from "./axiosInstance";

// TypeScript types
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

// Cari pengguna berdasarkan username (max 5 results)
export const searchUsers = async (username: string): Promise<IGithubUser[]> => {
  console.log("Fetch Username ==> ", username);

  try {
    const response = await axiosInstance.get(`/search/users`, {
      params: { q: username, per_page: 5 },
    });

    console.log("Response ==> ", response.data); // Cek data yang dikembalikan

    return response.data.items; // Pastikan ini sesuai dengan struktur data yang diharapkan
  } catch (error) {
    console.error("Error fetching users: ", error);
    return []; // Handle error agar tidak crash
  }
};

// Ambil repository berdasarkan username
export const getUserRepos = async (
  username: string
): Promise<IGithubRepo[]> => {
  console.log("Fetch Repos ==> ", username);

  try {
    const response = await axiosInstance.get(`/users/${username}/repos`);

    console.log("Response repos ==> ", response.data); // Cek data yang dikembalikan

    return response.data;
  } catch (error) {
    console.error("Error fetching repos: ", error);
    return []; // Handle error agar tidak crash
  }
};
