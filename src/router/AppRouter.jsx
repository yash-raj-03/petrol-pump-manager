import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Dashboard from "../Pages/Dashboard";
import FetchSale from "../Pages/FetchSale";
import EnterSale from "../Pages/EnterSale";
import Inventory from "../Pages/Inventory";
import TaskBoardDashboard from "../Pages/TaskboardDashboard";
import TasksList from "../Pages/TasksList";
import EpicsPage from "../Pages/EpicsPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Dashboard */}
        <Route path="/" element={<Home />} />

        {/* Sub Pages */}
        {/* SALES RECORDING PAGES */}
        <Route path="/enter-sales" element={<EnterSale />} />
        <Route path="/fetch-sales" element={<FetchSale />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />

        {/* TASKBOARD */}
        <Route path="/taskboard-dash" element={<TaskBoardDashboard />} />
        <Route path="/taskboard-table" element={<TasksList />} />
        <Route path="/taskboard-epics" element={<EpicsPage />} />
        <Route path="/taskboard/tasks/:id" element={<EnterSale />} />

        {/* 404 Fallback */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
