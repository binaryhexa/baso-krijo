import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastFailure, ToastSuccess } from "@/components/Toasts";
import { useNavigate } from "react-router-dom";

interface MenuFormData {
  name: string;
  harga: number;
  category: string;
  image: FileList;
  stok: number;
}

const FormCreateMenu: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<MenuFormData>();

  const onSubmit = async (data: MenuFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("harga", data.harga.toString());
    formData.append("category", data.category);
    formData.append("stok", data.stok.toString());
    formData.append("image", data.image[0]);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/menu",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      ToastSuccess("Menu berhasil ditambahkan!");
      navigate("/manajemen-menu");
      reset();
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error adding menu:", error);
      ToastFailure("Gagal menambahkan menu.");
    }
  };

  return (
    <div className="mx-auto mt-2 p-6 rounded-md">
      <h2 className="text-xl font-semibold mb-10 text-center">
        Tambah Menu Baru
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block mb-1 font-medium">Nama Menu</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full border-[1.5px] border-gray-500 px-3 py-2 rounded-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Harga</label>
            <input
              type="number"
              {...register("harga", { required: true })}
              className="w-full border-[1.5px] border-gray-500 px-3 py-2 rounded-full"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Jumlah Stok</label>
          <input
            type="number"
            {...register("stok", { required: true })}
            className="w-full border-[1.5px] border-gray-500 px-3 py-2 rounded-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Kategori</label>
          <select
            {...register("category", { required: true })}
            className="w-full border-[1.5px] border-gray-500 px-3 py-2 rounded-full"
          >
            <option value="">Pilih Kategori</option>
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
            <option value="Toping">Toping</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Unggah Gambar</label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="w-full border-[1.5px] border-gray-500 px-3 py-2 rounded-full"
            accept="image/*"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary70 text-white py-2 rounded-full hover:bg-primary50 transition-all"
        >
          Tambah Menu
        </button>
      </form>
    </div>
  );
};

export default FormCreateMenu;
