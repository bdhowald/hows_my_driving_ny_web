import React from 'react'
import { act, renderHook } from '@testing-library/react'

import useClientStorage from './useClientStorage'

const TEST_STORAGE_KEY = 'testStorage'

describe('useClientStorage', () => {
  afterEach(() => {
    localStorage.removeItem(TEST_STORAGE_KEY)
  })

  it('should expose the functions from the hook/function', () => {
    const { result } = renderHook(() =>
      useClientStorage<string>(TEST_STORAGE_KEY),
    )

    const [value, updateValue] = result.current

    // No initial value set, so should be undefined
    expect(value).toBeUndefined()

    // Function should be defined
    expect(updateValue).not.toBeUndefined()
  })

  it('should set the value as the initial given value if present', () => {
    const { result } = renderHook(() =>
      useClientStorage<number>(TEST_STORAGE_KEY, 1),
    )

    const [value, _] = result.current

    expect(value).toBe(1)
  })

  it('should update the value when using the returned updateValue function', async () => {
    const { result } = renderHook(() =>
      useClientStorage<number>(TEST_STORAGE_KEY, 1),
    )

    const [initialValue, updateValue] = result.current

    await act(async () => {
      if (initialValue) {
        updateValue(initialValue + 1)
      }
    })

    const [updatedValue, _] = result.current

    expect(updatedValue).toBe(2)
  })

  describe('local storage', () => {
    it('should set the information in local storage if available', async () => {
      const storageKey = TEST_STORAGE_KEY

      const initialValue = 1

      const { result } = renderHook(() =>
        useClientStorage<number>(storageKey, initialValue),
      )

      const [value, updateValue] = result.current

      expect(value).toBe(initialValue)

      // Not in storage until there is an update
      expect(localStorage.getItem(storageKey)).toBe(null)

      await act(async () => {
        if (value) {
          updateValue(value + 1)
        }
      })

      const [incrementedValue, _] = result.current

      expect(incrementedValue).toBe(initialValue + 1)

      // Not in storage until there is an update
      expect(localStorage.getItem(storageKey)).toBe(
        (initialValue + 1).toString(),
      )
    })
  })

  describe('cookies', () => {
    it('should set the information in cookies if local storage is not available', async () => {
      const storageKey = TEST_STORAGE_KEY

      const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')
      setItemSpy.mockImplementationOnce(() => {
        throw Error('localStorage.setItem does not work')
      })

      const { result } = renderHook(() => useClientStorage<number>(storageKey))

      const [_, updateValue] = result.current

      const newValue = 42

      await act(async () => {
        // update value to set in cookie
        updateValue(newValue)
      })

      // Not in storage since we mocked 'setItem'
      expect(localStorage.getItem(storageKey)).toBe(null)

      const [cookieKey, cookieValue] = document.cookie.split('=')

      expect(cookieKey).toBe(TEST_STORAGE_KEY)
      expect(cookieValue).toBe(newValue.toString())
    })
  })
})
