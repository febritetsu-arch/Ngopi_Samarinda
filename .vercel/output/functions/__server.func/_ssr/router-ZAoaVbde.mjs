import { i as __toESM } from "../_runtime.mjs";
import { f as require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { C as require_jsx_runtime, S as useRouter, Y as notFound, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { d as Map$1, h as Compass, m as House, o as RotateCw, r as TriangleAlert, y as Bookmark } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cafes-CGfhm6Et.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var moods = {
	fokus: {
		label: "Fokus",
		line: "Meja tenang, colokan dekat, dan suara yang tidak naik."
	},
	santai: {
		label: "Santai",
		line: "Tidak buru-buru. Cahaya lembut, kursi yang enak diduduki lama."
	},
	nongkrong: {
		label: "Nongkrong",
		line: "Untuk obrolan yang muat lebih dari dua orang."
	},
	foto: {
		label: "Foto",
		line: "Cahaya yang bagus, tanpa perlu berpose di depan tanda."
	},
	kencan: {
		label: "Kencan",
		line: "Cukup intim untuk dua, tidak sampai hening canggung."
	},
	hujan: {
		label: "Hujan",
		line: "Saat langit Samarinda turun, yang dicari lampu hangat."
	}
};
var moodOrder = [
	"fokus",
	"santai",
	"nongkrong",
	"foto",
	"kencan",
	"hujan"
];
var districts = [
	"Samarinda Utara",
	"Sungai Pinang",
	"Samarinda Ulu",
	"Samarinda Kota",
	"Samarinda Ilir",
	"Sungai Kunjang",
	"Sambutan",
	"Samarinda Seberang",
	"Palaran",
	"Loa Janan Ilir"
];
var prices = {
	hemat: {
		label: "Hemat",
		range: "Rp18–28rb"
	},
	sedang: {
		label: "Sedang",
		range: "Rp28–45rb"
	},
	premium: {
		label: "Premium",
		range: "Rp45–70rb"
	}
};
var facilities = {
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
	larut: { label: "Buka larut" }
};
function crowd(pattern) {
	if (pattern.length !== 24 || /[^0-3]/.test(pattern)) throw new Error(`Pola keramaian tidak valid: ${pattern}`);
	return [...pattern].map((n) => Number(n));
}
var cafes = [
	{
		slug: "atelier-kopi",
		name: "Atelier Kopi",
		district: "Samarinda Kota",
		neighborhood: "Kampung Baru",
		address: "Jl. Kakap No. 12, Kampung Baru",
		lat: -.4988,
		lng: 117.1452,
		price: "premium",
		moods: ["fokus", "foto"],
		facilities: [
			"wifi",
			"colokan",
			"ac",
			"parkir",
			"bebas-asap",
			"meeting"
		],
		open: "07:30",
		close: "18:00",
		blurb: "Studio yang sunyi di pagi hari, sebelum kota benar-benar bangun.",
		story: ["Atelier Kopi menempati bekas ruang jahit di Jalan Kakap. Mejanya sedikit, colokan ada di setiap sisi, dan musik tidak pernah naik di atas bisikan.", "Pagi dipakai orang yang butuh dua jam tanpa diganggu. Setelah pukul dua, meja panjang di belakang lebih sering jadi rapat kecil."],
		image: "/photos/atelier-kopi.jpg",
		imageAlt: "Meja kayu dengan dripper pour-over, buku catatan tertutup, dan cangkir krem di ruang kafe yang terang.",
		menu: [
			{
				name: "V60 Empat Pagi",
				price: 48e3,
				note: "Single origin, seduh pelan"
			},
			{
				name: "Espresso pendek",
				price: 28e3,
				note: "Dua teguk, tanpa gula"
			},
			{
				name: "Flat white",
				price: 42e3,
				note: "Susu oat atau susu sapi"
			},
			{
				name: "Pisang panggang",
				price: 32e3,
				note: "Gula merah, porsi kecil"
			}
		],
		crowd: crowd("000000123332122211000000"),
		signature: "V60 Empat Pagi"
	},
	{
		slug: "rumah-hujan",
		name: "Rumah Hujan",
		district: "Samarinda Ulu",
		neighborhood: "Air Putih",
		address: "Jl. Juanda No. 88, Air Putih",
		lat: -.4768,
		lng: 117.1234,
		price: "sedang",
		moods: [
			"hujan",
			"kencan",
			"santai"
		],
		facilities: [
			"wifi",
			"ac",
			"bebas-asap",
			"vegan"
		],
		open: "10:00",
		close: "21:00",
		blurb: "Jendela besar dan lampu kuningan. Terasa tepat saat hujan turun.",
		story: ["Rumah Hujan memang didesain untuk hari yang basah. Kursinya menghadap jendela, lampunya rendah, dan tidak ada meja yang terlalu dekat dengan meja lain.", "Berdua terasa cukup. Kalau datang sendiri, sudut dekat rak buku biasanya kosong sampai sore."],
		image: "/photos/rumah-hujan.jpg",
		imageAlt: "Dua cangkir kopi di meja kayu, lampu kuningan, dan jendela dengan hujan di luar.",
		menu: [
			{
				name: "Kopi jahe gula merah",
				price: 32e3,
				note: "Hangat, tidak terlalu manis"
			},
			{
				name: "Es kopi susu",
				price: 3e4,
				note: "Susu evaporasi"
			},
			{
				name: "Cokelat oat",
				price: 34e3,
				note: "Tanpa susu sapi"
			},
			{
				name: "Pisang keju kukus",
				price: 28e3,
				note: "Porsi untuk dibagi"
			}
		],
		crowd: crowd("000000000012233332210000"),
		signature: "Kopi jahe gula merah"
	},
	{
		slug: "lantai-dua",
		name: "Lantai Dua",
		district: "Samarinda Ilir",
		neighborhood: "Mesjid",
		address: "Jl. Bhayangkara No. 21, Mesjid",
		lat: -.5036,
		lng: 117.1564,
		price: "premium",
		moods: ["foto", "kencan"],
		facilities: [
			"outdoor",
			"ac",
			"parkir",
			"bebas-asap",
			"wifi"
		],
		open: "15:00",
		close: "22:30",
		blurb: "Teras lantai dua yang menghadap senja, jarak duduknya tidak rapat.",
		story: ["Naik tangga sempit di belakang toko kain, lalu kotanya terasa lebih rendah. Terasnya menghadap barat, jadi pukul empat sampai enam adalah alasan orang datang.", "Tidak ada papan nama besar. Cahayanya datang dari langit, bukan dari lampu cincin."],
		image: "/photos/lantai-dua.jpg",
		imageAlt: "Kursi rotan di teras kafe saat senja, dengan sungai dan perahu di kejauhan.",
		menu: [
			{
				name: "Dirty aren",
				price: 46e3,
				note: "Espresso di atas susu aren dingin"
			},
			{
				name: "Cold brew",
				price: 42e3,
				note: "Seduh 16 jam"
			},
			{
				name: "Teh melati",
				price: 28e3,
				note: "Panas atau es"
			},
			{
				name: "Kue lapis bakar",
				price: 36e3,
				note: "Satu loyang kecil"
			}
		],
		crowd: crowd("000000000000000123332100"),
		signature: "Dirty aren"
	},
	{
		slug: "kedai-senja",
		name: "Kedai Senja",
		district: "Sungai Kunjang",
		neighborhood: "Loa Bakung",
		address: "Jl. M. Yamin Dalam No. 5, Loa Bakung",
		lat: -.5224,
		lng: 117.0988,
		price: "sedang",
		moods: ["nongkrong", "santai"],
		facilities: [
			"wifi",
			"outdoor",
			"parkir",
			"live",
			"larut"
		],
		open: "15:00",
		close: "23:00",
		blurb: "Halaman dengan lampu rendah, untuk obrolan yang tidak harus selesai hari ini.",
		story: ["Kedai Senja adalah halaman rumah yang dibuka jadi kafe. Kursi rotan, dinding terracotta, dan panggung kecil yang hanya dipakai Jumat.", "Datang berempat masih muat. Setelah pukul delapan suaranya naik, jadi ini bukan tempat untuk rapat."],
		image: "/photos/kedai-senja.jpg",
		imageAlt: "Halaman kafe saat senja dengan dinding terracotta, kursi rotan, dan dua cangkir di meja kayu.",
		menu: [
			{
				name: "Es kopi susu aren",
				price: 28e3,
				note: "Manisnya bisa dikurangi"
			},
			{
				name: "Kopi tubruk",
				price: 18e3,
				note: "Gula terpisah"
			},
			{
				name: "Teh tarik",
				price: 22e3,
				note: "Tidak terlalu kental"
			},
			{
				name: "Pisang goreng keju",
				price: 24e3,
				note: "Empat potong"
			}
		],
		crowd: crowd("000000000000000122333210"),
		signature: "Es kopi susu aren"
	},
	{
		slug: "warung-daun",
		name: "Warung Daun",
		district: "Loa Janan Ilir",
		neighborhood: "Simpang Tiga",
		address: "Jl. Cempaka, Simpang Tiga",
		lat: -.5682,
		lng: 117.1126,
		price: "hemat",
		moods: [
			"santai",
			"nongkrong",
			"foto"
		],
		facilities: [
			"outdoor",
			"parkir",
			"pet",
			"vegan",
			"wifi"
		],
		open: "08:00",
		close: "20:00",
		blurb: "Kebun kecil di belakang rumah. Bangku kayu, harga yang tidak perlu dihitung lama.",
		story: ["Warung Daun tidak berusaha jadi kafe hotel. Lantainya tanah yang sudah dipadatkan, daun pisangnya benar-benar tumbuh di situ, dan anjing pemiliknya kadang lewat.", "Pagi terasa sejuk. Siang, duduklah di bawah daun, bukan di tengah halaman."],
		image: "/photos/warung-daun.jpg",
		imageAlt: "Cangkir tanah liat di bangku kayu, dikelilingi daun pisang dan cahaya matahari yang tembus.",
		menu: [
			{
				name: "Kopi tubruk daun",
				price: 15e3,
				note: "Hitam, gula merah di sisi"
			},
			{
				name: "Es kopi susu",
				price: 2e4,
				note: "Gelas tebal"
			},
			{
				name: "Jeruk hangat",
				price: 15e3,
				note: "Peras di tempat"
			},
			{
				name: "Pisang rebus",
				price: 12e3,
				note: "Dengan kelapa parut"
			}
		],
		crowd: crowd("000000012233322211100000"),
		signature: "Kopi tubruk daun"
	},
	{
		slug: "studio-tujuh",
		name: "Studio Tujuh",
		district: "Sungai Pinang",
		neighborhood: "Rapak Indah",
		address: "Jl. Rapak Indah No. 7",
		lat: -.4628,
		lng: 117.1762,
		price: "premium",
		moods: ["fokus"],
		facilities: [
			"wifi",
			"colokan",
			"ac",
			"meeting",
			"parkir",
			"bebas-asap"
		],
		open: "08:00",
		close: "21:00",
		blurb: "Meja panjang, aturan suara pelan, kopi yang diisi lagi tanpa banyak tanya.",
		story: ["Studio Tujuh dibuat untuk orang yang membuka laptop dan tidak ingin dipandang aneh. Ada meja panjang, dua ruang rapat kecil, dan aturan yang ditempel pelan: telepon dibawa keluar.", "Batch brew diisi ulang sampai pukul empat. Setelah itu, kopinya kembali per cangkir."],
		image: "/photos/studio-tujuh.jpg",
		imageAlt: "Meja kayu panjang dengan buku catatan tertutup dan satu cangkir, dinding hijau zaitun di belakangnya.",
		menu: [
			{
				name: "Batch brew harian",
				price: 38e3,
				note: "Isi ulang sampai pukul 16.00"
			},
			{
				name: "Espresso",
				price: 26e3,
				note: "Untuk yang sudah selesai rapat"
			},
			{
				name: "Susu panas",
				price: 24e3,
				note: "Tanpa kopi"
			},
			{
				name: "Roti gandum",
				price: 28e3,
				note: "Mentega dan garam"
			}
		],
		crowd: crowd("000000013333322222210000"),
		signature: "Batch brew harian"
	},
	{
		slug: "kopi-pelabuhan",
		name: "Kopi Pelabuhan",
		district: "Samarinda Seberang",
		neighborhood: "Sungai Keledang",
		address: "Jl. Gerilya, tepi sungai",
		lat: -.5142,
		lng: 117.1824,
		price: "hemat",
		moods: ["santai", "nongkrong"],
		facilities: [
			"outdoor",
			"wifi",
			"parkir"
		],
		open: "07:00",
		close: "17:00",
		blurb: "Dek kayu menghadap sungai. Pagi di sini lebih pelan daripada jalan di seberang.",
		story: ["Kopi Pelabuhan duduk di dek yang sudah menghitam kena cuaca. Tidak ada AC, tidak ada playlist. Yang ada angin sungai dan gelas kopi susu yang tebal.", "Paling enak sebelum pukul sembilan. Siang, cari sisi yang beratap."],
		image: "/photos/kopi-pelabuhan.jpg",
		imageAlt: "Gelas kopi susu di dek kayu menghadap sungai lebar, dengan perahu jauh di kabut pagi.",
		menu: [
			{
				name: "Kopi susu kental",
				price: 18e3,
				note: "Gelas tebal, manis sedang"
			},
			{
				name: "Kopi hitam",
				price: 12e3,
				note: "Tubruk"
			},
			{
				name: "Teh manis",
				price: 1e4,
				note: "Panas"
			},
			{
				name: "Pisang goreng",
				price: 15e3,
				note: "Selagi hangat"
			}
		],
		crowd: crowd("000000233322110000000000"),
		signature: "Kopi susu kental"
	},
	{
		slug: "teras-kencana",
		name: "Teras Kencana",
		district: "Samarinda Utara",
		neighborhood: "Sempaja",
		address: "Jl. Sempaja No. 40",
		lat: -.4426,
		lng: 117.1518,
		price: "sedang",
		moods: [
			"kencan",
			"foto",
			"santai"
		],
		facilities: [
			"outdoor",
			"wifi",
			"ac",
			"parkir",
			"bebas-asap",
			"vegan"
		],
		open: "11:00",
		close: "22:00",
		blurb: "Teras taman dengan meja kecil untuk dua. Sore jatuh di tembok bata.",
		story: ["Teras Kencana terasa seperti halaman belakang yang dirapikan, bukan ballroom. Mejanya kecil, tanamannya dibiarkan naik ke dinding, dan lilin hanya dinyalakan setelah magrib.", "Untuk berdua. Kalau bertiga, minta meja di dalam — AC-nya pelan, tidak mengeras."],
		image: "/photos/teras-kencana.jpg",
		imageAlt: "Meja batu kecil di teras taman saat senja, dua gelas kopi, lilin kuningan, dan tanaman merambat.",
		menu: [
			{
				name: "Cold brew jeruk",
				price: 38e3,
				note: "Asam ringan, tanpa sirup"
			},
			{
				name: "Cappuccino",
				price: 34e3,
				note: "Susu sapi atau oat"
			},
			{
				name: "Teh earl grey",
				price: 26e3,
				note: "Panas"
			},
			{
				name: "Kue cokelat kecil",
				price: 3e4,
				note: "Satu potong, tidak terlalu manis"
			}
		],
		crowd: crowd("000000000012233333221000"),
		signature: "Cold brew jeruk"
	},
	{
		slug: "pagi-buta",
		name: "Pagi Buta",
		district: "Sambutan",
		neighborhood: "Selili",
		address: "Jl. Sultan Sulaiman No. 3, Selili",
		lat: -.4914,
		lng: 117.2012,
		price: "hemat",
		moods: ["fokus", "santai"],
		facilities: [
			"wifi",
			"colokan",
			"bebas-asap",
			"parkir"
		],
		open: "06:00",
		close: "14:00",
		blurb: "Buka saat kota masih sepi. Untuk orang yang mulai hari dengan diam.",
		story: ["Pagi Buta tidak punya menu panjang. Espresso, kopi susu, dan roti. Kursinya keras dengan sengaja, supaya orang tidak tidur di atas laptop.", "Tutup pukul dua. Kalau datang setelah tengah hari, pintunya sudah dikunci dan lampunya dimatikan."],
		image: "/photos/pagi-buta.jpg",
		imageAlt: "Mangkuk keramik berisi biji kopi di meja, cahaya pagi, mesin espresso tampak samar di belakang.",
		menu: [
			{
				name: "Espresso pendek",
				price: 18e3,
				note: "Tidak ada ukuran besar"
			},
			{
				name: "Kopi susu",
				price: 22e3,
				note: "Panas"
			},
			{
				name: "Roti bakar mentega",
				price: 15e3,
				note: "Satu iris tebal"
			},
			{
				name: "Air mineral",
				price: 8e3,
				note: "Gelas, isi ulang"
			}
		],
		crowd: crowd("000001233210000000000000"),
		signature: "Espresso pendek"
	},
	{
		slug: "sudut-malam",
		name: "Sudut Malam",
		district: "Palaran",
		neighborhood: "Rawa Makmur",
		address: "Jl. Poros Palaran, Rawa Makmur",
		lat: -.5524,
		lng: 117.1688,
		price: "sedang",
		moods: [
			"hujan",
			"nongkrong",
			"kencan"
		],
		facilities: [
			"wifi",
			"ac",
			"live",
			"larut",
			"bebas-asap"
		],
		open: "16:00",
		close: "01:00",
		blurb: "Ruang dengar kecil. Setelah pukul sembilan, lampunya lebih rendah.",
		story: ["Sudut Malam terasa seperti ruang tamu yang disepakati untuk didatangi orang lain. Vinyl diputar pelan, kursinya beludru zaitun, dan tidak ada layar televisi.", "Sabtu ada set akustik satu jam. Hari lain, cukup datang untuk tidak pulang terlalu cepat."],
		image: "/photos/sudut-malam.jpg",
		imageAlt: "Kursi beludru hijau dan cangkir espresso di ruang kafe yang remang, dengan rak piringan hitam di latar.",
		menu: [
			{
				name: "Espresso tonic",
				price: 36e3,
				note: "Pahit, dingin"
			},
			{
				name: "Kopi susu aren",
				price: 3e4,
				note: "Panas"
			},
			{
				name: "Teh hitam",
				price: 22e3,
				note: "Tanpa gula, kecuali diminta"
			},
			{
				name: "Kacang tanah sangrai",
				price: 18e3,
				note: "Mangkuk kecil"
			}
		],
		crowd: crowd("100000000000000023333310"),
		signature: "Espresso tonic"
	}
];
var heroImage = {
	src: "/photos/hero.jpg",
	alt: "Espreso menuang ke cangkir keramik krem di meja kayu, dengan ubin terracotta dan vas kuningan."
};
var bySlug = new Map(cafes.map((cafe) => [cafe.slug, cafe]));
function getCafe(slug) {
	return bySlug.get(slug);
}
var featuredSlugs = [
	"atelier-kopi",
	"rumah-hujan",
	"lantai-dua",
	"kedai-senja"
];
var CITY_CENTER = {
	lat: -.5022,
	lng: 117.1536,
	label: "pusat kota"
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/cafe-time-CkbjvsKM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function parts(date) {
	const list = new Intl.DateTimeFormat("en-GB", {
		timeZone: "Asia/Makassar",
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23"
	}).formatToParts(date);
	const pick = (type) => list.find((part) => part.type === type)?.value ?? "00";
	return {
		hour: Number(pick("hour")),
		minute: Number(pick("minute"))
	};
}
function toMinutes(hhmm) {
	const [h, m] = hhmm.split(":").map(Number);
	return h * 60 + m;
}
function formatClock(hhmm) {
	return hhmm.replace(":", ".");
}
function formatHours(cafe) {
	return `${formatClock(cafe.open)}–${formatClock(cafe.close)}`;
}
function statusAt(cafe, date) {
	const { hour, minute } = parts(date);
	const now = hour * 60 + minute;
	const openMins = toMinutes(cafe.open);
	const closeMins = toMinutes(cafe.close);
	const open = closeMins > openMins ? now >= openMins && now < closeMins : now >= openMins || now < closeMins;
	const level = cafe.crowd[hour] ?? 0;
	return {
		open,
		crowd: open ? !open || level <= 1 ? "sepi" : level === 2 ? "sedang" : "ramai" : "sepi",
		clock: `${String(hour).padStart(2, "0")}.${String(minute).padStart(2, "0")} WITA`,
		hour
	};
}
function formatRp(value) {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumFractionDigits: 0
	}).format(value);
}
function distanceKm(lat, lng, fromLat, fromLng) {
	const r = 6371;
	const dLat = (lat - fromLat) * Math.PI / 180;
	const dLng = (lng - fromLng) * Math.PI / 180;
	const a = Math.sin(dLat / 2) ** 2 + Math.cos(fromLat * Math.PI / 180) * Math.cos(lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
	return r * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function formatKm(km) {
	if (km < 1) return `${Math.round(km * 1e3)} m`;
	return `${km.toFixed(1).replace(".", ",")} km`;
}
/** Null sampai terpasang di klien, supaya jam tidak beda antara server dan layar. */
function useNow() {
	const [now, setNow] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const tick = () => setNow(/* @__PURE__ */ new Date());
		tick();
		const id = window.setInterval(tick, 6e4);
		return () => window.clearInterval(id);
	}, []);
	return now;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/discover-BCrRUwDC.js
var moodSet = new Set(Object.keys(moods));
var priceSet = new Set(Object.keys(prices));
var districtSet = new Set(districts);
var sortSet = /* @__PURE__ */ new Set([
	"kurasi",
	"harga",
	"sepi"
]);
function text(value) {
	return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function readDiscover(search) {
	const mood = text(search.mood);
	const district = text(search.district);
	const price = text(search.price);
	const sort = text(search.sort);
	const facility = text(search.facility);
	return {
		q: text(search.q),
		mood: mood && moodSet.has(mood) ? mood : void 0,
		district: district && districtSet.has(district) ? district : void 0,
		price: price && priceSet.has(price) ? price : void 0,
		facility: facility?.split(",").map((id) => id.trim()).filter((id) => id in facilities).sort().join(",") || void 0,
		open: search.open === "1" || search.open === 1 || search.open === true ? "1" : void 0,
		sort: sort && sortSet.has(sort) ? sort : void 0
	};
}
function facilityList(value) {
	if (!value) return [];
	return value.split(",").filter((id) => id in facilities);
}
function toggleFacility(current, id) {
	const next = new Set(facilityList(current));
	if (next.has(id)) next.delete(id);
	else next.add(id);
	return [...next].sort().join(",") || void 0;
}
function filterCafes(search, now) {
	const q = search.q?.toLocaleLowerCase("id");
	const wanted = facilityList(search.facility);
	let list = cafes.filter((cafe) => {
		if (search.mood && !cafe.moods.includes(search.mood)) return false;
		if (search.district && cafe.district !== search.district) return false;
		if (search.price && cafe.price !== search.price) return false;
		if (wanted.length && !wanted.every((id) => cafe.facilities.includes(id))) return false;
		if (search.open === "1") {
			if (!now) return true;
			if (!statusAt(cafe, now).open) return false;
		}
		if (!q) return true;
		return [
			cafe.name,
			cafe.district,
			cafe.neighborhood,
			cafe.blurb,
			cafe.signature,
			...cafe.moods.map((id) => moods[id].label),
			...cafe.menu.map((item) => item.name)
		].join(" ").toLocaleLowerCase("id").includes(q);
	});
	if (search.sort === "harga") {
		const rank = {
			hemat: 0,
			sedang: 1,
			premium: 2
		};
		list = [...list].sort((a, b) => rank[a.price] - rank[b.price]);
	} else if (search.sort === "sepi" && now) {
		const score = (cafe) => {
			const state = statusAt(cafe, now);
			if (!state.open) return 9;
			if (state.crowd === "sepi") return 0;
			if (state.crowd === "sedang") return 1;
			return 2;
		};
		list = [...list].sort((a, b) => score(a) - score(b));
	}
	return list;
}
function searchActive(search) {
	return Boolean(search.q || search.mood || search.district || search.price || search.facility || search.open || search.sort);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-ZAoaVbde.js
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var KEY = "ngopisamarinda-simpan";
function readIds() {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed)) return parsed.filter((id) => typeof id === "string");
		if (parsed && typeof parsed === "object" && "state" in parsed && Array.isArray(parsed.state?.ids)) return parsed.state.ids.filter((id) => typeof id === "string");
	} catch {
		return [];
	}
	return [];
}
function writeIds(ids) {
	try {
		localStorage.setItem(KEY, JSON.stringify(ids));
	} catch {}
}
var useWishlist = create((set, get) => ({
	ids: [],
	ready: false,
	toggle: (id) => {
		const base = get().ready ? get().ids : readIds();
		const ids = base.includes(id) ? base.filter((item) => item !== id) : [...base, id];
		set({
			ids,
			ready: true
		});
		writeIds(ids);
	},
	clear: () => {
		set({
			ids: [],
			ready: true
		});
		writeIds([]);
	}
}));
function useWishlistReady() {
	const ready = useWishlist((state) => state.ready);
	(0, import_react.useEffect)(() => {
		if (useWishlist.getState().ready) return;
		useWishlist.setState({
			ids: readIds(),
			ready: true
		});
	}, []);
	return ready;
}
var tabs = [
	{
		to: "/",
		label: "Beranda",
		icon: House
	},
	{
		to: "/jelajah",
		label: "Jelajah",
		icon: Compass
	},
	{
		to: "/peta",
		label: "Peta",
		icon: Map$1
	},
	{
		to: "/roulette",
		label: "Roulette",
		icon: RotateCw
	},
	{
		to: "/simpan",
		label: "Simpan",
		icon: Bookmark
	}
];
function isOn(path, to) {
	if (to === "/") return path === "/";
	return path === to || path.startsWith(`${to}/`);
}
function Shell() {
	const path = useRouterState({ select: (state) => state.location.pathname });
	const night = path === "/roulette";
	useWishlistReady();
	const count = useWishlist((state) => state.ready ? state.ids.length : 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex min-h-dvh flex-col", night ? "bg-ink text-paper" : "bg-paper text-ink"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#isi",
				className: "sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-paper focus:px-4 focus:py-2 focus:text-ink",
				children: "Loncat ke isi"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: cn("sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b px-5 lg:px-8", night ? "border-ink-soft bg-ink" : "border-line bg-paper/95"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex min-h-11 items-baseline gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl italic leading-none",
						children: "Ngopi"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("brand-city", night ? "text-paper/70" : "text-olive"),
						children: "Samarinda"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 lg:flex",
					"aria-label": "Utama",
					children: tabs.filter((tab) => tab.to !== "/").map((tab) => {
						const on = isOn(path, tab.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: tab.to,
							"aria-current": on ? "page" : void 0,
							className: cn("inline-flex min-h-11 items-center gap-2 px-3 text-sm", on ? "font-medium" : night ? "text-paper/70" : "text-muted"),
							children: [tab.label, tab.to === "/simpan" && count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-terracotta",
								children: count
							}) : null]
						}, tab.to);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "isi",
				className: "flex min-h-0 w-full min-w-0 flex-1 flex-col pb-16 lg:pb-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: cn("fixed inset-x-0 bottom-0 z-40 flex border-t tabbar lg:hidden", night ? "border-ink-soft bg-ink" : "border-line bg-paper"),
				"aria-label": "Utama",
				children: tabs.map((tab) => {
					const on = isOn(path, tab.to);
					const Icon = tab.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: tab.to,
						"aria-current": on ? "page" : void 0,
						className: cn("flex min-h-16 flex-1 flex-col items-center justify-center gap-1 text-xs tracking-wide", on ? "text-ink" : "text-muted", night && (on ? "text-paper" : "text-paper/70")),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-5",
							strokeWidth: on ? 2.2 : 1.7
						}), tab.label]
					}, tab.to);
				})
			})
		]
	});
}
var styles_default = "/assets/styles-CqupT2R5.css";
var APP_NAME = "NgopiSamarinda";
var Route$6 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Temukan kafe di Samarinda menurut suasana — fokus, santai, nongkrong, foto, kencan, atau hujan. Prototipe desain dengan data contoh."
			},
			{
				name: "theme-color",
				content: "#F6F0E6"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Outfit:wght@400;500;600&display=swap"
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "id",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$5 = () => import("./routes-BaCBPdY5.mjs");
var Route$5 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "NgopiSamarinda — kafe menurut suasana" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./jelajah-CEpDnFAx.mjs");
var Route$4 = createFileRoute("/jelajah")({
	validateSearch: (search) => readDiscover(search),
	head: () => ({ meta: [{ title: "Jelajah kafe · NgopiSamarinda" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./peta-CXUZ5Mr0.mjs");
function readMap(search) {
	const mood = typeof search.mood === "string" ? search.mood : void 0;
	return {
		kafe: typeof search.kafe === "string" ? search.kafe : void 0,
		mood: mood && mood in moods ? mood : void 0
	};
}
var Route$3 = createFileRoute("/peta")({
	validateSearch: (search) => readMap(search),
	head: () => ({ meta: [{ title: "Peta kafe · NgopiSamarinda" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./roulette-H0p-i7io.mjs");
var Route$2 = createFileRoute("/roulette")({
	head: () => ({ meta: [{ title: "Cafe Roulette · NgopiSamarinda" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./simpan-CT0322I7.mjs");
var Route$1 = createFileRoute("/simpan")({
	head: () => ({ meta: [{ title: "Simpanan · NgopiSamarinda" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./kafe._slug-B_8FAXkL.mjs");
var $$splitNotFoundComponentImporter = () => import("./kafe._slug-HUcY8hCg.mjs");
var Route = createFileRoute("/kafe/$slug")({
	loader: ({ params }) => {
		const cafe = getCafe(params.slug);
		if (!cafe) throw notFound();
		return cafe;
	},
	head: ({ params }) => {
		const cafe = getCafe(params.slug);
		return { meta: [{ title: cafe ? `${cafe.name} · NgopiSamarinda` : "Kafe tidak ditemukan · NgopiSamarinda" }] };
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$5.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$6
	}),
	JelajahRoute: Route$4.update({
		id: "/jelajah",
		path: "/jelajah",
		getParentRoute: () => Route$6
	}),
	PetaRoute: Route$3.update({
		id: "/peta",
		path: "/peta",
		getParentRoute: () => Route$6
	}),
	RouletteRoute: Route$2.update({
		id: "/roulette",
		path: "/roulette",
		getParentRoute: () => Route$6
	}),
	SimpanRoute: Route$1.update({
		id: "/simpan",
		path: "/simpan",
		getParentRoute: () => Route$6
	}),
	KafeSlugRoute: Route.update({
		id: "/kafe/$slug",
		path: "/kafe/$slug",
		getParentRoute: () => Route$6
	})
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { moodOrder as C, heroImage as S, prices as T, cafes as _, useWishlist as a, facilities as b, searchActive as c, formatHours as d, formatKm as f, CITY_CENTER as g, useNow as h, Route$4 as i, toggleFacility as l, statusAt as m, Route as n, filterCafes as o, formatRp as p, Route$3 as r, readDiscover as s, router_exports as t, distanceKm as u, cn as v, moods as w, featuredSlugs as x, districts as y };
