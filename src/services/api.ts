import axios, { AxiosInstance } from 'axios';
import type { Product, Service, Career, PortfolioItem, ApiResponse } from '../types/types';

// Base URL from Postman collection
const BASE_URL = 'http://localhost:5000/api/v1';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Unauthorized - clear token and redirect to login
            localStorage.removeItem('auth_token');
            localStorage.removeItem('dashboard_user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Products API
export const productsApi = {
    getAll: async (): Promise<Product[]> => {
        const response = await apiClient.get<ApiResponse<Product[]> | Product[]>('/products');
        // Handle both wrapped and unwrapped responses
        return Array.isArray(response.data) ? response.data : response.data.data;
    },

    create: async (product: Omit<Product, '_id' | 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
        const response = await apiClient.post<ApiResponse<Product> | Product>('/products', product);
        return 'data' in response.data ? response.data.data : response.data;
    },
};

// Services API
export const servicesApi = {
    getAll: async (): Promise<Service[]> => {
        const response = await apiClient.get<ApiResponse<Service[]> | Service[]>('/services');
        return Array.isArray(response.data) ? response.data : response.data.data;
    },

    create: async (service: Omit<Service, '_id' | 'id' | 'createdAt' | 'updatedAt'>): Promise<Service> => {
        const response = await apiClient.post<ApiResponse<Service> | Service>('/services', service);
        return 'data' in response.data ? response.data.data : response.data;
    },
};

// Careers API
export const careersApi = {
    getAll: async (): Promise<Career[]> => {
        const response = await apiClient.get<ApiResponse<Career[]> | Career[]>('/careers');
        return Array.isArray(response.data) ? response.data : response.data.data;
    },

    create: async (career: Omit<Career, '_id' | 'id' | 'createdAt' | 'updatedAt'>): Promise<Career> => {
        const response = await apiClient.post<ApiResponse<Career> | Career>('/careers', career);
        return 'data' in response.data ? response.data.data : response.data;
    },
};

// Portfolio API (read-only based on Postman collection)
export const portfolioApi = {
    getAll: async (): Promise<PortfolioItem[]> => {
        const response = await apiClient.get<ApiResponse<PortfolioItem[]> | PortfolioItem[]>('/portfolio');
        return Array.isArray(response.data) ? response.data : response.data.data;
    },
};

export default apiClient;
