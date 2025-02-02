import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastFailure, ToastSuccess } from "@/components/Toasts";

interface BahanBakuForm {
  nama: string;
  jumlah: number;
  harga: string; // Change harga to string for better handling of comma formatting
}

const StokBahanBakuCreate: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BahanBakuForm>({
    nama: "",
    jumlah: 0,
    harga: "",
  });

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    return new Intl.NumberFormat("id-ID").format(Number(numericValue));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "harga") {
      setFormData((prev) => ({
        ...prev,
        [name]: formatCurrency(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "nama" ? value : Number(value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        harga: formData.harga.replace(/\D/g, ""), 
      };

      await axios.post("http://localhost:5000/api/bahan-baku", payload);
      navigate("/admin/stok/bahan");
      ToastSuccess('Bahan baku berhasil ditambahkan!')
    } catch (err) {
      console.log(err);
      ToastFailure('Gagal menambahkan bahan baku')
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl text-center font-semibold mb-6">Tambah Bahan</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">
            Nama Bahan
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-full border-[1.5px] border-gray-500 focus:border-primary50 focus:outline-none"
            placeholder="Masukkan nama bahan"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="jumlah" className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah
            </label>
            <input
              type="number"
              id="jumlah"
              name="jumlah"
              value={formData.jumlah}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-2 rounded-full border-[1.5px] border-gray-500 focus:border-primary50 focus:outline-none"
              placeholder="Masukkan jumlah"
            />
          </div>

          <div>
            <label htmlFor="harga" className="block text-sm font-medium text-gray-700 mb-1">
              Harga
            </label>
            <input
              type="text"
              id="harga"
              name="harga"
              value={formData.harga}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-full border-[1.5px] border-gray-500 focus:border-primary50 focus:outline-none"
              placeholder="Masukkan harga"
            />
          </div>
        </div>

        <button type="submit" className="w-full bg-primary70 text-white py-2 rounded-full hover:bg-primary50 transition-all">
          Tambah Bahan
        </button>
      </form>
    </div>
  );
};

export default StokBahanBakuCreate;
