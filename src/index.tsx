import React from "react";
import { render } from "react-dom";
// import DemoApp from "./DemoApp";
import CalendarPage from "./pages/CalendarPage";
import App from "./App";
import "./index.css";
import { HashRouter } from "react-router-dom";

document.addEventListener("DOMContentLoaded", function () {
  render(
    <HashRouter>
      <App />
    </HashRouter>,
    document.body.appendChild(document.createElement("div"))
  );
});
