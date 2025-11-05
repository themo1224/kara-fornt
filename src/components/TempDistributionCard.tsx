import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

type Bucket = {
  label: string; // e.g., "18-20°C" or "سنسور 1"
  count: number;
  avg?: number;
};

export default function TempDistributionCard({
  data,
  title = "توزیع دمای سالن",
}: {
  data: Bucket[];
  title?: string;
}) {
  const total = data.reduce((s, d) => s + d.count, 0) || 1;
  const min = Math.min(...data.map((d) => d.count));
  const max = Math.max(...data.map((d) => d.count));

  return (
    <div dir="rtl" className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
      <div className="flex items-center gap-y-4 gap-x-1.5">
          <img src="https://kara.farm/app/assets/images/logo-sm.png" alt="logo" className="w-10 h-10 drop-shadow-sm bg-green-800 rounded-3xl  " />
          <h6 className="text-slate-800 font-bold  ">{title}</h6>
        </div>
        <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{`مجموع داده: ${total}`}</div>
      </div>

      <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Left summary */}
        <div className="md:col-span-1 bg-gradient-to-b from-gray-50 to-white rounded-xl p-5 flex flex-col gap-4 shadow-sm">
          <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">خلاصه</div>
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">کمترین Count</div>
            <div className="font-semibold text-gray-800">{min}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">بیشترین Count</div>
            <div className="font-semibold text-gray-800">{max}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">میانگین (تعداد)</div>
            <div className="font-semibold text-gray-800">{(total / data.length).toFixed(1)}</div>
          </div>
        </div>

        {/* Chart */}
        <div className="md:col-span-2" style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={data} margin={{ top: 12, right: 16, left: 16, bottom: 12 }}>
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
              <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 12 }} />
              <YAxis dataKey="label" type="category" width={120} tick={{ fill: "#1f2937", fontSize: 13 }} />
              <Tooltip
                formatter={(v: number) => v}
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar dataKey="count" barSize={20} radius={[8, 8, 8, 8]}>
                {data.map((entry, index) => {
                  // color scale
                  const pct = entry.count / (total || 1);
                  const green = Math.round(120 + pct * 80);
                  const blue = Math.round(200 - pct * 80);
                  const color = `rgb(${30}, ${green}, ${blue})`;
                  return <Cell key={index} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
