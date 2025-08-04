import { PlacePrediction } from "../../types";

export interface HistorySectionProps {
  history: PlacePrediction[];
  isLoading: boolean;
  onSelect: (place: PlacePrediction) => void;
  onClear: () => void;
}
