import axios, { AxiosInstance } from 'axios';
import type {
    Product, Service, Career, PortfolioItem, Blog, CaseStudy, MailLog, MailPayload, CreateBlogPayload,
    AuthResponse
} from '../types/types';

// Base URL from Postman collection
const BASE_URL = 'http://localhost:5000/api';

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

// Helper to extract data from response
const getData = <T>(response: any): T => {
    // Check if response data has a DATA property (common in some APIs)
    // or if the response data IS the data.
    // Based on Postman patterns, it often returns the object directly or wrapped.
    if (response.data && 'data' in response.data) {
        return response.data.data;
    }
    return response.data;
};

// Auth API
export const authApi = {
    signup: async (data: any) => {
        const response = await apiClient.post('/auth/signup', data);
        return getData<AuthResponse>(response);
    },
    login: async (data: any) => {
        const response = await apiClient.post('/auth/login', data);
        return getData<AuthResponse>(response);
    },
    verifyEmail: async (data: { email: string; verificationCode: string }) => {
        const response = await apiClient.post('/auth/verify', data);
        return getData(response);
    },
    logout: async () => {
        const response = await apiClient.post('/auth/logout');
        return getData(response);
    }
};

// Mail API
export const mailApi = {
    send: async (data: MailPayload) => {
        // Handle file uploads if present
        if (data.files && data.files.length > 0) {
            const formData = new FormData();
            formData.append('to', data.to);
            formData.append('subject', data.subject);
            formData.append('message', data.message);
            data.files.forEach((file) => {
                formData.append('files', file);
            });

            const response = await apiClient.post('/mail/send', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return getData(response);
        } else {
            const response = await apiClient.post('/mail/send', data);
            return getData(response);
        }
    },
    getLogs: async (): Promise<MailLog[]> => {
        const response = await apiClient.get('/mail/logs');
        return getData<MailLog[]>(response);
    }
};

// Blogs API
export const blogsApi = {
    create: async (data: CreateBlogPayload) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('writer', data.writer);
        formData.append('readingTime', data.readingTime);
        formData.append('details', data.details);
        formData.append('tags', JSON.stringify(data.tags));
        if (data.image) {
            formData.append('image', data.image);
        }

        const response = await apiClient.post('/blogs/create', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return getData<Blog>(response);
    },
    getAll: async (): Promise<Blog[]> => {
        const response = await apiClient.get('/blogs');
        return getData<Blog[]>(response);
    },
    getOne: async (id: string): Promise<Blog> => {
        const response = await apiClient.get(`/blogs/${id}`);
        return getData<Blog>(response);
    },
    update: async (id: string, data: Partial<CreateBlogPayload>) => {
        const formData = new FormData();
        if (data.title) formData.append('title', data.title);
        if (data.writer) formData.append('writer', data.writer);
        if (data.readingTime) formData.append('readingTime', data.readingTime);
        if (data.details) formData.append('details', data.details);
        if (data.tags) formData.append('tags', JSON.stringify(data.tags));
        if (data.image) {
            formData.append('image', data.image);
        }

        const response = await apiClient.patch(`/blogs/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return getData<Blog>(response);
    },
    delete: async (id: string) => {
        const response = await apiClient.delete(`/blogs/${id}`);
        return getData(response);
    }
};

// Portfolio API
export const portfolioApi = {
    create: async (data: Omit<PortfolioItem, '_id'>) => {
        const response = await apiClient.post('/portfolio', data);
        return getData<PortfolioItem>(response);
    },
    getAll: async (): Promise<PortfolioItem[]> => {
        const response = await apiClient.get('/portfolio');
        return getData<PortfolioItem[]>(response);
    },
    getOne: async (id: string): Promise<PortfolioItem> => {
        const response = await apiClient.get(`/portfolio/${id}`);
        return getData<PortfolioItem>(response);
    },
    update: async (id: string, data: Partial<PortfolioItem>) => {
        const response = await apiClient.patch(`/portfolio/${id}`, data);
        return getData<PortfolioItem>(response);
    },
    delete: async (id: string) => {
        const response = await apiClient.delete(`/portfolio/${id}`);
        return getData(response);
    }
};

// Case Studies API
export const caseStudiesApi = {
    create: async (data: Omit<CaseStudy, '_id'>) => {
        const response = await apiClient.post('/case-studies', data);
        return getData<CaseStudy>(response);
    },
    getAll: async (): Promise<CaseStudy[]> => {
        const response = await apiClient.get('/case-studies');
        return getData<CaseStudy[]>(response);
    },
    getOne: async (id: string): Promise<CaseStudy> => {
        const response = await apiClient.get(`/case-studies/${id}`);
        return getData<CaseStudy>(response);
    },
    update: async (id: string, data: Partial<CaseStudy>) => {
        const response = await apiClient.patch(`/case-studies/${id}`, data);
        return getData<CaseStudy>(response);
    },
    delete: async (id: string) => {
        const response = await apiClient.delete(`/case-studies/${id}`);
        return getData(response);
    }
};

// Products API
export const productsApi = {
    create: async (data: Omit<Product, '_id'>) => {
        const response = await apiClient.post('/products', data);
        return getData<Product>(response);
    },
    getAll: async (): Promise<Product[]> => {
        const response = await apiClient.get('/products');
        return getData<Product[]>(response);
    },
    getOne: async (id: string): Promise<Product> => {
        const response = await apiClient.get(`/products/${id}`);
        return getData<Product>(response);
    },
    update: async (id: string, data: Partial<Product>) => {
        const response = await apiClient.patch(`/products/${id}`, data);
        return getData<Product>(response);
    },
    delete: async (id: string) => {
        const response = await apiClient.delete(`/products/${id}`);
        return getData(response);
    }
};

// Services API
export const servicesApi = {
    create: async (data: Omit<Service, '_id'>) => {
        const response = await apiClient.post('/services', data);
        return getData<Service>(response);
    },
    getAll: async (): Promise<Service[]> => {
        const response = await apiClient.get('/services');
        return getData<Service[]>(response);
    },
    getOne: async (id: string): Promise<Service> => {
        const response = await apiClient.get(`/services/${id}`);
        return getData<Service>(response);
    },
    update: async (id: string, data: Partial<Service>) => {
        const response = await apiClient.patch(`/services/${id}`, data);
        return getData<Service>(response);
    },
    delete: async (id: string) => {
        const response = await apiClient.delete(`/services/${id}`);
        return getData(response);
    }
};

// Careers API
export const careersApi = {
    create: async (data: Omit<Career, '_id'>) => {
        const response = await apiClient.post('/careers', data);
        return getData<Career>(response);
    },
    getAll: async (): Promise<Career[]> => {
        const response = await apiClient.get('/careers');
        return getData<Career[]>(response);
    },
    getOne: async (id: string): Promise<Career> => {
        const response = await apiClient.get(`/careers/${id}`);
        return getData<Career>(response);
    },
    update: async (id: string, data: Partial<Career>) => {
        const response = await apiClient.patch(`/careers/${id}`, data);
        return getData<Career>(response);
    },
    delete: async (id: string) => {
        const response = await apiClient.delete(`/careers/${id}`);
        return getData(response);
    }
};

export default apiClient;
