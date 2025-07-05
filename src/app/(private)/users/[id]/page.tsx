import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";
import Button from "@/ui/button";
import UserInformation from "@/ui/user-information";
import { ArrowFatLeftIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default async function UserProfilePage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`,
    {
      method: "GET",
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        "Content-Type": "application/json",
      },
    }
  );

  const { data: user }: ApiResponse<User> = await res.json();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 items-center">
        <Link href="/users">
          <Button icon={ArrowFatLeftIcon} />
        </Link>
        <h1 className="md:text-2xl text-xl font-bold">User Profile</h1>
      </div>
      <section>
        <UserInformation user={user} />
      </section>
    </div>
  );
}
