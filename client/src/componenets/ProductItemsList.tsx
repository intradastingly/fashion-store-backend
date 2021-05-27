export interface Product {
  _id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

export const productList: Product[] = [];
