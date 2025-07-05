import EditUserForm from "@/app/ui/users/edit-form";

export default async function EditUserPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold">Edit User</h1>
      <section>
        <div className="flex flex-col gap-2 px-8 py-8 rounded-xl bg-white shadow-lg">
          <EditUserForm
            user={{ id, name: "user name", job: "frontend developer" }}
          />
        </div>
      </section>
    </div>
  );
}
