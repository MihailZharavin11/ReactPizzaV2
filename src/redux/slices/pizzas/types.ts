export type SearchPizzaParams = {
  category: string;
  sort: string;
  order: string;
  currentPage: number;
  sortBy: string;
};

export type TPizzaItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  count: number;
};

export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  ERROR = 'error',
}

export interface IPizzasSliceState {
  items: TPizzaItem[];
  loadingStatus: Status;
  itemsById: null | TPizzaItem;
}
