import { MenuProps } from "@/utils/interfaces";
import { FC, useState } from "react";
import PopupNotification from "./PopupNotification";
import { useCart } from "@/context/CardContext";


interface MenuCardProps {
  items: MenuProps[];
}

const MenuCard: FC<MenuCardProps> = ({ items }) => {
  const [counters, setCounters] = useState<Record<number, number>>({});
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useCart();

  const handleIncrement = (item: MenuProps, index: number) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [index]: (prevCounters[index] || 0) + 1,
    }));
    addToCart(item); // Tambahkan item ke keranjang
    setShowPopup(true);
  };

  const handleDecrement = (index: number) => {
    setCounters((prevCounters) => {
      const newCount = (prevCounters[index] || 0) - 1;
      return {
        ...prevCounters,
        [index]: newCount > 0 ? newCount : 0,
      };
    });
  };

  return (
    <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src={item.image_link} alt={item.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <div className="flex justify-between">
              <p className="text-gray-600">Rp {item.harga.toLocaleString("id-ID")}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDecrement(index)}
                  className="hover:w-6 hover:h-6 hover:bg-neutral60 hover:rounded-full transition-all"
                >
                  -
                </button>
                <p>{counters[index] || 0}</p>
                <button
                  onClick={() => handleIncrement(item, index)}
                  className="hover:w-6 hover:h-6 hover:bg-neutral60 hover:rounded-full transition-all"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {showPopup && (
        <PopupNotification
          message="Ditambahkan ke keranjang"
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default MenuCard;
