import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Bookmark, Coffee, Gift, Map, UserRound } from "lucide-react";
import { Toaster } from "sonner";
import { cn } from "@/lib/cn";
import { useWishlist, useWishlistReady } from "@/lib/wishlist";

const tabs = [
  { to: "/", label: "Peta", icon: Map },
  { to: "/jelajah", label: "Jelajah", icon: Coffee },
  { to: "/simpan", label: "Simpan", icon: Bookmark },
  { to: "/kupon", label: "Kupon", icon: Gift },
  { to: "/akun", label: "Akun", icon: UserRound },
] as const;

function isOn(path: string, to: string) {
  if (to === "/") return path === "/";
  return path === to || path.startsWith(`${to}/`);
}

export function Shell() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const night = path === "/roulette";
  const bare = path === "/";
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
      {bare ? null : (
        <header
          className={cn(
            "sticky top-0 z-30 flex h-14 items-center justify-between px-4",
            night ? "bg-ink/95" : "bg-paper/90 backdrop-blur-md",
          )}
        >
          <Link to="/" className="flex min-h-11 items-baseline gap-2">
            <span className="size-2 translate-y-1 bg-ink" aria-hidden="true" />
            <span className="font-display text-2xl italic leading-none">Ngopi</span>
            <span className={cn("text-sm", night ? "text-paper/70" : "text-muted")}>Samarinda</span>
          </Link>
        </header>
      )}
      <main id="isi" className="flex min-h-0 w-full min-w-0 flex-1 flex-col pb-16">
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
          "tabbar fixed inset-x-0 bottom-0 z-40 flex border-t",
          night ? "border-paper/15 bg-ink" : "border-line bg-paper",
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
              aria-label={tab.to === "/simpan" && count > 0 ? `${tab.label}, ${count} tersimpan` : tab.label}
              className={cn(
                "relative flex min-h-16 flex-1 items-center justify-center",
                on ? (night ? "text-paper" : "text-ink") : night ? "text-paper/55" : "text-muted",
              )}
            >
              <Icon className="size-6" strokeWidth={on ? 2.2 : 1.6} />
              {tab.to === "/simpan" && count > 0 ? (
                <span className="absolute top-3 right-[28%] size-2 rounded-full bg-closed" aria-hidden="true" />
              ) : null}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
