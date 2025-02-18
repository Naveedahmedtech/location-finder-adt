import { API_CONFIG, SEARCH_CONFIG } from "@/config/constants";

interface ApiRequestOptions {
  endpoint: string;
  method?: "GET" | "POST"; // Can be extended for more HTTP methods
  params?: Record<string, string | number>;
  body?: Record<string, any>; // Only used for POST requests
}

/**
 * Generic function to make API requests to the application's main backend (`SERVER_URL`).
 */
export const apiRequest = async <T>({ endpoint, method = "GET", params, body }: ApiRequestOptions): Promise<T | null> => {
  try {
    const url = new URL(`${API_CONFIG.SERVER_URL}/${endpoint}`);

    if (params) {
      Object.keys(params).forEach((key) => url.searchParams.append(key, String(params[key])));
    }

    const response = await fetch(url.toString(), {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: method === "POST" ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

    return (await response.json()) as T;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};

/**
 * Generic function to make API requests to Nominatim API (`NOMINATIM_BASE_URL`).
 */
export const nominatimRequest = async <T>({ endpoint, params }: ApiRequestOptions): Promise<T | null> => {
  try {
    const url = new URL(`${API_CONFIG.NOMINATIM_BASE_URL}/${endpoint}`);

    if (params) {
      Object.keys(params).forEach((key) => url.searchParams.append(key, String(params[key])));
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error(`Nominatim API request failed with status ${response.status}`);

    return (await response.json()) as T;
  } catch (error) {
    console.error("Nominatim API Error:", error);
    return null;
  }
};

/**
 * Fetches location suggestions from Nominatim API.
 * @param query User input for location
 * @returns Array of location names
 */
export const fetchLocationSuggestions = async (query: string): Promise<string[]> => {
  if (query.length < 3) return [];

  const data = await nominatimRequest<any[]>({
    endpoint: "search",
    params: { format: "json", q: query, limit: SEARCH_CONFIG.MAX_RESULTS },
  });

  return data ? data.map((place) => place.display_name) : [];
};
