import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastFailure, ToastSuccess } from "@/components/Toasts";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const EditAccountPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  
  const roles = ["Karyawan", "Admin", "Owner"];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/users/${id}`);
        console.log("User ID dari URL:", id);
        const user = response.data[0];
        setFormData({
          username: user.username,
          password: user.password,
          role: user.role,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        ToastFailure("Gagal mengambil data akun.");
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/auth/users/${id}`, {
        username: formData.username,
        password: formData.password, 
        role: formData.role,
      });

      ToastSuccess("Data akun berhasil diperbarui!");
      navigate("/admin/akun");
    } catch (error) {
      console.error("Error updating user data:", error);
      ToastFailure("Terjadi kesalahan saat memperbarui data akun.");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-medium text-center mb-4">Edit Akun</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="border-[1.5px] border-gray-500 rounded-full px-3 py-2 w-full"
          />
        </div>

        <div className="mb-3 relative">
          <label htmlFor="password" className="block text-sm font-medium">
            Password (Opsional)
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border-[1.5px] border-gray-500 rounded-full px-3 py-2 w-full pr-10"
          />
          <div
            className="absolute right-4 text-xl top-[65%] transform -translate-y-1/2 cursor-pointer flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="block text-sm font-medium">
            Jabatan
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="border-[1.5px] border-gray-500 rounded-full px-3 py-2 w-full"
          >
            <option value="">Pilih Jabatan</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-primary50 text-white py-2 px-4 rounded-full mt-4 hover:bg-primary40 w-full"
        >
          Perbarui Akun
        </button>
      </form>
    </div>
  );
};

export default EditAccountPage;
