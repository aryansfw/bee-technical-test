import Header from "@/ui/header";
import Navbar from "../../ui/navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      <div className="flex">
        <Navbar />
        <main className="h-screen bg-gray-100 px-5 py-6 md:px-8 md:py-10 w-full overflow-auto">
          {children}
        </main>
      </div>
    </>
  );
}
