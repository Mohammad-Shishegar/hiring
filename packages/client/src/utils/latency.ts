// Utility functions for simulating network latency and failures in MSW handlers

/**
 * Simulates network delay
 * @param ms - Delay in milliseconds (default: 300-800ms random)
 */
export const delay = (ms?: number): Promise<void> => {
  const delayMs = ms ?? Math.floor(Math.random() * 500) + 300;
  return new Promise((resolve) => setTimeout(resolve, delayMs));
};

/**
 * Randomly fails requests to simulate network errors
 * @param failureRate - Probability of failure (0-1, default: 0.1 = 10%)
 */
export const maybeFail = (failureRate: number = 0.1): void => {
  if (Math.random() < failureRate) {
    throw new Error('Simulated network error');
  }
};

