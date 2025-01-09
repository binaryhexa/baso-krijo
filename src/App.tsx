import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home";
import Menu from "./pages/menu";
import Pesanan from "./pages/pesanan";
import { CartProvider } from "./context/CardContext";
import FormCreateMenu from "./pages/menu/create";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/pesanan" element={<Pesanan />} />
          <Route path="/create" element={<FormCreateMenu />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;