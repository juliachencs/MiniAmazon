import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

import DefaultLayout from "@/components/layout/DefaultLayout";
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import Products from "@/pages/product/Products";
import Product from "@/pages/product/Product";
import PageNotFound from "@/pages/PageNotFound";
import Signup from "@/pages/auth/Signup";
import RecoverPassword from "@/pages/auth/RecoverPassword";
import CreateProduct from "@/pages/product/CreateProduct";
import UpdateProduct from "@/pages/product/UpdateProduct";
import Checkout from "@/pages/cart/Checkout";
import Debug from "@/pages/Debug";
import { AdminOnly, AuthOnly, GuestOnly } from "@/components/ProtectRoutes";

const routes = createRoutesFromElements(
  <Route element=<DefaultLayout />>
    {/*open to all*/}
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/item/:productId" element={<Product />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>

    {/* only guest users can access these pages*/}
    <Route element={<GuestOnly />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/recover" element={<RecoverPassword />} />
    </Route>

    {/* only admin users can access these pages*/}
    <Route element={<AdminOnly />}>
      <Route path="/products/create" element={<CreateProduct />} />
      <Route path="/products/update/:productId" element={<UpdateProduct />} />
    </Route>

    {/* regular and admin users can access these pages*/}
    <Route element={<AuthOnly />}>
      <Route path="/checkout" element={<Checkout />} />
    </Route>

    {/* regular and admin users can access these pages */}
    <Route path="/debug" element={<Debug />}></Route>
  </Route>,
);
const router = createBrowserRouter(routes);
export default router;
