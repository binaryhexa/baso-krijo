import { useState } from "react";
import MenuCard from "./MenuCard";

const MenuTab = () => {
  const [activeTab, setActiveTab] = useState("Semua Menu");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="mt-14 transition-all">
      <div className="flex gap-16 text-xl border-b-2 transition-all">
        <a
          href="#"
          onClick={() => handleTabClick("Semua Menu")}
          className={`transition-all ${
            activeTab === "Semua Menu"
              ? "border-b-2 border-primary50 text-primary50"
              : "hover:text-primary50"
          }`}
        >
          Semua Menu
        </a>
        <a
          href="#"
          onClick={() => handleTabClick("Makanan")}
          className={`transition-all ${
            activeTab === "Makanan"
              ? "border-b-2 border-primary50 text-primary50"
              : "hover:text-primary50"
          }`}
        >
          Makanan
        </a>
        <a
          href="#"
          onClick={() => handleTabClick("Minuman")}
          className={`transition-all ${
            activeTab === "Minuman"
              ? "border-b-2 border-primary50 text-primary50"
              : "hover:text-primary50"
          }`}
        >
          Minuman
        </a>
        <a
          href="#"
          onClick={() => handleTabClick("Toping")}
          className={`transition-all ${
            activeTab === "Toping"
              ? "border-b-2 border-primary50 text-primary50"
              : "hover:text-primary50"
          }`}
        >
          Toping
        </a>
      </div>
      <MenuCard />
    </div>
  );
};

export default MenuTab;
