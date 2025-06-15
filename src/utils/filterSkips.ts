import type { Skip } from '../types/skip';

type FilterValue = string | number | boolean | ((skip: Skip) => boolean);

export function filterSkips(skips: Skip[], filters: Partial<Record<keyof Skip, FilterValue>>): Skip[] {
  return skips.filter(skip =>
    Object.entries(filters).every(([key, value]) => {
      if (typeof value === 'function') {
        return value(skip);
      }
      // @ts-ignore
      return skip[key] === value;
    })
  );
} 