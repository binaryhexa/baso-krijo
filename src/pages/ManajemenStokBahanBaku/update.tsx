import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastSuccess, ToastFailure } from "@/components/Toasts";

interface BahanBakuData {
  nama: string;
  jumlah: number;
  harga: number;
}

const BahanBakuEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<BahanBakuData>({
    nama: "",
    jumlah: 0,
    harga: 0,
  });

  useEffect(() => {
    fetchBahanBaku();
  }, [id]);

  const fetchBahanBaku = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/bahan-baku/${id}`
      );
      const bahanBaku = response.data.data;
      setFormData({
        nama: bahanBaku.nama,
        jumlah: bahanBaku.jumlah,
        harga: bahanBaku.harga,
      });
    } catch (error) {
      console.error("Error fetching bahan baku:", error);
      ToastFailure("Gagal mengambil data bahan baku");
      navigate("/bahan-baku");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "nama" ? value : Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/bahan-baku/${id}`, formData);
      ToastSuccess("Bahan baku berhasil diperbarui");
      navigate("/admin/stok/bahan");
    } catch (error) {
      console.error("Error updating bahan baku:", error);
      ToastFailure("Gagal memperbarui bahan baku");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-10">Ubah Bahan</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="nama"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nama Bahan
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-full border-[1.5px] border-gray-500 focus:border-blue-500 focus:outline-none"
            placeholder="Masukkan nama bahan"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="jumlah"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
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
              className="w-full px-4 py-2 rounded-full border-[1.5px] border-gray-500 focus:border-blue-500 focus:outline-none"
              placeholder="Masukkan jumlah"
            />
          </div>

          <div>
            <label
              htmlFor="harga"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Harga
            </label>
            <input
              type="number"
              id="harga"
              name="harga"
              value={formData.harga}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-2 rounded-full border-[1.5px] border-gray-500 focus:border-blue-500 focus:outline-none"
              placeholder="Masukkan harga"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary70 text-white py-2 rounded-full hover:bg-primary50 transition-all"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default BahanBakuEdit;
