import React, { useState } from "react";

type NavItem = {
  key: string;
  label: string;
  icon: JSX.Element;
  badge?: number;
};

export default function Sidebar({
  items,
  activeKey,
  onNavigate,
}: {
  items: NavItem[];
  activeKey?: string;
  onNavigate: (key: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      dir="rtl"
      className={`flex-shrink-0 h-screen transition-all duration-300 ease-in-out shadow-sm
        ${collapsed ? "w-20" : "w-72"} bg-white relative flex flex-col`}
      aria-label="Main navigation"
    >
      {/* right accent stripe */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1"
        style={{ background: "linear-gradient(180deg,#16a34a,#059669)" }}
        aria-hidden
      />

      {/* Header / Logo */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center w-full" : ""}`}>
          <div
            className="flex items-center justify-center rounded-full w-12 h-12"
            style={{ background: "#10b981" }}
          >
            {/* place your white logo here; adjust src */}
            <img src="/logo-white.svg" alt="logo" className="w-7 h-7" />
          </div>

          {!collapsed && (
            <div>
              <div className="text-gray-800 font-semibold text-base leading-none">کاوش هوشمند کارا</div>
              <div className="text-xs text-gray-500">پلتفرم مدیریت سالن‌ها</div>
            </div>
          )}
        </div>

        {/* collapse button */}
        <button
          aria-expanded={!collapsed}
          onClick={() => setCollapsed((s) => !s)}
          title={collapsed ? "باز کردن منو" : "کوچک کردن"}
          className="ml-2 -mr-1 rounded p-1 text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-200"
        >
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="py-6 flex flex-col gap-1">
          {items.map((it) => {
            const active = it.key === activeKey;
            return (
              <li key={it.key} className="px-2">
                <button
                  onClick={() => onNavigate(it.key)}
                  className={`group w-full flex items-center gap-3 pr-3 pl-2 py-2 rounded-md transition
                    ${active ? "bg-green-50 text-green-700 font-semibold" : "text-gray-700 hover:bg-gray-50"}
                    focus:outline-none focus:ring-2 focus:ring-green-200`}
                  title={collapsed ? it.label : undefined}
                >
                  {/* icon - on the right side for RTL */}
                  <span
                    className={`flex items-center justify-center shrink-0 w-9 h-9 rounded-md
                      ${active ? "bg-green-100 text-green-700" : "bg-transparent text-gray-500 group-hover:bg-gray-100"}`}
                  >
                    {it.icon}
                  </span>

                  {/* label */}
                  {!collapsed && (
                    <span className="flex-1 text-right">
                      <div className="flex items-center justify-between">
                        <span>{it.label}</span>
                        {it.badge ? (
                          <span className="ml-3 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700">
                            {it.badge}
                          </span>
                        ) : null}
                      </div>
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer utilities */}
      <div className="px-4 py-4 border-t">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <div className="flex-1">
            {!collapsed ? (
              <>
                <div className="text-sm text-gray-800 font-medium">مدیر سیستم</div>
                <div className="text-xs text-gray-500">online</div>
              </>
            ) : (
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={() => alert("خروج")}
              className="ml-2 px-3 py-2 rounded-md bg-gray-100 text-sm text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200"
            >
              خروج
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
