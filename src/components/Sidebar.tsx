import React, { useState, useEffect } from "react";

const BRAND = {
  light: "#FDE7B3",
  yellow: "#FFC50F",
  green: "#63A361",
  olive: "#5B532C",
  darkBtn: "#5B532C",
};


type NavItem = { key: string; label: string; badge?: number; icon?: JSX.Element };

export default function Sidebar({
  items,
  activeKey,
  onNavigate,
  collapsed,
  setCollapsed,
}: {
  items: NavItem[];
  activeKey?: string;
  onNavigate: (k: string) => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const asideStyle: React.CSSProperties = {
    width: collapsed ? 72 : 288,
    height: "100vh",
    background: "#FFFFFF",
    boxShadow: "0 2px 8px rgba(91,83,44,0.1)",
    position: "fixed",
    right: isMobile && collapsed ? -72 : 0, // hide off-canvas on mobile when collapsed
    top: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    padding: "24px 16px",
    justifyContent: "space-between",
    zIndex: 1300, // below header (header will be 1400)
    transition: "all 0.28s ease",
    overflow: "hidden",
  };

  const stripeStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    background: `linear-gradient(to bottom, ${BRAND.green}, ${BRAND.yellow}88)`,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  };

  return (
    <>
      {/* Mobile overlay (only when sidebar is open on mobile) */}
      {isMobile && !collapsed && (
        <div
          onClick={() => setCollapsed(true)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1200, // below sidebar (1300) but below header (1400)
          }}
        />
      )}

      <aside style={asideStyle} aria-label="Main navigation" dir="rtl">
        <div style={stripeStyle} />

        {/* Header area */}
        <div className="flex items-center justify-between mb-6 pl-1">
          <div className="flex items-center gap-3">
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: `linear-gradient(135deg, ${BRAND.green}, ${BRAND.olive})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 6px 18px ${BRAND.green}33`,
              }}
            >
              <img src="https://kara.farm/app/assets/images/logo-sm.png" alt="logo" style={{ width: 32, height: 32 }} />
            </div>

            {!collapsed && (
              <div>
                <div style={{ fontWeight: 700, color: BRAND.olive, fontSize: 16 }}>کاوش هوشمند کارا</div>
                <div style={{ fontSize: 13, color: BRAND.olive + "99" }}>پلتفرم مدیریت سالن‌ها</div>
              </div>
            )}
          </div>

          {/* INTERNAL TOGGLE: show only on non-mobile (desktop) to avoid duplicate toggles */}
          {!isMobile && (
            <button
              aria-label="toggle"
              onClick={() => setCollapsed(!collapsed)}
              style={{
                width: 36,
                height: 36,
                background: BRAND.olive + "11",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: BRAND.olive,
                fontSize: 18,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                transform: collapsed ? "rotate(180deg)" : "none",
              }}
            >
              {collapsed ? "›" : "‹"}
            </button>
          )}
        </div>        {/* Nav */}
        <nav style={{ flex: 1, overflow: "auto", marginLeft: 6 }}>
          <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {items.map((it) => {
              const active = it.key === activeKey;
              return (
                <li key={it.key}>
                  <button
                    onClick={() => onNavigate(it.key)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: 12,
                      padding: "14px 16px",
                      borderRadius: 14,
                      background: active ? BRAND.light + "33" : "transparent",
                      color: active ? BRAND.olive : BRAND.olive + "CC",
                      border: active ? `2px solid ${BRAND.green}` : "2px solid transparent",
                      boxShadow: active ? `0 6px 20px ${BRAND.green}15` : "none",
                      textAlign: "right",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        background: BRAND.light + "22",
                      },
                    }}
                  >
                    {/* icon box */}
                    <span
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: active ? `linear-gradient(135deg, ${BRAND.green}22, ${BRAND.yellow}22)` : "transparent",
                        color: active ? BRAND.green : BRAND.olive + "99",
                        flexShrink: 0,
                        transition: "all 0.2s ease",
                        border: active ? `1px solid ${BRAND.green}44` : "1px solid transparent",
                      }}
                      aria-hidden
                    >
                      {it.icon ?? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </span>

                    {!collapsed && (
                      <span style={{ flex: 1, fontSize: 15, fontWeight: active ? 600 : 400 }}>
                        {it.label}
                      </span>
                    )}

                    {/* badge */}
                    {!collapsed && it.badge ? (
                      <span
                        style={{
                          marginRight: 8,
                          minWidth: 28,
                          height: 28,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 999,
                          background: BRAND.green + "15",
                          color: BRAND.olive,
                          fontSize: 13,
                          fontWeight: 600,
                          padding: "0 8px",
                        }}
                      >
                        {it.badge}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>


      </aside>
    </>
  );
}