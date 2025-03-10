import { useDebounce } from "hooks/useDebonce";
import { useSearchUsers } from "hooks/useSearchUsers";
import { useUserRepos } from "hooks/useUserRepos";
import { Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EmptyRepos } from "~/components/empty-repos";
import { ErrorMessage } from "~/components/error-message";
import { RepoListItem } from "~/components/repo-list-item";
import { useTheme } from "~/components/theme-provider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Skeleton } from "~/components/ui/skeleton";
import { UserListItem } from "~/components/user-list-item";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Github Repositories Explorer" },
    { name: "description", content: "Github Repositories Explorer" },
  ];
}

export default function Home() {
  const [inputQuery, setInputQuery] = useState("");
  const debouncedQuery = useDebounce(inputQuery, 500);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const {
    data: users,
    isLoading,
    isError,
    refetch: refetchUsers,
  } = useSearchUsers(debouncedQuery);
  const {
    data: repos,
    isFetching,
    refetch: refetchRepos,
    isError: isErrorRepo,
  } = useUserRepos(selectedUser ?? "", {
    enabled: !!selectedUser,
  });

  const { resolvedTheme } = useTheme();

  const handleUserSelect = useCallback((username: string) => {
    setSelectedUser(username);
  }, []);

  const handleDialogClose = useCallback(() => {
    setSelectedUser(null);
  }, []);

  const [mounted, setMounted] = useState(false);

  // Update useEffect to handle mounting state
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? resolvedTheme : "light"; // Default to light as fallback

  const backgroundImage = useMemo(
    () => (currentTheme === "dark" ? "./home-dark.webp" : "./home-light.webp"),
    [currentTheme]
  );

  return (
    <div className="h-screen w-full relative">
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute top-0 left-0 h-full w-full object-cover z-[1]"
      />
      <div className="flex relative items-center h-full justify-center max-w-7xl mx-auto z-10">
        <div className="flex flex-col gap-4 w-full justify-center items-center">
          {/* Search Input */}
          <div className="flex flex-col max-w-lg w-full gap-2">
            <Input
              startIcon={<Search size={20} />}
              type="text"
              className="h-12 bg-white dark:bg-slate-950"
              placeholder="Search GitHub users by username..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
            />
            <p className="text-muted-foreground pl-1 text-sm">
              Enter a username to start searching for GitHub users.
            </p>
          </div>

          {/* User List */}
          <div className="flex flex-col max-w-md w-full gap-2">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-10 w-full rounded-md" />
              ))
            ) : isError ? (
              <ErrorMessage
                message="Terjadi kesalahan saat memuat data pengguna."
                onRetry={refetchUsers}
              />
            ) : users?.length === 0 && debouncedQuery ? (
              <p className="text-center text-muted-foreground py-4">
                No users found "{debouncedQuery}"
              </p>
            ) : (
              users?.map((user) => (
                <UserListItem
                  key={user.login}
                  user={user}
                  onClick={() => handleUserSelect(user.login)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* User Detail Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={handleDialogClose}>
        <DialogContent className="p-0 gap-0 max-w-md w-full">
          <DialogHeader className="border-b py-6 px-8">
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Owned repository -{" "}
              <span className="font-bold text-primary">{selectedUser}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="p-4">
            {isFetching ? (
              <div className="space-y-3 py-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-16 w-full rounded-md" />
                ))}
              </div>
            ) : isErrorRepo ? (
              <ErrorMessage
                message="An error occurred while loading the repository."
                onRetry={refetchRepos}
              />
            ) : (
              <ScrollArea className="h-[350px] pr-4">
                {repos?.length === 0 ? (
                  <EmptyRepos />
                ) : (
                  <ul className="space-y-3 py-2">
                    {repos?.map((repo) => (
                      <RepoListItem key={repo.name} repo={repo} />
                    ))}
                  </ul>
                )}
              </ScrollArea>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
