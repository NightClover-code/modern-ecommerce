export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  reviews: Review[];
}

export interface Review {
  name: string;
  rating: number;
  comment: string;
  user: string;
  createdAt: string;
}

export interface PaginatedProducts {
  products: Product[];
  pages: number;
  page: number;
}
