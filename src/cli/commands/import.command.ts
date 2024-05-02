import chalk from 'chalk';
import { ICommand } from '../libs/contracts/index.js';
import { FileReader } from '../libs/file-reader/file-reader.js';
import { FileTypes } from '../libs/types/index.js';
import { Offer } from '../../shared/types/offer.type.js';
import { City } from '../../shared/types/index.js';
import { TypeOfHousing } from '../../shared/enums/type-of-housing.enum.js';
import { Facilities } from '../../shared/enums/index.js';

export class ImportCommand implements ICommand {
  public getName(): string {
    return '--import';
  }

  private _generateOffer(data: string): Omit<Offer, 'userId' | 'numberOfComments'> {
    const [
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
    ] = data.trim().split('\t');

    const [latitude, longitude] = coordinates.split(',');

    return {
      title,
      description,
      createdAt: new Date(createdAt),
      city: city as unknown as Omit<City, 'coordinates'>,
      previewImg,
      photos: photos.split(','),
      isPremium: Boolean(isPremium),
      isFavorites: Boolean(isFavorites),
      rating: +rating,
      typeOfHousing: typeOfHousing as TypeOfHousing,
      numberOfRooms: +numberOfRooms,
      numberOfGuests: +numberOfGuests,
      rentPrice: +rentPrice,
      facilities: facilities.split(',') as Facilities[],
      coordinates: {
        latitude,
        longitude,
      } as unknown as Omit<City, 'name'>,
    };
  }

  private _importData = (...args: string[]) => {
    const [part] = args;

    console.log(this._generateOffer(part));
  };

  private _complateImportData = () => {
    console.log(`${chalk.bold.greenBright('Файл успешно испортирован')}`);
  };

  private async _read(filePath: string) {
    const callbacks = {
      part: this._importData,
      end: this._complateImportData,
    };

    new FileReader().read(filePath, FileTypes.tsv, callbacks);
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filePath] = parameters;
    await this._read(filePath);
  }
}
