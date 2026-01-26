"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default Leaflet icon missing in Next.js
const customIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapProps {
  lat: number;
  lng: number;
  address: string;
  companyName: string;
}

export default function Map({ lat, lng, address, companyName }: MapProps) {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <div className="h-full w-full overflow-hidden rounded-3xl border border-blue-50 shadow-[0_32px_64px_-16px_rgba(186,230,253,0.5)]">
      <MapContainer
        center={[lat, lng]}
        zoom={14}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // To make it more minimalist, you can use CartoDB Positron tiles:
          // url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={[lat, lng]} icon={customIcon}>
          <Popup className="custom-popup">
            <div className="p-1">
              <h3 className="font-bold text-slate-900">{companyName}</h3>
              <p className="mb-3 text-xs text-slate-600">{address}</p>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-lg bg-[#003358] px-3 py-2 text-center text-[10px] font-bold text-white transition-colors hover:bg-[#f37021]"
              >
                OPEN IN GOOGLE MAPS
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
