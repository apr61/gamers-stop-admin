import Sidenav from "@/components/Sidenav";
import Navbar from "@/components/Navbar";

type AdminLayoutProps = {
	children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
	return (
		<div className="flex min-h-screen bg-gray-100">
			<Sidenav />
			<div className="w-full">
				<Navbar />
				<main className="max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mx-auto w-full my-8 px-2 sm:px-4">
					<div className="w-full">{children}</div>
				</main>
			</div>
		</div>
	);
};

export default AdminLayout;
