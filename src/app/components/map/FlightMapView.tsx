"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import { computeGreatCircleArc } from "@/utils/greatCircle";

interface FlightRoute {
  coordinates: [number, number][]; // [lng, lat]
  distance: number;
  duration: { hours: number; minutes: number };
}

interface Waypoint {
  location: [number, number]; // [lng, lat]
  name: string;
}

interface FlightMapViewProps {
  flightRoute: FlightRoute;
  waypoints: Waypoint[];
}

// 📌 Auto Fit Bounds Component
const FitBounds: React.FC<{ flightRoute: FlightRoute; waypoints: Waypoint[] }> = ({ flightRoute, waypoints }) => {
  const map = useMap();

  useEffect(() => {
    if (!flightRoute || flightRoute.coordinates.length === 0) return;

    // Convert coordinates to [lat, lng]
    const routeBounds = flightRoute.coordinates.map(([lng, lat]) => [lat, lng] as LatLngTuple);
    const waypointBounds = waypoints.map((wp) => [wp.location[1], wp.location[0]] as LatLngTuple);

    // Combine all bounds and fit map
    const bounds = L.latLngBounds([...routeBounds, ...waypointBounds]);
    map.fitBounds(bounds, { padding: [80, 80], animate: true });

    // ✅ Fix: Ensure zoom isn't too zoomed out
    setTimeout(() => {
      if (map.getZoom() < 3) {
        map.setZoom(3);
      }
    }, 500);

  }, [flightRoute, waypoints, map]);

  return null;
};

const FlightMapView: React.FC<FlightMapViewProps> = ({ flightRoute, waypoints }) => {
  const defaultCenter: LatLngTuple = [37.0902, -95.7129]; // Default center (USA)

  // ✈️ Generate realistic **Great Circle Route**
  const greatCirclePath = useMemo(() => computeGreatCircleArc(flightRoute.coordinates), [flightRoute]);

  return (
    <MapContainer center={defaultCenter} zoom={4} className="h-[500px] w-full rounded-lg shadow-lg">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* ✈️ Flight Path - Great Circle Arc */}
      <Polyline positions={greatCirclePath} color="purple" weight={4} opacity={0.9} dashArray="6,8" />

      {/* 🔥 Auto-fit bounds to ensure visibility */}
      <FitBounds flightRoute={flightRoute} waypoints={waypoints} />
    </MapContainer>
  );
};

export default FlightMapView;
