// src/layouts/AppLayout.tsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const navItems = [
  { key: "automation", label: "اتوماسیون", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 18v4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.5 7.5l3 3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.5 16.5l3 3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { key: "status", label: "وضعیت سالن", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12h18" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 6v12" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 8v8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ), badge: 2
  },
  { key: "map", label: "نمای کلی فارم", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10.5V6l-6-2-6 2v8l6 2 6-2v-3.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 4v8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { key: "reports", label: "گزارش گیری", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3h18v18H3z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 12h3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 7h6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 17h10" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { key: "alerts", label: "هشدارها", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a7 7 0 0 0-7 7v5l-2 2h18l-2-2V9a7 7 0 0 0-7-7z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ), badge: 5
  },
  { key: "settings", label: "تنظیمات", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06A2 2 0 1 1 2.27 18.65l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09c.65 0 1.2-.39 1.51-1a1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 6.9 3.27l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V2a2 2 0 1 1 4 0v.09c0 .61.4 1.16 1 1.51h.22a1.65 1.65 0 0 0 1.82-.33l.06-.06A2 2 0 0 1 19.73 5.35l-.06.06a1.65 1.65 0 0 0-.33 1.82v.22c.61.33 1.16.8 1.51 1.51H21a2 2 0 0 1 0 4h-.09c-.61 0-1.16.4-1.51 1z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<string>("status");

  return (
    <div className="flex h-screen">
      <Sidebar items={navItems} activeKey={active} onNavigate={(k) => setActive(k)} />
      <main className="flex-1 overflow-auto bg-gray-50">
        {/* topbar (optional) */}
        <div className="p-4 border-b bg-white">
          <div className="max-w-7xl mx-auto">Topbar — active: {active}</div>
        </div>

        {/* content */}
        <div className="p-6 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
