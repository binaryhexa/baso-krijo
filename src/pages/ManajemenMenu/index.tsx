import CustomButton from "@/components/CustomButton";
import ManajemenMenuTable from "./components/ManajemenMenuTable";
import { useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";

const ManajemenMenu = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl">Manajemen Menu</h1>
        <CustomButton
          label="Tambahkan Menu Baru"
          onClick={() => navigate("/admin/manajemen_menu/create")}
          endIcon={<IoIosAdd />}
        />
      </div>
      <ManajemenMenuTable />
    </div>
  );
};

export default ManajemenMenu;
