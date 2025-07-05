import EditUserForm from "@/ui/users/edit-form";

export default async function EditUserPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  return (
    <div className="flex flex-col gap-6">
      <h1 className="mdtext-2xl text-xl font-bold">Edit User</h1>
      <section>
        <div className="flex flex-col gap-8 px-4 py-4 md:px-8 md:py-8 rounded-xl bg-white w-full md:min-w-lg md:w-fit md:max-w-xl shadow-lg">
          <EditUserForm
            user={{ id, name: "user name", job: "frontend developer" }}
          />
        </div>
      </section>
    </div>
  );
}
