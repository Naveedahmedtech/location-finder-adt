'use client';

import Dropdown from "@/app/components/ui/Dropdown";

type CitySelectorProps = {
    cities: string[]; // array of city names only
    origin: string | undefined;
    destination: string | undefined;
    setOrigin: any;
    setDestination: any;
};

const CitySelector = ({ cities,  origin,
                          destination,
                          setOrigin,
                          setDestination, }: CitySelectorProps) => {


    return (
        <div className="space-y-6 my-10">
            <h2 className="text-xl font-semibold text-primary text-center">Select Your Route</h2>

            <div className="grid gap-4 sm:grid-cols-2">
                <Dropdown
                    value={origin!}
                    onChange={setOrigin}
                    options={cities}
                />
                <Dropdown
                    value={destination!}
                    onChange={setDestination}
                    options={cities}
                />
            </div>

            {origin && destination && (
                <div className="mt-4 text-center text-sm text-muted-foreground">
                    Selected route: <strong>{origin}</strong> → <strong>{destination}</strong>
                </div>
            )}
        </div>
    );
};

export default CitySelector;
