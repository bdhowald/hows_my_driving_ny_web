import { BASE_DELAY } from 'constants/requests'

type RetryOptions<T> = {
  asyncRequestFunction: () => Promise<T>
  baseDelay?: number
  jitter?: boolean
  maxRetries?: number
  onRetry?: (attempt: number, error: unknown, delay: number) => void
  shouldRetry?: (error?: unknown) => boolean
}

/**
 *
 * Makes a request with retry capability, taking in arguments like max retries,
 * a base delay amount, a jitter amount, and functions to determine if a retry
 * should happen and what to do when a retry is needed.
 */
const retryRequest = async <T,> ({
  asyncRequestFunction,
  baseDelay = BASE_DELAY,
  jitter = true,
  maxRetries = 3,
  onRetry = () => null,
  shouldRetry = () => true,
}: RetryOptions<T>): Promise<T> => {
  let attempt = 0

  while (attempt <= maxRetries) {
    try {
      return await asyncRequestFunction()
    } catch (error) {
      if (attempt === maxRetries) {
        console.log(
          `Requests failed after ${maxRetries + 1} attempts, throwing error`,
        )
        throw error
      }

      if (!shouldRetry()) {
        console.log('Retry condition failed, throwing error')
        throw error
      }

      // delay grows by power of two each time
      const delay = jitter
        ? Math.random() * baseDelay * 2 ** attempt
        : baseDelay * 2 ** attempt

      onRetry(attempt + 1, error, delay)

      await new Promise((resolve) => setTimeout(resolve, delay))
    }

    attempt++
  }

  throw new Error('Unexpected exit from retryRequest')
}

export default retryRequest
