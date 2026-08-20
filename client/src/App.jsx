import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import api from "./api";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import RevenueChart from "./components/RevenueChart";
import OrdersTable from "./components/OrdersTable";

import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

// Overview Dashboard View Component
function OverviewView() {
  const [dashboardData, setDashboardData] = useState({
    stats: null,
    chartData: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/dashboard/stats")
      .then((res) => {
        setDashboardData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dashboard stats:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">Dashboard Overview</h1>
        <p className="text-slate-500 text-sm">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400">
          Loading analytics...
        </div>
      ) : (
        <>
          <StatsCards stats={dashboardData.stats} />
          <RevenueChart data={dashboardData.chartData} />
          <OrdersTable />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8 flex-1">
          <Routes>
            <Route path="/" element={<OverviewView />} />
            <Route path="/orders" element={<OrdersTable />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
