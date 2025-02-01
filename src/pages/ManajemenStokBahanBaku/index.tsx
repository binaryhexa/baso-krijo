import CustomButton from "@/components/CustomButton";
import { useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import BahanBakuTable from "./components/BahanBakuTable";

const StokBahanBaku = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Pembelian Bahan</h1>
        <CustomButton
          label="Tambahkan Stok"
          onClick={() => navigate("/admin/stok/bahan/create")}
          endIcon={<IoIosAdd />}
        />
      </div>
      <BahanBakuTable />
    </div>
  );
};

export default StokBahanBaku;
