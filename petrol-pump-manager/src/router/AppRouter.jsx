import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Dashboard from "../Pages/Dashboard";
import FetchSale from "../Pages/FetchSale";
import EnterSale from "../Pages/EnterSale";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Dashboard */}
        <Route path="/" element={<Home />} />

        {/* Sub Pages */}
        <Route path="/enter-sales" element={<EnterSale />} />
        <Route path="/fetch-sales" element={<FetchSale />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 404 Fallback */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
