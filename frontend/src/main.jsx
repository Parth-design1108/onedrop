import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { persistor, store } from "./Redux/Store.js";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";  // <-- Add this import

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
