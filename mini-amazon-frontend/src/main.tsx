// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "@/index.css";
import App from "@/App";
import { store } from "@/app/store";
import ErrorBoundary from "@/components/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>,
);
