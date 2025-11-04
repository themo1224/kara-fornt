import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Senior-friendly RTL login:
 * - left: green gradient with centered Persian marketing copy + decorative SVG rings
 * - right: white form column; logo placed inside dark green circular badge so white logo reads
 * - responsive: left hides on small screens; form fills mobile
 *
 * Replace "/logo-white.svg" with your actual white logo file.
 */

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      // adapt login payload in AuthContext if needed (phone vs email)
      await login(phone, password, true);
      nav("/dashboard");
    } catch (error: any) {
      setErr(error?.response?.data?.message || "خطا در ورود");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div dir="rtl" className="w-screen h-screen flex overflow-hidden font-sans">
      {/* LEFT: large visual (hidden on small screens) */}
      <aside
        className="hidden lg:flex w-2/3 h-screen items-center justify-center relative"
        style={{
          background:
            "radial-gradient(800px 400px at 10% 12%, rgba(255,255,255,0.03), transparent), linear-gradient(160deg, #0f766e 0%, #10b981 48%, #60e0a6 100%)",
        }}
        aria-hidden
      >
        {/* subtle concentric rings SVG (decorative) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="g1" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#g1)" />
          <g stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" fill="none">
            <circle cx="50" cy="50" r="20" />
            <circle cx="50" cy="50" r="32" />
            <circle cx="50" cy="50" r="44" />
          </g>
        </svg>

        <div className="max-w-2xl text-center px-12 relative z-10">
          <p className="text-white/90 text-base mb-3">به نرم افزار قاصدک خوش آمدید.</p>
          <h1 className="text-white text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            محصولی از شرکت دانش بنیان <span className="text-yellow-300">کارا</span>
          </h1>
          <p className="text-white/90 text-lg max-w-xl mx-auto">
            سالن‌های مرغداری خود را از راه دور مدیریت کنید و از همه چیز باخبر باشید.
          </p>
        </div>
      </aside>

      {/* RIGHT: form column */}
      <main className="w-full lg:w-1/3 h-screen bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* logo badge */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="flex items-center justify-center rounded-full w-16 h-16 shadow-lg"
              style={{ background: "#0f766e" }}
              aria-hidden
            >
              {/* white logo (SVG/PNG) — make sure it's white version */}
              <img
                src="https://kara.farm/app/assets/images/logo-sm.png"
                alt="قاصدک"
                className="w-10 h-10 object-contain"
                style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.15))" }}
              />
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-800">ورود به نرم افزار قاصدک</h2>
              <p className="text-sm text-gray-500">جهت ادامه وارد شوید.</p>
            </div>
          </div>

          {/* error box */}
          {err && (
            <div
              role="alert"
              className="mb-4 text-sm text-red-700 bg-red-50 p-3 rounded-md border border-red-100"
            >
              {err}
            </div>
          )}

          {/* form */}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2 text-right">تلفن همراه</label>
              <input
                dir="ltr"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0912xxxxxxx"
                className="w-full border border-gray-200 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-200 transition"
                required
                aria-label="تلفن همراه"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2 text-right">رمز عبور</label>
              <input
                dir="ltr"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور"
                className="w-full border border-gray-200 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-200 transition"
                required
                aria-label="رمز عبور"
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="w-full py-3 rounded-md bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold shadow hover:from-green-700 hover:to-green-600 disabled:opacity-60 transition"
              aria-disabled={busy}
            >
              {busy ? "در حال ورود..." : "ورود"}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} شرکت دانش بنیان کارا
          </div>
        </div>
      </main>
    </div>
  );
}
