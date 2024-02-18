import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home"
import About from "./pages/About";
import Contact from "./pages/Contact"
import Policy from "./pages/Policy"
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/user/Dashboard";
import { PrivateRoute } from "./components/routes/Private";
import { ForgetPassword } from "./pages/auth/ForgetPassword";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminRoute } from "./components/routes/AdminRoute";
import CreateProduct from "./pages/admin/CreateProduct";
import CreateCategory from "./pages/admin/CreateCategory";
import ManageUser from "./pages/admin/ManageUser";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import { AllProducts } from "./pages/admin/AllProducts";
import UpdateProduct from "./pages/admin/UpdateProduct";
import SearchProducts from "./pages/SearchProducts";
import Categories from "./pages/Categories";


function App() {
  return (
    < >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/order" element={<Orders />} />
            <Route path="user/profile" element={<Profile />} />

          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/product/:slug" element={<UpdateProduct />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/all-products" element={<AllProducts />} />
            <Route path="admin/manage-users" element={<ManageUser />} />
          </Route>
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/category" element={<Categories />} />
          <Route path="/search" element={<SearchProducts />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Pagenotfound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
