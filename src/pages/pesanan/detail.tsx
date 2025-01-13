import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";
import { MenuProps, OrderProps } from "@/utils/interfaces";
import CustomButton from "@/components/CustomButton";
import { ToastSuccess } from "@/components/Toasts";

const OrderDetail = () => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderProps | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orders?orderId=${orderId}`
        );
        if (response.data.success) {
          setOrder(response.data.data[0]);
          console.log(response.data.data);
        }
      } catch (error) {
        console.log("Gagal mendapatkan data pesanan", error);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleCompleteOrder = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          status_pesanan: "Selesai",
        }
      );

      if (response.data.success) {
        ToastSuccess("Pesanan berhasil diselesaikan");
        setOrder({ ...order, status_pesanan: "Selesai" } as OrderProps);
        navigate("/pesanan");
      }
    } catch (err) {
      console.error("Gagal menyelesaikan pesanan", err);
    }
  };

  const getStatusBadge = (status_pesanan: string) => {
    switch (status_pesanan) {
      case "Sedang Dibuat":
        return (
          <span className="font-medium text-orange-500 ">Sedang Dibuat</span>
        );
      case "Selesai":
        return (
          <span className="rounded-full font-medium text-green-500 ">
            Selesai
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="font-semibold text-2xl">Detail Pesanan</h1>

      <div className="mt-10">
        <p>
          ID Pesanan: <span className="font-medium">{order?.id_pesanan}</span>
        </p>
        <p>
          Pesanan Atas Nama:{" "}
          <span className="font-medium">{order?.nama_pembeli}</span>
        </p>
        <div className="grid grid-cols-2">
          <div className="flex flex-col">
            <p>
              Status Pesanan:{" "}
              <span className="font-medium">
                {getStatusBadge(order?.status_pesanan ?? "Unknown Status")}
              </span>
            </p>
          </div>
          <p>
            Jenis Pesanan:{" "}
            <span className="font-medium">{order?.jenis_pesanan}</span>
          </p>
        </div>
      </div>

      <h2 className="mt-12 mb-2 font-medium text-lg">Menu Pesanan</h2>
      {order?.menu_details.map((menu: MenuProps) => (
        <div key={menu.id} className="bg-gray-200 p-2 rounded-2xl mb-4">
          <div className="flex gap-4 items-center">
            <img
              src={menu.image_link}
              alt={menu.nama_menu}
              className="h-24 w-32 rounded-xl"
            />
            <div className="flex flex-col">
              <Typography variant="h6">{menu.nama_menu}</Typography>
              <Typography variant="body2" color="textSecondary">
                Harga: Rp. {menu.harga.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Jumlah: {menu.jumlah}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Harga: Rp. {(menu.harga * menu.jumlah).toLocaleString()}
              </Typography>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-10 mb-10 grid grid-cols-3 gap-4">
        <div className="flex flex-col">
          <p className="font-medium">Total Harga Keseluruhan</p>
          <p>Rp. {order?.total_harga.toLocaleString()}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-medium">Uang yang Dibayar</p>
          <p>Rp. {order?.cash_dibayar.toLocaleString()}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-medium">Metode Pembayaran</p>
          <p>{order?.metode_pembayaran}</p>
        </div>
      </div>
      <div className="flex flex-col mb-10">
        <p className="font-medium">Kembalian</p>
        <p>Rp. {order?.kembalian.toLocaleString()}</p>
      </div>

      <CustomButton
        label={
          order?.status_pesanan === "Selesai"
            ? "Pesanan Sudah Selesai"
            : "Selesaikan Pesanan"
        }
        onClick={handleCompleteOrder}
        className="w-full"
        disabled={order?.status_pesanan === "Selesai"}
      />
    </div>
  );
};

export default OrderDetail;
