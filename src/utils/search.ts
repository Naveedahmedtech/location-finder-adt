import { apiRequest } from "@/app/lib/api";
import { API_ENDPOINTS } from "@/config/constants";
import { ApiResponse, ApiResponseFlight, Route, SearchParams, SearchResult, TripSummary, Waypoint } from "@/types";





/**
 * Handles trip search and processes API response for driving distance.
 */
/**
 * Handles trip search and processes API response for flight distance.
 */
export const handleFlightSearch = async ({ from, to }: SearchParams): Promise<SearchResult> => {
  if (!from.trim() || !to.trim()) {
    return { routes: [], waypoints: [], tripSummary: null, error: "Please enter both origin and destination." };
  }

  try {
    const response = await apiRequest<ApiResponseFlight>({
      endpoint: API_ENDPOINTS.FLIGHT,
      method: "POST",
      body: { origin: from, destination: to },
    });

    if (!response) {
      return { routes: [], waypoints: [], tripSummary: null, error: "No response from server." };
    }

    // Extract Route (Flight Path)
    const routes: Route[] = [
      {
        coordinates: response.geometry.coordinates, // Flight path
        distance: response.distance,
        duration: { hours: response.duration_hours, minutes: response.duration_minutes },
      },
    ];

    // Extract Waypoints (Origin & Destination)
    const waypoints: Waypoint[] = [
      { location: response.origin_coords, name: response.origin },
      { location: response.destination_coords, name: response.destination },
    ];

    // Create Trip Summary
    const tripSummary: TripSummary = {
      distance: response.distance,
      duration: { hours: response.duration_hours, minutes: response.duration_minutes },
      unit: response.distance_unit,
    };

    return { routes, waypoints, tripSummary, error: null };
  } catch (error: unknown) {
    console.error("Error fetching flight details:", error);
    return { routes: [], waypoints: [], tripSummary: null, error: "Failed to fetch flight details. Please try again." };
  }
};




/**
 * Handles trip search and processes API response for driving distance.
 */
export const handleDrivingSearch = async ({
  from,
  to,
  stops = [],
}: SearchParams): Promise<SearchResult> => {
  if (!from.trim() || !to.trim()) {
    return { routes: [], waypoints: [], tripSummary: null, error: "Please enter both origin and destination." };
  }

  try {
    const response = await apiRequest<ApiResponse>({
      endpoint: API_ENDPOINTS.DRIVING,
      method: "POST",
      body: { origin: from, destination: to, stops: stops.length > 0 ? stops : undefined },
    });

    if (!response) {
      return { routes: [], waypoints: [], tripSummary: null, error: "No response from server." };
    }

    /*** ✅ Extract Routes & Waypoints ***/

    const routes: Route[] = [];
    const waypoints: Waypoint[] = [];

    // Case 1: Stops included (Multiple legs)
    if (Array.isArray(response.legs)) {
      for (const leg of response.legs) {
        if (Array.isArray(leg.routes)) {
          for (const route of leg.routes) {
            routes.push({
              coordinates: route.geometry.coordinates,
              distance: route.distance,
              duration: { hours: route.duration_hours, minutes: route.duration_minutes },
            });
          }
        }

        if (Array.isArray(leg.waypoints)) {
          for (const wp of leg.waypoints) {
            waypoints.push({ location: wp.location, name: wp.name });
          }
        }
      }

      // Add the final destination as a waypoint if available
      if (response.destination && response.legs.length > 0) {
        const lastLeg = response.legs[response.legs.length - 1];
        const lastRoute = lastLeg.routes?.[lastLeg.routes.length - 1];

        if (lastRoute) {
          waypoints.push({
            location: lastRoute.geometry.coordinates[lastRoute.geometry.coordinates.length - 1],
            name: response.destination,
          });
        }
      }
    }

    // Case 2: No stops (Direct routes)
    if (Array.isArray(response.routes)) {
      for (const route of response.routes) {
        routes.push({
          coordinates: route.geometry.coordinates,
          distance: route.distance,
          duration: { hours: route.duration_hours, minutes: route.duration_minutes },
        });
      }

      if (Array.isArray(response.waypoints)) {
        for (const wp of response.waypoints) {
          waypoints.push({ location: wp.location, name: wp.name });
        }
      }
    }

    /*** ✅ Extract Trip Summary ***/
    const tripSummary: TripSummary | null =
      response.total_distance !== undefined
        ? {
            distance: response.total_distance,
            duration: {
              hours: response.total_duration_hours ?? 0,
              minutes: response.total_duration_minutes ?? 0,
            },
            unit: response.total_distance_unit ?? "km",
          }
        : null;

    return { routes, waypoints, tripSummary, error: null };
  } catch (error: unknown) {
    console.error("Error fetching trip details:", error);
    return { routes: [], waypoints: [], tripSummary: null, error: "Failed to fetch trip details. Please try again." };
  }
};
