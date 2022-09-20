import React from "react";
import ReactDOM from "react-dom/client";
import "./css/common.css";
import "./css/default.css";
import "./css/font.css";
import "./css/mobile.css";
// import "./css/swiper.css";
import "./css/swiper.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
