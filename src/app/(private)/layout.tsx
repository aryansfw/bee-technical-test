import Navbar from "../ui/navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="min-h-screen flex">
        <Navbar />
        <main className="bg-gray-100 min-h-screen px-8 py-10 w-full">
          {children}
        </main>
      </div>
    </>
  );
}
