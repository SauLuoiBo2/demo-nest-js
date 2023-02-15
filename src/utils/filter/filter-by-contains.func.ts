export type FilterByContainsFunc = {
  contains?: string;
};

/**
 * It returns an object with a property called "contains" if the name parameter is truthy, otherwise it
 * returns an empty object
 * @param {string} [name] - The name of the filter.
 * @returns A function that takes a string and returns an object with a contains property.
 */
export function filterByContainsFunc(name?: string): FilterByContainsFunc {
  const result = name ? { contains: name } : {};

  return result;
}
