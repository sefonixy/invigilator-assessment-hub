import { 
  withRetry, 
  classifyError, 
  getErrorRecoveryOptions,
  NetworkError,
  ValidationError,
  DataError
} from '../errorHandling';

describe('Error Handling Utilities', () => {
  describe('withRetry', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should succeed on first attempt', async () => {
      const operation = jest.fn().mockResolvedValue('success');
      
      const result = await withRetry(operation);
      
      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(1);
    });

    test('should retry on failure and eventually succeed', async () => {
      const operation = jest.fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValue('success');
      
      const result = await withRetry(operation, { maxAttempts: 3 });
      
      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(2);
    });

    test('should throw after max attempts', async () => {
      const operation = jest.fn().mockRejectedValue(new Error('persistent failure'));
      
      await expect(withRetry(operation, { maxAttempts: 2 }))
        .rejects.toThrow('persistent failure');
      
      expect(operation).toHaveBeenCalledTimes(2);
    });

    test('should not retry non-retryable errors', async () => {
      const validationError = new ValidationError('Invalid data');
      const operation = jest.fn().mockRejectedValue(validationError);
      
      await expect(withRetry(operation, { maxAttempts: 3 }))
        .rejects.toThrow('Invalid data');
      
      expect(operation).toHaveBeenCalledTimes(1);
    });

    test('should apply exponential backoff', async () => {
      const operation = jest.fn()
        .mockRejectedValueOnce(new Error('fail1'))
        .mockRejectedValueOnce(new Error('fail2'))
        .mockResolvedValue('success');
      
      const startTime = Date.now();
      await withRetry(operation, { 
        maxAttempts: 3, 
        delay: 100, 
        backoff: true 
      });
      const endTime = Date.now();
      
      // Should take at least 100ms + 200ms for backoff
      expect(endTime - startTime).toBeGreaterThan(250);
      expect(operation).toHaveBeenCalledTimes(3);
    });
  });

  describe('classifyError', () => {
    test('should classify network errors', () => {
      const networkError = new Error('fetch failed');
      const classified = classifyError(networkError);
      
      expect(classified).toBeInstanceOf(NetworkError);
      expect(classified.retryable).toBe(true);
    });

    test('should classify validation errors', () => {
      const validationError = new Error('validation failed');
      const classified = classifyError(validationError);
      
      expect(classified).toBeInstanceOf(ValidationError);
      expect(classified.retryable).toBe(false);
    });

    test('should return existing ApiError unchanged', () => {
      const existingError = new DataError('data error');
      const classified = classifyError(existingError);
      
      expect(classified).toBe(existingError);
    });

    test('should handle unknown errors', () => {
      const unknownError = 'string error';
      const classified = classifyError(unknownError);
      
      expect(classified).toBeInstanceOf(DataError);
      expect(classified.message).toBe('Unknown error occurred');
    });
  });

  describe('getErrorRecoveryOptions', () => {
    test('should provide network error recovery options', () => {
      const networkError = new NetworkError('Connection failed');
      const options = getErrorRecoveryOptions(networkError);
      
      expect(options).toContain('Retry the operation');
      expect(options).toContain('Check your internet connection');
      expect(options).toContain('Try again in a few moments');
    });

    test('should provide validation error recovery options', () => {
      const validationError = new ValidationError('Invalid input');
      const options = getErrorRecoveryOptions(validationError);
      
      expect(options).toContain('Check your input data');
      expect(options).toContain('Ensure all required fields are filled');
      expect(options).not.toContain('Retry the operation');
    });

    test('should provide data error recovery options', () => {
      const dataError = new DataError('Data corruption');
      const options = getErrorRecoveryOptions(dataError);
      
      expect(options).toContain('Refresh the page');
      expect(options).toContain('Contact support if the issue persists');
    });
  });

  describe('Error Classes', () => {
    test('NetworkError should have correct properties', () => {
      const error = new NetworkError('Network failed');
      
      expect(error.name).toBe('NetworkError');
      expect(error.code).toBe('NETWORK_ERROR');
      expect(error.retryable).toBe(true);
      expect(error.status).toBe(0);
    });

    test('ValidationError should have correct properties', () => {
      const error = new ValidationError('Validation failed');
      
      expect(error.name).toBe('ValidationError');
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.retryable).toBe(false);
    });

    test('DataError should have correct properties', () => {
      const error = new DataError('Data failed');
      
      expect(error.name).toBe('DataError');
      expect(error.code).toBe('DATA_ERROR');
      expect(error.retryable).toBe(false);
    });
  });
}); 