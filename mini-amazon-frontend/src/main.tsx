// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "@/index.css";
import App from "@/App.tsx";
import { store } from "@/app/store.ts";
import ErrorBoundary from "@/pages/results/ErrorBoundary";
import { App as AntdApp } from "antd";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <Provider store={store}>
      <AntdApp>
        <App />
      </AntdApp>
    </Provider>
  </ErrorBoundary>,
);
