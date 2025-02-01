import Home from "@/pages/home";
import EditMenu from "@/pages/ManajemenMenu/update";
import ManajemenStok from "@/pages/ManajemenStok";
import ManajemenStokCreate from "@/pages/ManajemenStok/create";
import StokBahanBaku from "@/pages/ManajemenStokBahanBaku";
import StokBahanBakuCreate from "@/pages/ManajemenStokBahanBaku/create";
import BahanBakuEdit from "@/pages/ManajemenStokBahanBaku/update";
import FormCreateMenu from "@/pages/menu/create";
import { lazy } from "react";

const Menu = lazy(() => import("@/pages/menu"));
const Pesanan = lazy(() => import("@/pages/pesanan"));
const ManajemenMenu = lazy(() => import("@/pages/ManajemenMenu"));

const AdminRoutes = [
  {
    name: "Dashboard",
    path: "/",
    element: <Home />,
  },
  {
    name: "Menu",
    path: "/admin/menu",
    element: <Menu />,
  },
  {
    name: "Pesanan",
    path: "/admin/pesanan",
    element: <Pesanan />,
  },
  {
    name: "Manajemen Menu",
    path: "/admin/manajemen_menu",
    element: <ManajemenMenu />,
  },
  {
    name: "ManajemenMenuCreate",
    path: "/admin/manajemen_menu/create",
    element: <FormCreateMenu />,
  },
  {
    name: "Stok Menu",
    path: "/admin/stok/menu",
    element: <ManajemenStok />,
  },
  {
    name: "Stok Menu Create",
    path: "/admin/stok/menu/create",
    element: <ManajemenStokCreate />,
  },
  {
    name: "Stok Menu Edit",
    path: "/admin/stok/menu/edit/:id",
    element: <EditMenu />,
  },
  {
    name: "Stok Bahan",
    path: "/admin/stok/bahan",
    element: <StokBahanBaku />,
  },
  {
    name: "Stok Bahan Create",
    path: "/admin/stok/bahan/create",
    element: <StokBahanBakuCreate />,
  },
  {
    name: "Stok Bahan Edit",
    path: "/admin/stok/bahan/edit/:id",
    element: <BahanBakuEdit />,
  },
];

export default AdminRoutes;
