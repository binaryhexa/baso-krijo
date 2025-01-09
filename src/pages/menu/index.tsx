import CustomButton from "@/components/CustomButton";
import MenuTab from "@/pages/menu/components/MenuTab";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="flex">
        <CustomButton
          label="Kembali"
          startIcon={<IoIosArrowRoundBack />}
          onClick={handleBack}
          variant="text"
        />
      </div>
      <h1 className="font-semibold text-2xl">Daftar Menu</h1>
      <MenuTab />
    </div>
  );
};

export default Menu;
