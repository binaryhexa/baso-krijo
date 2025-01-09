import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { tooltipOptions } from "@/utils/chartOptions";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartDashboard: React.FC = () => {
  const data: ChartData<"pie", number[], string> = {
    labels: [
      "Bakso Mercon",
      "Bakso Tetelan",
      "Es Jeruk",
      "Kerupuk",
      "Es Teh Manis",
      "Bawang Goreng",
    ],
    datasets: [
      {
        data: [65, 35, 40, 15, 10, 10],
        backgroundColor: [
          "#D30000",
          "#EB1D1D",
          "#980000",
          "#740000",
          "#4F0000",
          "#2A1113",
        ],
        hoverBackgroundColor: [
          "#980000",
          "#4F0000",
          "#D30000",
          "#740000",
          "#2A1113",
          "#EB1D1D",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const labels = data.labels ?? [];
  const dataset = data.datasets[0]?.data ?? [];
  const backgroundColor: string[] =
    (data.datasets[0]?.backgroundColor as string[]) ?? [];

  return (
    <div className="grid w-full grid-cols-3 mt-10 gap-2 rounded-3xl border border-neutral80 p-6">
      <h1 className="col-span-3 mb-1 text-neutral80">AKTIVITAS</h1>
      <h2 className="col-span-3 mb-1 font-semibold text-2xl">
        Grafik Penjualan
      </h2>
      <h2 className="col-span-3 mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis inventore
        harum iusto quam reiciendis sint modi accusantium. Dicta, assumenda a!
      </h2>

      <div className="col-span-2 py-16 grid w-full grid-cols-2">
        {labels.map((label, index) => (
          <div className="flex items-center gap-2" key={label}>
            <div
              className="h-[18px] w-[28px]"
              style={{ backgroundColor: backgroundColor[index] }}
            />
            <span style={{ color: backgroundColor[index] }} className="font-medium">
              {label}: <span className="font-semibold">{dataset[index]} Terjual</span>
            </span>
          </div>
        ))}
      </div>

      <div className=" w-full">
        <Pie
          data={data}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            interaction: {
              mode: "nearest",
              intersect: false,
              axis: "x",
            },
            plugins: {
              legend: {
                display: false,
              },
              ...tooltipOptions,
            },
          }}
          className="h-64"
        />
      </div>
    </div>
  );
};

export default PieChartDashboard;
