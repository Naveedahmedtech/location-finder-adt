"use client";

import React from "react";
import { TripSummaryProps } from "@/types";

const TripSummary: React.FC<TripSummaryProps> = ({ distance, duration, unit }) => {
    return (
        <div className="mt-8 mx-auto max-w-xl bg-surface p-6 rounded-2xl shadow-xl border border-border text-center">
            <h3 className="text-2xl font-bold text-textPrimary mb-3 flex items-center justify-center gap-2">
                Trip Summary
            </h3>
            <div className="space-y-2 text-base sm:text-lg">
                <p className="font-medium text-textPrimary">
                    Total Distance:{" "}
                    <span className="font-bold text-accent">
            {distance} {unit}
          </span>
                </p>
                <p className="font-medium text-textPrimary">
                    Estimated Duration:{" "}
                    <span className="font-bold text-accent">
            {duration.hours}h {duration.minutes}m
          </span>
                </p>
            </div>
        </div>
    );
};

export default TripSummary;
