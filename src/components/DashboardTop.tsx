import React, { useState } from "react";
/**
 * DashboardTop - RTL controls row to match your screenshot
 * - Breadcrumb on the *visual* left (we keep dir="rtl")
 * - Controls row with selects and pills on the right
 *
 * Ready to paste. Uses Tailwind utility classes.
 */
export default function DashboardTop() {
  const [farm, setFarm] = useState("مرغداری غنچه");
  const [hall, setHall] = useState("سالن 1");
  const [series, setSeries] = useState(1);
  const [week, setWeek] = useState(1);
  const [day, setDay] = useState(1);

  return (
    <div dir="rtl" className="w-full px-4 py-6">
      {/* breadcrumb row (top-right in RTL layout) */}
      <div className="text-sm text-sky-700 mb-6 flex items-center gap-2">
        <span className="text-gray-500">اتوماسیون</span>
        <span className="text-gray-400">/</span>
        <span className="font-semibold">وضعیت سالن</span>
      </div>

      {/* controls row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* right side: page title block */}

        {/* left side: controls group */}
        <div className="flex flex-wrap justify-around gap-4 flex-1">
          {/* farm select */}
          <div className="flex flex-col items-end">
            <label className="text-sm text-gray-600 mb-2">انتخاب مرغداری:</label>
            <select
              value={farm}
              onChange={(e) => setFarm(e.target.value)}
              className="w-80 text-right px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition text-gray-700"
            >
              <option>مرغداری غنچه</option>
              <option>مرغداری آذین</option>
            </select>
          </div>

          {/* hall select */}
          <div className="flex flex-col items-end">
            <label className="text-sm text-gray-600 mb-2">انتخاب سالن:</label>
            <select
              value={hall}
              onChange={(e) => setHall(e.target.value)}
              className="w-44 text-right px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition text-gray-700"
            >
              <option>سالن 1</option>
              <option>سالن 2</option>
            </select>
          </div>

          {/* server status */}
          <div className="flex flex-col items-end">
            <label className="text-sm text-gray-600 mb-2">ارتباط با سرور:</label>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2.5 shadow-sm min-w-[220px] justify-end">
              <div className="text-sm text-gray-700">اتوماسیون آفلاین است.</div>
              {/* red dot for offline */}
              <span className="w-3 h-3 rounded-full bg-red-500 block"></span>
            </div>
          </div>

          {/* pills: series, week, day */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center p-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <label className="text-xs text-gray-500 mb-1">سری گوشی:</label>
              <div className="text-base font-medium text-gray-800">
                {series}
              </div>
            </div>

            <div className="flex flex-col items-center p-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <label className="text-xs text-gray-500 mb-1">هفته:</label>
              <div className="text-base font-medium text-gray-800">
                {week}
              </div>
            </div>

            <div className="flex flex-col items-center p-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <label className="text-xs text-gray-500 mb-1">روز:</label>
              <div className="text-base font-medium text-gray-800">
                {day}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}