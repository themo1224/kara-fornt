import React, { useEffect, useState, useRef } from "react";

const BRAND = {
  light: "#FDE7B3",
  yellow: "#FFC50F",
  green: "#63A361",
  olive: "#5B532C",
};

export default function Header({
  collapsed,
  setCollapsed,
  title = "داشبورد",
  notifications = 3,
  onLogout,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  title?: string;
  notifications?: number;
  onLogout?: () => void;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // header sizing + sidebar offset
  const sidebarWidth = collapsed ? 72 : 288;
  const headerHeight = isMobile ? 56 : 64;

  // click outside to close user menu
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpenUser(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <header
      ref={wrapperRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: headerHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#ffffff",
        borderBottom: "1px solid rgba(15,23,42,0.04)",
        paddingLeft: 16,
        paddingRight: Math.max(16, sidebarWidth + 12), // avoid overlap with fixed sidebar on right
        zIndex: 1100,
        boxShadow: "0 2px 6px rgba(11,15,20,0.03)",
      }}
    >
      {/* Left side (for RTL this appears visually on left) */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* mobile toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label="toggle sidebar"
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            border: "none",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            cursor: "pointer",
            color: BRAND.olive,
            fontSize: 18,
          }}
        >
          {collapsed ? "≡" : "☰"}
        </button>

        {/* page title */}
        <div style={{ display: "flex", flexDirection: "column", textAlign: "right" }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{title}</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>خلاصه وضعیت و میانبرها</div>
        </div>
      </div>

      {/* Right side: search, notifications, user */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* search (desktop) */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              placeholder="جستجو..."
              style={{
                height: 44,
                minWidth: 260,
                borderRadius: 10,
                border: "1px solid rgba(15,23,42,0.06)",
                padding: "8px 12px",
                outline: "none",
                direction: "rtl",
                background: "#fff",
              }}
            />
          </div>
        )}

        {/* notifications */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => alert("هشدارها")}
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: BRAND.olive,
            }}
            aria-label="notifications"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h11z" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </button>

          {notifications > 0 && (
            <span
              style={{
                position: "absolute",
                top: 2,
                left: 2,
                minWidth: 18,
                height: 18,
                borderRadius: 999,
                background: BRAND.yellow,
                color: "#111",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                padding: "0 6px",
                boxShadow: "0 4px 10px rgba(255,197,15,0.12)",
              }}
            >
              {notifications}
            </span>
          )}
        </div>

        {/* user avatar + menu */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setOpenUser((s) => !s)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 10px",
              borderRadius: 10,
              border: "1px solid rgba(15,23,42,0.04)",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                background: BRAND.green,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
              }}
            >
              آ
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>مدیر سیستم</div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>مدیر</div>
            </div>
          </button>

          {openUser && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 10px)",
                left: 0,
                minWidth: 180,
                background: "#fff",
                borderRadius: 10,
                boxShadow: "0 8px 24px rgba(11,15,20,0.08)",
                padding: 8,
                zIndex: 1200,
                direction: "rtl",
              }}
            >
              <button
                onClick={() => {
                  setOpenUser(false);
                  if (onLogout) onLogout();
                }}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "none",
                  background: "transparent",
                  textAlign: "right",
                  color: BRAND.olive,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                خروج
              </button>
              <button
                onClick={() => alert("پروفایل")}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "none",
                  background: "transparent",
                  textAlign: "right",
                  color: "#475569",
                  cursor: "pointer",
                }}
              >
                پروفایل من
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
