import { Facilities, TypeOfHousing } from '../enums/index.js';
import { City } from './city.type.js';

export type Offer = {
  title: string;
  description: string;
  createdAt: Date;
  city: Omit<City, 'coordinates'>;
  previewImg: string;
  photos: string[];
  isPremium: boolean;
  isFavorites: boolean;
  rating: number;
  typeOfHousing: TypeOfHousing;
  numberOfRooms: number;
  numberOfGuests: number;
  rentPrice: number;
  facilities: Facilities[];
  userId: string;
  numberOfComments: number;
  coordinates: Omit<City, 'name'>;
};
