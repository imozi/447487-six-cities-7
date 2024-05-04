import { MockServerData } from '../../../shared/types/index.js';
import { DataGenerateType } from '../types/enum/data-generate-type.enum.js';
import { common } from '../../../shared/utils/index.js';
import { IDataGenerator } from '../contracts/tsv-data-generator.interface.js';

const { getRandomItem, getRandomDay } = common;

type Generators = Record<DataGenerateType, (data: MockServerData) => string>;

export class TSVDataGenerator implements IDataGenerator {
  private _generators: Generators = {
    user: this._usersGenerator,
    offer: this._offersGenerator,
    comment: this._commentGenerator,
  };

  constructor(private readonly mockData: MockServerData) {}

  private _usersGenerator(data: MockServerData) {
    const { user, roles } = data;

    const firstName = getRandomItem(user.firstName);
    const lastName = getRandomItem(user.lastName);
    const password = getRandomItem(user.password);
    const avatar = getRandomItem(user.avatar);
    const role = getRandomItem(roles);

    return [`${firstName + lastName}`, avatar, password, role].join('\t');
  }

  private _offersGenerator(data: MockServerData) {
    const {
      offer,
      city: mockCity,
      rating: mockRating,
      typeOfHousing: mockTypeOfHousing,
      facilities: mockFacilities,
    } = data;
    const { name: mockCityName, coordinates: mockCityCoord } = getRandomItem(mockCity);
    const { latitude, longitude } = mockCityCoord;

    const title = getRandomItem(offer.title);
    const description = getRandomItem(offer.description);
    const createdAt = getRandomDay();
    const city = mockCityName;
    const previewImg = getRandomItem(offer.previewImg);
    const photos = new Array(6)
      .fill(null)
      .map(() => getRandomItem(offer.photos))
      .join(',');
    const isPremium = getRandomItem(offer.isPremium);
    const isFavorites = getRandomItem(offer.isFavorites);
    const rating = getRandomItem(mockRating);
    const typeOfHousing = getRandomItem(mockTypeOfHousing);
    const numberOfRooms = getRandomItem(offer.numberOfRooms);
    const numberOfGuests = getRandomItem(offer.numberOfRooms);
    const rentPrice = getRandomItem(offer.rentPrice);
    const facilities = new Array(1)
      .fill(null)
      .map(() => getRandomItem(mockFacilities))
      .join(',');
    const coordinates = `${latitude},${longitude}`;

    return [
      title,
      description,
      createdAt,
      city,
      previewImg,
      photos,
      isPremium,
      isFavorites,
      rating,
      typeOfHousing,
      numberOfRooms,
      numberOfGuests,
      rentPrice,
      facilities,
      coordinates,
    ].join('\t');
  }

  private _commentGenerator(data: MockServerData) {
    const { comments } = data;
    const text = getRandomItem(comments.text);
    return text;
  }

  public generate(type: DataGenerateType) {
    const generator = this._generators[type];

    return generator(this.mockData);
  }
}
