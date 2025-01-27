import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CustomButton from "./CustomButton";
import { GoDownload } from "react-icons/go";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import axios from "axios";
import DateFilterModal from "./PDFDateFilter";
import { Collapse } from "@mui/material";

const Sidebar = ({ isHidden }: { isHidden: boolean }) => {
  const menuItems = [
    { name: "Dashboard", path: "/" },
    {
      name: "Menu",
      subItems: [
        { name: "Daftar Menu", path: "/menu" },
        { name: "Manajemen Menu", path: "/manajemen-menu" },
        { name: "Pesanan", path: "/pesanan" },
      ],
    },
    {
      name: "Stok",
      subItems: [{ name: "Manajemen Stok", path: "/manajemen-stok" }],
    },
  ];

  const location = useLocation();

  const [reportData, setReportData] = useState<
    { menu_name: string; quantity: number; total_price: number }[]
  >([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const fetchSalesReport = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/sales-report"
        );
        const { reportData, totalPrice } = response.data;

        setReportData(reportData);
        setTotalPrice(totalPrice);
      } catch (error) {
        console.error("Error fetching sales report:", error);
      }
    };

    fetchSalesReport();
  }, []);

  const handleDateFilterApply = (startDate: Date, endDate: Date) => {
    const formattedPeriod = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    setSelectedPeriod(formattedPeriod);
  };

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
        <a className="m-auto w-full -mt-2" href="/">
          <h1 className="text-2xl font-semibold text-center text-white">
            Baso Krijo
          </h1>
        </a>
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
                <a
                  href={menu.path}
                  className={`block py-2 px-8 w-full ${
                    location.pathname === menu.path
                      ? "rounded-lg"
                      : "border-none"
                  }`}
                >
                  {menu.name}
                </a>
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
                        <a
                          href={subItem.path}
                          className={`block py-2 px-8 w-full ${
                            location.pathname === subItem.path
                              ? "rounded-lg"
                              : "border-none"
                          }`}
                        >
                          {subItem.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Collapse>
              )}
            </div>
          ))}
        </ul>
        <div className="flex items-center justify-center -mt-14">
          <CustomButton
            label="Cetak Laporan Penjualan"
            startIcon={<GoDownload />}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </nav>

      <DateFilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={handleDateFilterApply}
        reportData={reportData}
        totalPrice={totalPrice}
        selectedPeriod={selectedPeriod}
      />
    </div>
  );
};

export default Sidebar;
