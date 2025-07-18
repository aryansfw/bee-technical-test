import { PaginatedApiResponse } from "@/types/api";
import { User } from "@/types/user";
import { EyeIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

export default async function UsersTable({
  currentPage,
}: {
  currentPage: number;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users?page=${currentPage}`,
    {
      method: "GET",
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        "Content-Type": "application/json",
      },
    }
  );

  const json: PaginatedApiResponse<User> = await res.json();

  const users = json.data;

  return (
    <table className="table w-full">
      <thead className="text-left bg-gray-200 rounded-lg md:text-base text-sm">
        <tr>
          <th scope="col" className="font-medium px-5 py-6">
            Avatar
          </th>
          <th scope="col" className="font-medium px-3 py-6">
            First Name
          </th>
          <th scope="col" className="font-medium px-3 py-6">
            Last Name
          </th>
          <th scope="col" className="font-medium px-3 py-6">
            Email
          </th>
          <th scope="col" className="font-medium px-3 py-6">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr
            key={user.id}
            className="py-3 border-b border-gray-200 hover:bg-gray-100 md:text-base text-sm"
          >
            <td className="px-5 py-3">
              <div className="flex w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden relative">
                <Image src={user.avatar} alt={"user avatar"} fill />
              </div>
            </td>
            <td className="whitespace-nowrap px-3 py-3">{user.first_name}</td>
            <td className="whitespace-nowrap px-3 py-3">{user.last_name}</td>
            <td className="whitespace-nowrap px-3 py-3">{user.email}</td>
            <td className="whitespace-nowrap px-3 py-3">
              <Link
                href={`/users/${user.id}`}
                className="flex w-fit gap-2 rounded bg-blue-500 text-white hover:bg-blue-600 px-4 py-2"
              >
                <EyeIcon size={24} />
                <p>View</p>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
