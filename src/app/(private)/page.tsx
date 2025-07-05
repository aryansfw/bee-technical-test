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
      <h1 className="md:text-2xl text-xl font-bold">Home</h1>
      <section>
        <div className="flex flex-col gap-8 px-4 py-4 md:px-8 md:py-8 rounded-xl bg-white w-full md:min-w-lg md:w-fit shadow-lg">
          <span className="text-gray-500 text-sm md:text-base">
            Your Information:
          </span>
          <div className="flex w-full justify-center md:justify-start">
            <div className="w-32 h-32 rounded-full overflow-hidden relative">
              <Image src={user.avatar} alt="user avatar" fill={true} />
            </div>
          </div>
          <table>
            <tbody className="text-sm md:text-base">
              <tr>
                <td className="font-semibold py-2">First Name</td>
                <td>{user.first_name}</td>
              </tr>
              <tr>
                <td className="font-semibold py-2">Last Name</td>
                <td>{user.last_name}</td>
              </tr>
              <tr>
                <td className="font-semibold py-2">Email</td>
                <td>{user.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
