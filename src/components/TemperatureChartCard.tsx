import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  Area,
} from "recharts";

type DataPoint = {
  timestamp: string; // ISO or friendly string
  inside: number;
  outside: number;
};

export default function TemperatureChartCard({
  data,
  title = "نمودار تغییرات دما",
}: {
  data: DataPoint[];
  title?: string;
}) {
  const [range, setRange] = useState<"24h" | "7d" | "30d">("24h");

  // Filter data by range (assuming timestamp is ISO)
  const filtered = useMemo(() => {
    if (!data) return [];
    const now = new Date();
    let cutoff = new Date();
    if (range === "24h") cutoff.setDate(now.getDate() - 1);
    if (range === "7d") cutoff.setDate(now.getDate() - 7);
    if (range === "30d") cutoff.setDate(now.getDate() - 30);
    return data.filter((d) => new Date(d.timestamp) >= cutoff);
  }, [data, range]);

  // simple CSV export
  const exportCSV = () => {
    const header = ["timestamp,inside,outside"];
    const rows = (filtered.length ? filtered : data).map((r) =>
      [r.timestamp, r.inside, r.outside].join(",")
    );
    const csv = header.concat(rows).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "_")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      dir="rtl"
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-y-4 gap-x-1.5">
          <img src="https://kara.farm/app/assets/images/logo-sm.png" alt="logo" className="w-10 h-10 drop-shadow-sm bg-green-800 rounded-3xl  " />
          <h6 className="text-slate-800 font-bold  ">{title}</h6>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 shadow-inner">
            {(["24h", "7d", "30d"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out ${
                  range === r
                    ? "bg-emerald-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {r === "24h" ? "۲۴ ساعت" : r === "7d" ? "۷ روز" : "۳۰ روز"}
              </button>
            ))}
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
            title="Export CSV"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V7a2 2 0 012-2h5l2 2h5a2 2 0 012 2v8a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-sm font-semibold">گزارش‌گیری</span>
          </button>
        </div>
      </div>

      {/* Chart area */}
      <div className="px-6 py-6" style={{ height: 360 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filtered.length ? filtered : data}
            margin={{ top: 12, right: 16, left: 16, bottom: 12 }}
          >
            <defs>
              <linearGradient id="gradInside" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="gradOutside" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(t) => {
                const d = new Date(t);
                return range === "24h"
                  ? d.getHours() +
                      ":" +
                      d.getMinutes().toString().padStart(2, "0")
                  : d.toLocaleDateString("fa-IR");
              }}
              tick={{ fontSize: 13, fill: "#6b7280" }}
              minTickGap={24}
            />
            <YAxis
              tick={{ fontSize: 13, fill: "#6b7280" }}
              unit="°C"
              domain={["auto", "auto"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
              labelFormatter={(label) => new Date(label).toLocaleString("fa-IR")}
              formatter={(value: number, name: string) => [
                `${value} °C`,
                name === "inside" ? "داخل" : "بیرون",
              ]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={40}
              wrapperStyle={{ paddingBottom: 12 }}
            />
            <Area
              type="monotone"
              dataKey="inside"
              stroke="#10B981"
              fill="url(#gradInside)"
              fillOpacity={1}
              name="داخل"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="outside"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={false}
              name="بیرون"
            />
            <Brush
              dataKey="timestamp"
              height={36}
              stroke="#9ca3af"
              travellerWidth={10}
              fill="rgba(229,231,235,0.4)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
