import { API_CONFIG, API_ENDPOINTS } from "@/config/constants";
import Country from "@/app/components/countries/Country";

const CountryListPage = async () => {
    const res:any = await fetch(`${API_CONFIG.SERVER_URL}/${API_ENDPOINTS.GET_COUNTRY_LIST}`);

    if (!res.ok) {
        console.error(res.msg);
        throw new Error("Failed to fetch countries");
    }

    const data = await res.json();

    return <Country countries={data?.countries} />;
};

export default CountryListPage;
