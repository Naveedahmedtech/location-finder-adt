import CountryList from "@/app/components/countries/list";
import { API_CONFIG, API_ENDPOINTS } from "@/config/constants";

const CountryListPage = async () => {
    const res:any = await fetch(`${API_CONFIG.SERVER_URL}/${API_ENDPOINTS.GET_COUNTRY_LIST}`);

    if (!res.ok) {
        console.error(res.msg);
        throw new Error("Failed to fetch countries");
    }

    const data = await res.json();

    return <CountryList countries={data?.countries} page={'city'} />;
};

export default CountryListPage;
