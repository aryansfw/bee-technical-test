"use client";

import { logout } from "@/actions/auth";
import {
  HouseIcon,
  Icon,
  SignOutIcon,
  UsersIcon,
  XIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

export default function Navbar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <nav
      className={cn(
        "absolute top-0 left-0 h-screen bg-white shadow-2xl px-3 py-8 w-11/12 md:hidden z-10",
        open ? "block" : "hidden"
      )}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-20 justify-center">
          <div className="flex justify-between px-3">
            <p className="text-lg font-bold text-blue-600">
              Bee Technical Test
            </p>
            <XIcon
              size={24}
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>

          <ul className="space-y-4">
            <li>
              <NavItem href="/" icon={HouseIcon} label="Home" />
            </li>
            <li>
              <NavItem href="/users" icon={UsersIcon} label="Users" />
            </li>
          </ul>
        </div>
        <button
          onClick={() => {
            logout();
          }}
          className={cn(
            "flex items-center gap-3 text-sm",
            "px-3 py-4 rounded-md w-full text-left",
            "hover:bg-blue-100 cursor-pointer"
          )}
        >
          <SignOutIcon size={24} />
          Logout
        </button>
      </div>
    </nav>
  );
}

function NavItem({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: Icon;
  label: string;
}) {
  const pathName = usePathname();

  const isActive = pathName === href;
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 text-sm",
        "px-3 py-4 rounded-md hover:bg-blue-100",
        isActive ? "bg-blue-500 hover:bg-blue-500 text-white" : ""
      )}
    >
      <Icon className="w-5 h-5" />
      {label}
    </Link>
  );
}
