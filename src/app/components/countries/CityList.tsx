'use client';

import { useState } from 'react';

type City = {
    name: string;
    latitude: number;
    longitude: number;
};

type CityListProps = {
    cities: City[];
    countryName: string;
};

const CityList = ({ cities }: CityListProps) => {
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const handleCityClick = (cityName: string) => {
        setSelectedCity(cityName);
        // Navigation already handled elsewhere
    };

    return (
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {cities?.map((city, index) => {
                const isSelected = selectedCity === city.name;

                return (
                    <li
                        key={index}
                        role="button"
                        aria-pressed={isSelected}
                        onClick={() => handleCityClick(city.name)}
                        className={`group p-4 rounded-xl border transition-all duration-200 ease-in-out shadow-lg cursor-pointer transform hover:shadow-md hover:-translate-y-1 hover:bg-muted
              ${isSelected ? 'border-primary bg-muted scale-[1.02] ring-2 ring-primary' : 'bg-background text-foreground'}
            `}
                    >
                        <h2 className="text-base font-semibold mb-1 group-hover:text-primary transition-colors">
                            {city.name}
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            Lat: {city.latitude.toFixed(5)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Long: {city.longitude.toFixed(5)}
                        </p>
                    </li>
                );
            })}
        </ul>
    );
};

export default CityList;
