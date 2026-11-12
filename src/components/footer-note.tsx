import { Link } from "@tanstack/react-router";

export function FooterNote() {
  return (
    <footer className="mt-20 border-t border-line px-5 py-12 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-3xl italic">Ngopi Samarinda</p>
          <p className="mt-3 max-w-md text-sm text-muted">
            Prototipe desain. Nama kafe, alamat, menu, harga, jam buka, dan keramaian adalah data contoh —
            bukan direktori resmi kota.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <Link to="/usulkan" className="text-sm text-ink underline decoration-line underline-offset-4">
            Usulkan kafe
          </Link>
          <p className="text-sm text-muted">Sepuluh kecamatan. Sepuluh meja contoh.</p>
        </div>
      </div>
    </footer>
  );
}
