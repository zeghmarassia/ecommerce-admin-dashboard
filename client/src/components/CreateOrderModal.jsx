import React, { useState } from "react";
import api from "../api";
import { X } from "lucide-react";

export default function CreateOrderModal({ isOpen, onClose, onOrderCreated }) {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    product: "",
    amount: "",
    status: "Pending",
  });
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

      api.post("/api/orders", formData)
      .then(() => {
        setSubmitting(false);
        onOrderCreated();
        onClose();
        setFormData({
          customerName: "",
          email: "",
          product: "",
          amount: "",
          status: "Pending",
        });
      })
      .catch((err) => {
        console.error("Error creating order:", err);
        setSubmitting(false);
      });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl relative">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <h3 className="text-lg font-bold text-slate-900">Create New Order</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Customer Name
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Product
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
              value={formData.product}
              onChange={(e) =>
                setFormData({ ...formData, product: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              required
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Initial Status
            </label>
            <select
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Create Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
