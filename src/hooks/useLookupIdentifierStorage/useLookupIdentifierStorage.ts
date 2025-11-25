import { useCallback } from 'react'

import { LOOKUP_IDENTIFIER_STORAGE_KEY } from 'constants/storage'
import useClientStorage from 'utils/storage/useClientStorage/useClientStorage'

const useLookupIdentifierStorage = () => {
  const [lookupIdentifiers, setLookupIdentifiers] = useClientStorage<string>(
    LOOKUP_IDENTIFIER_STORAGE_KEY,
  )

  /**
   * The values are stored with the most recent identifiers
   * first, so searching for them in reverse order preserves
   * the quality that top results are more recent.
   */
  const readLookupIdentifiersFromStorage = useCallback((): string[] => {
    const storageString: string = lookupIdentifiers ?? ''

    if (storageString) {
      return storageString.split(',').reverse()
    }

    return []
  }, [lookupIdentifiers])

  const removeLookupIdentifierFromStorage = (
    lookupUniqueIdentifiersToRemove: string,
  ) => {
    const existingUniqueLookupIdentifiers = readLookupIdentifiersFromStorage()
    const filteredUniqueLookupIdentifiers =
      existingUniqueLookupIdentifiers.filter(
        (id) => id !== lookupUniqueIdentifiersToRemove,
      )

    if (filteredUniqueLookupIdentifiers) {
      setLookupIdentifiers(filteredUniqueLookupIdentifiers.toString())
      return
    }
  }

  const syncLookupIdentifiersToStorage = (
    lookupUniqueIdentifiers: string[],
  ) => {
    setLookupIdentifiers(lookupUniqueIdentifiers.toString())
  }

  return {
    readLookupIdentifiersFromStorage,
    removeLookupIdentifierFromStorage,
    syncLookupIdentifiersToStorage,
  }
}

export default useLookupIdentifierStorage
