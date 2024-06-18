import PageLoader from "@/components/PageLoader";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const AppRoot = () => {
	return (
		<Suspense fallback={<PageLoader />}>
			<AdminLayout>
				<Outlet />
			</AdminLayout>
		</Suspense>
	);
};

export default AppRoot;
