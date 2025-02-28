"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import L, { LatLngTuple, Icon } from "leaflet";

interface Route {
  coordinates: [number, number][]; // [lng, lat]
  distance: number;
  duration: { hours: number; minutes: number };
}

interface Stop {
  location: [number, number]; // [lng, lat]
  name: string;
}

interface MapViewProps {
  routes: Route[];
  stops?: Stop[];
}

// Custom Marker Icon
const stopIcon = new Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Custom Destination Icon
const destinationIcon = new Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png",
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [1, -34],
});

const FitBounds: React.FC<{ routes: Route[]; stops?: Stop[] }> = ({ routes, stops }) => {
  const map = useMap();

  useEffect(() => {
    if (routes.length === 0) return;

    const bounds = L.latLngBounds([
      ...routes.flatMap((route) => route.coordinates.map(([lng, lat]) => [lat, lng] as LatLngTuple)),
      ...(stops?.map((stop) => [stop.location[1], stop.location[0]] as LatLngTuple) || []),
    ]);

    map.fitBounds(bounds, { padding: [50, 50] });
  }, [routes, stops, map]);

  return null;
};

const MapView: React.FC<MapViewProps> = ({ routes, stops = [] }) => {
  const defaultCenter: LatLngTuple = [37.0902, -95.7129];

  // Assign colors dynamically for each route leg
  const formattedRoutes = useMemo(
    () =>
      routes.map((route, index) => ({
        coordinates: route.coordinates.map(([lng, lat]) => [lat, lng] as LatLngTuple),
        distance: route.distance,
        duration: route.duration,
        color: index === 0 ? "blue" : "blue", // Use blue for all legs
      })),
    [routes]
  );

  return (
    <MapContainer center={defaultCenter} zoom={5} className="h-96 w-full rounded-lg shadow-lg">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Render Each Leg of the Route in Blue */}
      {formattedRoutes.map((route, index) => (
        <Polyline key={index} positions={route.coordinates} color={route.color} weight={5} opacity={0.8} />
      ))}

      {/* Render Stops (Waypoints) */}
      {stops.map((stop, index) => (
        <Marker key={index} position={[stop.location[1], stop.location[0]]} icon={stop.name === "Destination" ? destinationIcon : stopIcon}>
          <Popup>{stop.name}</Popup>
        </Marker>
      ))}

      <FitBounds routes={routes} stops={stops} />
    </MapContainer>
  );
};

export default MapView;
