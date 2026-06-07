import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, AreaChart, Area,
} from "recharts";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const API = `${BASE}/api`;

type Order = {
  id: number;
  name: string;
  address: string;
  daytimePhone: string;
  ext?: string;
  mobile: string;
  email?: string;
  bundle: string;
  paymentMethod: string;
  shippingMethod: string;
  notes?: string;
  status: "new" | "confirmed" | "delivered" | "cancelled";
  createdAt: string;
};

type Lead = {
  id: number;
  name: string;
  phone: string;
  interest: string;
  message?: string;
  createdAt: string;
};

type ContactEnquiry = {
  id: number;
  name: string;
  email?: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
};

type Subscription = {
  id: number;
  name: string;
  phone: string;
  address: string;
  bundle: string;
  frequency: "weekly" | "biweekly" | "monthly";
  deliveryDay: string;
  notes?: string;
  status: "active" | "paused" | "cancelled";
  createdAt: string;
};

type Toast = {
  id: number;
  type: "order" | "lead" | "contact" | "subscription";
  title: string;
  body: string;
};

const STATUS_COLORS: Record<Order["status"], string> = {
  new:       "bg-blue-100 text-blue-700",
  confirmed: "bg-yellow-100 text-yellow-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const CONTACT_STATUS_COLORS: Record<string, string> = {
  new:     "bg-blue-100 text-blue-700",
  replied: "bg-yellow-100 text-yellow-700",
  closed:  "bg-slate-100 text-slate-600",
};

const SUB_STATUS_COLORS: Record<Subscription["status"], string> = {
  active:    "bg-green-100 text-green-700",
  paused:    "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
};

const TOAST_COLORS = {
  order:        { bg: "bg-blue-600",   icon: "📦" },
  lead:         { bg: "bg-purple-600", icon: "👤" },
  contact:      { bg: "bg-teal-600",   icon: "✉️" },
  subscription: { bg: "bg-green-600",  icon: "🔄" },
};

let toastSeq = 0;

const CHART_COLORS = [
  "#4f46e5", "#7c3aed", "#2563eb", "#0891b2",
  "#059669", "#d97706", "#dc2626",
];

type ChartTooltipProps = { payload?: { name: string; value: number }[]; active?: boolean };

