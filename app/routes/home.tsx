import { useSearchUsers } from "hooks/useSearchUsers";
import { useUserRepos } from "hooks/useUserRepos";
import { BookCopyIcon, Search, StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "~/components/theme-provider";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Skeleton } from "~/components/ui/skeleton";
import type { Route } from "./+types/home";
import { ScrollArea } from "~/components/ui/scroll-area";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { data: users, isLoading } = useSearchUsers(query);
  const {
    data: repos,
    isFetching,
    refetch,
  } = useUserRepos(selectedUser ?? "", {
    enabled: false,
  });

  useEffect(() => {
    if (selectedUser) {
      refetch();
    }
  }, [selectedUser, refetch]);

  const { resolvedTheme } = useTheme();
  console.log(resolvedTheme);

  return (
    <div className="h-screen w-full relative">
      {/* Background Image */}
      {resolvedTheme === "dark" ? (
        <img
          src="./home-dark.webp"
          className=" absolute top-0 left-0 h-full w-full object-cover z-[1]"
        />
      ) : (
        <img
          src="./home-light.webp"
          className=" absolute top-0 left-0 h-full w-full object-cover z-[1]"
        />
      )}

      <div className="flex relative items-center h-full justify-center max-w-7xl mx-auto z-10">
        <div className="flex flex-col gap-4 w-full justify-center items-center">
          {/* Search Input */}
          <div className="flex flex-col max-w-lg w-full gap-2">
            <Input
              startIcon={<Search size={20} />}
              type="text"
              className="h-12 bg-white dark:bg-slate-950"
              placeholder="Cari pengguna GitHub berdasarkan username..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <p className="text-muted-foreground pl-1 text-sm">
              Masukkan username untuk mulai mencari pengguna GitHub
            </p>
          </div>

          {/* User List */}
          {isLoading ? (
            <div className="flex flex-col max-w-md w-full gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-10 w-full rounded-md" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col max-w-md w-full gap-2">
              {users?.map((user) => (
                <Button
                  key={user.login}
                  variant="outline"
                  onClick={() => setSelectedUser(user.login)}
                  className="flex flex-row w-full justify-between items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <img
                      className="size-6 rounded-full"
                      src={user.avatar_url}
                      alt={user.login}
                    />
                    {user.login}
                  </div>
                  <span className="text-sm">Lihat detail</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* User Detail Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="p-0 gap-0">
          <DialogHeader className=" border-b py-6 px-8">
            <DialogTitle>Detail Pengguna</DialogTitle>
            <DialogDescription>
              Repositori milik{" "}
              <span className="font-bold text-primary">{selectedUser}</span>
            </DialogDescription>
          </DialogHeader>
          {isFetching ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-8 w-full rounded-md" />
              ))}
            </div>
          ) : (
            <ScrollArea className="h-80 px-4">
              {repos?.length === 0 && (
                <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className=" flex flex-col items-center gap-2">
                    <BookCopyIcon className="size-8" />
                    <p className="text-muted-foreground">
                      Tidak ada repositori
                    </p>
                  </div>
                </div>
              )}
              <ul className="space-y-2 py-4">
                {repos?.map((repo, ind) => (
                  <li key={ind} className="border p-3 rounded-md">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 font-medium">
                      <div className="flex flex-row items-center justify-between">
                        {repo.name}
                        <div className=" flex flex-row items-center gap-2">
                          <StarIcon className=" size-4" />
                          <p className="text-sm">{repo.stargazers_count}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {repo.description || "Tidak ada deskripsi"}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
