"use client";
import { ListIcon } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import Navbar from "./mobile-navbar";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center gap-4 w-full bg-white px-4 py-4 relative">
      <ListIcon size={32} onClick={() => setOpen((open) => !open)} />
      <span className="text-blue-600 font-bold text-lg">
        Bee Technical Test
      </span>

      <Navbar open={open} setOpen={setOpen} />
    </div>
  );
}
