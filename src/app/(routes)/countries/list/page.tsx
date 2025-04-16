import { API_CONFIG, API_ENDPOINTS } from "@/config/constants";
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


const CountryListPage = async () => {

    const data = await getCitiesByCountry();

    console.log('data', data)

    return <Country countries={data} />;
};

export default CountryListPage;
