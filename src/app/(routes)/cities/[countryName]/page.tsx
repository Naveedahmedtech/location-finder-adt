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

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        return data?.cities || [];
    } catch (err) {
        console.error("City fetch error:", err);
        return [];
    }
};

const CityToCityPage = async ({
                                  params,
                              }: {
    params: { countryName: string };
}) => {
    const {countryName} = await params;
    const cities = await getCitiesByCountry(countryName);
    return (
        <CityToCity cities={cities} countryName={countryName}/>
    );
};

export default CityToCityPage;
