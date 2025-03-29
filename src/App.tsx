import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import { menuItems } from "./consts/menuItems";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import InboxPage from "./pages/InboxPage";
import ProductsPage from "./pages/ProductsPage";
import CalendarPage from "./pages/CalendarPage";

const App: React.FC = () => {
  const { home, dashboard, inbox, products, calendar } = menuItems;
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <header
        style={{ background: "#6200ea", color: "#fff", padding: "10px 20px" }}
      >
        <h1>My App</h1>
      </header>

      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path={home.url} element={<HomePage />} />
            <Route path={dashboard.url} element={<DashboardPage />} />
            <Route path={inbox.url} element={<InboxPage />} />
            <Route path={products.url} element={<ProductsPage />} />
            <Route path={calendar.url} element={<CalendarPage />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
