export interface MenuProps {
    id: string,
    image_link: string,
    name: string,
    harga: number,
    category: string,
    nama_menu: string,
    jumlah: number,
    stok: number,
    image: FileList
}

export interface Pesanan {
    no: number;
    namaPelanggan: string;
    statusPesanan: string;
    jenisPesanan: string;
  }

  export interface OrderProps {
    id_pesanan: string;
    kode_pesanan: string;
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

export interface SalesReportPDFProps {
  reportData: {
    menu_name: string;
    quantity: number;
    total_price: number;
  }[];
  totalPrice: number;
  period?: string;
}