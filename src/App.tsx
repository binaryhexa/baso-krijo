import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { CartProvider } from "./context/CardContext";
import { ToastContainer } from "react-toastify";
import LoadingScreen from "./components/LoadingScreen";
import LoginForm from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import KasirRoutes from "./routes-page/KasirRoutes";
import { jwtDecode } from "jwt-decode";
import AdminRoutes from "./routes-page/AdminRoutes";
import RegisterPage from "./pages/Register";
import OwnerRoutes from "./routes-page/OwnerRoutes";

const Home = lazy(() => import("./pages/home"));

type UserData = {
  id: number;
  username: string;
  role: string;
};

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: UserData = jwtDecode(token);
        setUserData(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                {userData?.role === "Karyawan" &&
                  KasirRoutes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                {userData?.role === "Admin" &&
                  AdminRoutes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                {userData?.role === "Owner" &&
                  OwnerRoutes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </CartProvider>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
