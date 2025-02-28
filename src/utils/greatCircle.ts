import { LatLngTuple } from "leaflet";

/**
 * Converts degrees to radians.
 */
const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

/**
 * Converts radians to degrees.
 */
const toDegrees = (radians: number) => (radians * 180) / Math.PI;

/**
 * Computes a Great Circle Arc between two coordinates using spherical interpolation.
 * @param coordinates - Array of [lng, lat] points.
 * @returns Array of LatLngTuple points forming a smooth great circle arc.
 */
export const computeGreatCircleArc = (coordinates: [number, number][]): LatLngTuple[] => {
  if (coordinates.length < 2) return coordinates.map(([lng, lat]) => [lat, lng] as LatLngTuple);

  const [lng1, lat1] = coordinates[0];
  const [lng2, lat2] = coordinates[1];

  const numPoints = 50; // Adjust for smoother curves
  const arc: LatLngTuple[] = [];

  const φ1 = toRadians(lat1);
  const λ1 = toRadians(lng1);
  const φ2 = toRadians(lat2);
  const λ2 = toRadians(lng2);

  for (let i = 0; i <= numPoints; i++) {
    const fraction = i / numPoints;

    const A = Math.sin((1 - fraction) * Math.acos(Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1))) / 
              Math.sin(Math.acos(Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1)));
    
    const B = Math.sin(fraction * Math.acos(Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1))) / 
              Math.sin(Math.acos(Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1)));

    const x = A * Math.cos(φ1) * Math.cos(λ1) + B * Math.cos(φ2) * Math.cos(λ2);
    const y = A * Math.cos(φ1) * Math.sin(λ1) + B * Math.cos(φ2) * Math.sin(λ2);
    const z = A * Math.sin(φ1) + B * Math.sin(φ2);

    const φInterpolated = Math.atan2(z, Math.sqrt(x * x + y * y));
    const λInterpolated = Math.atan2(y, x);

    arc.push([toDegrees(φInterpolated), toDegrees(λInterpolated)] as LatLngTuple);
  }

  return arc;
};
