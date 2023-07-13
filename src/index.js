/** @format */
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "nprogress/nprogress.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import Layout from "./Layout";
import "./ultis/i18n";
import { PersistGate } from "redux-persist/integration/react";
import "react-awesome-lightbox/build/style.css";
import "react-perfect-scrollbar/dist/css/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </PersistGate>
    {/* </React.StrictMode> */}
  </Provider>
);
