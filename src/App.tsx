import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home";
import Menu from "./pages/menu";
import Pesanan from "./pages/pesanan";
import { CartProvider } from "./context/CardContext";
import Cart from "./pages/menu/components/Cart";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/pesanan" element={<Pesanan />} />
        </Route>
      </Routes>
      <Cart />
    </CartProvider>
  );
}

export default App;
