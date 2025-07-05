import AddUserForm from "@/ui/users/add-form";

export default function AddUserPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold">Add New User</h1>
      <section>
        <div className="flex flex-col gap-2 px-8 py-8 rounded-xl bg-white shadow-lg">
          <AddUserForm />
        </div>
      </section>
    </div>
  );
}
