import CustomButton from "@/components/CustomButton";
import PesananTable from "./components/PesananTable";
import { GoDownload } from "react-icons/go";
import DateFilterModal from "@/components/PDFDateFilter";
import { useEffect, useState } from "react";
import axios from "axios";

const Pesanan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [reportData, setReportData] = useState<
    { menu_name: string; quantity: number; total_price: number }[]
  >([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchSalesReport = async () => {
      try {
        const params: {
          startDate?: string;
          endDate?: string;
        } = {};
        
        if (startDate) {
          params.startDate = startDate.toISOString().split("T")[0];
        }
        if (endDate) {
          params.endDate = endDate.toISOString().split("T")[0];
        }

        const response = await axios.get(
          "http://localhost:5000/api/dashboard/sales-report",
          { params }
        );
        const { reportData, totalPrice } = response.data;

        setReportData(reportData);
        setTotalPrice(totalPrice);
      } catch (error) {
        console.error("Error fetching sales report:", error);
      }
    };

    fetchSalesReport();
  }, [startDate, endDate]); 

  const handleDateFilterApply = (startDate: Date, endDate: Date) => {
    setStartDate(startDate);
    setEndDate(endDate);
    const formattedPeriod = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    setSelectedPeriod(formattedPeriod);
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl">Daftar Pesanan</h1>
        <CustomButton
          label="Cetak Laporan Penjualan"
          endIcon={<GoDownload />}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <PesananTable />
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

export default Pesanan
