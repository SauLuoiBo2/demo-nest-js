import * as dayjs from 'dayjs';

export interface FilterDateFuncProps {
  startDate?: Date;
  endDate?: Date;
}

export interface FilterDateResultProps {
  lt?: string;
  gte?: string;
}

/**
 * It takes a start date and an end date, and returns an object that can be used as a filter for a date
 * field
 * @param {FilterDateFuncProps} p - FilterDateFuncProps
 * @returns An object with two properties, gte and lt.
 */
export function filterDateFunc(p: FilterDateFuncProps): FilterDateResultProps {
  const startDayjs = dayjs(p.startDate || '');

  const endDayjs = dayjs(p.endDate || '');

  const gte = startDayjs.isValid() ? { gte: startDayjs.format() } : {};
  const lt = endDayjs.isValid() ? { lt: endDayjs.add(1, 'day').format() } : {};

  return {
    ...gte,
    ...lt,
  };
}
