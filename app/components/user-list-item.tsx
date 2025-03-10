import type { IGithubUser } from "types/global";
import { Button } from "./ui/button";

// Separate component for user list item
export const UserListItem = ({
  user,
  onClick,
}: {
  user: IGithubUser;
  onClick: () => void;
}) => (
  <Button
    variant="outline"
    onClick={onClick}
    className="flex flex-row w-full justify-between items-center">
    <div className="flex flex-row gap-2 items-center">
      <img
        className="size-6 rounded-full"
        src={user.avatar_url || "/placeholder.svg"}
        alt={user.login}
        width={24}
        height={24}
      />
      {user.login}
    </div>
    <span className="text-sm">See details</span>
  </Button>
);
