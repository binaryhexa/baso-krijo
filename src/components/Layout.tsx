import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import UserProfile from "./UserProfile";
import Cart from "../pages/menu/components/Cart";

const Layout = () => {
  const location = useLocation();
  const isMenuPage = location.pathname === "/menu";

  return (
    <main className="flex h-screen w-full p-0 overflow-hidden">
      <Sidebar isHidden={isMenuPage}/>
      <section className="no-scrollbar flex h-screen w-full overflow-y-scroll overflow-x-hidden p-10">
        <div className={`flex-grow ${isMenuPage ? 'pr-72' : ''}`}>
          <Outlet />
        </div>
        {isMenuPage && (
          <div className="fixed right-0 top-0 h-screen w-72">
            <Cart /> 
          </div>
        )}
        <UserProfile />
      </section>
    </main>
  );
};

export default Layout;