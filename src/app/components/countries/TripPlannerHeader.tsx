'use client';

import { Locate } from 'lucide-react';
import CitySelector from '@/app/components/countries/CitySelector';

type Props = {
    countries: any[];
    origin: string;
    destination: string;
    setOrigin: (value: string) => void;
    setDestination: (value: string) => void;
    countryName?: string;
    onSearch: () => void;
};

const TripPlannerHeader = ({ countries, origin, destination, setOrigin, setDestination, countryName, onSearch }: Props) => {
    return (
        <div className="max-w-4xl mx-auto mb-1 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center">
                Plan a Route Between Countries
            </h2>

            <CitySelector
                cities={countries}
                origin={countryName ? decodeURIComponent(countryName) : origin}
                destination={destination}
                setOrigin={setOrigin}
                setDestination={setDestination}
            />

            <div className="flex justify-center mt-6">
                <button
                    onClick={onSearch}
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg shadow hover:bg-primary/90 transition active:scale-95"
                >
                    <Locate className="w-5 h-5" />
                    Calculate Distance
                </button>
            </div>
        </div>
    );
};

export default TripPlannerHeader;
