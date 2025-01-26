import { useEffect, useState } from "react";
import HeaderCard from "./components/HeaderCard";
import PieChartDashboard from "./components/PieChartDashboard";

interface DashboardData {
  total_sales: number;
  total_revenue: number;
  chart_data: Array<{
    label: string;
    value: number;
    menu_name: string;
    total_sold: number;
  }>;
  bestSellingMenu: {
    menu_name: string;
    total_sold: number;
  } | null;
}

const Home = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard")
      .then((response) => response.json())
      .then((result: DashboardData) => {
        const bestSellingMenu = result.chart_data.reduce((prev, current) =>
          current.total_sold > prev.total_sold ? current : prev
        );
        setData({ ...result, bestSellingMenu });
        console.log(result);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Rekap Aktivitas</h1>
      {data ? (
        <>
          <HeaderCard
            totalSales={data.total_sales}
            totalRevenue={data.total_revenue}
          />
          <PieChartDashboard
            chartData={data.chart_data}
            bestSellingMenu={data.bestSellingMenu}
          />
        </>
      ) : (
        <div className="flex justify-center items-center">
          <div className="text-2xl font-medium">Tidak ada Data.</div>
        </div>
      )}
    </div>
  );
};

export default Home;
