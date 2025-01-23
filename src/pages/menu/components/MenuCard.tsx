import { FC, useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "@/context/CardContext";
import { MenuProps } from "@/utils/interfaces";

const MenuCard: FC<{ category?: string }> = ({ category }) => {
  const { addToCart, updateQuantity } = useCart();
  const [items, setItems] = useState<MenuProps[]>([]);
  const [counters, setCounters] = useState<Record<number, number>>({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menu")
      .then((response) => {
        const filteredItems =
          category && category !== "Semua Menu"
            ? response.data.filter(
                (item: MenuProps) => item.category === category
              )
            : response.data;
        setItems(filteredItems);
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
      });
  }, [category]);

  const handleIncrement = (index: number, item: MenuProps) => {
    const newCount = (counters[index] || 0) + 1;
    setCounters((prev) => ({ ...prev, [index]: newCount }));
    addToCart(item);
  };

  const handleDecrement = (index: number, item: MenuProps) => {
    const newCount = (counters[index] || 0) - 1;
    setCounters((prev) => ({ ...prev, [index]: newCount > 0 ? newCount : 0 }));
    updateQuantity(item.id, Math.max(newCount, 0));
  };

  if (items.length === 0) {
    return (
      <div className="text-center text-lg m-auto py-28 font-medium">
        Tidak ada Data
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="bg-white border-[1px] border-gray-500 shadow-sm rounded-3xl overflow-hidden"
        >
          <img
            src={item.image_link}
            alt={item.name}
            className="w-full p-[8px] rounded-t-3xl h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="">Sisa Stok: {item.stok}</p>
            <div className="flex justify-between">
              <p className="text-gray-600">
                Rp {item.harga.toLocaleString("id-ID")}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDecrement(index, item)}
                  className="w-6 h-6 hover:bg-neutral60 hover:rounded-full hover:p-[2px] transition-all"
                >
                  -
                </button>
                <p>{counters[index] || 0}</p>
                <button
                  onClick={() => handleIncrement(index, item)}
                  className="w-6 h-6 hover:bg-neutral60 hover:rounded-full hover:p-[2px] transition-all"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuCard;
