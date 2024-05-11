import dayjs from 'dayjs';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

export const generateRandomValue = (min: number, max: number, numAfterDigit = 0) =>
  +(Math.random() * (max - min) + min).toFixed(numAfterDigit);

export const getRandomItem = <T>(items: T[]): T => items[generateRandomValue(0, items.length - 1)];

export const getRandomDay = () => {
  const FIRST_WEEK_DAY = 1;
  const LAST_WEEK_DAY = 7;

  return dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
};


export function getCurrentModuleDirectoryPath() {
  const filepath = fileURLToPath(import.meta.url);
  return dirname(filepath);
}
