"use client";

import type React from "react";

import { ScrollArea } from "~/components/ui/scroll-area";
import { Skeleton } from "~/components/ui/skeleton";
import { ResponsiveDialog } from "./ui/responsize-dialog";
import type { IGithubRepo } from "types/global";

interface UserDetailsDialogProps {
  selectedUser: string | null;
  handleDialogClose: () => void;
  isFetching: boolean;
  isErrorRepo: boolean;
  refetchRepos: () => void;
  repos: IGithubRepo[] | undefined;
  EmptyRepos: React.FC;
  RepoListItem: React.FC<{ repo: IGithubRepo }>;
  ErrorMessage: React.FC<{ message: string; onRetry: () => void }>;
}

export function UserDetailsDialog({
  selectedUser,
  handleDialogClose,
  isFetching,
  isErrorRepo,
  refetchRepos,
  repos,
  EmptyRepos,
  RepoListItem,
  ErrorMessage,
}: UserDetailsDialogProps) {
  return (
    <ResponsiveDialog
      open={!!selectedUser}
      onOpenChange={(open) => !open && handleDialogClose()}
      title="User Details"
      description={
        <>
          Owned repository -{" "}
          <span className="font-bold text-primary">{selectedUser}</span>
        </>
      }
      headerClassName="border-b py-6 px-8"
      contentClassName="p-4"
      className="p-0 gap-0 max-w-md w-full">
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
    </ResponsiveDialog>
  );
}
