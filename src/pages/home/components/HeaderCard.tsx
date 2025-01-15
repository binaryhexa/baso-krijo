import { MdOutlinePointOfSale } from "react-icons/md";
import { IoIosTrendingUp } from "react-icons/io";

interface HeaderCardProps {
  totalSales: number;
  totalRevenue: number;
}

const HeaderCard: React.FC<HeaderCardProps> = ({ totalSales, totalRevenue }) => {
  return (
    <div className="flex gap-6 mt-10 w-full">
      <div className="rounded-3xl border-neutral80 border-[1px] p-4 h-28 w-64">
        <MdOutlinePointOfSale size={30} className="-mt-3" />
        <h1 className="text-neutral80">Total Penjualan</h1>
        <p className="font-semibold text-2xl">{totalSales} Menu</p>
      </div>
      <div className="rounded-3xl border-neutral80 border-[1px] p-4 h-28 w-64">
        <IoIosTrendingUp size={32} className="-mt-3" />
        <h1 className="text-neutral80">Total Pendapatan</h1>
        <p className="font-semibold text-2xl">Rp. {totalRevenue.toLocaleString()}</p>
      </div>
    </div>
  );
};


export default HeaderCard;
