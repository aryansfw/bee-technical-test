import { ApiResponse } from "@/app/types/api";
import { User } from "@/app/types/user";
import UserInformation from "@/app/ui/user-information";

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
      <h1 className="text-4xl font-bold">Users Profile</h1>
      <section>
        <UserInformation user={user} />
      </section>
    </div>
  );
}
