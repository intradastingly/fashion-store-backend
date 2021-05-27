export interface Product {
  _id: number;
  title: string;
  description: string;
  price: number;
  img: string;
}

export const productList: Product[] = [];
