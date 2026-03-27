import React from 'react';
import { sampleHotels } from './SearchResults';
import { ChevronRight, MapPin, X } from 'lucide-react';
import { format } from 'date-fns';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';

interface Props {
  open: boolean;
  onClose: () => void;
  location?: string;
  checkIn?: Date;
  checkOut?: Date;
}

export default function SearchModal({ open, onClose, location, checkIn, checkOut }: Props) {
  if (!open) return null;

  const formatDate = (d?: Date) => (d ? format(d, 'MMM d, yyyy') : 'Any dates');

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute inset-0 flex items-start justify-center p-6">
        <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl overflow-hidden flex relative">
          <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-ocean-100 hover:bg-ocean-200 rounded-full transition-colors cursor-pointer">
            <X className="w-4 h-4 text-ocean-600" />
          </button>
          {/* Left: Results */}
          <div className="w-2/3 p-6 overflow-y-auto max-h-[85vh]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-ocean-500">Your search</div>
                <div className="font-semibold text-teal-accent">{location || 'All Locations'}</div>
                <div className="text-xs text-ocean-400">{formatDate(checkIn)} - {formatDate(checkOut)}</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-sm px-3 py-2 bg-ocean-50 rounded-md cursor-pointer">Sort by: Distance</button>
              </div>
            </div>

            {/* Grid of cards (2 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleHotels.map((hotel) => (
                <div key={hotel.id} className="bg-white rounded-2xl shadow-sm border border-ocean-100 overflow-hidden flex flex-col">
                  <div className="relative h-40 md:h-44">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                    {hotel.discount && (
                      <div className="absolute top-3 left-3 bg-teal-accent text-ocean-900 px-2 py-1 rounded-full text-xs font-bold">{hotel.discount}</div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg text-ocean-900">{hotel.name}</h3>
                      <div className="text-teal-accent font-bold">{hotel.currency}{hotel.price}</div>
                    </div>
                    <p className="text-sm text-ocean-500">{hotel.description}</p>
                    <div className="flex items-center gap-2 text-sm text-ocean-600">
                      <MapPin className="w-4 h-4 text-teal-accent" />
                      <span>{hotel.distance}</span>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="text-xs text-ocean-500">Based on {hotel.reviews} reviews</div>
                      <button className="flex items-center gap-2 bg-teal-accent hover:bg-teal-accent/80 text-ocean-900 px-3 py-2 rounded-lg cursor-pointer">
                        Select Dates <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination placeholder */}
            <div className="mt-6 flex justify-center">
              <div className="text-sm text-ocean-500">Page 1 of 1</div>
            </div>
          </div>

          {/* Right: Map */}
          <div className="w-1/3 border-l border-ocean-100 p-4 relative">
            <div className="text-sm text-ocean-500 mb-3">Map</div>
            <div className="w-full h-[75vh] rounded-xl overflow-hidden">
              {(() => {
                const coords = sampleHotels.filter(h => typeof h.lat === 'number' && typeof h.lng === 'number');
                const center: [number, number] = coords.length ? [coords[0].lat!, coords[0].lng!] : [37.0902, -95.7129];
                return (
                  <MapContainer center={center} zoom={5} scrollWheelZoom={false} className="w-full h-full">
                    <TileLayer
                      attribution='&copy; OpenStreetMap contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {coords.map(h => (
                      <CircleMarker key={h.id} center={[h.lat!, h.lng!]} radius={8} pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.9 }}>
                        <Popup>
                          <div className="text-sm">
                            <div className="font-semibold">{h.name}</div>
                            <div className="text-xs text-ocean-500">{h.distance}</div>
                            <div className="mt-1 text-teal-accent font-bold">{h.currency}{h.price}</div>
                          </div>
                        </Popup>
                      </CircleMarker>
                    ))}
                  </MapContainer>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
