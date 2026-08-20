import React, { useState, useEffect, useRef } from 'react';
import api from '../api';
import { Bell, Check, ShoppingBag, AlertTriangle, Info } from 'lucide-react';

export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const fetchNotifications = () => {
    api.get('/api/notifications')
      .then((res) => setNotifications(res.data))
      .catch((err) => console.error('Error fetching notifications:', err));
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Close popover on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id) => {
    api.patch(`/api/notifications/${id}/read`).then(() => fetchNotifications());
  };

  const markAllAsRead = () => {
    api.patch('/api/notifications/read-all').then(() => fetchNotifications());
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'order': return <ShoppingBag size={16} className="text-emerald-600" />;
      case 'warning': return <AlertTriangle size={16} className="text-amber-600" />;
      default: return <Info size={16} className="text-indigo-600" />;
    }
  };

  return (
    <div className="relative" ref={popoverRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-indigo-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-xs bg-indigo-50 text-indigo-600 font-semibold px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <Check size={14} /> Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">No notifications yet</div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => !n.read && markAsRead(n.id)}
                  className={`p-4 flex items-start gap-3 cursor-pointer transition-colors ${
                    !n.read ? 'bg-slate-50/80 hover:bg-slate-100/80' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="p-2 bg-slate-100 rounded-lg mt-0.5">{getTypeIcon(n.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-xs ${!n.read ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>
                        {n.title}
                      </p>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}