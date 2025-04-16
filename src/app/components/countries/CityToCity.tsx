'use client';

import {useEffect, useState} from "react";
import CitySelector from "@/app/components/countries/CitySelector";
import MapView from "@/app/components/map/MapView";
import FlightMapView from "@/app/components/map/FlightMapView";
import TripSummary from "@/app/components/common/TripSummary";
import { handleDrivingSearch, handleFlightSearch } from "@/utils/search";
import { X, XCircle, Locate } from "lucide-react";
import {tripOptions} from "@/config/constants";
import DistanceList from "@/app/components/common/DistanceList";

const CityToCity = ({ cities, countryName, otherCitiesDistance }: any) => {
    const [origin, setOrigin] = useState();
    const [destination, setDestination] = useState("");
    const [tripType] = useState(tripOptions[1]);
    const [loading, setLoading] = useState(false);
    const [routes, setRoutes] = useState<
        {
            coordinates: [number, number][];
            distance: number;
            duration: { hours: number; minutes: number };
            travel_time_summary: string;
            distance_summary: string;
        }[]
    >([]);
    const [waypoints, setWaypoints] = useState<
        { location: [number, number]; name: string }[]
    >([]);
    const [tripSummary, setTripSummary] = useState<{
        distance: number;
        duration: { hours: number; minutes: number };
        unit: string;
    } | null>(null);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        if (Array.isArray(cities) && cities.length >= 2) {
            setOrigin(cities[0].name || "");
            setDestination(cities[cities.length - 1].name || "");
        }
    }, [cities]);


    const handleTripSearch = async () => {
        setLoading(true);
        setError(null);
        setRoutes([]);
        setWaypoints([]);
        setTripSummary(null);

        if (!origin || !destination) {
            setError("Please select both origin and destination.");
            setLoading(false);
            return;
        }

        if (origin === destination) {
            setError("Origin and destination cannot be the same.");
            setLoading(false);
            return;
        }

        let result;
        if (tripType === "Driving Distance") {
            result = await handleDrivingSearch({ from: origin, to: destination, stops: [], is_db: true });
        } else {
            result = await handleFlightSearch({ from: origin, to: destination,  is_db: true });
        }

        setRoutes(result.routes);
        setWaypoints(result.waypoints);
        setTripSummary(result.tripSummary);
        setError(result.error);
        setLoading(false);
    };

    return (
        <section className="px-4 py-20 md:py-28 bg-background text-foreground transition-all">
            {cities?.length > 0 && (
                <div className="max-w-4xl mx-auto mb-8 space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center">
                        Plan Your Route in {decodeURIComponent(countryName)}
                    </h2>

                    <CitySelector
                        cities={cities.map((city: any) => city.name)}
                        origin={origin}
                        destination={destination}
                        setOrigin={setOrigin}
                        setDestination={setDestination}
                    />

                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handleTripSearch}
                            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg shadow hover:bg-primary/90 transition active:scale-95"
                        >
                            <Locate className="w-5 h-5" />
                            Calculate Distance
                        </button>
                    </div>
                </div>
            )}

            {error && (
                <div className="max-w-3xl mx-auto mt-4 bg-error text-white px-4 py-3 rounded-lg shadow-md flex items-center justify-between animate-fadeIn">
                    <div className="flex items-center gap-2">
                        <XCircle className="w-6 h-6" />
                        <span>{error}</span>
                    </div>
                    <button onClick={() => setError(null)} className="hover:opacity-80">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            )}

            {loading && (
                <div className="flex justify-center mt-8">
                    <div className="w-10 h-10 border-4 border-muted border-t-transparent rounded-full animate-spin" />
                </div>
            )}

            {tripSummary && (
                <div className="mt-1 max-w-3xl mx-auto">
                    <TripSummary
                        distance_summary={routes[0]?.distance_summary}
                        travel_time_summary={routes[0]?.travel_time_summary}
                    />
                </div>
            )}

            {routes.length > 0 && (
                <div className="mt-1 mx-auto max-w-6xl">
                    <div className="bg-surface p-4 rounded-xl shadow-xl border border-border">
                        {tripType === "Driving Distance" ? (
                            <MapView routes={routes} stops={waypoints} />
                        ) : (
                            <FlightMapView flightRoute={routes[0]} waypoints={waypoints} />
                        )}
                    </div>
                </div>
            )}

            {
                otherCitiesDistance &&
                <DistanceList results={otherCitiesDistance} country={false} />
            }
        </section>
    );
};

export default CityToCity;
