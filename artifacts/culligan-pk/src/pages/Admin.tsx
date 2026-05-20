import { useEffect, useState } from "react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const API = `${BASE}/api`;

type Order = {
  id: number;
  name: string;
  phone: string;
  address: string;
  bundle: string;
  notes?: string;
  status: "new" | "confirmed" | "delivered" | "cancelled";
  createdAt: string;
};

const STATUS_COLORS: Record<Order["status"], string> = {
  new: "bg-blue-100 text-blue-700",
  confirmed: "bg-yellow-100 text-yellow-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function Admin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API}/orders`);
      if (!res.ok) throw new Error("Failed to fetch");
      setOrders(await res.json());
    } catch {
      setError("Could not load orders. Make sure the API server is running.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: Order["status"]) => {
    await fetch(`${API}/orders/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  useEffect(() => { fetchOrders(); }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Culligan Orders</h1>
            <p className="text-xs text-slate-500">Admin Dashboard</p>
          </div>
        </div>
        <button
          onClick={fetchOrders}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 px-5 py-4 flex-1">
            <p className="text-sm text-slate-500">Total Orders</p>
            <p className="text-3xl font-black text-slate-900">{orders.length}</p>
          </div>
          {(["new","confirmed","delivered","cancelled"] as const).map((s) => (
            <div key={s} className="bg-white rounded-xl border border-slate-200 px-5 py-4 flex-1">
              <p className="text-sm text-slate-500 capitalize">{s}</p>
              <p className="text-3xl font-black text-slate-900">{orders.filter(o => o.status === s).length}</p>
            </div>
          ))}
        </div>

        {loading && (
          <div className="text-center py-20 text-slate-400">Loading orders...</div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 text-sm">{error}</div>
        )}
        {!loading && !error && orders.length === 0 && (
          <div className="text-center py-20 text-slate-400">No orders yet. Orders will appear here once customers submit the form.</div>
        )}

        {orders.length > 0 && (
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-900">{order.name}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-0.5">📦 {order.bundle}</p>
                  <p className="text-sm text-slate-600 mb-0.5">📞 {order.phone}</p>
                  <p className="text-sm text-slate-500 mb-0.5 truncate">📍 {order.address}</p>
                  {order.notes && <p className="text-xs text-slate-400 italic">"{order.notes}"</p>}
                  <p className="text-xs text-slate-400 mt-1">{new Date(order.createdAt).toLocaleString("en-PK", { dateStyle: "medium", timeStyle: "short" })}</p>
                </div>
                <div className="flex flex-col gap-1.5 min-w-[130px]">
                  {(["new","confirmed","delivered","cancelled"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(order.id, s)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                        order.status === s
                          ? STATUS_COLORS[s] + " ring-1 ring-inset ring-current"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
