import { ToastSuccess } from "@/components/Toasts";
import { useCart } from "@/context/CardContext";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const [isCartVisible, setIsCartVisible] = useState(true);

  if (!isCartVisible || cartItems.length === 0) return null;

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.harga * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      ToastSuccess("Berhasil masuk kedalam antrian!");
      setIsCartVisible(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 w-72 bg-primary50 p-4 shadow-lg rounded-3xl transition-all text-white">
      <h2 className="text-lg font-semibold mb-4">Keranjang</h2>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center mb-4 border-[1px] rounded-2xl p-2"
        >
          <div>
            <p>{item.name}</p>
            <p>Rp {item.harga.toLocaleString("id-ID")}</p>
          </div>
          <div className="flex items-center gap-2">
            <span>{item.quantity}</span>
            <button onClick={() => removeFromCart(item.id)} className="">
              <MdDeleteForever size={26} />
            </button>
          </div>
        </div>
      ))}
      <div className="mt-4 pt-4 border-t-[1px] border-gray-200">
        <p className="text-lg">
          Total Harga: Rp {totalPrice.toLocaleString("id-ID")}
        </p>
      </div>
      <div className="mt-4 pt-4 border-t-[1px] border-gray-200 flex items-center justify-center w-full">
        <button
          className="rounded-full bg-white text-primary50 p-2 w-full hover:bg-primary30 hover:text-white transition-all"
          onClick={handleCheckout}
        >
          Masukan Kedalam Antrian
        </button>
      </div>
    </div>
  );
};

export default Cart;
