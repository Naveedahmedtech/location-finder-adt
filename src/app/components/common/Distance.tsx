"use client";

import { useState } from "react";
import HeroTitle from "@/app/components/home/HeroTitle";
import SearchForm from "@/app/components/home/SearchForm";
import MapView from "@/app/components/map/MapView";
import FlightMapView from "@/app/components/map/FlightMapView";
import { handleDrivingSearch, handleFlightSearch } from "@/utils/search";
import { tripOptions } from "@/config/constants";
import { XCircle, X } from "lucide-react";

const Distance: React.FC<{ title: string; subtitle?: string, tripOption: number }> = ({ title, subtitle, tripOption  }) => {
  const [tripType, setTripType] = useState(tripOptions[tripOption]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [stops, setStops] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState<{ coordinates: [number, number][], distance: number, duration: { hours: number, minutes: number } }[]>([]);
  const [waypoints, setWaypoints] = useState<{ location: [number, number]; name: string }[]>([]);
  const [tripSummary, setTripSummary] = useState<{ distance: number; duration: { hours: number; minutes: number }; unit: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTripSearch = async () => {
    setLoading(true);
    setError(null);
    setRoutes([]);
    setWaypoints([]);
    setTripSummary(null);

    let result;
    if (tripType === "Driving Distance") {
      result = await handleDrivingSearch({ from, to, stops });
    } else if (tripType === "Flight Distance") {
      result = await handleFlightSearch({ from, to });
    } else {
      result = { routes: [], waypoints: [], tripSummary: null, error: "Invalid trip type selected." };
    }

    setRoutes(result.routes);
    setWaypoints(result.waypoints);
    setTripSummary(result.tripSummary);
    setError(result.error);
    setLoading(false);
  };

  return (
    <section className="w-full bg-primary text-text py-16 md:py-24 px-4">
      <HeroTitle title={title} subtitle={subtitle} />

      {/* Search Form */}
      <div className="max-w-5xl mx-auto bg-background p-6 md:p-8 rounded-xl shadow-xl border border-border">
        <SearchForm
          tripType={tripType}
          setTripType={setTripType}
          from={from}
          setFrom={setFrom}
          to={to}
          setTo={setTo}
          stops={stops}
          setStops={setStops}
          tripOptions={tripOptions}
          onSearch={handleTripSearch}
          hiddenDropdown={true}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-4xl mx-auto mt-4 bg-error text-white px-4 py-3 rounded-lg shadow-md flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <XCircle className="w-6 h-6" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="hover:opacity-80">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Loading Animation */}
      {loading && (
        <div className="flex justify-center mt-6">
          <div className="w-8 h-8 border-4 border-background border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Trip Summary */}
      {tripSummary && (
        <div className="mt-8 mx-auto max-w-xl bg-surface p-6 rounded-lg shadow-lg text-center border border-border">
          <h3 className="text-xl font-semibold text-textPrimary">🚀 Trip Summary</h3>
          <div className="mt-2 text-lg">
            <p className="font-medium text-textPrimary">
              📏 Total Distance: <span className="font-bold">{tripSummary.distance} {tripSummary.unit}</span>
            </p>
            <p className="font-medium text-textPrimary">
              ⏳ Estimated Duration: <span className="font-bold">{tripSummary.duration.hours}h {tripSummary.duration.minutes}m</span>
            </p>
          </div>
        </div>
      )}

      {/* Map Section */}
      {routes.length > 0 && (
        <div className="mt-10 mx-auto max-w-6xl">
          <h3 className="text-xl font-semibold text-center text-textPrimary mb-4">🗺️ Route Map</h3>
          <div className="bg-surface p-4 rounded-xl shadow-xl border border-border">
            {tripType === "Driving Distance" ? (
              <MapView routes={routes} stops={waypoints} />
            ) : (
              <FlightMapView flightRoute={routes[0]} waypoints={waypoints} />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Distance;