function TopicBreakdownChart({ leads }: { leads: Lead[] }) {
  const data = useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach((l) => {
      counts[l.interest] = (counts[l.interest] ?? 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [leads]);

  if (data.length === 0) return null;

  const CustomTooltip = ({ active, payload }: ChartTooltipProps) => {
    if (!active || !payload?.length) return null;
    const { name, value } = payload[0];
    return (
      <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-lg text-sm">
        <span className="font-semibold text-slate-800">{name}</span>
        <span className="ml-2 text-slate-500">
          {value} {Number(value) === 1 ? "enquiry" : "enquiries"}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
      <p className="text-sm font-bold text-slate-800 mb-0.5">Topic Breakdown</p>
      <p className="text-xs text-slate-400 mb-5">Enquiries grouped by selected interest</p>
      <div style={{ width: "100%", minWidth: 0 }}>
      <ResponsiveContainer width="99%" height={data.length * 46 + 16}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 24, bottom: 0, left: 160 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
          <XAxis
            type="number"
            allowDecimals={false}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 12, fill: "#475569", fontWeight: 500 }}
            tickLine={false}
            axisLine={false}
            width={155}
          />
          <Tooltip cursor={{ fill: "#f8fafc" }} content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={28}>
            {data.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}

function VolumeChart({
  items,
  noun = "enquiry",
  color = "#4f46e5",
  gradientId = "volGradient",
}: {
  items: { createdAt: string }[];
  noun?: string;
  color?: string;
  gradientId?: string;
}) {
  const data = useMemo(() => {
    const toLocalISO = (d: Date) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days: { date: string; label: string; count: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      days.push({
        date: toLocalISO(d),
        label: d.toLocaleDateString("en-PK", { month: "short", day: "numeric" }),
        count: 0,
      });
    }
    items.forEach((item) => {
      const iso = toLocalISO(new Date(item.createdAt));
      const slot = days.find((d) => d.date === iso);
      if (slot) slot.count++;
    });
    return days;
  }, [items]);

  const total = data.reduce((s, d) => s + d.count, 0);
  if (total === 0) return null;

  const peak = Math.max(...data.map((d) => d.count));

  type VTooltipProps = { active?: boolean; payload?: { value: number }[]; label?: string };
  const VTooltip = ({ active, payload, label }: VTooltipProps) => {
    if (!active || !payload?.length) return null;
    const v = payload[0].value;
    return (
      <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-lg text-sm">
        <span className="font-semibold text-slate-800">{label}</span>
        <span className="ml-2 text-slate-500">
          {v} {v === 1 ? noun : noun + "s"}
        </span>
      </div>
    );
  };

  const ticks = data
    .filter((_, i) => i === 0 || i === 7 || i === 14 || i === 21 || i === 29)
    .map((d) => d.label);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-sm font-bold text-slate-800 mb-0.5">Volume Trend</p>
          <p className="text-xs text-slate-400">Daily {noun}s over the last 30 days</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black" style={{ color }}>{total}</p>
          <p className="text-xs text-slate-400">total · peak {peak}/day</p>
        </div>
      </div>
      <div style={{ width: "100%", minWidth: 0 }}>
      <ResponsiveContainer width="99%" height={140}>
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.18} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="label"
            ticks={ticks}
            tick={{ fontSize: 10, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 10, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<VTooltip />} cursor={{ stroke: "#e0e7ff", strokeWidth: 1 }} />
          <Area
            type="monotone"
            dataKey="count"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{ r: 4, fill: color, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}

function RefreshIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

function LiveDot({ connected }: { connected: boolean }) {
  return (
    <span className="flex items-center gap-1.5 text-xs font-semibold">
      <span className={`w-2 h-2 rounded-full ${connected ? "bg-green-400 animate-pulse" : "bg-slate-300"}`} />
      {connected ? "Live" : "Connecting…"}
    </span>
  );
}

function ToastStack({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: number) => void }) {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 w-80">
      {toasts.map((t) => {
        const { bg, icon } = TOAST_COLORS[t.type];
        return (
          <div
            key={t.id}
            className={`${bg} text-white rounded-2xl shadow-2xl p-4 flex items-start gap-3 animate-in slide-in-from-right-4 duration-300`}
          >
            <span className="text-xl shrink-0 mt-0.5">{icon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm leading-tight">{t.title}</p>
              <p className="text-xs text-white/80 mt-0.5 truncate">{t.body}</p>
            </div>
            <button
              onClick={() => onDismiss(t.id)}
              className="shrink-0 text-white/60 hover:text-white text-lg leading-none"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default function Admin() {
  const [tab, setTab] = useState<"orders" | "enquiries" | "contact" | "subscriptions">("orders");

  const [orders,  setOrders]  = useState<Order[]>([]);
  const [ordersLoading,  setOL] = useState(true);
  const [ordersError,    setOE] = useState("");

  const [leads,   setLeads]   = useState<Lead[]>([]);
  const [leadsLoading,   setLL] = useState(true);
  const [leadsError,     setLE] = useState("");

  const [contacts, setContacts] = useState<ContactEnquiry[]>([]);
  const [contactsLoading, setCL] = useState(true);
  const [contactsError,   setCE] = useState("");

  const [subs,    setSubs]    = useState<Subscription[]>([]);
  const [subsLoading, setSL]  = useState(true);
  const [subsError,   setSE]  = useState("");

  const [toasts,    setToasts]    = useState<Toast[]>([]);
  const [connected, setConnected] = useState(false);
  const [newCounts, setNewCounts] = useState({ orders: 0, leads: 0, contact: 0, subscriptions: 0 });

  const esRef = useRef<EventSource | null>(null);

  const pushToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = ++toastSeq;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 6000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const fetchOrders = useCallback(async () => {
    setOL(true); setOE("");
    try {
      const res = await fetch(`${API}/orders`);
      if (!res.ok) throw new Error();
      setOrders(await res.json());
    } catch {
      setOE("Could not load orders. Make sure the API server is running.");
    } finally { setOL(false); }
  }, []);

  const fetchLeads = useCallback(async () => {
    setLL(true); setLE("");
    try {
      const res = await fetch(`${API}/leads`);
      if (!res.ok) throw new Error();
      setLeads(await res.json());
    } catch {
      setLE("Could not load enquiries. Make sure the API server is running.");
    } finally { setLL(false); }
  }, []);

  const fetchContacts = useCallback(async () => {
    setCL(true); setCE("");
    try {
      const res = await fetch(`${API}/contact`);
      if (!res.ok) throw new Error();
      setContacts(await res.json());
    } catch {
      setCE("Could not load contact enquiries. Make sure the API server is running.");
    } finally { setCL(false); }
  }, []);

  const fetchSubscriptions = useCallback(async () => {
    setSL(true); setSE("");
    try {
      const res = await fetch(`${API}/subscriptions`);
      if (!res.ok) throw new Error();
      setSubs(await res.json());
    } catch {
      setSE("Could not load subscriptions. Make sure the API server is running.");
    } finally { setSL(false); }
  }, []);

  const updateStatus = async (id: number, status: Order["status"]) => {
    await fetch(`${API}/orders/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const updateContactStatus = async (id: number, status: string) => {
    await fetch(`${API}/contact/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  const updateSubStatus = async (id: number, status: Subscription["status"]) => {
    await fetch(`${API}/subscriptions/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setSubs((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  useEffect(() => {
    fetchOrders();
    fetchLeads();
    fetchContacts();
    fetchSubscriptions();
  }, [fetchOrders, fetchLeads, fetchContacts, fetchSubscriptions]);

  useEffect(() => {
    let retryTimeout: ReturnType<typeof setTimeout>;

    const connect = () => {
      const es = new EventSource(`${API}/events`);
      esRef.current = es;

      es.onopen = () => setConnected(true);

      es.addEventListener("new_order", (e) => {
        const order = JSON.parse(e.data) as Order;
        setOrders((prev) => {
          const exists = prev.some((o) => o.id === order.id);
          return exists ? prev : [order, ...prev];
        });
        setNewCounts((c) => ({ ...c, orders: c.orders + 1 }));
        pushToast({
          type: "order",
          title: `New Order — ${order.name}`,
          body: `${order.bundle} · ${order.mobile}`,
        });
      });

      es.addEventListener("new_lead", (e) => {
        const lead = JSON.parse(e.data) as Lead;
        setLeads((prev) => {
          const exists = prev.some((l) => l.id === lead.id);
          return exists ? prev : [lead, ...prev];
        });
        setNewCounts((c) => ({ ...c, leads: c.leads + 1 }));
        pushToast({
          type: "lead",
          title: `New Enquiry — ${lead.name}`,
          body: `${lead.interest} · ${lead.phone}`,
        });
      });

      es.addEventListener("new_contact", (e) => {
        const contact = JSON.parse(e.data) as ContactEnquiry;
        setContacts((prev) => {
          const exists = prev.some((c) => c.id === contact.id);
          return exists ? prev : [contact, ...prev];
        });
        setNewCounts((c) => ({ ...c, contact: c.contact + 1 }));
        pushToast({
          type: "contact",
          title: `New Message — ${contact.name}`,
          body: `${contact.subject} · ${contact.phone}`,
        });
      });

      es.addEventListener("new_subscription", (e) => {
        const sub = JSON.parse(e.data) as Subscription;
        setSubs((prev) => {
          const exists = prev.some((s) => s.id === sub.id);
          return exists ? prev : [sub, ...prev];
        });
        setNewCounts((c) => ({ ...c, subscriptions: c.subscriptions + 1 }));
        pushToast({
          type: "subscription",
          title: `New Subscription — ${sub.name}`,
          body: `${sub.bundle} · ${sub.frequency} · ${sub.phone}`,
        });
      });

      es.onerror = () => {
        setConnected(false);
        es.close();
        retryTimeout = setTimeout(connect, 4000);
      };
    };

    connect();

    return () => {
      clearTimeout(retryTimeout);
      esRef.current?.close();
    };
  }, [pushToast]);

  const handleTabClick = (key: "orders" | "enquiries" | "contact" | "subscriptions") => {
    setTab(key);
    const countKey = key === "enquiries" ? "leads" : key;
    setNewCounts((c) => ({ ...c, [countKey]: 0 }));
  };

  const handleRefresh = () => {
    if (tab === "orders") fetchOrders();
    else if (tab === "enquiries") fetchLeads();
    else if (tab === "contact") fetchContacts();
    else fetchSubscriptions();
  };

  const tabs = [
    { key: "orders"        as const, label: "Orders",        count: orders.length,   badge: newCounts.orders        },
    { key: "enquiries"     as const, label: "Enquiries",     count: leads.length,    badge: newCounts.leads         },
    { key: "contact"       as const, label: "Contact Form",  count: contacts.length, badge: newCounts.contact       },
    { key: "subscriptions" as const, label: "Subscriptions", count: subs.length,     badge: newCounts.subscriptions },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <ToastStack toasts={toasts} onDismiss={dismissToast} />

      {/* ── Header ── */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Culligan Admin</h1>
            <p className="text-xs text-slate-500">Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LiveDot connected={connected} />
          <button
            onClick={handleRefresh}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1.5"
          >
            <RefreshIcon />
            Refresh
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1 w-fit mb-8 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => handleTabClick(t.key)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 relative ${
                tab === t.key
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {t.label}
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                tab === t.key ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
              }`}>
                {t.count}
              </span>
              {t.badge > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow">
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Orders tab ── */}
        {tab === "orders" && (
          <>
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <div className="bg-white rounded-xl border border-slate-200 px-5 py-4 flex-1 min-w-[100px]">
                <p className="text-sm text-slate-500">Total Orders</p>
                <p className="text-3xl font-black text-slate-900">{orders.length}</p>
              </div>
              {(["new","confirmed","delivered","cancelled"] as const).map((s) => (
                <div key={s} className="bg-white rounded-xl border border-slate-200 px-5 py-4 flex-1 min-w-[100px]">
                  <p className="text-sm text-slate-500 capitalize">{s}</p>
                  <p className="text-3xl font-black text-slate-900">{orders.filter(o => o.status === s).length}</p>
                </div>
              ))}
            </div>

            <VolumeChart items={orders} noun="order" color="#2563eb" gradientId="orderVol" />

            {ordersLoading && <div className="text-center py-20 text-slate-400">Loading orders...</div>}
            {ordersError   && <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 text-sm">{ordersError}</div>}
            {!ordersLoading && !ordersError && orders.length === 0 && (
              <div className="text-center py-20 text-slate-400">No orders yet. They'll appear here once customers submit the form.</div>
            )}

            {orders.length > 0 && (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-bold text-slate-900">{order.name}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status]}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-0.5">📦 {order.bundle}</p>
                      <p className="text-sm text-slate-600 mb-0.5">
                        📞 {order.daytimePhone}{order.ext ? ` ext. ${order.ext}` : ""}
                        {order.mobile && order.mobile !== order.daytimePhone ? ` · 📱 ${order.mobile}` : ""}
                      </p>
                      {order.email && <p className="text-sm text-slate-600 mb-0.5">✉️ {order.email}</p>}
                      <p className="text-sm text-slate-500 mb-0.5 truncate">📍 {order.address}</p>
                      <p className="text-xs text-slate-500 mb-0.5">🚚 {order.shippingMethod} · 💳 {order.paymentMethod}</p>
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
                      <a
                        href={`https://wa.me/${order.mobile.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${order.name}, your Culligan water order has been received 🚿\n\n📦 ${order.bundle}\n\nWe'll confirm your delivery shortly. Thank you!`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors text-center"
                      >
                        💬 WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── Enquiries tab ── */}
        {tab === "enquiries" && (
          <>
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white rounded-xl border border-slate-200 px-5 py-4 flex-1">
                <p className="text-sm text-slate-500">Total Enquiries</p>
                <p className="text-3xl font-black text-slate-900">{leads.length}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 px-5 py-4 flex-1">
                <p className="text-sm text-slate-500">This Week</p>
                <p className="text-3xl font-black text-slate-900">
                  {leads.filter(l => {
                    const d = new Date(l.createdAt);
                    const now = new Date();
                    return (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24) <= 7;
                  }).length}
                </p>
              </div>
            </div>

            <VolumeChart items={leads} noun="enquiry" color="#4f46e5" gradientId="enquiryVol" />
            <TopicBreakdownChart leads={leads} />

            {leadsLoading && <div className="text-center py-20 text-slate-400">Loading enquiries...</div>}
            {leadsError   && <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 text-sm">{leadsError}</div>}
            {!leadsLoading && !leadsError && leads.length === 0 && (
              <div className="text-center py-20 text-slate-400">No enquiries yet. They'll appear here once customers submit the form.</div>
            )}

            {leads.length > 0 && (
              <div className="space-y-3">
                {leads.map((lead) => (
                  <div key={lead.id} className="bg-white rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-slate-900">{lead.name}</span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                            {lead.interest}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-0.5">📞 {lead.phone}</p>
                        {lead.message && (
                          <p className="text-sm text-slate-500 mt-1 bg-slate-50 rounded-lg px-3 py-2 italic">
                            "{lead.message}"
                          </p>
                        )}
                        <p className="text-xs text-slate-400 mt-2">{new Date(lead.createdAt).toLocaleString("en-PK", { dateStyle: "medium", timeStyle: "short" })}</p>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <a
                          href={`tel:${lead.phone}`}
                          className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors text-center"
                        >
                          📞 Call
                        </a>
                        <a
                          href={`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${lead.name}, thank you for your interest in Culligan water (${lead.interest}). How can we help you?`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors text-center"
                        >
                          💬 WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── Contact Form tab ── */}
        {tab === "contact" && (
          <>
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <div className="bg-white rounded-xl border border-slate-200 px-5 py-4 flex-1 min-w-[120px]">
                <p className="text-sm text-slate-500">Total</p>
                <p className="text-3xl font-black text-slate-900">{contacts.length}</p>
              </div>
              {(["new", "replied", "closed"] as const).map((s) => (
                <div key={s} className="bg-white rounded-xl border border-slate-200 px-5 py-4 flex-1 min-w-[100px]">
                  <p className="text-sm text-slate-500 capitalize">{s}</p>
                  <p className="text-3xl font-black text-slate-900">{contacts.filter(c => c.status === s).length}</p>
                </div>
              ))}
            </div>

            {contactsLoading && <div className="text-center py-20 text-slate-400">Loading contact enquiries...</div>}
            {contactsError   && <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 text-sm">{contactsError}</div>}
            {!contactsLoading && !contactsError && contacts.length === 0 && (
              <div className="text-center py-20 text-slate-400">No contact form submissions yet.</div>
            )}

            {contacts.length > 0 && (
              <div className="space-y-3">
                {contacts.map((c) => (
                  <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-bold text-slate-900">{c.name}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CONTACT_STATUS_COLORS[c.status] ?? "bg-slate-100 text-slate-600"}`}>
                          {c.status}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">
                          {c.subject}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-0.5">📞 {c.phone}</p>
                      {c.email && <p className="text-sm text-slate-600 mb-0.5">✉️ {c.email}</p>}
                      <p className="text-sm text-slate-500 mt-1 bg-slate-50 rounded-lg px-3 py-2 italic">"{c.message}"</p>
                      <p className="text-xs text-slate-400 mt-2">{new Date(c.createdAt).toLocaleString("en-PK", { dateStyle: "medium", timeStyle: "short" })}</p>
                    </div>
                    <div className="flex flex-col gap-1.5 min-w-[130px]">
                      {(["new", "replied", "closed"] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => updateContactStatus(c.id, s)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors capitalize ${
                            c.status === s
                              ? (CONTACT_STATUS_COLORS[s] ?? "bg-slate-100 text-slate-600") + " ring-1 ring-inset ring-current"
                              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                          }`}
                        >
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                      <a
                        href={`tel:${c.phone}`}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors text-center"
                      >
                        📞 Call
                      </a>
                      <a
                        href={`https://wa.me/${c.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${c.name}, thanks for reaching out to Culligan! Regarding your message about "${c.subject}" — how can we help?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors text-center"
                      >
                        💬 WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── Subscriptions tab ── */}
        {tab === "subscriptions" && (
          <>
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <div className="bg-white rounded-xl border border-slate-200 px-5 py-4 flex-1 min-w-[100px]">
                <p className="text-sm text-slate-500">Total</p>
                <p className="text-3xl font-black text-slate-900">{subs.length}</p>
              </div>
              {(["active","paused","cancelled"] as const).map((s) => (
                <div key={s} className="bg-white rounded-xl border border-slate-200 px-5 py-4 flex-1 min-w-[100px]">
                  <p className="text-sm text-slate-500 capitalize">{s}</p>
                  <p className="text-3xl font-black text-slate-900">{subs.filter(sub => sub.status === s).length}</p>
                </div>
              ))}
            </div>

            {subsLoading && <div className="text-center py-20 text-slate-400">Loading subscriptions...</div>}
            {subsError   && <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 text-sm">{subsError}</div>}
            {!subsLoading && !subsError && subs.length === 0 && (
              <div className="text-center py-20 text-slate-400">No subscriptions yet. They'll appear here when customers sign up.</div>
            )}

            {subs.length > 0 && (
              <div className="space-y-3">
                {subs.map((sub) => (
                  <div key={sub.id} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-bold text-slate-900">{sub.name}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${SUB_STATUS_COLORS[sub.status]}`}>
                          {sub.status}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 capitalize">
                          🔄 {sub.frequency}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-0.5">📦 {sub.bundle}</p>
                      <p className="text-sm text-slate-600 mb-0.5">📅 Every {sub.deliveryDay}</p>
                      <p className="text-sm text-slate-600 mb-0.5">📞 {sub.phone}</p>
                      <p className="text-sm text-slate-500 mb-0.5 truncate">📍 {sub.address}</p>
                      {sub.notes && <p className="text-xs text-slate-400 italic">"{sub.notes}"</p>}
                      <p className="text-xs text-slate-400 mt-1">{new Date(sub.createdAt).toLocaleString("en-PK", { dateStyle: "medium", timeStyle: "short" })}</p>
                    </div>
                    <div className="flex flex-col gap-1.5 min-w-[130px]">
                      {(["active","paused","cancelled"] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => updateSubStatus(sub.id, s)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors capitalize ${
                            sub.status === s
                              ? SUB_STATUS_COLORS[s] + " ring-1 ring-inset ring-current"
                              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                          }`}
                        >
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                      <a
                        href={`https://wa.me/${sub.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${sub.name}, your Culligan ${sub.frequency} subscription for ${sub.bundle} is confirmed! We'll deliver every ${sub.deliveryDay}. Thank you 🚿`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors text-center"
                      >
                        💬 WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </main>
    </div>
  );
}
