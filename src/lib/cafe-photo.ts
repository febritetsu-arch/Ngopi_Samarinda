const pool = [
  "/photos/atelier-kopi.jpg",
  "/photos/hero.jpg",
  "/photos/kedai-senja.jpg",
  "/photos/kopi-pelabuhan.jpg",
  "/photos/lantai-dua.jpg",
  "/photos/pagi-buta.jpg",
  "/photos/rumah-hujan.jpg",
  "/photos/studio-tujuh.jpg",
  "/photos/sudut-malam.jpg",
  "/photos/teras-kencana.jpg",
  "/photos/warung-daun.jpg",
];

const have = new Set(pool);

/** Some catalog rows point at photos that are not in the repo. Use a real file. */
export function cafePhoto(image: string, slug: string) {
  if (have.has(image)) return image;
  let n = 0;
  for (let i = 0; i < slug.length; i++) n = (n + slug.charCodeAt(i)) % pool.length;
  return pool[n];
}
