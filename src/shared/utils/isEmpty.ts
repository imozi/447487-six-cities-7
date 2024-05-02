import { isObject, isArray } from './isType.js';

export function isEmpty<T>(value: T | unknown): boolean {
  switch (true) {
    case isObject(value):
      return !Object.keys(value as Record<string, unknown>).length;
    case value instanceof Map || value instanceof Set:
      return !value.size;
    case isArray(value):
      return !(value as []).length;
    case typeof value === 'string':
      return !value.trim().length;
    default:
      return true;
  }
}
