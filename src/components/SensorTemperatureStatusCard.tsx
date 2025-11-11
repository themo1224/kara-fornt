import React, { useMemo, useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

// Sensor type
type Sensor = {
  id: string | number;
  name: string;
  location?: string;
  status: "online" | "offline";
  lastReading: number;
  min?: number;
  max?: number;
  battery?: number; // %
  lastSeen?: string; // ISO timestamp
  readings?: { t: string; v: number }[]; // small timeseries for sparkline
  alert?: boolean; // true if value out of range or other alert
};

export default function SensorTemperatureStatusCard({
  title = "وضعیت سنسورهای دما",
  data,
  safeRange = { min: 18, max: 26 }, // default safe temp range (°C)
}: {
  title?: string;
  data?: Sensor[];
  safeRange?: { min: number; max: number };
}) {
  // sample data fallback
  const sample = useMemo<Sensor[]>(
    () =>
      Array.from({ length: 8 }).map((_, i) => {
        const base = 19 + Math.sin(i) * 2 + (i % 2 ? 0.4 : -0.6);
        const readings = Array.from({ length: 12 }).map((__, j) => ({
          t: new Date(Date.now() - (11 - j) * 1000 * 60 * 5).toISOString(),
          v: +(base + Math.sin(j / 2) * 0.6 + (Math.random() - 0.5) * 0.4).toFixed(2),
        }));
        const last = readings[readings.length - 1].v;
        const min = Math.min(...readings.map((r) => r.v));
        const max = Math.max(...readings.map((r) => r.v));
        return {
          id: i + 1,
          name: `سنسور ${i + 1}`,
          location: `بخش ${((i % 3) + 1)}`,
          status: i % 4 === 0 ? "offline" : "online",
          lastReading: last,
          min,
          max,
          battery: Math.round(40 + Math.random() * 50),
          lastSeen: new Date(Date.now() - Math.random() * 1000 * 60 * 60).toISOString(),
          readings,
          alert: last < 18 || last > 26 || i % 7 === 0,
        } as Sensor;
      }),
    []
  );

  const sensors = data ?? sample;

  // local UI state
  const [filter, setFilter] = useState<"all" | "online" | "offline" | "alerts">("all");
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState<"lastReading" | "lastSeen" | "name">("lastReading");
  const [desc, setDesc] = useState(true);

  const filtered = useMemo(() => {
    let list = sensors.slice();

    // filter
    if (filter === "online") list = list.filter((s) => s.status === "online");
    if (filter === "offline") list = list.filter((s) => s.status === "offline");
    if (filter === "alerts") list = list.filter((s) => s.alert === true);

    // search
    if (q.trim()) {
      const qq = q.trim().toLowerCase();
      list = list.filter((s) => (s.name + " " + (s.location ?? "")).toLowerCase().includes(qq));
    }

    // sort
    list.sort((a, b) => {
      let v = 0;
      if (sortBy === "lastReading") v = (a.lastReading ?? 0) - (b.lastReading ?? 0);
      if (sortBy === "lastSeen") v = (new Date(a.lastSeen ?? 0).getTime() - new Date(b.lastSeen ?? 0).getTime());
      if (sortBy === "name") v = (a.name ?? "").localeCompare(b.name);
      return desc ? -v : v;
    });

    return list;
  }, [sensors, filter, q, sortBy, desc]);

  // stats
  const stats = useMemo(() => {
    const total = sensors.length;
    const online = sensors.filter((s) => s.status === "online").length;
    const offline = total - online;
    const alerts = sensors.filter((s) => s.alert).length;
    return { total, online, offline, alerts };
  }, [sensors]);

  // export CSV helper
  const exportCSV = () => {
    const header = "id,name,location,status,lastReading,min,max,battery,lastSeen,alert\n";
    const rows = sensors
      .map(
        (s) =>
          `${s.id},"${s.name}","${s.location ?? ""}",${s.status},${s.lastReading},${s.min ?? ""},${s.max ?? ""},${s.battery ?? ""},"${s.lastSeen ?? ""}",${s.alert ? 1 : 0}`
      )
      .join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sensor_temperature_status.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div dir="rtl" className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-3">
          <h3 className="text-slate-800 font-semibold text-lg">{title}</h3>
          <img src="/assets/logo-sm.png" alt="logo" className="w-8 h-8" />
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500">آنلاین</div>
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 font-semibold">
              {stats.online}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500">آفلاین</div>
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-700 font-semibold">
              {stats.offline}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500">هشدارها</div>
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
              {stats.alerts}
            </div>
          </div>
          <div className="text-xs text-gray-500">مجموع</div>
          <div className="font-medium">{stats.total}</div>
        </div>
      </div>

      {/* toolbar */}
      <div className="px-4 py-3 border-b flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setFilter("all"); }}
            className={`px-3 py-1 rounded-full text-sm ${filter === "all" ? "bg-green-600 text-white" : "bg-gray-50 text-gray-700"}`}
          >
            همه
          </button>
          <button
            onClick={() => setFilter("online")}
            className={`px-3 py-1 rounded-full text-sm ${filter === "online" ? "bg-green-600 text-white" : "bg-gray-50 text-gray-700"}`}
          >
            آنلاین
          </button>
          <button
            onClick={() => setFilter("offline")}
            className={`px-3 py-1 rounded-full text-sm ${filter === "offline" ? "bg-green-600 text-white" : "bg-gray-50 text-gray-700"}`}
          >
            آفلاین
          </button>
          <button
            onClick={() => setFilter("alerts")}
            className={`px-3 py-1 rounded-full text-sm ${filter === "alerts" ? "bg-yellow-500 text-white" : "bg-gray-50 text-gray-700"}`}
          >
            هشدارها
          </button>
        </div>

        <div className="flex items-center gap-2 mr-auto">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="جستجو سنسور یا مکان..."
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none"
          />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm">
            <option value="lastReading">مرتب‌سازی بر اساس: آخرین خوانش</option>
            <option value="lastSeen">مرتب‌سازی بر اساس: آخرین مشاهده</option>
            <option value="name">مرتب‌سازی بر اساس: نام</option>
          </select>
          <button onClick={() => setDesc((s) => !s)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm">
            {desc ? "نزولی" : "صعودی"}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => exportCSV()} className="text-sm px-3 py-1 bg-green-600 text-white rounded-md shadow">
            گزارش‌گیری
          </button>
          <button onClick={() => window.location.reload()} className="text-sm px-3 py-1 bg-gray-50 rounded-md border">
            تازه‌سازی
          </button>
        </div>
      </div>

      {/* list */}
      <div className="px-4 py-3" style={{ maxHeight: 420, overflowY: "auto" }}>
        <div className="space-y-3">
          {filtered.map((s) => {
            const isAlert = s.alert || s.lastReading < safeRange.min || s.lastReading > safeRange.max;
            return (
              <div key={s.id} className={`flex items-center justify-between gap-4 p-3 rounded-lg border ${isAlert ? "border-yellow-200 bg-yellow-50" : "border-gray-50"} hover:shadow-sm`}>
                {/* left: sparkline + name/location */}
                <div className="flex items-center gap-3">
                  <div style={{ width: 120, height: 44 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={(s.readings ?? []).map((r) => ({ x: r.t, y: r.v }))}>
                        <Line
                          type="monotone"
                          dataKey="y"
                          stroke={s.status === "online" ? (isAlert ? "#b45309" : "#10B981") : "#ef4444"}
                          dot={false}
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="text-right">
                    <div className="font-medium text-sm">{s.name}</div>
                    <div className="text-xs text-gray-500">{s.location ?? "—"}</div>
                  </div>
                </div>

                {/* middle stats */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-xs text-gray-500">آخرین خوانش</div>
                    <div className={`font-semibold ${isAlert ? "text-yellow-800" : "text-gray-800"}`}>{s.lastReading.toFixed(1)} °C</div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-gray-500">حداقل / حداکثر</div>
                    <div className="font-medium">{(s.min ?? 0).toFixed(1)}° / {(s.max ?? 0).toFixed(1)}°</div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-gray-500">باتری</div>
                    <div className="font-medium">{s.battery ?? "—"}%</div>
                  </div>
                </div>

                {/* right: status chip & last seen */}
                <div className="flex flex-col items-end gap-2">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${s.status === "online" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                    <span className={`w-2 h-2 rounded-full ${s.status === "online" ? "bg-green-600" : "bg-red-600"}`} />
                    {s.status === "online" ? "آنلاین" : "آفلاین"}
                  </div>
                  <div className="text-xs text-gray-400">{s.lastSeen ? new Date(s.lastSeen).toLocaleString() : "—"}</div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <div className="text-center text-sm text-gray-500 py-6">موردی یافت نشد.</div>}
        </div>
      </div>

      <div className="px-4 py-3 border-t flex items-center justify-between text-sm text-gray-500">
        <div>دامنه امن: {safeRange.min}° — {safeRange.max}°</div>
        <div>به‌روز شده: اکنون</div>
      </div>
    </div>
  );
}
