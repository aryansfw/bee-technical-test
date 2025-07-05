import Button from "@/ui/button";
import AddUserForm from "@/ui/users/add-form";
import { ArrowFatLeftIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function AddUserPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 items-center">
        <Link href="/users">
          <Button icon={ArrowFatLeftIcon} />
        </Link>
        <h1 className="md:text-2xl text-xl font-bold">Add New User</h1>
      </div>
      <section>
        <div className="flex flex-col gap-8 px-4 py-4 md:px-8 md:py-8 rounded-xl bg-white w-full md:min-w-lg md:w-fit md:max-w-xl shadow-lg">
          <AddUserForm />
        </div>
      </section>
    </div>
  );
}
