import { useLocation } from "react-router-dom";

const Sidebar = ({ isHidden }: { isHidden: boolean }) => {
  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Pesanan", path: "/pesanan" },
  ];

  const location = useLocation();

  return (
    <div className={`flex w-96 flex-col bg-primary50 pt-6 shadow-3xl transition-all duration-300 ${isHidden ? 'hidden' : ''}`}>
      <div className="relative mb-8 flex items-center justify-between pt-4">
        <a className="m-auto w-full -mt-2" href="/">
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
              className={`flex items-center justify-center mb-4 cursor-pointer hover:bg-primary40 hover:text-white hover:ml-10 hover:p-3 hover:rounded-l-full transition-all ${
                location.pathname === menu.path
                  ? "bg-white ml-10 p-3 text-black rounded-l-full"
                  : ""
              }`}
            >
              <a
                href={menu.path}
                className={`block py-2 w-full text-center ${
                  location.pathname === menu.path ? "rounded-lg" : "border-none"
                }`}
              >
                {menu.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
