import { useState, useEffect } from "react";
import MenuCard from "./MenuCard";
import axios from "axios";
import { MenuProps } from "@/utils/interfaces";

const MenuTab = () => {
  const [activeTab, setActiveTab] = useState("Semua Menu");
  const [menuCounts, setMenuCounts] = useState({
    "Semua Menu": 0,
    "Makanan": 0,
    "Minuman": 0,
    "Toping": 0
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/menu")
      .then((response) => {
        const items = response.data;
        setMenuCounts({
          "Semua Menu": items.length,
          "Makanan": items.filter((item: MenuProps) => item.category === "Makanan").length,
          "Minuman": items.filter((item: MenuProps) => item.category === "Minuman").length,
          "Toping": items.filter((item: MenuProps) => item.category === "Toping").length,
        });
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
      });
  }, []);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="mt-14 transition-all w-full">
      <div className="flex gap-16 text-lg w-full border-b-2 transition-all">
        {Object.entries(menuCounts).map(([tab, count]) => (
          <a
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`transition-all ${
              activeTab === tab
                ? "border-b-2 border-primary50 text-primary50"
                : "hover:text-primary50"
            } flex items-center gap-2 cursor-pointer`}
          >
            {tab}
            <span className={`${
              activeTab === tab
                ? "bg-primary50 text-white"
                : "bg-neutral60 text-white"
            } rounded-full w-6 h-6 text-base flex items-center justify-center`}>
              {count}
            </span>
          </a>
        ))}
      </div>
      <MenuCard category={activeTab} />
    </div>
  );
};

export default MenuTab;
