import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Bookmark, Compass, House, Map, RotateCw } from "lucide-react";
import { Toaster } from "sonner";
import { cn } from "@/lib/cn";
import { useWishlist, useWishlistReady } from "@/lib/wishlist";

const tabs = [
  { to: "/", label: "Beranda", icon: House },
  { to: "/jelajah", label: "Jelajah", icon: Compass },
  { to: "/peta", label: "Peta", icon: Map },
  { to: "/roulette", label: "Roulette", icon: RotateCw },
  { to: "/simpan", label: "Simpan", icon: Bookmark },
] as const;

function isOn(path: string, to: string) {
  if (to === "/") return path === "/";
  return path === to || path.startsWith(`${to}/`);
}

export function Shell() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const night = path === "/roulette";
  useWishlistReady();
  const count = useWishlist((state) => (state.ready ? state.ids.length : 0));

  return (
    <div className={cn("flex min-h-dvh flex-col", night ? "bg-ink text-paper" : "bg-paper text-ink")}>
      <a
        href="#isi"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        Loncat ke isi
      </a>
      <header
        className={cn(
          "sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b px-5 lg:px-8",
          night ? "border-ink-soft bg-ink/95 backdrop-blur-md" : "border-line bg-paper/90 backdrop-blur-md",
        )}
      >
        <Link to="/" className="flex min-h-11 items-baseline gap-2">
          <span className="font-display text-2xl italic leading-none">Ngopi</span>
          <span className={cn("brand-city", night ? "text-paper/70" : "text-olive")}>Samarinda</span>
        </Link>
        <div className="flex items-center gap-1">
        <Link
          to="/usulkan"
          className={cn(
            "inline-flex h-11 items-center rounded-full px-4 text-sm",
            isOn(path, "/usulkan")
              ? night
                ? "bg-paper/10 font-medium"
                : "bg-paper-2 font-medium"
              : night
                ? "text-paper/80"
                : "text-ink",
          )}
        >
          Usulkan
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Utama">
          {tabs
            .filter((tab) => tab.to !== "/")
            .map((tab) => {
              const on = isOn(path, tab.to);
              return (
                <Link
                  key={tab.to}
                  to={tab.to}
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm transition-colors duration-150",
                    on
                      ? night
                        ? "bg-paper/10 font-medium"
                        : "bg-paper-2 font-medium"
                      : night
                        ? "text-paper/70 hover:text-paper"
                        : "text-muted hover:text-ink",
                  )}
                >
                  {tab.label}
                  {tab.to === "/simpan" && count > 0 ? (
                    <span className="tabular-nums text-terracotta">{count}</span>
                  ) : null}
                </Link>
              );
            })}
        </nav>
        </div>
      </header>
      <main id="isi" className="flex min-h-0 w-full min-w-0 flex-1 flex-col pb-16 lg:pb-0">
        <div key={path} className="page-enter flex min-h-0 w-full min-w-0 flex-1 flex-col">
          <Outlet />
        </div>
      </main>
      <Toaster
        position="bottom-center"
        offset={88}
        toastOptions={{
          style: {
            background: "var(--color-paper)",
            color: "var(--color-ink)",
            border: "1px solid var(--color-line)",
            fontFamily: "var(--font-sans)",
          },
        }}
      />
      <nav
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 flex border-t tabbar lg:hidden",
          night ? "border-ink-soft bg-ink" : "border-line bg-paper",
        )}
        aria-label="Utama"
      >
        {tabs.map((tab) => {
          const on = isOn(path, tab.to);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              aria-current={on ? "page" : undefined}
              className={cn(
                "flex min-h-16 flex-1 flex-col items-center justify-center gap-0.5 text-xs tracking-wide transition-colors duration-150",
                on ? "text-ink" : "text-muted",
                night && (on ? "text-paper" : "text-paper/70"),
              )}
            >
              <Icon className="size-5" strokeWidth={on ? 2.2 : 1.7} />
              {tab.label}
              <span
                className={cn("h-0.5 w-4 rounded-full", on ? "bg-terracotta" : "bg-transparent")}
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
