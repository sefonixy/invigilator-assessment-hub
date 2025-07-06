// Error handling utilities for improved robustness
export interface RetryOptions {
  maxAttempts?: number;
  delay?: number;
  backoff?: boolean;
}

export interface ApiError extends Error {
  code?: string;
  status?: number;
  retryable?: boolean;
}

export class NetworkError extends Error implements ApiError {
  code = 'NETWORK_ERROR';
  status = 0;
  retryable = true;

  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class ValidationError extends Error implements ApiError {
  code = 'VALIDATION_ERROR';
  retryable = false;

  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class DataError extends Error implements ApiError {
  code = 'DATA_ERROR';
  retryable = false;

  constructor(message: string) {
    super(message);
    this.name = 'DataError';
  }
}

// Retry mechanism for async operations
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const { maxAttempts = 3, delay = 1000, backoff = true } = options;
  
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry non-retryable errors
      const apiError = error as ApiError;
      if (apiError.retryable === false) {
        throw error;
      }
      
      // Don't retry on last attempt
      if (attempt === maxAttempts) {
        break;
      }
      
      // Calculate delay with optional exponential backoff
      const currentDelay = backoff ? delay * Math.pow(2, attempt - 1) : delay;
      await new Promise(resolve => setTimeout(resolve, currentDelay));
    }
  }
  
  throw lastError!;
}

// Error classification helper
export function classifyError(error: unknown): ApiError {
  const apiError = error as Partial<ApiError>;
  if (apiError && apiError.code && typeof apiError.retryable === 'boolean') {
    return apiError as ApiError;
  }
  
  if (error instanceof Error) {
    // Network-related errors
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return new NetworkError(error.message);
    }
    
    // Data validation errors
    if (error.message.includes('validation') || error.message.includes('invalid')) {
      return new ValidationError(error.message);
    }
    
    // Default to data error
    return new DataError(error.message);
  }
  
  return new DataError('Unknown error occurred');
}

// Error recovery suggestions
export function getErrorRecoveryOptions(error: ApiError): string[] {
  const options: string[] = [];
  
  if (error.retryable) {
    options.push('Retry the operation');
  }
  
  if (error.code === 'NETWORK_ERROR') {
    options.push('Check your internet connection');
    options.push('Try again in a few moments');
  }
  
  if (error.code === 'VALIDATION_ERROR') {
    options.push('Check your input data');
    options.push('Ensure all required fields are filled');
  }
  
  if (error.code === 'DATA_ERROR') {
    options.push('Refresh the page');
    options.push('Contact support if the issue persists');
  }
  
  return options;
}

// Global error boundary helper
export function logError(error: Error, context?: Record<string, unknown>): void {
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    context
  };
  
  // In a real app, this would send to an error tracking service
  console.error('Application Error:', errorInfo);
  
  // Could integrate with services like Sentry, LogRocket, etc.
  // Sentry.captureException(error, { extra: context });
} 