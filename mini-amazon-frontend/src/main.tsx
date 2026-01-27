// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "@/index.css";
import App from "@/App.tsx";
import { store } from "@/app/store.ts";
import ErrorBoundary from "@/components/ErrorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
);
