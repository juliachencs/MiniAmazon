// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import DefaultHeader from './components/header.tsx'
import DefaultFooter from './components/Footer.tsx'
import { SignUpUserCard, SignInUserCard, RecoverPasswordUserCard } from './components/UserForm'


function DefaultLayout() { 
  return (
    <>
      <DefaultHeader />
      <main>
        <Outlet />
      </main>
       <DefaultFooter />
    </>
  );
}
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
        <Route element={<DefaultLayout />}>
            <Route path="/sign-in" element={<SignInUserCard />} />
            <Route path="/sign-up" element={<SignUpUserCard />} />
            <Route path="/recover-password" element={<RecoverPasswordUserCard />} />
        </Route>
    </Routes>
  </BrowserRouter>


)

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router";
// // import App from "./app";

// // const root = document.getElementById("root");

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
// );
