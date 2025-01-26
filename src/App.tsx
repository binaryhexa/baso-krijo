import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { CartProvider } from "./context/CardContext";
import { ToastContainer } from "react-toastify";
import Loading from "./components/Loading";

const Home = lazy(() => import("./pages/home"));
const Menu = lazy(() => import("./pages/menu"));
const Pesanan = lazy(() => import("./pages/pesanan"));
const FormCreateMenu = lazy(() => import("./pages/menu/create"));
const OrderDetail = lazy(() => import("./pages/pesanan/detail"));
const ManajemenMenu = lazy(() => import("./pages/ManajemenMenu"));
const EditMenu = lazy(() => import("./pages/ManajemenMenu/update"));
const ManajemenStok = lazy(() => import("./pages/ManajemenStok"));
const ManajemenStokCreate = lazy(
  () => import("./pages/ManajemenStok/create")
);
const EditStok = lazy(() => import("./pages/ManajemenStok/update"));

function App() {
  return (
    <>
      <CartProvider>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />

              {/* Start of Order Section */}
              <Route path="/pesanan" element={<Pesanan />} />
              <Route
                path="/pesanan/detail/:orderId"
                element={<OrderDetail />}
              />
              {/* End of Order Section */}

              {/* Start of Manajemen Menu Section */}
              <Route path="/manajemen-menu" element={<ManajemenMenu />} />
              <Route path="/manajemen-menu/edit/:id" element={<EditMenu />} />
              {/* End of Manajemen Menu Section */}

              {/* Start of Manajemen Stok Section */}
              <Route path="/manajemen-stok" element={<ManajemenStok />} />
              <Route
                path="/manajemen-stok/create"
                element={<ManajemenStokCreate />}
              />
              <Route path="/manajemen-stok/edit/:id" element={<EditStok />} />
              {/* End of Manajemen Stok Section */}
              <Route path="/create" element={<FormCreateMenu />} />
            </Route>
          </Routes>
        </Suspense>
      </CartProvider>
      <ToastContainer />
    </>
  );
}

export default App;
