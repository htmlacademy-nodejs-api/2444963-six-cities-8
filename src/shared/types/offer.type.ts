import { Cities } from './cities.type.js';
import { Coordinates } from './coordinates.type.js';
import { User } from './user.type.js';

export type Offer = {
  name: string;
  description: string;
  offerType: string;
  createdData: Date;
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
