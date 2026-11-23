import { useState } from "react";
import { Coffee, CupSoda, Heart, Hop, Bean, GlassWater } from "lucide-react";

const slides = [
  {
    title: "Temukan kafe di luar ulasan biasa.",
    body: "Lewati rating yang generik. Lihat jam, suasana, dan fasilitas sebelum kamu berangkat.",
    art: (
      <div className="grid grid-cols-3 justify-items-center gap-6 text-ink">
        <Coffee className="size-14" strokeWidth={1.4} />
        <Hop className="size-14" strokeWidth={1.4} />
        <GlassWater className="size-14" strokeWidth={1.4} />
        <CupSoda className="size-14" strokeWidth={1.4} />
        <Bean className="size-14" strokeWidth={1.4} />
        <Coffee className="size-14" strokeWidth={1.4} />
      </div>
    ),
  },
  {
    title: "Cocokkan suasana dengan kafe yang pas.",
    body: "Cari menurut vibe — tempat fokus, belajar, nongkrong, atau sekadar kopi yang tenang.",
    art: (
      <div className="flex items-end justify-center gap-6 text-ink">
        <CupSoda className="size-16" strokeWidth={1.4} />
        <Coffee className="size-20" strokeWidth={1.4} />
      </div>
    ),
  },
  {
    title: "Simpan tempat andalanmu.",
    body: "Tandai kafe yang ingin kamu datangi lagi. Daftarnya tersimpan di perangkat ini.",
    art: (
      <div className="flex justify-center gap-8 text-ink">
        <Heart className="size-16" strokeWidth={1.4} />
        <Heart className="size-16" strokeWidth={1.4} />
      </div>
    ),
  },
] as const;

export function Onboarding({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const last = index === slides.length - 1;

  return (
    <div className="intro-layer fixed inset-0 flex justify-center bg-paper-2">
      <div className="flex w-full max-w-lg flex-col bg-paper px-6 pt-16 pb-8">
        <div className="max-w-sm">
          <h1 className="font-display text-4xl leading-tight">{slide.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">{slide.body}</p>
        </div>
        <div className="grid flex-1 place-items-center py-10">{slide.art}</div>
        <div className="mb-6 flex justify-center gap-2" aria-hidden="true">
          {slides.map((_, dot) => (
            <span
              key={dot}
              className={dot === index ? "size-2 rounded-full bg-ink" : "size-2 rounded-full bg-line"}
            />
          ))}
        </div>
        {last ? (
          <button
            type="button"
            onClick={onDone}
            className="h-12 w-full rounded-xl bg-ink text-sm font-medium text-paper"
          >
            Mulai
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIndex((value) => value + 1)}
            className="mx-auto grid size-14 place-items-center rounded-full bg-paper-2 text-sm font-medium"
            aria-label="Lanjut"
          >
            →
          </button>
        )}
      </div>
    </div>
  );
}
