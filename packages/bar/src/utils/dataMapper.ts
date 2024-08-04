import {
  MushroomObservationImage,
  MushroomObservationDetails,
  MushroomName,
} from "../types";
import {
  fetchObservationImages,
  fetchObservationDetails,
  fetchMushroomNames,
} from "./apiHelper";

export const mapObservationImages = async (
  observationId: string
): Promise<MushroomObservationImage[]> => {
  const response = await fetchObservationImages(observationId);

  return response.results;
};

export const mapObservationDetails = async (
  observationId: string
): Promise<MushroomObservationDetails> => {
  const response = await fetchObservationDetails(observationId);

  return response;
};

export const mapMushroomNames = async (
  params: { [key: string]: string } = {}
): Promise<MushroomName[]> => {
  const response = await fetchMushroomNames(params);

  return response;
};

export const mapObservation = async (
  observation: MushroomObservation
): Promise<MushroomObservation> =>
  // Implement your mapping logic here
  // For example, you might want to transform the 'date' field
  // or add additional properties to the observation object
  observation;

export default {
  mapObservationImages,
  mapObservationDetails,
  mapMushroomNames,
  mapObservation,
};
