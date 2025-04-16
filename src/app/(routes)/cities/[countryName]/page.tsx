import {API_CONFIG, API_ENDPOINTS} from "@/config/constants";
import CityToCity from "@/app/components/countries/CityToCity";

type City = {
    name: string;
    latitude: number;
    longitude: number;
};

const getCitiesByCountry = async (countryName: string): Promise<City[]> => {
    try {
        const res = await fetch(
            `${API_CONFIG.SERVER_URL}/${API_ENDPOINTS.GET_CITY_BY_COUNTRY}?country=${encodeURIComponent(decodeURIComponent(countryName))}`,
            {cache: "no-store"}
        );

        if (!res.ok) {
            console.error("Failed to fetch countries");
            return [];
        }

        const data = await res.json();
        return data?.cities || [];
    } catch (err) {
        console.error("City fetch error:", err);
        return [];
    }
};

const getCitiesByCitiesDistanceToOthers = async (countryName: string): Promise<City[]> => {
    try {
        const res = await fetch(
            `${API_CONFIG.SERVER_URL}/${API_ENDPOINTS.CITY_DISTANCE_TO_OTHERS}?country_name=${encodeURIComponent(decodeURIComponent(countryName))}`,
            {cache: "no-store"}
        );

        if (!res.ok) {
            console.error("Failed to fetch city to city distance");
            return [];
        }

        const data = await res.json();
        return data?.distances || [];
    } catch (err) {
        console.error("City fetch error:", err);
        return [];
    }
};

export default async function Page({ params }: { params: Promise<{ countryName: string }> }) {
    const { countryName } = await params;
    const cities = await getCitiesByCountry(countryName);
    const otherCitiesDistance = await getCitiesByCitiesDistanceToOthers(countryName);
    return (
        <CityToCity cities={cities} countryName={countryName} otherCitiesDistance={otherCitiesDistance} />
    );
};
