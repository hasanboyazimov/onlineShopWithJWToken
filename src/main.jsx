import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Provider
import { Provider } from "react-redux";

//store
import { store } from "./store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
