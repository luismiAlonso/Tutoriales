export interface FiltradoHookOptions<T extends any[]> {
  sortedDataProperties: T[] | undefined;
  ordenProperties: 'desc' | 'asc' | undefined;
  isFiltered: boolean;
  setOrdenProperties: (order: 'desc' | 'asc') => void;
  setProperty: (property: string) => void;
  filterData: (
    newData: T[],
    newProperty: keyof T,
    newOrder: 'desc' | 'asc'
  ) => Promise<T[]>;
  filterByWords: (
    newData: T[],
    searchWord: string,
    newProperty: keyof T,
    newOrder: 'desc' | 'asc'
  ) => Promise<T[]>;
}


