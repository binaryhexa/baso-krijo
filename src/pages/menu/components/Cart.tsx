import { ToastSuccess } from "@/components/Toasts";
import { useCart } from "@/context/CardContext";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const [isCartVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  if (!isCartVisible || cartItems.length === 0) return null;

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.harga * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      setIsLoading(true);
      ToastSuccess("Berhasil masuk kedalam antrian!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div
      className={`
        fixed top-4 right-4 w-72 bg-primary50 p-4 shadow-lg rounded-3xl 
        text-white 
        transform transition-all duration-500 ease-in-out 
        animate-slide-down
      `}
    >
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
          className={`
            rounded-full p-2 w-full transition-all 
            ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-white text-primary50 hover:bg-primary40 hover:text-white"
            }
          `}
          onClick={handleCheckout}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Memproses...
            </div>
          ) : (
            "Masukan Kedalam Antrian"
          )}
        </button>
      </div>
    </div>
  );
};

export default Cart;
