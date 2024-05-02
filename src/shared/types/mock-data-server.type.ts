type City = {
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

export type MockServerData = {
  user: {
    firstName: string[];
    lastName: string[];
    email: string[];
    password: string[];
    avatar: string[];
  };
  offer: {
    title: string[];
    description: string[];
    previewImg: string[];
    photos: string[];
    isPremium: boolean[];
    isFavorites: boolean[];
    numberOfRooms: number[];
    numberOfGuests: number[];
    rentPrice: number[];
    numberOfComments: number[];
  };
  comments: {
    text: string[];
  };
  rating: number[];
  typeOfHousing: string[];
  roles: string[];
  facilities: string[];
  city: City[];
};
