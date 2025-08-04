import { PlacePrediction } from "../../types";

export interface SearchSectionProps {
  query: string;
  results: PlacePrediction[];
  isLoading: boolean;
  error: string | null;
  onChangeQuery: (text: string) => void;
  onSelectPlace: (place: PlacePrediction) => void;
}