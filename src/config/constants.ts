export const API_CONFIG = {
  NOMINATIM_BASE_URL:
    process.env.NEXT_PUBLIC_NOMINATIM_API ||
    "https://nominatim.openstreetmap.org",
    SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || "https://0ffb-2407-d000-21-3e75-fc91-87d3-4f57-9bee.ngrok-free.app/api/v1",
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
