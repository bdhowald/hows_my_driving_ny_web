import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  COOKIE_DEFAULT_PATH,
  COOKIE_MAX_AGE,
  COOKIE_MAX_ENCODED_SIZE,
} from 'constants/storage'

const TEST_KEY = 'STORAGE_TEST_KEY'

const areCookiesAvailable = () => {
  try {
    const cookieKeyValue = `${TEST_KEY}=1`
    document.cookie = `${cookieKeyValue}; SameSite=Lax`
    const cookiesWork = document.cookie.includes(cookieKeyValue)

    // clean up
    document.cookie = `${TEST_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`
    return cookiesWork
  } catch {
    return false
  }
}

const getCookie = (key: string) => {
  const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

const isLocalStorageAvailable = () => {
  try {
    localStorage.setItem(TEST_KEY, '1')
    localStorage.removeItem(TEST_KEY)
    return true
  } catch {
    return false
  }
}

const removeCookie = (key: string) => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${COOKIE_DEFAULT_PATH};`
}

const setCookie = (key: string, value: string) => {
  const encoded = encodeURIComponent(`${key}=${value}`)
  if (encoded.length > COOKIE_MAX_ENCODED_SIZE) {
    return false
  }

  document.cookie = `${key}=${value}; expires=${COOKIE_MAX_AGE}; path=${COOKIE_DEFAULT_PATH}; SameSite=Lax`
  return document.cookie.includes(`${key}=${value}`)
}

const useClientStorage = <T>(key: string, initialValue?: T) => {
  const localStorageAvailable = useMemo(() => isLocalStorageAvailable(), [])
  const cookiesAvailable = useMemo(() => areCookiesAvailable(), [])

  const readInitialValue = useCallback(
    <T>(key: string, initialValue?: T): T | undefined => {
      const localStorageAvailable = useMemo(() => isLocalStorageAvailable(), [])
      const cookiesAvailable = useMemo(() => areCookiesAvailable(), [])

      if (localStorageAvailable) {
        const value = localStorage.getItem(key)
        if (value !== null) {
          const decoded = decodeURIComponent(value)
          try {
            return JSON.parse(decoded) as T
          } catch {
            return value as unknown as T
          }
        }
      }

      if (cookiesAvailable) {
        const value = getCookie(key)
        if (value !== null) {
          try {
            return JSON.parse(value) as T
          } catch {
            // legacy URL-encoded strings
            const decoded = decodeURIComponent(value)

            // Migrate cookie to JSON format
            setCookie(key, encodeURIComponent(JSON.stringify(decoded)))
            return decoded as T
          }
        }
      }

      return initialValue
    },
    [],
  )

  const [value, setValue] = useState<T | undefined>(
    readInitialValue(key, initialValue),
  )

  const updateValue = useCallback(
    (newValue: T) => {
      setValue(newValue)

      const serializedValue = encodeURIComponent(JSON.stringify(newValue))

      if (localStorageAvailable) {
        try {
          localStorage.setItem(key, serializedValue)

          if (localStorageAvailable) {
            // Move source of truth to local storage
            removeCookie(key)
          }
          return
        } catch {
          // do nothing
        }
      }

      if (cookiesAvailable) {
        const ok = setCookie(key, serializedValue)
        if (ok) {
          return
        }
      }

      // fall back to using `setValue` alone
    },
    [key, isLocalStorageAvailable, areCookiesAvailable],
  )

  // Sync local storage changes from other tabs.
  useEffect(() => {
    if (!localStorageAvailable) {
      return
    }

    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === key) {
        try {
          setValue(e.newValue ? JSON.parse(e.newValue) : null)
        } catch {
          // do nothing
        }
      }
    }

    window.addEventListener('storage', handleStorageEvent)
    return () => window.removeEventListener('storage', handleStorageEvent)
  }, [key, isLocalStorageAvailable])

  return [value, updateValue] as const
}

export default useClientStorage
