import { writeFileSync } from "node:fs";
import { cafes } from "../src/data/cafes.ts";

function q(value: string) {
  return `'${value.replaceAll("'", "''")}'`;
}

function textArray(items: readonly string[]) {
  return `ARRAY[${items.map((item) => q(item)).join(", ")}]::text[]`;
}

function jsonb(value: unknown) {
  return `${q(JSON.stringify(value))}::jsonb`;
}

function smallintArray(items: readonly number[]) {
  return `ARRAY[${items.join(", ")}]::smallint[]`;
}

const rows = cafes
  .map((cafe) => {
    const values = [
      q(cafe.slug),
      q(cafe.name),
      q(cafe.district),
      q(cafe.neighborhood),
      q(cafe.address),
      String(cafe.lat),
      String(cafe.lng),
      q(cafe.price),
      textArray(cafe.moods),
      textArray(cafe.facilities),
      q(cafe.open),
      q(cafe.close),
      q(cafe.blurb),
      jsonb(cafe.story),
      q(cafe.image),
      q(cafe.imageAlt),
      jsonb(cafe.menu),
      smallintArray(cafe.crowd),
      q(cafe.signature),
    ];
    return `  (${values.join(", ")})`;
  })
  .join(",\n");

const sql = `-- Ngopi Samarinda — isi tabel public.cafes dari src/data/cafes.ts
-- Jalankan di Supabase SQL Editor setelah schema.sql.
-- Aman diulang: slug yang sudah ada dilewati.

insert into public.cafes (
  slug, name, district, neighborhood, address, lat, lng, price,
  moods, facilities, open, close, blurb, story, image, image_alt,
  menu, crowd, signature
) values
${rows}
on conflict (slug) do nothing;
`;

writeFileSync(new URL("../seed.sql", import.meta.url), sql);
console.log(`seed.sql: ${cafes.length} kafe`);
