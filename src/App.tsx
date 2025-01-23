import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home";
import Menu from "./pages/menu";
import Pesanan from "./pages/pesanan";
import { CartProvider } from "./context/CardContext";
import FormCreateMenu from "./pages/menu/create";
import { ToastContainer } from "react-toastify";
import OrderDetail from "./pages/pesanan/detail";
import ManajemenMenu from "./pages/ManajemenMenu";
import EditMenu from "./pages/ManajemenMenu/update";
import ManajemenStok from "./pages/ManajemenStok";
import ManajemenStokCreate from "./pages/ManajemenStok/create";
import EditStok from "./pages/ManajemenStok/update";

function App() {
  return (
    <>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/pesanan" element={<Pesanan />} />
            <Route path="/pesanan/detail/:orderId" element={<OrderDetail />} />
            <Route path="/manajemen-menu" element={<ManajemenMenu />} />
            <Route path="/manajemen-menu/edit/:id" element={<EditMenu />} />
            <Route path="/manajemen-stok" element={<ManajemenStok/>} />
            <Route path="/manajemen-stok/create" element={<ManajemenStokCreate />} />
            <Route path="/manajemen-stok/edit/:id" element={<EditStok />} />
            <Route path="/create" element={<FormCreateMenu />} />
          </Route>
        </Routes>
      </CartProvider>
      <ToastContainer />
    </>
  );
}

export default App;
