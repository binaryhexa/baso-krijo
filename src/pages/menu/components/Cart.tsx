import { useCart } from "@/context/CardContext";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  if(cartItems.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 w-72 bg-white p-4 shadow-lg rounded-lg transition-all">
      <h2 className="text-lg font-semibold mb-4">Keranjang</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-2">
            <div>
              <p>{item.name}</p>
              <p className="text-gray-600">Rp {item.harga.toLocaleString("id-ID")}</p>
            </div>
            <div className="flex items-center gap-2">
              <span>{item.quantity}</span>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                Hapus
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">Keranjang kosong</p>
      )}
    </div>
  );
};

export default Cart;
