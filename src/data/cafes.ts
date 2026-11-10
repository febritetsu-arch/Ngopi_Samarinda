export const moods = {
  fokus: {
    label: "Fokus",
    line: "Meja tenang, colokan dekat, dan suara yang tidak naik.",
  },
  santai: {
    label: "Santai",
    line: "Tidak buru-buru. Cahaya lembut, kursi yang enak diduduki lama.",
  },
  nongkrong: {
    label: "Nongkrong",
    line: "Untuk obrolan yang muat lebih dari dua orang.",
  },
  foto: {
    label: "Foto",
    line: "Cahaya yang bagus, tanpa perlu berpose di depan tanda.",
  },
  kencan: {
    label: "Kencan",
    line: "Cukup intim untuk dua, tidak sampai hening canggung.",
  },
  hujan: {
    label: "Hujan",
    line: "Saat langit Samarinda turun, yang dicari lampu hangat.",
  },
} as const;

export type MoodId = keyof typeof moods;

export const moodOrder: MoodId[] = [
  "fokus",
  "santai",
  "nongkrong",
  "foto",
  "kencan",
  "hujan",
];

export const districts = [
  "Samarinda Utara",
  "Sungai Pinang",
  "Samarinda Ulu",
  "Samarinda Kota",
  "Samarinda Ilir",
  "Sungai Kunjang",
  "Sambutan",
  "Samarinda Seberang",
  "Palaran",
  "Loa Janan Ilir",
] as const;

export type District = (typeof districts)[number];

export const prices = {
  hemat: { label: "Hemat", range: "Rp18–28rb" },
  sedang: { label: "Sedang", range: "Rp28–45rb" },
  premium: { label: "Premium", range: "Rp45–70rb" },
} as const;

export type PriceId = keyof typeof prices;

export const facilities = {
  wifi: { label: "Wi-Fi" },
  colokan: { label: "Colokan" },
  outdoor: { label: "Outdoor" },
  ac: { label: "AC" },
  parkir: { label: "Parkir" },
  "bebas-asap": { label: "Bebas asap" },
  live: { label: "Musik live" },
  meeting: { label: "Meja rapat" },
  pet: { label: "Ramah hewan" },
  vegan: { label: "Opsi vegan" },
  larut: { label: "Buka larut" },
} as const;

export type FacilityId = keyof typeof facilities;

export type MenuItem = {
  name: string;
  price: number;
  note: string;
};

export type Cafe = {
  slug: string;
  name: string;
  district: District;
  neighborhood: string;
  address: string;
  lat: number;
  lng: number;
  price: PriceId;
  moods: MoodId[];
  facilities: FacilityId[];
  open: string;
  close: string;
  blurb: string;
  story: string[];
  image: string;
  imageAlt: string;
  menu: MenuItem[];
  /** Keramaian per jam, 0–3, indeks 0 = pukul 00. Data contoh. */
  crowd: number[];
  signature: string;
};

function crowd(pattern: string): number[] {
  if (pattern.length !== 24 || /[^0-3]/.test(pattern)) {
    throw new Error(`Pola keramaian tidak valid: ${pattern}`);
  }
  return [...pattern].map((n) => Number(n));
}

