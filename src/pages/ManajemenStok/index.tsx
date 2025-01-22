import CustomButton from "@/components/CustomButton";
import ManajemenStokTable from "./components/ManajemenStokTable";

const ManajemenStok = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Manajemen Stok</h1>
        <CustomButton label="Tambahkan Stok"/>
      </div>
      <ManajemenStokTable />
    </div>
  );
};

export default ManajemenStok;
