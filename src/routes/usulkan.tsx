import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { FooterNote } from "@/components/footer-note";
import { districts, moodOrder, moods, type District, type MoodId } from "@/data/cafes";
import { cn } from "@/lib/cn";
import { insertCafeSuggestion } from "@/lib/supabase";

export const Route = createFileRoute("/usulkan")({
  head: () => ({
    meta: [{ title: "Usulkan kafe · NgopiSamarinda" }],
  }),
  component: Usulkan,
});

const fieldClass =
  "h-12 w-full rounded-xl bg-paper-2 px-4 text-ink ring-1 ring-line outline-none transition-shadow duration-150 focus:ring-ink";

function Usulkan() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState<District | "">("");
  const [picked, setPicked] = useState<MoodId[]>([]);
  const [photoUrl, setPhotoUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [sending, setSending] = useState(false);

  function toggleMood(id: MoodId) {
    setPicked((current) => (current.includes(id) ? current.filter((mood) => mood !== id) : [...current, id]));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const photo = photoUrl.trim();
    if (!name.trim() || !address.trim() || !district) {
      toast("Nama, alamat, dan kecamatan wajib diisi.");
      return;
    }
    if (picked.length === 0) {
      toast("Pilih minimal satu suasana.");
      return;
    }
    if (photo && !/^https?:\/\//i.test(photo)) {
      toast("URL foto harus diawali http:// atau https://.");
      return;
    }
    setSending(true);
    const result = await insertCafeSuggestion({
      name,
      address,
      district,
      moods: picked,
      photoUrl: photo,
      notes,
    });
    setSending(false);
    if (result === "inserted") {
      toast("Usulan terkirim. Terima kasih!");
      setName("");
      setAddress("");
      setDistrict("");
      setPicked([]);
      setPhotoUrl("");
      setNotes("");
      return;
    }
    if (result === "skipped") {
      toast("Supabase belum terhubung. Usulan belum tersimpan.");
      return;
    }
    toast("Usulan gagal terkirim. Coba lagi.");
  }

  return (
    <div>
      <div className="mx-auto max-w-xl px-5 py-8 lg:px-8 lg:py-12">
        <p className="kicker">Usulkan kafe</p>
        <h1 className="mt-2 text-title">Ada meja yang belum masuk katalog?</h1>
        <p className="mt-3 text-ink-soft">
          Kirim nama dan lokasinya. Usulan masuk ke antrean, belum langsung tampil di jelajah.
        </p>
        <form className="mt-8 space-y-5" onSubmit={onSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Nama kafe</span>
            <input
              required
              maxLength={120}
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={fieldClass}
              autoComplete="organization"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Alamat</span>
            <input
              required
              maxLength={240}
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className={fieldClass}
              autoComplete="street-address"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Kecamatan</span>
            <select
              required
              value={district}
              onChange={(event) => setDistrict(event.target.value as District | "")}
              className={fieldClass}
            >
              <option value="">Pilih kecamatan</option>
              {districts.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <fieldset>
            <legend className="mb-2 text-sm font-medium">Suasana</legend>
            <div className="flex flex-wrap gap-2">
              {moodOrder.map((id) => {
                const on = picked.includes(id);
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleMood(id)}
                    className={cn(
                      "press h-11 rounded-full border px-4 text-sm transition-colors duration-150",
                      on ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink hover:bg-paper-2",
                    )}
                  >
                    {moods[id].label}
                  </button>
                );
              })}
            </div>
          </fieldset>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Foto (opsional, URL)</span>
            <input
              type="url"
              inputMode="url"
              placeholder="https://"
              value={photoUrl}
              onChange={(event) => setPhotoUrl(event.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Catatan</span>
            <textarea
              maxLength={1000}
              rows={4}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="w-full rounded-xl bg-paper-2 px-4 py-3 text-ink ring-1 ring-line outline-none transition-shadow duration-150 focus:ring-ink"
            />
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={sending}
              className="press h-12 rounded-full bg-ink px-5 text-sm font-medium text-paper disabled:opacity-60"
            >
              {sending ? "Mengirim…" : "Kirim usulan"}
            </button>
            <Link to="/jelajah" className="inline-flex h-12 items-center text-sm text-muted">
              Kembali ke jelajah
            </Link>
          </div>
        </form>
      </div>
      <FooterNote />
    </div>
  );
}
