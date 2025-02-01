import CustomButton from "@/components/CustomButton";
import ManajemenStokTable from "./components/ManajemenStokTable";
import { useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";

const ManajemenStok = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Manajemen Stok Menu</h1>
        <CustomButton
          label="Tambahkan Stok"
          onClick={() => navigate("/admin/stok/menu/create")}
          endIcon={<IoIosAdd />}
        />
      </div>
      <ManajemenStokTable />
    </div>
  );
};

export default ManajemenStok;
