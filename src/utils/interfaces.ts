export interface MenuProps {
    id: string,
    image_link: string,
    name: string,
    harga: number,
    category: string,
    nama_menu: string,
    jumlah: number,
}

export interface Pesanan {
    no: number;
    namaPelanggan: string;
    statusPesanan: string;
    jenisPesanan: string;
  }

  export interface OrderProps {
    id_pesanan: string;
    nama_pembeli: string;
    metode_pembayaran: string;
    status_pesanan: string;
    jenis_pesanan: string;
    total_harga: number;
    created_at: string;
    cash_dibayar: number,
    kembalian: number;
    menu_details: MenuProps[];
}