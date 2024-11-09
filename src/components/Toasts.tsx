import { FaCheck, FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';

export const ToastSuccess = (msg: string) => {
  return toast.success(msg, {
    className: 'bg-neutral100 text-white',
    progressClassName: 'bg-primary70',
    position: 'top-center',
    icon: (
      <span className="mr-2 aspect-square rounded-full bg-primary60 p-1">
        <FaCheck />
      </span>
    ),
  });
};

export const ToastPending = (msg: string) => {
  return toast.success(msg, {
    className: 'bg-neutral100 text-white',
    progressClassName: 'bg-neutral60',
    position: 'top-center',
    icon: (
      <span className="mr-2 aspect-square rounded-full bg-neutral60 p-1">
        <FaClock />
      </span>
    ),
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
