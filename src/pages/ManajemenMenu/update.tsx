import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastFailure, ToastSuccess } from "@/components/Toasts";

const EditMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState({
    name: "",
    category: "",
    harga: "",
    stok: 0,
    image_link: "",
    imageFile: null as File | null,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/menu/${id}`).then((response) => {
      setMenuData({
        ...response.data,
        harga: formatCurrency(response.data.harga),
        imageFile: null,
      });
      setIsLoading(false);
    });
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "harga") {
      const rawValue = value.replace(/[^0-9]/g, "");
      setMenuData({ ...menuData, harga: formatCurrency(rawValue) });
    } else if (name === "imageFile" && e.target instanceof HTMLInputElement) {
      setMenuData({
        ...menuData,
        imageFile: e.target.files ? e.target.files[0] : null,
      });
    } else {
      setMenuData({ ...menuData, [name]: value });
    }
  };

  const formatCurrency = (value: string) => {
    if (!value) return "";
    return "Rp " + parseInt(value).toLocaleString("id-ID");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const hargaRaw = menuData.harga.replace(/[^\d]/g, ""); // Menghapus prefix dan koma
    const formData = new FormData();
    formData.append("name", menuData.name);
    formData.append("category", menuData.category);
    formData.append("harga", hargaRaw);
    formData.append("stok", menuData.stok.toString());
    if (menuData.imageFile) {
      formData.append("image", menuData.imageFile);
    }

    axios
      .put(`http://localhost:5000/api/menu/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        ToastSuccess("Menu berhasil di ubah!");
        navigate("/admin/manajemen_menu");
      })
      .catch((error) => {
        ToastFailure("Menu gagal di ubah!");
        console.error("Failed to update menu:", error);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="font-semibold text-2xl text-center">Ubah Menu</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 py-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block font-medium mb-2">Nama Menu</label>
            <input
              type="text"
              name="name"
              value={menuData.name}
              onChange={handleInputChange}
              placeholder="Nama Menu"
              className="border-[1.5px] border-gray-500 rounded-full p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Kategori</label>
            <input
              type="text"
              name="category"
              value={menuData.category}
              onChange={handleInputChange}
              placeholder="Kategori"
              className="border-[1.5px] border-gray-500 rounded-full p-2 w-full"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Harga</label>
          <input
            type="text"
            name="harga"
            value={menuData.harga}
            onChange={handleInputChange}
            placeholder="Rp 0"
            className="border-[1.5px] border-gray-500 rounded-full p-2 w-full"
          />
        </div>
        {menuData.image_link && (
          <div>
            <p className="text-gray-600">Gambar Saat Ini:</p>
            <img
              src={menuData.image_link}
              alt="Menu"
              className="w-36 h-28 object-cover mb-2 rounded-xl"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block font-medium mb-2">Ubah Gambar (Opsional)</label>
          <input
            type="file"
            name="imageFile"
            onChange={handleInputChange}
            className="border-[1.5px] border-gray-500 rounded-full p-2 w-full"
            accept="image/*"
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

export default EditMenu;
