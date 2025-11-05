// DashboardPage.tsx
import React, { useEffect, useState } from "react";
import DashboardReports from "../components/DashboardReports";
import DashboardTop from "../components/DashboardTop"; // your top row
// Types (keep in sync with components)
type DataPoint = { timestamp: string; inside: number; outside: number };
type Bucket = { label: string; count: number; avg?: number };

export default function DashboardPage() {
  const [trendData, setTrendData] = useState<DataPoint[] | null>(null);
  const [distData, setDistData] = useState<Bucket[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);

        // replace endpoints with your actual API
        const [trendRes, distRes] = await Promise.all([
          fetch("/api/temperature/trend").then((r) => {
            if (!r.ok) throw new Error("trend fetch failed");
            return r.json();
          }),
          fetch("/api/temperature/distribution").then((r) => {
            if (!r.ok) throw new Error("distribution fetch failed");
            return r.json();
          }),
        ]);

        if (!mounted) return;
        // assume API already returns arrays compatible with components
        setTrendData(trendRes);
        setDistData(distRes);
      } catch (e) {
        console.error(e);
        if (mounted) setError("خطا در دریافت داده‌ها. دوباره تلاش کنید.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* header/top */}
      <DashboardTop />

      {/* quick error / retry */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div className="p-3 bg-red-50 border border-red-100 text-red-700 rounded">
            {error}{" "}
            <button
              onClick={() => window.location.reload()}
              className="ml-3 text-sm text-red-600 underline"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      )}

      {/* reports */}
      <DashboardReports trendData={trendData ?? undefined} distData={distData ?? undefined} loading={loading} />
    </div>
  );
}
