export interface Route {
  coordinates: [number, number][];
  distance: number;
  duration: { hours: number; minutes: number };
}

export interface Waypoint {
  location: [number, number];
  name: string;
}

export interface TripSummary {
  distance: number;
  duration: { hours: number; minutes: number };
  unit: string;
}

export interface SearchParams {
  from: string;
  to: string;
  stops?: string[];
}

export interface SearchResult {
  routes: Route[];
  waypoints: Waypoint[];
  tripSummary: TripSummary | null;
  error: string | null;
}

export interface ApiResponse {
  destination?: string;
  origin?: string;
  legs?: {
    from: string;
    to: string;
    routes?: {
      distance: number;
      distance_unit: string;
      duration_hours: number;
      duration_minutes: number;
      geometry: { coordinates: [number, number][] };
    }[];
    waypoints?: { location: [number, number]; name: string }[];
  }[];
  routes?: {
    distance: number;
    distance_unit: string;
    duration_hours: number;
    duration_minutes: number;
    geometry: { coordinates: [number, number][] };
  }[];
  waypoints?: { location: [number, number]; name: string }[];
  total_distance?: number;
  total_distance_unit?: string;
  total_duration_hours?: number;
  total_duration_minutes?: number;
}


export interface ApiResponseFlight {
    destination: string;
    destination_coords: [number, number]; // [latitude, longitude]
    distance: number;
    distance_unit: string;
    duration_hours: number;
    duration_minutes: number;
    geometry: {
      coordinates: [number, number][]; // Array of [longitude, latitude]
      type: "LineString";
    };
    notes: string;
    origin: string;
    origin_coords: [number, number]; // [latitude, longitude]
    unit_system: string;
  }
  