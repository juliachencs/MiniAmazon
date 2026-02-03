import { store } from "@/app/store";
import ErrorBoundary from "@/components/ErrorBoundary";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Header />
        <Outlet />
        <Footer />
      </Provider>
    </ErrorBoundary>
  );
}
