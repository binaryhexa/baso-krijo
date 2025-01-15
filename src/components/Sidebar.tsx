import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CustomButton from "./CustomButton";
import { GoDownload } from "react-icons/go";
import axios from "axios";
import DateFilterModal from "./PDFDateFilter";
const Sidebar = ({ isHidden }: { isHidden: boolean }) => {
  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Manajemen Menu", path: "/manajemen-menu" },
    { name: "Daftar Menu", path: "/menu" },
    { name: "Pesanan", path: "/pesanan" },
  ];

  const location = useLocation();

  const [reportData, setReportData] = useState<
    { menu_name: string; quantity: number; total_price: number }[]
  >([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div
      className={`flex w-96 flex-col bg-primary50 pt-6 shadow-3xl transition-all duration-300 ${
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
        <div className="flex items-center justify-center -mt-14">
          {/* Button to open the modal */}
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
