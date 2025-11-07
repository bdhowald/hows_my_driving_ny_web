import { useCookies } from 'react-cookie'

import {
  DEFAULT_COOKIE_PATH,
  LOOKUP_IDENTIFIER_COOKIE,
  MAX_AGE,
} from 'constants/cookies'

const useLookupIdentifierCookie = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    LOOKUP_IDENTIFIER_COOKIE,
  ])

  /**
   * The cookies are stored with the most recent identifiers
   * first, so searching for them in reverse order preserves
   * the quality that top results are more recent.
   */
  const readLookupIdentifierCookie = (): string[] => {
    const cookieString: string = cookies[LOOKUP_IDENTIFIER_COOKIE] ?? ''

    if (cookieString) {
      return cookieString.split(',').reverse()
    }

    return []
  }

  const removeLookupFromIdentifierCookie = (
    lookupUniqueIdentifiersToRemove: string,
  ) => {
    const existingUniqueLookupIdentifiers = readLookupIdentifierCookie()
    const filteredUniqueLookupIdentifiers =
      existingUniqueLookupIdentifiers.filter(
        (id) => id !== lookupUniqueIdentifiersToRemove,
      )

    if (filteredUniqueLookupIdentifiers) {
      setCookie(
        LOOKUP_IDENTIFIER_COOKIE,
        filteredUniqueLookupIdentifiers.toString(),
        {
          maxAge: MAX_AGE,
          path: DEFAULT_COOKIE_PATH,
        },
      )
      return
    }

    // If no more lookups, remove the cookie entirely.
    removeCookie(LOOKUP_IDENTIFIER_COOKIE)
  }

  const syncIdentifiersToIdentifierCookie = (
    lookupUniqueIdentifiers: string[],
  ) => {
    setCookie(LOOKUP_IDENTIFIER_COOKIE, lookupUniqueIdentifiers.toString(), {
      maxAge: MAX_AGE,
      path: DEFAULT_COOKIE_PATH,
    })
  }

  return {
    readLookupIdentifierCookie,
    removeLookupFromIdentifierCookie,
    syncIdentifiersToIdentifierCookie,
  }
}

export default useLookupIdentifierCookie
