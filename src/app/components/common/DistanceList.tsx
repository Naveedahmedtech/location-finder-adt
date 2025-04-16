'use client'

import React, { useState, useMemo } from 'react';

type DistanceItem = {
    origin_city?: string;
    destination_city?: string;
    origin_country?: string;
    destination_country?: string;
    distance_km: string;
    distance_miles: string;
    trip_summary: string;
};

type Props = {
    results: DistanceItem[];
    country: boolean;
};

const DistanceList: React.FC<Props> = ({ results, country }) => {
    const [search, setSearch] = useState('');

    const filteredResults = useMemo(() => {
        return results.filter((item) => {
            const origin = country ? item.origin_country : item.origin_city;
            const destination = country ? item.destination_country : item.destination_city;
            return (
                item.trip_summary.toLowerCase().includes(search.toLowerCase()) ||
                origin?.toLowerCase().includes(search.toLowerCase()) ||
                destination?.toLowerCase().includes(search.toLowerCase())
            );
        });
    }, [search, results, country]);

    return (
        <section className="w-full py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-xl md:text-2xl font-semibold text-textPrimary text-center mb-4">
                    🧭 Distance Overview
                </h2>

                {/* Search Input */}
                <div className="mb-6 max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder="Search by trip, origin, or destination..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm text-text placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary transition"
                    />
                </div>

                {/* Grid of Results */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredResults.map((item, index) => {
                        const origin = country ? item.origin_country : item.origin_city;
                        const destination = country ? item.destination_country : item.destination_city;

                        return (
                            <div
                                key={index}
                                className="bg-surface border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition text-sm text-text"
                            >
                                <h3 className="text-base font-medium text-textPrimary mb-1 line-clamp-1">
                                    {item.trip_summary}
                                </h3>
                                <p className="text-xs text-textSecondary mb-2 line-clamp-1">
                                    <span className="font-medium">From:</span> {origin} <span className="font-medium">→</span> {destination}
                                </p>
                                <div className="flex gap-2 text-xs">
                  <span className="bg-primary text-white px-3 py-1 rounded-full">
                    {item.distance_km}
                  </span>
                                    <span className="bg-secondary text-white px-3 py-1 rounded-full">
                    {item.distance_miles}
                  </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredResults.length === 0 && (
                    <p className="text-center text-sm text-textSecondary mt-6">No results found.</p>
                )}
            </div>
        </section>
    );
};

export default DistanceList;
