import { useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Button } from "antd";

// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import DefaultHeader from "./components/Header.tsx";
import DefaultFooter from "./components/Footer.tsx";

import Login from "./features/auth/Login.tsx";
import RecoverPassword from "./features/auth/RecoverPassword.tsx";
import Signup from "./features/auth/Signup.tsx";

import Products from "./features/products/Products.tsx";
import CreateProduct from "./features/products/CreateProduct.tsx";
import UpdateProduct from "./features/products/UpdateProduct.tsx";
import Product from "./features/products/Product.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import { GoHomeButton } from "@/components/GoHome";

// import ProductEditForm from "./components/ProductEditForm.tsx";

// import { Link } from "react-router-dom";
// import {
//   SignUpUserCard,
//   SignInUserCard,
//   RecoverPasswordUserCard,
// } from "./components/UserCard.tsx";

function DefaultLayout() {
  return (
    <>
      <ErrorBoundary>
        <DefaultHeader />
        <main>
          <Outlet />
        </main>
        <DefaultFooter />
      </ErrorBoundary>
    </>
  );
}

function PageNotFound() {
  return (
    <>
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>
        Sorry, the page you are looking for might have been removed or moved to
        another URL.
      </p>
      <GoHomeButton />
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Products />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/recover" element={<RecoverPassword />} />

            <Route path="/products" element={<Products />} />
            <Route path="/products/create" element={<CreateProduct />} />
            <Route
              path="/products/update/:productId"
              element={<UpdateProduct />}
            />
            <Route path="/products/item/:productId" element={<Product />} />

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
