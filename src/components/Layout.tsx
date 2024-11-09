import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import UserProfile from "./UserProfile";

const Layout = () => {
  return (
    <main className="flex h-screen w-full p-0 overflow-hidden23">
      <Sidebar />
      <section className="no-scrollbar flex h-screen w-full overflow-y-scroll overflow-x-hidden p-10">
        <Outlet />
        <UserProfile />
      </section>
    </main>
  );
};

export default Layout;
