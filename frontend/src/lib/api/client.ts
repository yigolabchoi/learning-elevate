/**
 * API Client
 * 
 * Centralized HTTP client for backend API communication.
 * Handles authentication, error handling, and request/response transformation.
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiError } from '../../types';

// Environment configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

/**
 * Custom API Error Class
 */
export class ApiClientError extends Error {
  constructor(
    message: string,
    public code: string,
    public status?: number,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

/**
 * API Client Configuration
 */
const apiClientConfig: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Create Axios Instance
 */
const axiosInstance: AxiosInstance = axios.create(apiClientConfig);

/**
 * Request Interceptor
 * - Add authentication token
 * - Add custom headers
 */
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage (or your auth state management)
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request timestamp for debugging
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * - Transform response data
 * - Handle errors consistently
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<any>>) => {
    // Log successful response in dev mode
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.config.url}`, response.data);
    }

    return response;
  },
  (error: AxiosError<ApiError>) => {
    // Log error in dev mode
    if (import.meta.env.DEV) {
      console.error('[API Error]', error.response?.data || error.message);
    }

    // Handle specific error cases
    if (error.response) {
      const { status, data } = error.response;

      // Handle unauthorized (401) - redirect to login
      if (status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(
          new ApiClientError('Unauthorized', 'AUTH_REQUIRED', status)
        );
      }

      // Handle forbidden (403)
      if (status === 403) {
        return Promise.reject(
          new ApiClientError(
            data?.error?.message || 'Forbidden',
            data?.error?.code || 'FORBIDDEN',
            status,
            data?.error?.details
          )
        );
      }

      // Handle not found (404)
      if (status === 404) {
        return Promise.reject(
          new ApiClientError(
            data?.error?.message || 'Resource not found',
            data?.error?.code || 'NOT_FOUND',
            status
          )
        );
      }

      // Handle validation errors (422)
      if (status === 422) {
        return Promise.reject(
          new ApiClientError(
            data?.error?.message || 'Validation failed',
            data?.error?.code || 'VALIDATION_ERROR',
            status,
            data?.error?.details
          )
        );
      }

      // Handle server errors (500+)
      if (status >= 500) {
        return Promise.reject(
          new ApiClientError(
            data?.error?.message || 'Server error',
            data?.error?.code || 'SERVER_ERROR',
            status
          )
        );
      }

      // Generic error
      return Promise.reject(
        new ApiClientError(
          data?.error?.message || 'Request failed',
          data?.error?.code || 'REQUEST_FAILED',
          status,
          data?.error?.details
        )
      );
    }

    // Handle network errors
    if (error.request) {
      return Promise.reject(
        new ApiClientError(
          'Network error. Please check your connection.',
          'NETWORK_ERROR'
        )
      );
    }

    // Handle other errors
    return Promise.reject(
      new ApiClientError(
        error.message || 'An unexpected error occurred',
        'UNKNOWN_ERROR'
      )
    );
  }
);

/**
 * API Client Methods
 */
export const apiClient = {
  /**
   * GET request
   */
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.get<ApiResponse<T>>(url, config);
    return response.data.data;
  },

  /**
   * POST request
   */
  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.post<ApiResponse<T>>(url, data, config);
    return response.data.data;
  },

  /**
   * PUT request
   */
  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.put<ApiResponse<T>>(url, data, config);
    return response.data.data;
  },

  /**
   * PATCH request
   */
  patch: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.patch<ApiResponse<T>>(url, data, config);
    return response.data.data;
  },

  /**
   * DELETE request
   */
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.delete<ApiResponse<T>>(url, config);
    return response.data.data;
  },

  /**
   * Upload file (multipart/form-data)
   */
  upload: async <T>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.post<ApiResponse<T>>(url, formData, {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },
};

/**
 * Export axios instance for advanced use cases
 */
export { axiosInstance };

/**
 * Mock delay utility for development
 * TODO: Remove when integrating with real backend
 */
export const mockDelay = (ms: number = 400): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Check if using mock API
 */
export const isMockMode = (): boolean => {
  return import.meta.env.VITE_USE_MOCK_API === 'true';
};

