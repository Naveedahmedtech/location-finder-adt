'use client';
import dynamic from 'next/dynamic';

const FlightMapView = dynamic(() => import('@/app/components/map/FlightMapView'), {
    ssr: false,
});

const TripMapDisplay = ({
                            tripType,
                            routes,
                            waypoints
                        }: {
    tripType: string;
    routes: any[];
    waypoints: { location: [number, number]; name: string }[];
}) => (
    <div className="mt-1 mx-auto max-w-6xl">
        <div className="bg-surface p-4 rounded-xl shadow-xl border border-border">
            <FlightMapView flightRoute={routes[0]} waypoints={waypoints}/>
        </div>
    </div>
);

export default TripMapDisplay;
