import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Pesanan", path: "/pesanan" },
  ];

  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex ${
        isOpen ? "w-96" : "w-20"
      } flex-col bg-primary50 pt-6 shadow-3xl transition-all duration-300`}
    >
      <div className="relative mb-8 flex items-center justify-between pt-4">
        <button onClick={toggleSidebar} className="absolute left-6 top-3 text-white">
          <FaBars size={22} />
        </button>
        <a
          className={`m-auto w-full -mt-2 ${!isOpen ? "hidden" : ""}`}
          href="/"
        >
          <h1 className="text-2xl font-semibold text-center text-white">
            Baso Krijo
          </h1>
        </a>
      </div>
      <nav className="no-scrollbar h-full w-full overflow-y-scroll text-white">
        <ul className="flex flex-col py-4 p-0 h-full">
          {menuItems.map((menu, index) => (
            <li
              key={index}
              className={`flex items-center justify-center mb-4 cursor-pointer hover:bg-primary40 hover:ml-10 hover:p-3 hover:rounded-l-full transition-all ${
                location.pathname === menu.path
                  ? "bg-white ml-10 p-3 text-black rounded-l-full"
                  : ""
              } ${!isOpen ? "hidden" : ""}`}
            >
              <a
                href={menu.path}
                className={`block py-2 w-full text-center ${
                  location.pathname === menu.path ? "rounded-lg" : "border-none"
                }`}
              >
                {isOpen ? menu.name : ""}{" "}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
