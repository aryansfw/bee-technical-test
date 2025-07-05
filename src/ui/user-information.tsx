import { PencilSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { User } from "../types/user";
import Button from "./button";
import DeleteUserForm from "./users/delete-button";

export default function UserInformation({ user }: { user: User }) {
  return (
    <div className="flex flex-col gap-4 md:gap-8 px-4 py-4 md:px-8 md:py-8 rounded-xl bg-white w-full md:min-w-lg md:w-fit md:max-w-xl shadow-lg">
      <div className="flex flex-col md:flex-row gap-2 w-full items-center md:items-start md:justify-between">
        <div className="w-32 h-32 rounded-full overflow-hidden relative">
          <Image src={user.avatar} alt="user avatar" fill={true} />
        </div>

        <div className="md:flex hidden gap-2">
          <Link href={`/users/${user.id}/edit`}>
            <Button icon={PencilSimpleIcon}>Edit</Button>
          </Link>
          <DeleteUserForm id={user.id.toString()} />
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
      <div className="md:hidden flex gap-2 justify-end">
        <Link href={`/users/${user.id}/edit`}>
          <Button icon={PencilSimpleIcon}>
            <span className="hidden md:block">Edit</span>
          </Button>
        </Link>
        <DeleteUserForm id={user.id.toString()} />
      </div>
    </div>
  );
}
