import CustomButton from "@/components/CustomButton";
import ManajemenAkunTable from "./components/ManajemenAkunTable";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ManajemenAkun = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Manajemen Akun</h1>
        <CustomButton
          label="Tambahkan Akun"
          endIcon={<IoIosAdd />}
          onClick={() => navigate("/admin/akun/create")}
        />
      </div>
      <ManajemenAkunTable />
    </div>
  );
};

export default ManajemenAkun;
