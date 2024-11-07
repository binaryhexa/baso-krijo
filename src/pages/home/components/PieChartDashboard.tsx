import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartDashboard: React.FC = () => {
  const data: ChartData<"pie", number[], string> = {
    labels: ["Bakso Mercon", "Bakso Tetelan"],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ["#980000", "#4F0000"],
        hoverBackgroundColor: ["#980000", "#4F0000"],
      },
    ],
  };

  return (
    <div className="mt-10 w-full border border-primary10 rounded-2xl h-screen p-8">
      <p className="text-neutral80">AKTIVITAS</p>
      <p className="font-semibold text-2xl mt-4">Grafik Pembelian</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
        incidunt, aperiam vero neque recusandae id suscipit blanditiis possimus
        explicabo veniam.
      </p>
      <div className="mt-6 h-3/4 flex justify-end">
        <div className="w-1/2">
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
};

export default PieChartDashboard;
    