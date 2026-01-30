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
  client: string;
  category: string;
  challenge: string;
  solution: string;
  result: string;
  image: string;
  link: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCaseStudyPayload {
  title: string;
  client: string;
  category: string;
  challenge: string;
  solution: string;
  result: string;
  image: string;
  link: string;
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

// Careers
export interface Career {
  _id: string;
  jobTitle: string;
  jobType: string;
  location: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salaryRange: string;
  deadline: string;
  applicationEmail: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCareerPayload {
  jobTitle: string;
  jobType: string;
  location: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salaryRange: string;
  deadline: string;
  applicationEmail: string;
}


// Reviews
export interface Review {
  _id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  review: string;
  project: string;
  budget: string;
  duration: string;
  summary: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateReviewPayload {
  name: string;
  role: string;
  image: string;
  rating: number;
  review: string;
  project: string;
  budget: string;
  duration: string;
  summary: string;
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
