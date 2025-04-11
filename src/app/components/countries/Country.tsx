'use client';

import {useEffect, useState} from "react";
import MapView from "@/app/components/map/MapView";
import FlightMapView from "@/app/components/map/FlightMapView";
import TripSummary from "@/app/components/common/TripSummary";
import {handleDrivingSearch, handleFlightSearch} from "@/utils/search";
import {X, XCircle, Locate} from "lucide-react";
import CitySelector from "@/app/components/countries/CitySelector";
import {tripOptions} from "@/config/constants";
import CountryList from "@/app/components/countries/list";

const CountryToCountry = ({countries, countryName}: { countries: any[], countryName?: string }) => {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [tripType] = useState(tripOptions[0]);
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
        if (Array.isArray(countries) && countries.length >= 2) {
            if (countryName) {
                console.log(`country name is there: ${decodeURIComponent(countryName)}`);
                setOrigin(decodeURIComponent(countryName))
            } else {
                console.log(`country name is not there: ${countryName}`);
                setOrigin(countries[0] || "");
            }
            setDestination(countries[countries.length - 1] || "");
        }
    }, [countries]);


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

        const result =
            tripType === "Driving Distance"
                ? await handleDrivingSearch({from: origin, to: destination, stops: []})
                : await handleFlightSearch({from: origin, to: destination});

        setRoutes(result.routes);
        setWaypoints(result.waypoints);
        setTripSummary(result.tripSummary);
        setError(result.error);
        setLoading(false);
    };

    return (
        <section className="px-4 py-20 md:py-28 bg-background text-foreground transition-all">
            <div className="max-w-4xl mx-auto mb-8 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center">
                    Plan a Route Between Countries
                </h2>

                <CitySelector
                    cities={countries.map((c: any) => c)}
                    origin={countryName ? decodeURIComponent(countryName) : origin}
                    destination={destination}
                    setOrigin={setOrigin}
                    setDestination={setDestination}
                />

                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleTripSearch}
                        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg shadow hover:bg-primary/90 transition active:scale-95"
                    >
                        <Locate className="w-5 h-5"/>
                        Calculate Distance
                    </button>
                </div>
            </div>

            {error && (
                <div
                    className="max-w-3xl mx-auto mt-4 bg-error text-white px-4 py-3 rounded-lg shadow-md flex items-center justify-between animate-fadeIn">
                    <div className="flex items-center gap-2">
                        <XCircle className="w-6 h-6"/>
                        <span>{error}</span>
                    </div>
                    <button onClick={() => setError(null)} className="hover:opacity-80">
                        <X className="w-5 h-5"/>
                    </button>
                </div>
            )}

            {loading && (
                <div className="flex justify-center mt-8">
                    <div className="w-10 h-10 border-4 border-muted border-t-transparent rounded-full animate-spin"/>
                </div>
            )}

            {tripSummary && routes.length > 0 && (
                <div className="mt-10 max-w-3xl mx-auto">
                    <TripSummary
                        distance_summary={routes[0]?.distance_summary}
                        travel_time_summary={routes[0]?.travel_time_summary}
                    />
                </div>
            )}

            {routes.length > 0 && (
                <div className="mt-12 mx-auto max-w-6xl">
                    <h3 className="text-xl font-semibold text-center text-textPrimary mb-4">
                        🗺️ Route Map
                    </h3>
                    <div className="bg-surface p-4 rounded-xl shadow-xl border border-border">
                        {tripType === "Driving Distance" ? (
                            <MapView routes={routes} stops={waypoints}/>
                        ) : (
                            <FlightMapView flightRoute={routes[0]} waypoints={waypoints}/>
                        )}
                    </div>
                </div>
            )}
            <CountryList countries={countries} page={'country'}/>
        </section>
    );
};

export default CountryToCountry;
