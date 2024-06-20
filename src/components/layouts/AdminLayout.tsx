import Sidenav from "@/components/Sidenav";
import Navbar from "@/components/Navbar";
import LoadingProgress from "../LoadingProgress";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <LoadingProgress />
      <Sidenav />
      <div className="w-full flex flex-col relative h-full">
        <Navbar />
        <main className="max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mx-auto w-full px-4">
          <div className="w-full my-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
