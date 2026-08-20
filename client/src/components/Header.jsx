import React from 'react';
import { Search, User } from 'lucide-react';
import NotificationsPopover from './NotificationsPopover';

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Dynamic Notifications Component */}
        <NotificationsPopover />

        <div className="h-8 w-px bg-slate-200"></div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold">
            <User size={20} />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-slate-800">Admin Store</p>
            <p className="text-xs text-slate-500">store@admin.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}