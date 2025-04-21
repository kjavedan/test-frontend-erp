import Header from "@/components/dashboard/layout/Header";
import Sidebar from "@/components/dashboard/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div className="relative flex w-full bg-white dark:bg-gray-800">
        <Sidebar />
        <div className="relative flex h-dvh !w-full">
          <div className="!w-full p-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
