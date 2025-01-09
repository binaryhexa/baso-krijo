import { toast } from "react-toastify";
import {  FaClock } from 'react-icons/fa';

export const ToastSuccess = (msg: string) => {
  return toast.success(msg, {
    position: "top-center",
    autoClose: 1000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const ToastFailure = (msg: string) => {
  return toast.success(msg, {
    className: 'bg-neutral100 text-white',
    progressClassName: 'bg-red-500',
    position: 'top-center',
    icon: (
      <span className="mr-2 aspect-square rounded-full bg-red-500 p-1">
        <FaClock />
      </span>
    ),
  });
};
