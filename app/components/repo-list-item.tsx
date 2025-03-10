import { StarIcon } from "lucide-react";
import type { IGithubRepo } from "types/global";

// Separate component for repository list item
export const RepoListItem = ({ repo }: { repo: IGithubRepo }) => (
  <li className="border p-3 rounded-md hover:bg-muted/50 transition-colors">
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 font-medium block">
      <div className="flex flex-row items-center justify-between">
        <span>{repo.name}</span>
        <div className="flex flex-row items-center gap-2">
          <StarIcon className="size-4" />
          <p className="text-sm">{repo.stargazers_count}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        {repo.description || "Tidak ada deskripsi"}
      </p>
    </a>
  </li>
);
