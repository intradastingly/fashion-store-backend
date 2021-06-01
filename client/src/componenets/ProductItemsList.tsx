export interface Product {
  _id: number;
  title: string;
  description: string;
  price: number;
  img: string;
  quantity: number;
}

export const productList: Product[] = [];
