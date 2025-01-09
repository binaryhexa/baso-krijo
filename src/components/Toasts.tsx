import { toast } from "react-toastify";

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
  return toast.error(msg, {
    position: "top-center",
    autoClose: 1000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
