import { Outlet } from "react-router-dom"
import Sidenav from "../components/ui/Sidenav"

const AdminLayout = () => {
  return (
    <div className="flex p-4 min-h-screen bg-gray-200">
        <Sidenav />
        <main className="max-w-7xl mx-auto w-full my-16">
            <Outlet />
        </main>
    </div>
  )
}

export default AdminLayout