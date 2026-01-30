import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

import DefaultLayout from "@/components/layout/DefaultLayout";
import Home from "@/pages/Home";

const routes = createRoutesFromElements(
  <Route element=<DefaultLayout />>
    <Route path="/" element=<Home /> />
  </Route>,
);
const router = createBrowserRouter(routes);
export default router;
