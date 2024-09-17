import { Coordinates } from './coordinates.type.js';

export type Offer = {
  name: string;
  description: string;
  createdData: Date;
  city: string;
  previewImage: string,
  images: string[];
  premium: boolean;
  favorite: boolean;
  rating: number;
  bedrooms: number;
  guests: number;
  amenities: string[];
  autor: string;
  price: number;
  coordinates: Coordinates;
}
