import {API_CONFIG, API_ENDPOINTS} from "@/config/constants";
import Country from "@/app/components/countries/Country";

const getCitiesByCountry = async (): Promise<any[]> => {
    try {
        const res = await fetch(
            `${API_CONFIG.SERVER_URL}/${API_ENDPOINTS.GET_COUNTRY_LIST}`,
            {cache: "no-store"}
        );

        if (!res.ok) {
            console.error("Failed to fetch countries");
            return [];
        }

        const data = await res.json();
        return data?.countries || [];
    } catch (err) {
        console.error("City fetch error:", err);
        return [];
    }
};

const getCountryToCountryDistanceToOthers = async (countryName: string): Promise<[]> => {
    try {
        const res = await fetch(
            `${API_CONFIG.SERVER_URL}/${API_ENDPOINTS.COUNTRIES_DISTANCE_TO_OTHERS}?country_name=${encodeURIComponent(decodeURIComponent(countryName))}`,
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

    const data = await getCitiesByCountry();

    const otherCitiesDistance = await getCountryToCountryDistanceToOthers(countryName);

    return (
        <Country countries={data} countryName={countryName} otherCitiesDistance={otherCitiesDistance} />
    );
};

