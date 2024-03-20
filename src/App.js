import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./user/Dashboard";
import ProtectedRoute from "./Routes/ProtectedRoute";
import AdminRoute from "./Routes/AdminRoute";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CraeteProduct from "./pages/Admin/CraeteProduct";
import Orders from "./user/Orders";
import Profile from "./user/Profile";
import { useAuth } from "./context/AuthContext";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import SearchPage from "./pages/SearchPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
function App() {
  const [auth] = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path = "/product-details/:slug/:id" element = {<ProductDetails/>}/>
        <Route path = '/search' element = {<SearchPage/>}/>
        <Route path = '/cart' element = {<CartPage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path={auth?.user?.role === 0 ? "/dashboard" : "/"}
          element={<ProtectedRoute />}
        >
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route
          path={auth?.user?.role === 1 ? "/dashboard" : "/"}
          element={<AdminRoute />}
        >
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/products" element ={<Products/>} />
          <Route path="admin/create-product" element={<CraeteProduct />} />
          <Route path="admin/product/:slug" element={< UpdateProduct/>} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