export const cafes: Cafe[] = [
  {
    slug: "atelier-kopi",
    name: "Atelier Kopi",
    district: "Samarinda Kota",
    neighborhood: "Kampung Baru",
    address: "Jl. Kakap No. 12, Kampung Baru",
    lat: -0.4988,
    lng: 117.1452,
    price: "premium",
    moods: ["fokus", "foto"],
    facilities: ["wifi", "colokan", "ac", "parkir", "bebas-asap", "meeting"],
    open: "07:30",
    close: "18:00",
    blurb: "Studio yang sunyi di pagi hari, sebelum kota benar-benar bangun.",
    story: [
      "Atelier Kopi menempati bekas ruang jahit di Jalan Kakap. Mejanya sedikit, colokan ada di setiap sisi, dan musik tidak pernah naik di atas bisikan.",
      "Pagi dipakai orang yang butuh dua jam tanpa diganggu. Setelah pukul dua, meja panjang di belakang lebih sering jadi rapat kecil.",
    ],
    image: "/photos/atelier-kopi.jpg",
    imageAlt: "Meja kayu dengan dripper pour-over, buku catatan tertutup, dan cangkir krem di ruang kafe yang terang.",
    menu: [
      { name: "V60 Empat Pagi", price: 48000, note: "Single origin, seduh pelan" },
      { name: "Espresso pendek", price: 28000, note: "Dua teguk, tanpa gula" },
      { name: "Flat white", price: 42000, note: "Susu oat atau susu sapi" },
      { name: "Pisang panggang", price: 32000, note: "Gula merah, porsi kecil" },
    ],
    crowd: crowd("000000123332122211000000"),
    signature: "V60 Empat Pagi",
  },
  {
    slug: "rumah-hujan",
    name: "Rumah Hujan",
    district: "Samarinda Ulu",
    neighborhood: "Air Putih",
    address: "Jl. Juanda No. 88, Air Putih",
    lat: -0.4768,
    lng: 117.1234,
    price: "sedang",
    moods: ["hujan", "kencan", "santai"],
    facilities: ["wifi", "ac", "bebas-asap", "vegan"],
    open: "10:00",
    close: "21:00",
    blurb: "Jendela besar dan lampu kuningan. Terasa tepat saat hujan turun.",
    story: [
      "Rumah Hujan memang didesain untuk hari yang basah. Kursinya menghadap jendela, lampunya rendah, dan tidak ada meja yang terlalu dekat dengan meja lain.",
      "Berdua terasa cukup. Kalau datang sendiri, sudut dekat rak buku biasanya kosong sampai sore.",
    ],
    image: "/photos/rumah-hujan.jpg",
    imageAlt: "Dua cangkir kopi di meja kayu, lampu kuningan, dan jendela dengan hujan di luar.",
    menu: [
      { name: "Kopi jahe gula merah", price: 32000, note: "Hangat, tidak terlalu manis" },
      { name: "Es kopi susu", price: 30000, note: "Susu evaporasi" },
      { name: "Cokelat oat", price: 34000, note: "Tanpa susu sapi" },
      { name: "Pisang keju kukus", price: 28000, note: "Porsi untuk dibagi" },
    ],
    crowd: crowd("000000000012233332210000"),
    signature: "Kopi jahe gula merah",
  },
  {
    slug: "lantai-dua",
    name: "Lantai Dua",
    district: "Samarinda Ilir",
    neighborhood: "Mesjid",
    address: "Jl. Bhayangkara No. 21, Mesjid",
    lat: -0.5036,
    lng: 117.1564,
    price: "premium",
    moods: ["foto", "kencan"],
    facilities: ["outdoor", "ac", "parkir", "bebas-asap", "wifi"],
    open: "15:00",
    close: "22:30",
    blurb: "Teras lantai dua yang menghadap senja, jarak duduknya tidak rapat.",
    story: [
      "Naik tangga sempit di belakang toko kain, lalu kotanya terasa lebih rendah. Terasnya menghadap barat, jadi pukul empat sampai enam adalah alasan orang datang.",
      "Tidak ada papan nama besar. Cahayanya datang dari langit, bukan dari lampu cincin.",
    ],
    image: "/photos/lantai-dua.jpg",
    imageAlt: "Kursi rotan di teras kafe saat senja, dengan sungai dan perahu di kejauhan.",
    menu: [
      { name: "Dirty aren", price: 46000, note: "Espresso di atas susu aren dingin" },
      { name: "Cold brew", price: 42000, note: "Seduh 16 jam" },
      { name: "Teh melati", price: 28000, note: "Panas atau es" },
      { name: "Kue lapis bakar", price: 36000, note: "Satu loyang kecil" },
    ],
    crowd: crowd("000000000000000123332100"),
    signature: "Dirty aren",
  },
  {
    slug: "kedai-senja",
    name: "Kedai Senja",
    district: "Sungai Kunjang",
    neighborhood: "Loa Bakung",
    address: "Jl. M. Yamin Dalam No. 5, Loa Bakung",
    lat: -0.5224,
    lng: 117.0988,
    price: "sedang",
    moods: ["nongkrong", "santai"],
    facilities: ["wifi", "outdoor", "parkir", "live", "larut"],
    open: "15:00",
    close: "23:00",
    blurb: "Halaman dengan lampu rendah, untuk obrolan yang tidak harus selesai hari ini.",
    story: [
      "Kedai Senja adalah halaman rumah yang dibuka jadi kafe. Kursi rotan, dinding terracotta, dan panggung kecil yang hanya dipakai Jumat.",
      "Datang berempat masih muat. Setelah pukul delapan suaranya naik, jadi ini bukan tempat untuk rapat.",
    ],
    image: "/photos/kedai-senja.jpg",
    imageAlt: "Halaman kafe saat senja dengan dinding terracotta, kursi rotan, dan dua cangkir di meja kayu.",
    menu: [
      { name: "Es kopi susu aren", price: 28000, note: "Manisnya bisa dikurangi" },
      { name: "Kopi tubruk", price: 18000, note: "Gula terpisah" },
      { name: "Teh tarik", price: 22000, note: "Tidak terlalu kental" },
      { name: "Pisang goreng keju", price: 24000, note: "Empat potong" },
    ],
    crowd: crowd("000000000000000122333210"),
    signature: "Es kopi susu aren",
  },
  {
    slug: "warung-daun",
    name: "Warung Daun",
    district: "Loa Janan Ilir",
    neighborhood: "Simpang Tiga",
    address: "Jl. Cempaka, Simpang Tiga",
    lat: -0.5682,
    lng: 117.1126,
    price: "hemat",
    moods: ["santai", "nongkrong", "foto"],
    facilities: ["outdoor", "parkir", "pet", "vegan", "wifi"],
    open: "08:00",
    close: "20:00",
    blurb: "Kebun kecil di belakang rumah. Bangku kayu, harga yang tidak perlu dihitung lama.",
    story: [
      "Warung Daun tidak berusaha jadi kafe hotel. Lantainya tanah yang sudah dipadatkan, daun pisangnya benar-benar tumbuh di situ, dan anjing pemiliknya kadang lewat.",
      "Pagi terasa sejuk. Siang, duduklah di bawah daun, bukan di tengah halaman.",
    ],
    image: "/photos/warung-daun.jpg",
    imageAlt: "Cangkir tanah liat di bangku kayu, dikelilingi daun pisang dan cahaya matahari yang tembus.",
    menu: [
      { name: "Kopi tubruk daun", price: 15000, note: "Hitam, gula merah di sisi" },
      { name: "Es kopi susu", price: 20000, note: "Gelas tebal" },
      { name: "Jeruk hangat", price: 15000, note: "Peras di tempat" },
      { name: "Pisang rebus", price: 12000, note: "Dengan kelapa parut" },
    ],
    crowd: crowd("000000012233322211100000"),
    signature: "Kopi tubruk daun",
  },
  {
    slug: "studio-tujuh",
    name: "Studio Tujuh",
    district: "Sungai Pinang",
    neighborhood: "Rapak Indah",
    address: "Jl. Rapak Indah No. 7",
    lat: -0.4628,
    lng: 117.1762,
    price: "premium",
    moods: ["fokus"],
    facilities: ["wifi", "colokan", "ac", "meeting", "parkir", "bebas-asap"],
    open: "08:00",
    close: "21:00",
    blurb: "Meja panjang, aturan suara pelan, kopi yang diisi lagi tanpa banyak tanya.",
    story: [
      "Studio Tujuh dibuat untuk orang yang membuka laptop dan tidak ingin dipandang aneh. Ada meja panjang, dua ruang rapat kecil, dan aturan yang ditempel pelan: telepon dibawa keluar.",
      "Batch brew diisi ulang sampai pukul empat. Setelah itu, kopinya kembali per cangkir.",
    ],
    image: "/photos/studio-tujuh.jpg",
    imageAlt: "Meja kayu panjang dengan buku catatan tertutup dan satu cangkir, dinding hijau zaitun di belakangnya.",
    menu: [
      { name: "Batch brew harian", price: 38000, note: "Isi ulang sampai pukul 16.00" },
      { name: "Espresso", price: 26000, note: "Untuk yang sudah selesai rapat" },
      { name: "Susu panas", price: 24000, note: "Tanpa kopi" },
      { name: "Roti gandum", price: 28000, note: "Mentega dan garam" },
    ],
    crowd: crowd("000000013333322222210000"),
    signature: "Batch brew harian",
  },
  {
    slug: "kopi-pelabuhan",
    name: "Kopi Pelabuhan",
    district: "Samarinda Seberang",
    neighborhood: "Sungai Keledang",
    address: "Jl. Gerilya, tepi sungai",
    lat: -0.5142,
    lng: 117.1824,
    price: "hemat",
    moods: ["santai", "nongkrong"],
    facilities: ["outdoor", "wifi", "parkir"],
    open: "07:00",
    close: "17:00",
    blurb: "Dek kayu menghadap sungai. Pagi di sini lebih pelan daripada jalan di seberang.",
    story: [
      "Kopi Pelabuhan duduk di dek yang sudah menghitam kena cuaca. Tidak ada AC, tidak ada playlist. Yang ada angin sungai dan gelas kopi susu yang tebal.",
      "Paling enak sebelum pukul sembilan. Siang, cari sisi yang beratap.",
    ],
    image: "/photos/kopi-pelabuhan.jpg",
    imageAlt: "Gelas kopi susu di dek kayu menghadap sungai lebar, dengan perahu jauh di kabut pagi.",
    menu: [
      { name: "Kopi susu kental", price: 18000, note: "Gelas tebal, manis sedang" },
      { name: "Kopi hitam", price: 12000, note: "Tubruk" },
      { name: "Teh manis", price: 10000, note: "Panas" },
      { name: "Pisang goreng", price: 15000, note: "Selagi hangat" },
    ],
    crowd: crowd("000000233322110000000000"),
    signature: "Kopi susu kental",
  },
  {
    slug: "teras-kencana",
    name: "Teras Kencana",
    district: "Samarinda Utara",
    neighborhood: "Sempaja",
    address: "Jl. Sempaja No. 40",
    lat: -0.4426,
    lng: 117.1518,
    price: "sedang",
    moods: ["kencan", "foto", "santai"],
    facilities: ["outdoor", "wifi", "ac", "parkir", "bebas-asap", "vegan"],
    open: "11:00",
    close: "22:00",
    blurb: "Teras taman dengan meja kecil untuk dua. Sore jatuh di tembok bata.",
    story: [
      "Teras Kencana terasa seperti halaman belakang yang dirapikan, bukan ballroom. Mejanya kecil, tanamannya dibiarkan naik ke dinding, dan lilin hanya dinyalakan setelah magrib.",
      "Untuk berdua. Kalau bertiga, minta meja di dalam — AC-nya pelan, tidak mengeras.",
    ],
    image: "/photos/teras-kencana.jpg",
    imageAlt: "Meja batu kecil di teras taman saat senja, dua gelas kopi, lilin kuningan, dan tanaman merambat.",
    menu: [
      { name: "Cold brew jeruk", price: 38000, note: "Asam ringan, tanpa sirup" },
      { name: "Cappuccino", price: 34000, note: "Susu sapi atau oat" },
      { name: "Teh earl grey", price: 26000, note: "Panas" },
      { name: "Kue cokelat kecil", price: 30000, note: "Satu potong, tidak terlalu manis" },
    ],
    crowd: crowd("000000000012233333221000"),
    signature: "Cold brew jeruk",
  },
  {
    slug: "pagi-buta",
    name: "Pagi Buta",
    district: "Sambutan",
    neighborhood: "Selili",
    address: "Jl. Sultan Sulaiman No. 3, Selili",
    lat: -0.4914,
    lng: 117.2012,
    price: "hemat",
    moods: ["fokus", "santai"],
    facilities: ["wifi", "colokan", "bebas-asap", "parkir"],
    open: "06:00",
    close: "14:00",
    blurb: "Buka saat kota masih sepi. Untuk orang yang mulai hari dengan diam.",
    story: [
      "Pagi Buta tidak punya menu panjang. Espresso, kopi susu, dan roti. Kursinya keras dengan sengaja, supaya orang tidak tidur di atas laptop.",
      "Tutup pukul dua. Kalau datang setelah tengah hari, pintunya sudah dikunci dan lampunya dimatikan.",
    ],
    image: "/photos/pagi-buta.jpg",
    imageAlt: "Mangkuk keramik berisi biji kopi di meja, cahaya pagi, mesin espresso tampak samar di belakang.",
    menu: [
      { name: "Espresso pendek", price: 18000, note: "Tidak ada ukuran besar" },
      { name: "Kopi susu", price: 22000, note: "Panas" },
      { name: "Roti bakar mentega", price: 15000, note: "Satu iris tebal" },
      { name: "Air mineral", price: 8000, note: "Gelas, isi ulang" },
    ],
    crowd: crowd("000001233210000000000000"),
    signature: "Espresso pendek",
  },
  {
    slug: "sudut-malam",
    name: "Sudut Malam",
    district: "Palaran",
    neighborhood: "Rawa Makmur",
    address: "Jl. Poros Palaran, Rawa Makmur",
    lat: -0.5524,
    lng: 117.1688,
    price: "sedang",
    moods: ["hujan", "nongkrong", "kencan"],
    facilities: ["wifi", "ac", "live", "larut", "bebas-asap"],
    open: "16:00",
    close: "01:00",
    blurb: "Ruang dengar kecil. Setelah pukul sembilan, lampunya lebih rendah.",
    story: [
      "Sudut Malam terasa seperti ruang tamu yang disepakati untuk didatangi orang lain. Vinyl diputar pelan, kursinya beludru zaitun, dan tidak ada layar televisi.",
      "Sabtu ada set akustik satu jam. Hari lain, cukup datang untuk tidak pulang terlalu cepat.",
    ],
    image: "/photos/sudut-malam.jpg",
    imageAlt: "Kursi beludru hijau dan cangkir espresso di ruang kafe yang remang, dengan rak piringan hitam di latar.",
    menu: [
      { name: "Espresso tonic", price: 36000, note: "Pahit, dingin" },
      { name: "Kopi susu aren", price: 30000, note: "Panas" },
      { name: "Teh hitam", price: 22000, note: "Tanpa gula, kecuali diminta" },
      { name: "Kacang tanah sangrai", price: 18000, note: "Mangkuk kecil" },
    ],
    crowd: crowd("100000000000000023333310"),
    signature: "Espresso tonic",
  },
];

export const heroImage = {
  src: "/photos/hero.jpg",
  alt: "Espreso menuang ke cangkir keramik krem di meja kayu, dengan ubin terracotta dan vas kuningan.",
};

const bySlug = new Map(cafes.map((cafe) => [cafe.slug, cafe]));

export function getCafe(slug: string): Cafe | undefined {
  return bySlug.get(slug);
}

export const featuredSlugs = [
  "atelier-kopi",
  "rumah-hujan",
  "lantai-dua",
  "kedai-senja",
] as const;

export const CITY_CENTER = { lat: -0.5022, lng: 117.1536, label: "pusat kota" };
