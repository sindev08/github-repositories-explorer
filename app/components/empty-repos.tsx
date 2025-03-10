import { BookCopyIcon } from "lucide-react";

// Empty state component
export const EmptyRepos = () => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div className="flex flex-col items-center gap-2">
      <BookCopyIcon className="size-8 text-muted-foreground" />
      <p className="text-muted-foreground">Tidak ada repositori</p>
    </div>
  </div>
);
