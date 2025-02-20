export const API_CONFIG = {
  NOMINATIM_BASE_URL:
    process.env.NEXT_PUBLIC_NOMINATIM_API ||
    "https://nominatim.openstreetmap.org",
    SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || "http://127.0.0.1:5000/api/v1",
};

export const SEARCH_CONFIG = {
  DEBOUNCE_DELAY: 300, // Delay for debounced API calls
  MAX_RESULTS: 5, // Maximum location results to fetch
};


export const API_ENDPOINTS = {
  FLIGHT: "flight",
  DRIVING: "driving",
}


export const tripOptions = ["Flight Distance", "Driving Distance"];
export const APP_NAME = process.env.APP_NAME || "Travel Hours"
