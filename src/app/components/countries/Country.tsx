'use client';

import { useEffect, useState } from "react";
import { tripOptions } from "@/config/constants";
import DistanceList from "@/app/components/common/DistanceList";
import TripPlannerHeader from "./TripPlannerHeader";
import TripErrorAlert from "./TripErrorAlert";
import TripLoader from "./TripLoader";
import TripResultSummary from "./TripResultSummary";
import TripMapDisplay from "./TripMapDisplay";
import { handleFlightSearch } from "@/utils/search";
import CountryList from "@/app/components/countries/list";

const CountryToCountry = ({
                              countries,
                              countryName,
                              otherCitiesDistance = []
                          }: {
    countries: any[];
    countryName?: string;
    otherCitiesDistance?: [];
}) => {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [tripType] = useState(tripOptions[0]);
    const [loading, setLoading] = useState(false);
    const [routes, setRoutes] = useState<any[]>([]);
    const [waypoints, setWaypoints] = useState<any[]>([]);
    const [tripSummary, setTripSummary] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (countries.length >= 2) {
            setOrigin(countryName ? decodeURIComponent(countryName) : countries[0] || "");
            setDestination(countries[countries.length - 1] || "");
        }
    }, [countries, countryName]);

    const handleTripSearch = async () => {
        setLoading(true);
        setError(null);
        setRoutes([]);
        setWaypoints([]);
        setTripSummary(null);

        if (!origin || !destination || origin === destination) {
            setError("Origin and destination must be different and selected.");
            setLoading(false);
            return;
        }

        const result = await handleFlightSearch({ from: origin, to: destination, is_db: true });

        setRoutes(result.routes);
        setWaypoints(result.waypoints);
        setTripSummary(result.tripSummary);
        setError(result.error);
        setLoading(false);
    };

    return (
        <section className="px-4 py-20 md:py-28 bg-background text-foreground transition-all">
            <TripPlannerHeader
                countries={countries}
                origin={origin}
                destination={destination}
                setOrigin={setOrigin}
                setDestination={setDestination}
                countryName={countryName}
                onSearch={handleTripSearch}
            />

            {error && <TripErrorAlert error={error} onClear={() => setError(null)} />}
            {loading && <TripLoader />}
            {tripSummary && routes.length > 0 && <TripResultSummary summary={routes[0]} />}
            {routes.length > 0 && <TripMapDisplay tripType={tripType} routes={routes} waypoints={waypoints} />}
            {(countries.length > 0 && !countryName) && <CountryList countries={countries} page={'country'} />}
            {otherCitiesDistance && <DistanceList results={otherCitiesDistance} country />}
        </section>
    );
};

export default CountryToCountry;
