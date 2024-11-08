import { FC, useEffect } from "react";

interface PopupNotificationProps {
  message: string;
  onClose: () => void;
}

const PopupNotification: FC<PopupNotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-lg shadow-md transition-all">
      {message}
    </div>
  );
};

export default PopupNotification;
