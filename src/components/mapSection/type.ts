import { PlacePrediction } from "../../types";
export interface MapSectionProps {
  selectedPlace: PlacePrediction | null;
  fallbackText?: string;
}