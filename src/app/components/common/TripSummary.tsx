'use client';

import React from "react";
import { TripSummaryProps } from "@/types";
import { MapPin, Clock } from "lucide-react";

const TripSummary: React.FC<TripSummaryProps> = ({
                                                     distance_summary,
                                                     travel_time_summary,
                                                 }) => {
    return (
        <div className="mt-1 mx-auto max-w-xl px-6 py-5 bg-muted/30 border border-border rounded-2xl shadow-xl backdrop-blur-md bg-surface">
            {/*<h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">*/}
            {/*    🧭 Trip Summary*/}
            {/*</h3>*/}

            <div className="space-y-4 text-left text-sm sm:text-base">
                <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                        <p className="text-muted-foreground font-medium">Total Distance</p>
                        <p className="font-semibold text-accent">{distance_summary}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-1" />
                    <div>
                        <p className="text-muted-foreground font-medium">Estimated Time</p>
                        <p className="font-semibold text-accent">{travel_time_summary}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripSummary;
