import AddUserForm from "@/ui/users/add-form";

export default function AddUserPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="md:text-2xl text-xl font-bold">Add New User</h1>
      <section>
        <div className="flex flex-col gap-8 px-4 py-4 md:px-8 md:py-8 rounded-xl bg-white w-full md:min-w-lg md:w-fit md:max-w-xl shadow-lg">
          <AddUserForm />
        </div>
      </section>
    </div>
  );
}
