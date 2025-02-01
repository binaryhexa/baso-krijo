import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { Collapse } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { kasirRoute, ownerRoute } from "../routes";
import { adminRoute } from "@/routes/adminRoutes";
import { IoPersonCircleOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";

type UserData = {
  id: number;
  username: string;
  role: string;
};

const Sidebar = ({ isHidden }: { isHidden: boolean }) => {
  const { role } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: UserData = jwtDecode(token);
        setUserData(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const menuItems = 
  role === "Karyawan" ? kasirRoute : 
  role === "Admin" ? adminRoute : 
  role === "Owner" ? ownerRoute : [];

  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <div
      className={`flex w-96 flex-col bg-primary50 pt-6 shadow-2xl transition-all duration-300 ${
        isHidden ? "hidden" : ""
      }`}
    >
      <div className="relative mb-8 flex items-center justify-between pt-4">
        <Link className="m-auto w-full -mt-2" to="/">
          <h1 className="text-2xl font-semibold text-center text-white">
            Baso Krijo
          </h1>
        </Link>
      </div>
      <nav className="no-scrollbar h-full w-full overflow-y-scroll text-white text-[15px]">
        <ul className="flex flex-col py-4 p-0 h-full">
          {menuItems.map((menu, index) => (
            <div key={index}>
              <li
                onClick={() => menu.subItems && toggleMenu(menu.name)}
                className={`flex items-center mb-4 p-3 cursor-pointer hover:bg-primary40 hover:text-white hover:ml-10 hover:p-3 hover:rounded-l-full transition-all ${
                  location.pathname === menu.path
                    ? "bg-white ml-10 p-3 text-black rounded-l-full"
                    : ""
                }`}
              >
                <Link
                  to={menu.path || "#"}
                  className={`block py-2 px-8 w-full ${
                    location.pathname === menu.path
                      ? "rounded-lg"
                      : "border-none"
                  }`}
                >
                  {menu.name}
                </Link>
                {menu.subItems && (
                  <span>
                    {openMenu === menu.name ? (
                      <FiChevronUp size={18} />
                    ) : (
                      <FiChevronDown size={18} />
                    )}
                  </span>
                )}
              </li>
              {menu.subItems && (
                <Collapse in={openMenu === menu.name}>
                  <ul className="pl-6">
                    {menu.subItems.map((subItem, index) => (
                      <li
                        key={index}
                        className={`flex items-center justify-center mb-4 cursor-pointer hover:bg-primary40 hover:text-white hover:ml-10 hover:p-3 hover:rounded-l-full transition-all ${
                          location.pathname === subItem.path
                            ? "bg-white ml-6 p-3 text-black rounded-l-full"
                            : ""
                        }`}
                      >
                        <Link
                          to={subItem.path}
                          className={`block py-2 px-8 w-full ${
                            location.pathname === subItem.path
                              ? "rounded-lg"
                              : "border-none"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Collapse>
              )}
            </div>
          ))}
        </ul>
      </nav>
      {userData && (
        <div className="p-4 mt-auto">
          <div className="flex flex-col border-t-[1px] border-b-[1px]">
            <div className="flex items-center gap-3 text-white mt-1">
              <span className="text-3xl">
                <IoPersonCircleOutline />
              </span>
              <div className="flex flex-col">
                <p className="text-lg font-medium text-white">
                  {userData.username.charAt(0).toUpperCase() +
                    userData.username.slice(1)}
                </p>

                <p className="text-sm mb-2 text-neutral40">{userData.role}</p>
              </div>
            </div>
          </div>
          <div className="flex">
            <button
              onClick={handleLogout}
              className="mt-4 w-full py-2 bg-white text-black rounded-full hover:bg-primary40 hover:text-white transition-all flex items-center justify-center px-4"
            >
              Keluar
              <HiOutlineLogout className="ml-2 text-xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
