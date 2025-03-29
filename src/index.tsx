import React from "react";
import { render } from "react-dom";
// import DemoApp from "./DemoApp";
import CalendarPage from "./pages/CalendarPage";
import App from "./App";
import "./index.css";

document.addEventListener("DOMContentLoaded", function () {
  render(<App />, document.body.appendChild(document.createElement("div")));
});
