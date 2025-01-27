import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastFailure, ToastSuccess } from "@/components/Toasts";
import { useNavigate } from "react-router-dom";
import FormFields from "./components/FormCreateMenu/FormFields";
import FormSubmitButton from "./components/FormCreateMenu/FormSubmitButton";
import { MenuProps } from "@/utils/interfaces";

const FormCreateMenu: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<MenuProps>();

  const onSubmit = async (data: MenuProps) => {
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
        <FormFields register={register} />
        <FormSubmitButton />
      </form>
    </div>
  );
};

export default FormCreateMenu;
