// API Types based on Postman collection

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface AuthResponse {
  accessToken?: string;
  user?: User;
  data?: {
    accessToken: string;
    user: User;
  };
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
  writer: string;
  readingTime: string;
  details: string;
  tags: string[];
  image?: string; // URL or path
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBlogPayload {
  title: string;
  writer: string;
  readingTime: string;
  details: string;
  tags: string[];
  image?: File;
}

// Portfolio
export interface PortfolioItem {
  _id: string;
  title: string;
  client: string;
  category: string;
  details: string;
  technology: string[];
  activeUsers?: string;
  image: string;
  liveLink?: string;
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
  features: string[];
  pricing: number;
  demoLink?: string;
  images?: string[];
  category: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Services
export interface Service {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  features?: string[];
  images?: string[];
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Careers (Note: Not in Postman collection - might need verification)
export interface Career {
  _id: string;
  jobTitle: string;
  jobType: string;
  location: string;
  description: string;
  requirements: string[];
  isDeleted?: boolean;
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
