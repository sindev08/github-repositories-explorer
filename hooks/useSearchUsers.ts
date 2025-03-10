// hooks/useSearchUsers.ts
import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../api/github";

export const useSearchUsers = (username: string) => {
  return useQuery({
    queryKey: ["searchUsers", username],
    queryFn: () => searchUsers(username),
    enabled: !!username, // Query hanya jalan jika username tidak kosong
  });
};
