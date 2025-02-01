import Home from "@/pages/home";
import EditMenu from "@/pages/ManajemenMenu/update";
import ManajemenStok from "@/pages/ManajemenStok";
import ManajemenStokCreate from "@/pages/ManajemenStok/create";
import EditStok from "@/pages/ManajemenStok/update";
import FormCreateMenu from "@/pages/menu/create";
import OrderDetail from "@/pages/pesanan/detail";
import { lazy } from "react";

const Menu = lazy(() => import("@/pages/menu"));
const Pesanan = lazy(() => import("@/pages/pesanan"));
const ManajemenMenu = lazy(() => import("@/pages/ManajemenMenu"));

const KasirRoutes = [
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
    path: "/admin/pesanan/:orderId",
    element: <OrderDetail />,
  },
  {
    name: "ManajemenMenu",
    path: "/admin/manajemen_menu",
    element: <ManajemenMenu />,
  },
  {
    name: "ManajemenMenuCreate",
    path: "/admin/manajemen_menu/create",
    element: <FormCreateMenu />,
  },
  {
    path: "/admin/manajemen_menu/edit/:id",
    element: <EditMenu />,
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
    element: <EditStok />,
  },
];

export default KasirRoutes;
