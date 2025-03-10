import React from "react";
import { ModeToggle } from "./mode-toogle";

export default function Navbar() {
  return (
    <>
      <div className=" fixed top-0 justify-between w-full flex flex-row items-center px-4 py-6 z-10">
        <span></span>
        <span className=" text-xl font-bold text-violet-900">
          Github Repositories Explorer
        </span>
        <div className=" flex flex-row items-center gap-6">
          <ModeToggle />
        </div>
      </div>
    </>
  );
}
