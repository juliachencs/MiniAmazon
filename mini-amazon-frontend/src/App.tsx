import { useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Button } from "antd";

// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import DefaultHeader from "./components/Header.tsx";
import DefaultFooter from "./components/Footer.tsx";
import Login from "./components/Login.tsx";
import RecoverPassword from "./components/RecoverPassword.tsx";
import Products from "./components/Products.tsx";
import Signup from "./components/Signup.tsx";

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
      <DefaultHeader />

      <div
        style={{
          alignSelf: "center",
          width: "max-content",
          border: "1px solid gray",
          padding: 32,
        }}
      >
        <Outlet />
      </div>
      <DefaultFooter />
    </>
  );
}
function NotFound() {
  return (
    <>
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>
        Sorry, the page you are looking for might have been removed or moved to
        another URL.
      </p>
      <Button href="/" type="primary">
        {" "}
        Go to Homepage{" "}
      </Button>
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
            <Route path="/recover" element={<RecoverPassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
