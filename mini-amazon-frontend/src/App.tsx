import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import DefaultHeader from "./components/Header";
import DefaultFooter from "./components/Footer";

import Login from "./features/auth/Login";
import RecoverPassword from "./features/auth/RecoverPassword";
import Signup from "./features/auth/Signup";

import Products from "./features/products/Products";
import CreateProduct from "./features/products/CreateProduct";
import UpdateProduct from "./features/products/UpdateProduct";
import Product from "./features/products/Product";
import ErrorBoundary from "./components/ErrorBoundary";
import { GoHomeButton } from "@/components/GoHome";

import { useRole } from "@/app/hooks";
import { Button, Progress, Result } from "antd";
import { useEffect } from "react";
import { isAdmin } from "@/app/utils";
import DelayedRedirect from "@/components/DelayedRedirectRoute";

function GuestOnly() {
  const { role } = useRole();
  if (role === null) {
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
  return (
    <Result
      icon={<></>}
      title="Welcome to mini-amazon"
      subTitle="start your online shopping from"
      className="welcome"
      extra={
        <>
          <Button type="primary" href="/products">
            Brower products
          </Button>
          <Button href="/login"> Sign in </Button>{" "}
        </>
      }
    ></Result>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <ErrorBoundary>
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
          </Routes>
          <DefaultFooter />
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;
