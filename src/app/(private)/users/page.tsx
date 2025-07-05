import { PaginatedApiResponse } from "@/app/types/api";
import { User } from "@/app/types/user";
import Button from "@/app/ui/button";
import UsersPagination from "@/app/ui/users/pagination";
import UsersTable from "@/app/ui/users/table";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default async function UsersPage(props: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
    method: "GET",
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
      "Content-Type": "application/json",
    },
  });

  const json: PaginatedApiResponse<User> = await res.json();

  const totalPages = json.total_pages;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Users</h1>
        <Link href="/users/add">
          <Button className="w-fit" icon={PlusIcon}>
            Add New User
          </Button>
        </Link>
      </div>
      <section>
        <div className="flex flex-col gap-8 px-8 py-8 rounded-xl bg-white shadow-lg">
          <UsersTable currentPage={currentPage} />
          <UsersPagination totalPages={totalPages} />
        </div>
      </section>
    </div>
  );
}
