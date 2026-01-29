// API Types based on Postman collection

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Mail
export interface MailPayload {
  to: string;
  subject: string;
  message: string;
  files?: File[];
}

export interface MailLog {
  _id: string;
  to: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

// Blogs
export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  image?: string; // URL or path
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBlogPayload {
  title: string;
  content: string;
  author: string;
  image?: File;
}

// Portfolio
export interface PortfolioItem {
  _id: string;
  title: string;
  client: string;
  category: string;
  details: string;
  usedTechnology: string[];
  activeUsers?: number;
  imageLink: string;
  liveSiteLink?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Case Studies
export interface CaseStudy {
  _id: string;
  title: string;
  client?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  technologies?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Products
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  features: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Services
export interface Service {
  _id: string;
  name: string;
  description: string;
  category?: string;
  features?: string[];
  pricing?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Careers
export interface Career {
  _id: string;
  title: string;
  department?: string;
  location: string;
  type?: string;
  description?: string;
  requirements: string[];
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
