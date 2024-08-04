import {
  fetchObservationDetailsWithPagination,
  fetchObservationImages,
  fetchMushroomNames,
} from "./apiHelper";
import { MushroomObservation, ObservationImage } from "../types/types";

export const storeImages = async (images: ObservationImage[]) =>
  fetchObservationImages(images);

export const storeObservations = async (observations: MushroomObservation[]) =>
  fetchObservationDetailsWithPagination(observations);

export const storeMushroomNames = async (
  params: { [key: string]: string } = {}
) => fetchMushroomNames(params);
