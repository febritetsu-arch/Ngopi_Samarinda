export type Coupon = {
  id: string;
  cafe: string;
  off: string;
  note: string;
  until: string;
};

/** Contoh promo. Bukan voucher sungguhan. */
export const coupons: Coupon[] = [
  {
    id: "atelier-15",
    cafe: "Atelier Kopi",
    off: "15% OFF",
    note: "Menu minuman saja",
    until: "31 Jul 2027",
  },
  {
    id: "hujan-10",
    cafe: "Rumah Hujan",
    off: "10% OFF",
    note: "Menu minuman saja",
    until: "31 Jul 2027",
  },
  {
    id: "senja-10",
    cafe: "Kedai Senja",
    off: "10% OFF",
    note: "Sekali pakai",
    until: "31 Jul 2027",
  },
];
