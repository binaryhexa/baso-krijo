import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastFailure, ToastSuccess } from "@/components/Toasts";

const EditStok = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState({
    name: "",
    stok: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/menu/${id}`).then((response) => {
      setMenuData({
        name: response.data.name,
        stok: response.data.stok,
      });
      setIsLoading(false);
    });
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setMenuData({ ...menuData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/stok/${id}/edit`, { currentStock: menuData.stok })
      .then(() => {
        ToastSuccess("Stok berhasil diubah!");
        navigate("/admin/stok/menu");
      })
      .catch((error) => {
        ToastFailure("Stok gagal diubah!")
        console.error("Failed to update stock:", error);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="font-semibold text-2xl text-center">Ubah Stok</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 py-10">
        <div className="mb-4">
          <label className="block font-medium mb-2">Nama Menu</label>
          <input
            type="text"
            name="name"
            value={menuData.name}
            onChange={handleInputChange}
            placeholder="Nama Menu"
            className="border-[1.5px] border-gray-500 rounded-full p-2 w-full"
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Jumlah Stok</label>
          <input
            type="number"
            name="stok"
            value={menuData.stok}
            onChange={handleInputChange}
            placeholder="Jumlah Stok"
            className="border-[1.5px] border-gray-500 rounded-full p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-primary50 text-white rounded-full p-2 mt-4"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default EditStok;