'use client';

import Link from "next/link";
import { useState } from "react";

type CountryListProps = {
    countries: string[];
    page: 'city' | 'country';
};

const CountryList = ({ countries, page }: CountryListProps) => {
    const [search, setSearch] = useState("");

    const filteredCountries = countries.filter((country) =>
        country.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className={page === 'city' ? "py-16 md:py-24 px-4" : ""}>
            {
                page === 'city' ? (
                    <>
                        <h1 className="text-3xl md:text-4xl font-bold text-primary text-center">
                            Explore Distance Between Cities by Country
                        </h1>
                        <p className="mt-2 text-center text-muted-foreground text-sm md:text-base mb-3">
                            Select a country to discover its cities and calculate travel distances
                        </p>
                    </>
                ) : (
                    <>
                        <p className="mt-2 text-center text-muted-foreground text-sm md:text-base mb-3">
                            To list the distance from country to other countries, click a country name below.
                        </p>
                    </>
                )
            }


            <div className="max-w-xl mx-auto mb-10">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search country..."
                    className="w-full px-4 py-2 border border-border rounded-xl shadow-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            {filteredCountries.length > 0 ? (
                <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {filteredCountries.map((country, index) => (
                        <li key={index}>
                            <Link
                                href={`${page === 'country' ? `/countries/${encodeURIComponent(country)}` : `/cities/${encodeURIComponent(country)}`}`}
                                className="block rounded-2xl border border-border bg-background p-4 text-center text-sm font-medium text-foreground shadow hover:shadow-md hover:bg-muted transition-all duration-200 ease-in-out"
                            >
                                {country}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-muted-foreground mt-6 text-base">No countries found.</p>
            )}
        </section>
    );
};

export default CountryList;
