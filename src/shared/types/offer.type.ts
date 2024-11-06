import { Cities } from './city.enum.js';
import { Coordinates } from './coordinates.type.js';
import { User } from './user.type.js';

export type Offer = {
  name: string;
  description: string;
  offerType: string;
  city: Cities;
  previewImage: string,
  images: string[];
  premium: boolean;
  rating: number;
  bedrooms: number;
  guests: number;
  amenities: string[];
  author: User;
  price: number;
  coordinates: Coordinates;
}
