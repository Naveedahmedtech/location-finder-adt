'use client';

import TripSummary from "@/app/components/common/TripSummary";

const TripResultSummary = ({
                               summary
                           }: {
    summary: { distance_summary: string; travel_time_summary: string };
}) => (
    <div className="mt-1 max-w-3xl mx-auto">
        <TripSummary
            distance_summary={summary.distance_summary}
            travel_time_summary={summary.travel_time_summary}
        />
    </div>
);

export default TripResultSummary;
