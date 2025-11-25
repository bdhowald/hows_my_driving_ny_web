import React, { useEffect } from 'react'
import { act, render, renderHook } from '@testing-library/react'

import useLookupIdentifierStorage from './useLookupIdentifierStorage'

describe('useLookupIdentifierStorage', () => {
  const HookWrapper = ({
    hook,
    onRender,
  }: {
    hook: () => any
    onRender: (value: any) => void
  }) => {
    const hookValue = hook()
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
    let captured: any

    render(
      <HookWrapper
        hook={() => useLookupIdentifierStorage()}
        onRender={(v) => {
          captured = v
        }}
      />,
    )

    let { syncLookupIdentifiersToStorage } = captured

    const lookupIdentifiers = ['abcd1234', 'efgh5678']

    await act(async () => {
      syncLookupIdentifiersToStorage(lookupIdentifiers)
    })

    let { readLookupIdentifiersFromStorage } = captured

    expect(readLookupIdentifiersFromStorage()).toEqual(
      lookupIdentifiers.reverse(),
    )
  })

  it('should read the value from local storage', async () => {
    let captured: any

    const lookupIdentifiers = ['abcd1234', 'efgh5678']

    render(
      <HookWrapper
        hook={() => useLookupIdentifierStorage()}
        onRender={(v) => {
          captured = v
        }}
      />,
    )

    let { syncLookupIdentifiersToStorage } = captured

    await act(async () => {
      syncLookupIdentifiersToStorage(lookupIdentifiers)
    })

    let { readLookupIdentifiersFromStorage } = captured

    expect(readLookupIdentifiersFromStorage()).toEqual(
      lookupIdentifiers.reverse(),
    )
  })

  it('should remove a value from storage', async () => {
    let captured: any

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

    let { syncLookupIdentifiersToStorage } = captured

    await act(async () => {
      syncLookupIdentifiersToStorage(lookupIdentifiers)
    })

    let { removeLookupIdentifierFromStorage } = captured

    await act(async () => {
      removeLookupIdentifierFromStorage(lookupIdentifierToRemove)
    })

    let { readLookupIdentifiersFromStorage } = captured

    expect(readLookupIdentifiersFromStorage()).toEqual([lookupIdentifierToKeep])
  })
})
