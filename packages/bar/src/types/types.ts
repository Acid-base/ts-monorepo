// packages/bar/src/types/types.ts
export interface MushroomObservation {
  id: number;
  name: string;
  scientificName: string;
  commonName: string;
  description: string;
  date: Date;
  latitude: number;
  longitude: number;
  images: {
    results: {
      id: number;
      url: string;
      copyrightHolder: string;
      license: string;
    }[];
  };
}

export interface ObservationData {
  results: MushroomObservation[];
  error: string | null;
}

export interface ObservationImage {
  id: number;
  url: string;
  copyrightHolder: string;
  license: string;
}

export interface MushroomName {
  id: number;
  scientificName: string;
  commonName: string;
  description: string;
  images: number[];
  locationId: number | null;
}

export interface MushroomObserverResponse {
  results: MushroomName[];
  error: string | null;
}
