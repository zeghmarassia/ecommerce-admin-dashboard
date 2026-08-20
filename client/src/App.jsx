import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function App() {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8 flex-1">
          <h1 className="text-2xl font-bold mb-2">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm">Welcome back! Here's what's happening today.</p>
          
          {/* Main Content Area placeholder */}
          <div className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-400">
            Metrics & Data Tables will be placed here in Step 3.
          </div>
        </main>
      </div>
    </div>
  );
}