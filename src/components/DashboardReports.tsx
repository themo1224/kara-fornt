// DashboardReports.tsx
import React from "react";
import TemperatureChartCard from "./TemperatureChartCard";
import TempDistributionCard from "./TempDistributionCard";

type DataPoint = { timestamp: string; inside: number; outside: number };
type Bucket = { label: string; count: number; avg?: number };

export default function DashboardReports({
  trendData,
  distData,
  loading = false,
}: {
  trendData?: DataPoint[] | null;
  distData?: Bucket[] | null;
  loading?: boolean;
}) {
  // fallback sample data (keeps component usable during dev)
  const sampleTrend = Array.from({ length: 48 }).map((_, i) => {
    const t = new Date();
    t.setHours(t.getHours() - (47 - i));
    const inside = 20 + Math.sin(i / 5) * 3 + Math.random() * 0.6;
    const outside = 18 + Math.cos(i / 7) * 2 + Math.random() * 0.8;
    return { timestamp: t.toISOString(), inside: +inside.toFixed(2), outside: +outside.toFixed(2) };
  });

  const sampleDist = [
    { label: "سنسور 1", count: 5 },
    { label: "سنسور 2", count: 3 },
    { label: "سنسور 3", count: 4 },
    { label: "سنسور 4", count: 1 },
    { label: "سنسور 5", count: 2 },
    { label: "سنسور 6", count: 6 },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7">
          {/* pass either real data or fallback */}
          <TemperatureChartCard data={trendData ?? sampleTrend} />
          {loading && <div className="text-xs text-gray-500 mt-2">در حال بارگذاری نمودار...</div>}
        </div>

        <div className="md:col-span-5">
          <TempDistributionCard data={distData ?? sampleDist} />
          {loading && <div className="text-xs text-gray-500 mt-2">در حال بارگذاری توزیع...</div>}
        </div>
      </div>
    </div>
  );
}
