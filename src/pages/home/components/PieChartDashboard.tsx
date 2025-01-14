import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { tooltipOptions } from "@/utils/chartOptions";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartDashboardProps {
  chartData: Array<{
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

const generateColors = (count: number, baseColors: string[]): string[] => {
  const additionalColors = Array.from(
    { length: count - baseColors.length },
    (_, i) => {
      const hue = (i * 30) % 360;
      return `hsl(${hue}, 70%, 50%)`; 
    }
  );
  return [...baseColors, ...additionalColors];
};

const PieChartDashboard: React.FC<PieChartDashboardProps> = ({
  chartData,
  bestSellingMenu,
}) => {
  const baseColors = [
    "#D30000",
    "#EB1D1D",
    "#980000",
    "#740000",
    "#4F0000",
    "#2A1113",
  ];
  const backgroundColors = generateColors(chartData.length, baseColors);

  const data = {
    labels: chartData.map((item) => item.menu_name),
    datasets: [
      {
        data: chartData.map((item) => item.total_sold),
        backgroundColor: backgroundColors,
        hoverBackgroundColor: backgroundColors.map((color) => color),
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="grid w-full grid-cols-3 mt-10 gap-2 rounded-3xl border border-neutral80 p-6">
      <h1 className="col-span-3 mb-1 text-neutral80">AKTIVITAS</h1>
      <h2 className="col-span-3 mb-1 font-semibold text-2xl">
        Grafik Penjualan
      </h2>
      {bestSellingMenu && (
        <p className="col-span-3 mb-4">
          <span className="font-medium">Menu Paling Banyak Terjual:</span>{" "}
          <span className="font-semibold">
            {bestSellingMenu.menu_name} ({bestSellingMenu.total_sold} Terjual)
          </span>
        </p>
      )}
      <div className="col-span-2 py-16 grid w-full grid-cols-2">
        {data.labels.map((label, index) => (
          <div className="flex items-center gap-2" key={label}>
            <div
              className="h-[18px] w-[28px]"
              style={{
                backgroundColor: data.datasets[0].backgroundColor[index],
              }}
            />
            <span
              style={{ color: data.datasets[0].backgroundColor[index] }}
              className="font-medium"
            >
              {label}:{" "}
              <span className="font-semibold">
                {data.datasets[0].data[index]} Terjual
              </span>
            </span>
          </div>
        ))}
      </div>
      <div className="w-full">
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
