import { PencilSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { User } from "../types/user";
import Button from "./button";

export default function UserInformation({ user }: { user: User }) {
  return (
    <div className="flex flex-col gap-8 px-8 py-8 rounded-xl bg-white min-w-lg w-fit shadow-lg">
      <div className="flex justify-between space-x-4">
        <div className="w-32 h-32 rounded-full overflow-hidden relative">
          <Image src={user.avatar} alt="user avatar" fill={true} />
        </div>

        <Link href={`/users/${user.id}/edit`}>
          <Button icon={PencilSimpleIcon}>Edit</Button>
        </Link>
      </div>
      <table>
        <tbody className="text-lg">
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
  );
}
