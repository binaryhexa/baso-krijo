import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Cart from "@/pages/menu/components/Cart";

const Layout = () => {
  const location = useLocation();
  const isMenuPage = location.pathname === "/admin/menu";

  return (
    <div className="relative">
      <main className="flex h-screen w-full p-0 overflow-hidden relative no-scrollbar">
        <Sidebar isHidden={isMenuPage} />
        <section className="flex h-screen w-full overflow-auto p-8 no-scrollbar">
          <div className={`relative flex-grow ${isMenuPage ? "pr-72" : ""}`}>
            <Outlet />
          </div>
          {isMenuPage && (
            <div className="fixed right-0 top-0 h-screen w-72">
              <Cart />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Layout;
