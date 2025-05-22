export interface Coordinate {
  lat: number;
  lng: number;
}

export interface NaverPlaceDTO {
  name: string;
  x: number; // 경도
  y: number; // 위도
}

export interface Place {
  name: string;
  lat: number;
  lng: number;
  category: string;
  distance?: number; // 정렬 시 거리
}

export interface Budget {
  min: number;
  max: number;
}

export interface ItineraryInput {
  start: Coordinate;
  destination: Coordinate;
  category: string; // ex. "커플", "가족"
  budget: Budget;
  dateRange: { start: string; end: string };
}
