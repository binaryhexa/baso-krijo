import { IoIosPeople } from "react-icons/io";
import { MdOutlinePointOfSale } from "react-icons/md";
import { IoIosTrendingUp } from "react-icons/io";

const HeaderCard = () => {
  return (
    <div className="flex gap-6 mt-10 w-full">
      <div className="rounded-3xl border-primary10 border-[1px] p-4 h-28 w-64">
        <IoIosPeople size={32} className="-mt-3"/>
        <h1>Total Pengunjung</h1>
        <p className="font-semibold text-2xl">150</p>
      </div>
      <div className="rounded-3xl border-primary10 border-[1px] p-4 h-28 w-64">
        <MdOutlinePointOfSale size={30} className="-mt-3"/>
        <h1>Total Penjualan</h1>
        <p className="font-semibold text-2xl">2.000</p>
      </div>
      <div className="rounded-3xl border-primary10 border-[1px] p-4 h-28 w-64">
        <IoIosTrendingUp size={32} className="-mt-3"/>
        <h1>Total Pendapatan</h1>
        <p className="font-semibold text-2xl">Rp. 1.500.000</p>
      </div>
    </div>
  );
};

export default HeaderCard;
