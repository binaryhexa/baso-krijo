import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
// import UserProfile from "./UserProfile";
import Cart from "@/pages/menu/components/Cart";

const Layout = () => {
  const location = useLocation();
  const isMenuPage = location.pathname === "/menu";

  return (
    <div className="relative">
      {/* <div
        className={`${
          isMenuPage ? "right-80 top-6 z-50" : "right-3 top-6 z-50"
        } top-10 fixed`}
      >
        <UserProfile />
      </div> */}
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
