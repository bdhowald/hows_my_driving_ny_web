import retryRequest from './retryRequest'

describe('retryRequest', () => {
  it('should call the async function passed to retryRequest', async () => {
    const answerToLifeTheUniverseAndEverything = 42
    const asyncRequestFunction = () =>
      Promise.resolve(answerToLifeTheUniverseAndEverything)

    const answer = await retryRequest({ asyncRequestFunction })

    expect(answer).toBe(answerToLifeTheUniverseAndEverything)
  })

  describe('should retry', () => {
    it('should not retry the async function passed to retryRequest if the async function fulfills', async () => {
      const shouldRetry = () => true
      const mockFunction = jest.fn()
      const asyncRequestFunction = async () => mockFunction()

      await retryRequest({ asyncRequestFunction, shouldRetry })

      expect(mockFunction).toHaveBeenCalledTimes(1)
    })

    it('should retry the async function passed to retryRequest if the async function rejects and shouldRetry evaluates to true', async () => {
      const shouldRetry = () => true
      const mockFunction = jest
        .fn()
        .mockImplementationOnce(() => {
          throw Error('This fails the first time.')
        })
        .mockImplementationOnce(() => true)
      const asyncRequestFunction = async () => mockFunction()

      await retryRequest({ asyncRequestFunction, shouldRetry })

      expect(mockFunction).toHaveBeenCalledTimes(2)
    })

    it('should retry the async function passed to retryRequest if the async function rejects and shouldRetry evaluates to false', async () => {
      const shouldRetry = () => false
      const errorMessage = 'This fails the first and only time.'

      const mockFunction = jest
        .fn()
        .mockImplementationOnce(() => {
          throw Error(errorMessage)
        })
        .mockImplementationOnce(() => true)

      const asyncRequestFunction = async () => mockFunction()

      await expect(
        retryRequest({ asyncRequestFunction, shouldRetry }),
      ).rejects.toThrow(errorMessage)

      expect(mockFunction).toHaveBeenCalledTimes(1)
    })
  })

  describe('maxRetries', () => {
    it('should retry the async function passed to retryRequest a max of maxRetries times if the async function rejects and shouldRetry evaluates to true', async () => {
      const shouldRetry = () => true
      const errorMessage = 'This fails a few times...'

      const mockFunction = jest.fn().mockImplementation(() => {
        throw Error(errorMessage)
      })
      const asyncRequestFunction = async () => mockFunction()

      const maxRetries = 1

      await expect(
        retryRequest({ asyncRequestFunction, maxRetries, shouldRetry }),
      ).rejects.toThrow(errorMessage)

      expect(mockFunction).toHaveBeenCalledTimes(maxRetries + 1)
    })
  })
})
