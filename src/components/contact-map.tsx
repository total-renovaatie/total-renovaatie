"use client";
import dynamic from "next/dynamic";

// Dynamically import the map with NO Server Side Rendering
const Map = dynamic(() => import("./map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-112.5 w-full animate-pulse items-center justify-center rounded-3xl border border-blue-100 bg-blue-50/50">
      <p className="text-sm font-medium text-blue-400">Kaart laden...</p>
    </div>
  ),
});

export default function ContactMap() {
  // Data from the business card
  const mapData = {
    lat: 51.18356,
    lng: 2.804782,
    address: "St-Theresiastraat, 7 bus 5/01, 8430 Middelkerke",
    companyName: "Bevatix BV / Comfort Home",
  };

  return (
    <section className="mx-6 py-12 md:mx-12">
      <div className="">
        <div className="h-112.5 w-full">
          <Map {...mapData} />outdoor
        </div>
      </div>
    </section>
  );
}
