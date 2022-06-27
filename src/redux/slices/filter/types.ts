export enum SortPropety {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
}

export type TSortObj = {
  name: string;
  sortProperty: SortPropety;
};

export interface IFilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: TSortObj;
}
