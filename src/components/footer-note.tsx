import { Link } from "@tanstack/react-router";

export function FooterNote() {
  return (
    <footer className="mt-28 px-5 pt-8 pb-16 lg:px-8 lg:pb-20">
      <div className="mx-auto max-w-6xl">
        <p className="font-display text-5xl leading-none italic sm:text-7xl">
          Ngopi
          <span className="block pl-10 text-terracotta sm:pl-24">Samarinda.</span>
        </p>
        <div className="mt-8 flex max-w-xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-sm text-sm text-muted">
            Prototipe desain. Nama kafe, alamat, menu, harga, jam buka, dan keramaian adalah data contoh —
            bukan direktori resmi kota.
          </p>
          <Link to="/usulkan" className="rule-draw min-h-11 text-sm font-medium">
            Usulkan kafe
          </Link>
        </div>
      </div>
    </footer>
  );
}
