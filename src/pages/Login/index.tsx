import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ToastFailure, ToastSuccess } from "@/components/Toasts";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type LoginFormInputs = {
  username: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
  } = useForm<LoginFormInputs>();
  const { setRole } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await axios.post(
        "https://baso-krijo-backend.vercel.app/api/auth/login",
        data
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      setRole(response.data.role);
      ToastSuccess("Login Berhasil!");
      navigate("/");
    } catch (error) {
      console.error("Login gagal:", error);
      ToastFailure("Username atau password salah");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#f5f5f5]">
      <div className="w-96 p-5 rounded-3xl bg-[#ffffff] shadow-lg">
        <h2 className="text-center font-medium text-2xl">Baso Krijo</h2>
        <h2 className="text-center font-medium text-2xl mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              {...register("username", { required: "Username wajib diisi" })}
              className="border-[1.5px] border-gray-500 w-full rounded-full p-2 mt-2 mb-4"
            />
          </div>

          <div className="relative">
            <label>Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password wajib diisi" })}
              className="border-[1.5px] border-gray-500 w-full rounded-full p-2 mt-2 mb-4"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-[59%] transform -translate-y-1/2 text-gray-600 flex items-center text-xl"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-full p-2 bg-primary50 text-white hover:bg-primary40 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
