import React from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

export default function StatsCards({ stats }) {
  if (!stats) return null;

  const cardData = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      iconBg: 'bg-emerald-100 text-emerald-600',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      change: '+8.2%',
      isPositive: true,
      icon: ShoppingBag,
      iconBg: 'bg-indigo-100 text-indigo-600',
    },
    {
      title: 'Active Customers',
      value: stats.totalCustomers.toLocaleString(),
      change: '+4.1%',
      isPositive: true,
      icon: Users,
      iconBg: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Conversion Rate',
      value: stats.conversionRate,
      change: '-0.4%',
      isPositive: false,
      icon: TrendingUp,
      iconBg: 'bg-amber-100 text-amber-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardData.map((card, i) => {
        const Icon = card.icon;
        return (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">{card.title}</span>
              <div className={`p-2.5 rounded-xl ${card.iconBg}`}>
                <Icon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="text-2xl font-bold text-slate-900">{card.value}</h3>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  card.isPositive
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-rose-50 text-rose-600'
                }`}
              >
                {card.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}