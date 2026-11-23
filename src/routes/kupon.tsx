import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { coupons, type Coupon } from "@/data/coupons";
import { cn } from "@/lib/cn";

const USED_KEY = "ngopi-kupon";

export const Route = createFileRoute("/kupon")({
  head: () => ({
    meta: [{ title: "Promo · NgopiSamarinda" }],
  }),
  component: Kupon,
});

function readUsed() {
  try {
    const raw = localStorage.getItem(USED_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function Kupon() {
  const [tab, setTab] = useState<"ada" | "pakai">("ada");
  const [used, setUsed] = useState<string[]>([]);
  const [pending, setPending] = useState<Coupon | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUsed(readUsed());
    setReady(true);
  }, []);

  const available = coupons.filter((coupon) => !used.includes(coupon.id));
  const spent = coupons.filter((coupon) => used.includes(coupon.id));
  const list = tab === "ada" ? available : spent;

  function confirmUse() {
    if (!pending) return;
    const next = [...used, pending.id];
    setUsed(next);
    localStorage.setItem(USED_KEY, JSON.stringify(next));
    setPending(null);
    setTab("pakai");
  }

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-6">
      <h1 className="font-display text-3xl leading-none">Promo & kupon</h1>
      <p className="mt-2 text-sm text-muted">Contoh promo, bukan voucher yang bisa ditukar.</p>
      <div className="mt-5 flex gap-2">
        <button
          type="button"
          aria-pressed={tab === "ada"}
          onClick={() => setTab("ada")}
          className={cn(
            "h-10 rounded-full px-4 text-sm",
            tab === "ada" ? "bg-ink text-paper" : "border border-line",
          )}
        >
          Tersedia ({ready ? available.length : "…"})
        </button>
        <button
          type="button"
          aria-pressed={tab === "pakai"}
          onClick={() => setTab("pakai")}
          className={cn(
            "h-10 rounded-full px-4 text-sm",
            tab === "pakai" ? "bg-ink text-paper" : "border border-line",
          )}
        >
          Terpakai
        </button>
      </div>
      <ul className="mt-4 space-y-4">
        {list.length === 0 ? (
          <li className="rounded-xl border border-line bg-card p-5 text-sm text-muted">
            {tab === "ada" ? "Semua contoh kupon sudah ditandai terpakai." : "Belum ada kupon yang dipakai."}
          </li>
        ) : (
          list.map((coupon) => (
            <li key={coupon.id} className="rounded-xl border border-line bg-card p-4">
              <h2 className="text-lg font-semibold">{coupon.cafe}</h2>
              <p className="mt-3 text-2xl font-semibold tracking-tight">{coupon.off}</p>
              <p className="mt-1 text-sm text-ink-soft">{coupon.note}</p>
              <div className="mt-2 flex items-baseline justify-between gap-3 text-sm text-muted">
                <span>Berlaku sampai {coupon.until}</span>
                <span className="italic">sekali pakai</span>
              </div>
              {tab === "ada" ? (
                <button
                  type="button"
                  onClick={() => setPending(coupon)}
                  className="mt-4 h-12 w-full rounded-xl bg-ink text-sm font-medium text-paper"
                >
                  Pakai kupon
                </button>
              ) : (
                <p className="mt-4 text-sm font-medium text-muted">Sudah ditandai terpakai di perangkat ini.</p>
              )}
            </li>
          ))
        )}
      </ul>

      {pending ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/45 px-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="kupon-judul"
            className="w-full max-w-sm rounded-2xl bg-card p-5"
          >
            <h2 id="kupon-judul" className="font-display text-2xl leading-tight">
              Pakai kupon ini?
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              {pending.cafe} · {pending.off}. Ini hanya menandai contoh di perangkatmu.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPending(null)}
                className="h-12 rounded-xl border border-ink text-sm font-medium"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmUse}
                className="h-12 rounded-xl bg-ink text-sm font-medium text-paper"
              >
                Pakai
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
