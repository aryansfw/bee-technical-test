import Image from "next/image";

export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/1`, {
    method: "GET",
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });

  const json = await res.json();

  const user = json.data;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <section>
        <div className="flex flex-col gap-2 px-8 py-8 rounded-xl bg-white w-fit shadow-lg">
          <p className="">Your Information:</p>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full overflow-hidden relative">
              <Image src={user.avatar} alt="user avatar" fill={true} />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
