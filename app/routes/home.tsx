import { Button } from "~/components/ui/button";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="h-screen w-full bg-slate-100">
      <div className=" flex items-center justify-center max-w-7xl mx-auto bg-white">
        <Button>Click me</Button>
      </div>
    </div>
  );
}
