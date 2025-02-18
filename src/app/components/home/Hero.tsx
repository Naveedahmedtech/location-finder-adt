"use client";

import { useState } from "react";
import HeroTitle from "@/app/components/home/HeroTitle";
import SearchForm from "@/app/components/home/SearchForm";
import MapView from "@/app/components/map/MapView";
import { apiRequest } from "@/app/lib/api";

const tripOptions = ["Flight Time", "Driving Distance", "Time Difference"];

const Hero: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
  const [tripType, setTripType] = useState(tripOptions[0]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState<{ coordinates: [number, number][], distance: number, duration: { hours: number, minutes: number } }[]>([]);
  const [stops, setStops] = useState<{ location: [number, number]; name: string }[]>([]);

  const handleSearch = async () => {
    if (!from.trim() || !to.trim()) {
      alert("Please enter both origin and destination.");
      return;
    }

    setLoading(true);
    setRoutes([]);
    setStops([]);

    try {
      const response = await apiRequest<any>({
        endpoint: "driving",
        method: "POST",
        body: { origin: from, destination: to },
      });

      if (response && response.routes?.length > 0) {
        setRoutes(
          response.routes.map((route: any) => ({
            coordinates: route.geometry.coordinates,
            distance: route.distance,
            duration: {
              hours: route.duration_hours,
              minutes: route.duration_minutes,
            },
          }))
        );
      } else {
        alert("No routes found. Try a different search.");
      }

      // Extract stops (waypoints)
      if (response && response.waypoints?.length > 0) {
        setStops(
          response.waypoints.map((wp: any) => ({
            location: wp.location, // [lng, lat]
            name: wp.name || "Unnamed Stop",
          }))
        );
      }
    } catch (err) {
      alert("Failed to fetch trip details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-primary text-text py-16 md:py-24 px-4">
      <HeroTitle title={title} subtitle={subtitle} />
      <SearchForm
        tripType={tripType}
        setTripType={setTripType}
        from={from}
        setFrom={setFrom}
        to={to}
        setTo={setTo}
        tripOptions={tripOptions}
        onSearch={handleSearch}
      />

      {loading && <p className="text-center text-accent mt-4 animate-pulse">Loading...</p>}

      {/* Render Map if routes exist */}
      {routes.length > 0 && (
        <div className="mt-8">
          <MapView routes={routes} stops={stops} />
        </div>
      )}
    </section>
  );
};

export default Hero;
