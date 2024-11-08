import { useState } from "react";

const PesananTab = () => {
  const [activeTab, setActiveTab] = useState("Semua Menu");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="mt-14 transition-all">
      <div className="flex gap-16 text-lg border-b-2 transition-all">
        <a
          href="#"
          onClick={() => handleTabClick("Semua")}
          className={`transition-all ${
            activeTab === "Semua"
              ? "border-b-2 border-primary50 text-primary50"
              : "hover:text-primary50"
          }`}
        >
          Semua Menu
        </a>
        <a
          href="#"
          onClick={() => handleTabClick("Makan Ditempat")}
          className={`transition-all ${
            activeTab === "Makan Ditempat"
              ? "border-b-2 border-primary50 text-primary50"
              : "hover:text-primary50"
          }`}
        >
          Makan Ditempat
        </a>
        <a
          href="#"
          onClick={() => handleTabClick("Take Away")}
          className={`transition-all ${
            activeTab === "Take Away"
              ? "border-b-2 border-primary50 text-primary50"
              : "hover:text-primary50"
          }`}
        >
          Take Away
        </a>
        <a
          href="#"
          onClick={() => handleTabClick("Antrian")}
          className={`transition-all ${
            activeTab === "Antrian"
              ? "border-b-2 border-primary50 text-primary50"
              : "hover:text-primary50"
          }`}
        >
          Antrian
        </a>
        <a
          href="#"
          onClick={() => handleTabClick("Selesai")}
          className={`transition-all ${
            activeTab === "Selesai"
              ? "border-b-2 border-primary50 text-primary50"
              : "hover:text-primary50"
          }`}
        >
          Selesai
        </a>
      </div>
    </div>
  );
};

export default PesananTab;
