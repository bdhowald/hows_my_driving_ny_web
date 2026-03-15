import React, { useEffect } from 'react'
import { act, render, renderHook } from '@testing-library/react'

import useLookupIdentifierStorage from './useLookupIdentifierStorage'

type HookFunction = typeof useLookupIdentifierStorage

type CapturedHook = {
  removeLookupIdentifierFromStorage: (lookupUniqueIdentifiersToRemove: string) => unknown
  readLookupIdentifiersFromStorage: () => string[]
  syncLookupIdentifiersToStorage: (lookupUniqueIdentifiers: string[]) => void
}

describe('useLookupIdentifierStorage', () => {
  const HookWrapper = ({
    hook,
    onRender,
  }: {
    hook: HookFunction
    onRender: (value: CapturedHook) => void
  }) => {
    const hookValue: CapturedHook = hook()
    useEffect(() => {
      onRender(hookValue)
    })
    return null
  }

  it('should expose the functions from the hook', () => {
    const { result } = renderHook(() => useLookupIdentifierStorage())

    const {
      readLookupIdentifiersFromStorage,
      removeLookupIdentifierFromStorage,
      syncLookupIdentifiersToStorage,
    } = result.current

    expect(readLookupIdentifiersFromStorage).not.toBeUndefined()
    expect(removeLookupIdentifierFromStorage).not.toBeUndefined()
    expect(syncLookupIdentifiersToStorage).not.toBeUndefined()
  })

  it('should set the value', async () => {
    let captured: CapturedHook | undefined

    render(
      <HookWrapper
        hook={() => useLookupIdentifierStorage()}
        onRender={(v: CapturedHook) => {
          captured = v
        }}
      />,
    )

    if (!captured) {
      return
    }

    const { syncLookupIdentifiersToStorage } = captured

    const lookupIdentifiers = ['abcd1234', 'efgh5678']

    await act(async () => {
      syncLookupIdentifiersToStorage(lookupIdentifiers)
    })

    const { readLookupIdentifiersFromStorage } = captured

    expect(readLookupIdentifiersFromStorage()).toEqual(
      lookupIdentifiers.reverse(),
    )
  })

  it('should read the value from local storage', async () => {
    let captured: CapturedHook | undefined

    const lookupIdentifiers = ['abcd1234', 'efgh5678']

    render(
      <HookWrapper
        hook={() => useLookupIdentifierStorage()}
        onRender={(v) => {
          captured = v
        }}
      />,
    )

    if (!captured) {
      return
    }

    const { syncLookupIdentifiersToStorage } = captured

    await act(async () => {
      syncLookupIdentifiersToStorage(lookupIdentifiers)
    })

    const { readLookupIdentifiersFromStorage } = captured

    expect(readLookupIdentifiersFromStorage()).toEqual(
      lookupIdentifiers.reverse(),
    )
  })

  it('should remove a value from storage', async () => {
    let captured: CapturedHook | undefined

    const lookupIdentifierToKeep = 'abcd1234'
    const lookupIdentifierToRemove = 'efgh5678'
    const lookupIdentifiers = [lookupIdentifierToKeep, lookupIdentifierToRemove]

    render(
      <HookWrapper
        hook={() => useLookupIdentifierStorage()}
        onRender={(v) => {
          captured = v
        }}
      />,
    )

    if (!captured) {
      return
    }

    const { syncLookupIdentifiersToStorage } = captured

    await act(async () => {
      syncLookupIdentifiersToStorage(lookupIdentifiers)
    })

    const { removeLookupIdentifierFromStorage } = captured

    await act(async () => {
      removeLookupIdentifierFromStorage(lookupIdentifierToRemove)
    })

    const { readLookupIdentifiersFromStorage } = captured

    expect(readLookupIdentifiersFromStorage()).toEqual([lookupIdentifierToKeep])
  })
})
