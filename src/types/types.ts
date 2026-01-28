// API Types based on Postman collection

export interface Product {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  pricing: number;
  category: string;
  features: string[];
  images: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Service {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Career {
  _id?: string;
  id?: string;
  jobTitle: string;
  jobType: string;
  location: string;
  description: string;
  requirements: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PortfolioItem {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  client: string;
  image: string;
  stats: string;
  stack: string[];
  description: string;
  link: string;
  createdAt?: string;
  updatedAt?: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: any;
}
