import { Button } from "~/components/ui/button";
import type { Route } from "./+types/home";
import { Input } from "~/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { useEffect, useState } from "react";
import { useSearchUsers } from "hooks/useSearchUsers";
import { useUserRepos } from "hooks/useUserRepos";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null); // Tambahkan state untuk menyimpan user yang diklik
  console.log("Selected User ==> ", selectedUser);

  const { data: users, isLoading } = useSearchUsers(query);
  const { data: repos, refetch } = useUserRepos(selectedUser ?? "", {
    enabled: false,
  });

  // Fetch otomatis saat selectedUser berubah
  useEffect(() => {
    if (selectedUser) {
      refetch();
    }
  }, [selectedUser, refetch]);

  console.log("Users ==> ", users);
  console.log("Repos ==> ", repos);

  return (
    <div className="h-screen w-full bg-slate-200">
      <div className="flex items-center h-full justify-center max-w-7xl mx-auto bg-slate-100">
        <div className="flex flex-col gap-4 w-full justify-center items-center">
          <Input
            className="max-w-md bg-white"
            placeholder="Search GitHub repositories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-col max-w-md w-full">
              {users?.map((user) => (
                <Accordion
                  key={user.login}
                  type="single"
                  collapsible
                  className="w-full">
                  <AccordionItem value={user.login}>
                    <AccordionTrigger
                      onClick={() => setSelectedUser(user.login)}>
                      {user.login}
                    </AccordionTrigger>
                    <AccordionContent>
                      {repos ? (
                        <ul>
                          {repos.map((repo, index) => (
                            <li key={index}>{repo.name}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>Loading repos...</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
