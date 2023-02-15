import {
  FilterByContainsFunc,
  filterByContainsFunc,
} from './filter-by-contains.func';
import { filterDateFunc, FilterDateResultProps } from './filter-date.func';

export type FilterByBasicFunc = {
  name: FilterByContainsFunc;
  createdAt: FilterDateResultProps;
};

/**
 * It returns an array of objects, each object containing a key and a value. The key is the name of the
 * field to be filtered, and the value is the filter function
 * @param {string} [nameD] - The name of the user.
 * @param {Date} [startDateD] - the start date of the date range
 * @param {Date} [endDateD] - Date
 * @returns An array of objects.
 */
export function filterByBasicFunc(
  nameD?: string,
  startDateD?: Date,
  endDateD?: Date,
) {
  const name = filterByContainsFunc(nameD);

  const filterDateFunProps = {
    startDate: startDateD,
    endDate: endDateD,
  };
  const createdAt = filterDateFunc(filterDateFunProps);

  const result = [{ name }, { createdAt }];

  return result;
}
