import React from "react";
import ReactDOM from "react-dom/client";
import RootApp from "./RootApp.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.ts";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RootApp />
      <Toaster position="bottom-center" />
    </Provider>
  </React.StrictMode>
);
