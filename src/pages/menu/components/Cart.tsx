import { useCart } from "@/context/CardContext";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/LoadingButton";
import { ToastFailure, ToastSuccess } from "@/components/Toasts";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [jenisPesanan, setJenisPesanan] = useState("");
  const [cashPaid, setCashPaid] = useState("");
  const [customerName, setCustomerName] = useState("");

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.harga * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!customerName) {
      ToastFailure("Nama pelanggan harus diisi!");
      return;
    }

    if (cartItems.length > 0) {
      setIsLoading(true);

      const data = {
        nama_pembeli: customerName,
        menu: cartItems.map((item) => ({
          id_menu: item.id,
          nama_menu: item.name,
          harga: item.harga,
          jumlah: item.quantity,
        })),
        metode_pembayaran: paymentMethod,
        status_pesanan: "Sedang Dibuat",
        jenis_pesanan: jenisPesanan,
        total_harga: totalPrice,
        cash_dibayar: paymentMethod === "cash" ? cashPaid : null,
        kembalian: paymentMethod === "cash" ? calculateChange() : null,
      };

      try {
        const response = await fetch(
          "http://localhost:5000/api/orders/checkout",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );

        const result = await response.json();
        if (result.success) {
          ToastSuccess("Pesanan Berhasil Dibuat");
          setTimeout(() => {
            setIsLoading(false);
            navigate("/pesanan");
          }, 1500);
        } else {
          throw new Error(result.message || "Gagal membuat pesanan");
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    } else {
      ToastFailure("Pesanan Gagal Dibuat");
    }
  };

  const formatRupiah = (value: string) => {
    if (!value) return "";
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleCashInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    setCashPaid(numericValue);
  };

  const calculateChange = () => {
    const cash = Number(cashPaid);
    return cash - totalPrice;
  };

  return (
    <>
      <div className=" bg-primary50 p-4 text-white">
        <h2 className="text-lg font-semibold mb-4">Keranjang</h2>
        <div className="h-[calc(100vh-220px)] overflow-y-auto no-scrollbar">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4 border-[1.5px] rounded-2xl p-2"
              >
                <div>
                  <p>{item.name}</p>
                  <p>Rp {item.harga.toLocaleString("id-ID")}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span>{item.quantity}</span>
                  <button onClick={() => removeFromCart(item.id)}>
                    <MdDeleteForever
                      size={26}
                      className="hover:bg-primary70 hover:rounded-full transition-all hover:p-[2px]"
                    />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">Keranjang masih kosong</div>
          )}

          <div className="mt-4">
            <label className="block mb-2 text-white">Nama Pelanggan:</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full rounded-full p-2 text-primary50"
              placeholder="Masukkan nama pelanggan"
            />
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-white">Jenis Pesanan:</label>
            <select
              value={jenisPesanan}
              onChange={(e) => setJenisPesanan(e.target.value)}
              className="w-full rounded-full p-2 text-primary50 cursor-pointer"
            >
              <option value="">Pilih Jenis Pesanan</option>
              <option value="Makan Ditempat">Makan Ditempat</option>
              <option value="Take Away">Take Away</option>
            </select>
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-white">Metode Pembayaran:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full rounded-full p-2 text-primary50 cursor-pointer"
            >
              <option value="">Pilih Metode Pembayaran</option>
              <option value="cash">Cash</option>
              <option value="QRIS">QRIS</option>
              <option value="Transfer Bank">Transfer Bank</option>
            </select>
          </div>

          {paymentMethod === "cash" && (
            <div className="mt-4">
              <label className="block mb-2 text-white">
                Cash yang Dibayarkan:
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  Rp.
                </span>
                <input
                  type="text"
                  value={formatRupiah(cashPaid)}
                  onChange={handleCashInputChange}
                  className="w-full rounded-full p-2 pl-10 text-primary50"
                  placeholder="Masukkan jumlah uang"
                />
              </div>
              <p
                className={`${
                  calculateChange() >= 0 ? "text-white" : "text-neutral50"
                } mt-2`}
              >
                {calculateChange() >= 0
                  ? `Total Kembalian: Rp. ${formatRupiah(
                      calculateChange().toString()
                    )}`
                  : `Uang kurang: Rp. ${formatRupiah(
                      Math.abs(calculateChange()).toString()
                    )}`}
              </p>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-primary50">
          <div className="pt-4 border-t-[1px] border-gray-200">
            <p className="text-lg">
              Total Harga: Rp {totalPrice.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t-[1px] border-gray-200">
            <button
              className={`rounded-full p-2 w-full transition-all ${
                isLoading || cartItems.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-white text-primary50 hover:bg-primary40 hover:text-white"
              }`}
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              {isLoading ? <Loading /> : "Buat Pesanan"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
