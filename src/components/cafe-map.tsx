import { useEffect, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import type { Cafe } from "@/data/cafes";
import "leaflet/dist/leaflet.css";

function makePin(active: boolean) {
  return L.divIcon({
    className: "cafe-pin",
    html: `<span class="${active ? "pin pin-on" : "pin"}"></span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  });
}

function Camera({ cafes, selected }: { cafes: Cafe[]; selected?: Cafe }) {
  const map = useMap();
  const signature = `${selected?.slug ?? "_"}|${cafes.map((cafe) => cafe.slug).join(",")}`;
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(() => map.invalidateSize(), 80);
    if (selected) {
      map.flyTo([selected.lat, selected.lng], 15, { duration: reduce ? 0 : 0.7 });
    } else if (cafes.length) {
      const bounds = L.latLngBounds(cafes.map((cafe) => [cafe.lat, cafe.lng]));
      map.fitBounds(bounds, { padding: [36, 36], animate: !reduce });
    }
    return () => window.clearTimeout(id);
  }, [map, signature]);
  return null;
}

export function CafeMap({
  cafes,
  selected,
  onSelect,
}: {
  cafes: Cafe[];
  selected?: string;
  onSelect: (slug: string) => void;
}) {
  const active = cafes.find((cafe) => cafe.slug === selected);
  const idle = useMemo(() => makePin(false), []);
  const hot = useMemo(() => makePin(true), []);

  return (
    <MapContainer
      center={[-0.5, 117.15]}
      zoom={12}
      className="h-full w-full"
      scrollWheelZoom
      zoomControl
    >
      <TileLayer
        attribution='&copy; OpenStreetMap &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <Camera cafes={cafes} selected={active} />
      {cafes.map((cafe) => (
        <Marker
          key={cafe.slug}
          position={[cafe.lat, cafe.lng]}
          icon={cafe.slug === selected ? hot : idle}
          eventHandlers={{ click: () => onSelect(cafe.slug) }}
        >
          <Popup className="cafe-popup">
            <p className="text-xs font-medium tracking-wide text-olive">{cafe.district}</p>
            <p className="font-display text-xl text-ink">{cafe.name}</p>
            <Link
              to="/kafe/$slug"
              params={{ slug: cafe.slug }}
              className="mt-2 inline-flex min-h-11 items-center text-sm underline decoration-line underline-offset-4"
            >
              Lihat kafe
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
