export type TCartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: string;
  sizes: number;
  count: number;
};

export interface ICartSliceState {
  totalPrice: number;
  totalCount: number;
  items: TCartItem[];
}
