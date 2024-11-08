import HeaderCard from "./components/HeaderCard";
import PieChartDashboard from "./components/PieChartDashboard";

const Home = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Rekap Aktivitas</h1>
      <HeaderCard />
      <PieChartDashboard />
    </div>
  );
};

export default Home;

