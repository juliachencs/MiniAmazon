import {
  BrowserRouter,
  MemoryRouter,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import DefaultHeader from "@/components/Header";
import DefaultFooter from "@/components/Footer";

import Login from "@/pages/auth/Login";
import RecoverPassword from "@/pages/auth/RecoverPassword";
import Signup from "@/pages/auth/Signup";

import Products from "@/pages/products/Products";
import CreateProduct from "@/pages/products/CreateProduct";
import UpdateProduct from "@/pages/products/UpdateProduct";
import Product from "@/pages/products/Product";

import { GoHomeButton } from "@/components/HomeBtn";

import { useRole } from "@/app/hooks";
import { Result } from "antd";

import { isAdmin, isGuest } from "@/app/utils";
import DelayedRedirect from "@/components/DelayedRedirectRoute";
import LinkButton from "@/components/LinkButton";
import Debug from "@/pages/Debug";
import ShoppingCart from "@/pages/cart/ShopppingCart";
import Checkout from "@/pages/cart/Checkout";

function GuestOnly() {
  const { role } = useRole();
  if (isGuest(role)) {
    return <Outlet />;
  }
  return <DelayedRedirect title="You have logged in!"></DelayedRedirect>;
}
function AdminOnly() {
  const { role } = useRole();
  if (isAdmin(role)) {
    return <Outlet />;
  }

  return (
    <DelayedRedirect
      title="Sorry, you don't have the permission to access that page"
      redirect="/"
    ></DelayedRedirect>
  );
}
function AuthOnly() {
  const { role } = useRole();

  if (!isGuest(role)) {
    return <Outlet />;
  }
  return (
    <DelayedRedirect
      title="Sorry, you need to log in to access that page"
      redirect="/login"
    ></DelayedRedirect>
  );
}

function PageNotFound() {
  const subtitle =
    "Sorry, the page you are looking for might have been removed or moved to another URL.";

  return (
    <Result
      status={404}
      title="Oops! Page Not Found"
      subTitle={subtitle}
      extra={<GoHomeButton />}
    />
  );
}

//https://nicepage.com/landing-page/preview/text-with-two-buttons-726103
function Home() {
  const { role } = useRole();

  return (
    <Result
      icon={<></>}
      title="Welcome to mini-amazon"
      subTitle="start your online shopping from"
      className="welcome"
      extra={
        <>
          <LinkButton to="/products" type="primary">
            {" "}
            Brower products{" "}
          </LinkButton>

          {isGuest(role) && <LinkButton to="/login">Sign in</LinkButton>}
        </>
      }
    ></Result>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <DefaultHeader />
        <Routes>
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
            <Route
              path="/products/update/:productId"
              element={<UpdateProduct />}
            />
          </Route>

          <Route element={<AuthOnly />}>
            <Route path="/checkout" element={<Checkout />} />
          </Route>

          <Route path="/debug" element={<Debug />}></Route>
        </Routes>

        <DefaultFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
