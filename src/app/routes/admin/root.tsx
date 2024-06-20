import PageLoader from "@/components/PageLoader";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const AdminRoot = () => {
	return (
		<AdminLayout>
			<Suspense
				fallback={
					<div className="flex w-full min-h-screen items-center justify-center">
						<PageLoader />
					</div>
				}
			>
				<Outlet />
			</Suspense>
		</AdminLayout>
	);
};

export default AdminRoot;
