import { useState } from "react";
import MenuCard from "./MenuCard";
import { Menu } from "@/utils/content";

const MenuTab = () => {
  const [activeTab, setActiveTab] = useState("Semua Menu");

  const menuCounts = {
    "Semua Menu": Menu.length,
    Makanan: Menu.filter((item) => item.category === "Makanan").length,
    Minuman: Menu.filter((item) => item.category === "Minuman").length,
    Toping: Menu.filter((item) => item.category === "Toping").length,
  };

  const filteredMenu =
    activeTab === "Semua Menu"
      ? Menu
      : Menu.filter((item) => item.category === activeTab);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="mt-14 transition-all w-full">
      <div className="flex gap-16 text-lg w-full border-b-2 transition-all">
        <a
          href="#"
          onClick={() => handleTabClick("Semua Menu")}
          className={`transition-all ${
            activeTab === "Semua Menu"
              ? "border-b-2 border-primary50 text-primary50"
              : "hover:text-primary50"
          } flex items-center gap-2`}
        >
          Semua Menu{" "}
          <span
            className={`${
              activeTab === "Semua Menu"
                ? "bg-primary50 text-white"
                : "bg-neutral60 text-white"
            } rounded-full w-6 h-6 text-base flex items-center justify-center`}
          >
            {menuCounts["Semua Menu"]}
          </span>
        </a>
        <a
          href="#"
          onClick={() => handleTabClick("Makanan")}
          className={`transition-all ${
            activeTab === "Makanan"
              ? "border-b-2 border-primary50 text-primary50"
              : "hover:text-primary50"
          } flex items-center gap-2`}
        >
          Makanan{" "}
          <span
            className={`${
              activeTab === "Makanan"
                ? "bg-primary50 text-white"
                : "bg-neutral60 text-white"
            } rounded-full w-6 h-6 text-base flex items-center justify-center`}
          >
            {menuCounts["Makanan"]}
          </span>
        </a>
        <a
          href="#"
          onClick={() => handleTabClick("Minuman")}
          className={`transition-all ${
            activeTab === "Minuman"
              ? "border-b-2 border-primary50 text-primary50"
              : "hover:text-primary50"
          } flex items-center gap-2`}
        >
          Minuman{" "}
          <span
            className={`${
              activeTab === "Minuman"
                ? "bg-primary50 text-white"
                : "bg-neutral60 text-white"
            } rounded-full w-6 h-6 text-base flex items-center justify-center`}
          >
            {menuCounts["Minuman"]}
          </span>
        </a>
        <a
          href="#"
          onClick={() => handleTabClick("Toping")}
          className={`transition-all ${
            activeTab === "Toping"
              ? "border-b-2 border-primary50 text-primary50"
              : "hover:text-primary50"
          } flex items-center gap-2`}
        >
          Toping{" "}
          <span
            className={`${
              activeTab === "Toping"
                ? "bg-primary50 text-white"
                : "bg-neutral60 text-white"
            } rounded-full w-6 h-6 text-base flex items-center justify-center`}
          >
            {menuCounts["Toping"]}
          </span>
        </a>
      </div>

      <MenuCard items={filteredMenu} />
    </div>
  );
};

export default MenuTab;
