import fetch from "node-fetch";
import { URL } from "url";
import dotenv from "dotenv";
import {
  MushroomObservation,
  ObservationImage,
  MushroomName,
  MushroomObserverResponse,
} from "../types/types";

dotenv.config();

const { MUSHROOM_OBSERVER_API_KEY } = process.env;

interface ApiErrorResponse {
  error: string;
}

interface FetchOptions {
  headers?: { [key: string]: string };
}

const fetchMushroomData = async <T>(
  url: string,
  options?: FetchOptions
): Promise<T> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = (await response.json()) as ApiErrorResponse;
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${
        errorData.error || "Unknown error"
      }`
    );
  }

  return response.json() as Promise<T>;
};

// Fetch observation images by observation ID
export const fetchObservationImages = async (
  observationId: number
): Promise<{ results: ObservationImage[] }> => {
  const url = new URL(
    `https://mushroomobserver.org/api2/observations/${observationId}/images`
  );
  url.searchParams.append("format", "json");

  const response = await fetchMushroomData<{ results: ObservationImage[] }>(
    url.toString(),
    {
      headers: {
        Authorization: `Bearer ${MUSHROOM_OBSERVER_API_KEY}`,
        "X-RateLimit-Limit": "15",
        "X-RateLimit-Window": "60",
      },
    }
  );

  return response;
};

// Fetch observation details by observation ID
export const fetchObservationDetails = async (
  observationId: number
): Promise<MushroomObservation> => {
  const url = new URL(
    `https://mushroomobserver.org/api2/observations/${observationId}`
  );
  url.searchParams.append("detail", "high");
  url.searchParams.append("format", "json");

  const response = await fetchMushroomData<MushroomObservation>(
    url.toString(),
    {
      headers: {
        Authorization: `Bearer ${MUSHROOM_OBSERVER_API_KEY}`,
        "X-RateLimit-Limit": "15",
        "X-RateLimit-Window": "60",
      },
    }
  );

  return response;
};

// Fetch all mushroom names with pagination
export const fetchAllMushroomNames = async (
  params: Record<string, string> = {}
): Promise<MushroomName[]> => {
  let allNames: MushroomName[] = [];

  const responses: MushroomObserverResponse[] = await Promise.all(
    Array(10) // Replace 10 with the actual max number of pages you need
      .fill(null)
      .map((_, index) => {
        const url = new URL("https://mushroomobserver.org/api2/names");
        url.searchParams.append("format", "json");
        Object.entries(params).forEach(([key, value]) =>
          url.searchParams.append(key, value)
        );
        url.searchParams.append("page", (index + 1).toString());

        return fetchMushroomData<MushroomObserverResponse>(url.toString(), {
          headers: {
            Authorization: `Bearer ${MUSHROOM_OBSERVER_API_KEY}`,
            "X-RateLimit-Limit": "15",
            "X-RateLimit-Window": "60",
          },
        });
      })
  );

  // Combine the results from all pages
  allNames = responses.flatMap((r: MushroomObserverResponse) => r.results);

  return allNames;
};

// Fetch observation details with pagination
interface FetchObservationDetailsParams {
  page: number;
}

export const fetchObservationDetailsWithPagination = async (
  params: FetchObservationDetailsParams
): Promise<MushroomObservation[]> => {
  const url = new URL("https://mushroomobserver.org/api2/observations");
  url.searchParams.append("format", "json");
  url.searchParams.append("page", params.page.toString());

  const response = await fetchMushroomData<MushroomObserverResponse>(
    url.toString(),
    {
      headers: {
        Authorization: `Bearer ${MUSHROOM_OBSERVER_API_KEY}`,
        "X-RateLimit-Limit": "15",
        "X-RateLimit-Window": "60",
      },
    }
  );

  return response.results;
};
