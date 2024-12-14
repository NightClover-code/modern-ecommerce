export interface Product {
  _id: string;
  name: string;
  images: string[];
  description: string;
  brand: string;
  brandLogo: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
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
  page: number;
  pages: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
} 