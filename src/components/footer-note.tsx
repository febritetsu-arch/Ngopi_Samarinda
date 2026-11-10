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
        <p className="text-sm text-muted">Sepuluh kecamatan. Sepuluh meja contoh.</p>
      </div>
    </footer>
  );
}
