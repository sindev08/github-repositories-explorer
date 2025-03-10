// hooks/useUserRepos.ts
import { useQuery } from "@tanstack/react-query";
import { getUserRepos } from "../api/github";

export const useUserRepos = (
  username: string,
  options = { enabled: false }
) => {
  return useQuery({
    queryKey: ["userRepos", username],
    queryFn: () => getUserRepos(username),
    enabled: options.enabled && !!username, // Hanya fetch jika username ada
  });
};
