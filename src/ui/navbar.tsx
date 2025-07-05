"use client";

import { logout } from "@/actions/auth";
import { HouseIcon, Icon, SignOutIcon, UsersIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-2xl px-4 py-8 min-w-[350px]">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-16 justify-center">
          <div className="px-5">
            <p className="text-xl font-bold">Bee Technical Test</p>
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
            "flex items-center gap-4 text-lg",
            "px-5 py-4 rounded-md w-full text-left",
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
        "flex items-center gap-4 text-lg",
        "px-5 py-4 rounded-md hover:bg-blue-100",
        isActive ? "bg-blue-500 hover:bg-blue-500 text-white" : ""
      )}
    >
      <Icon size={24} />
      {label}
    </Link>
  );
}
