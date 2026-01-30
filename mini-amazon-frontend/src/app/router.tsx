import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

import DefaultLayout from "@/components/layout/DefaultLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";

const routes = createRoutesFromElements(
  <Route element=<DefaultLayout />>
    <Route path="/" element=<Home /> />
    <Route path="/login" element=<Login /> />
  </Route>,
);
const router = createBrowserRouter(routes);
export default router;
