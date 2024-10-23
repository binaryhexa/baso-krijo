import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import UserProfile from "./UserProfile";

const Layout = () => {
  return (
    <main className="flex h-screen w-full p-0">
      <Sidebar />
      <section className="no-scrollbar flex justify-between h-full w-full overflow-y-scroll p-10">
        <Outlet />
        <UserProfile />
      </section>
    </main>
  );
};

export default Layout;
