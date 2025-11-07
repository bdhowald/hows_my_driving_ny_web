import React, { useEffect } from 'react'
import { act, render, renderHook } from '@testing-library/react'
import { Cookies, CookiesProvider } from 'react-cookie'

import useLookupIdentifierCookie from './useLookupIdentifierCookie'

describe('useLookupIdentifierCookie', () => {
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
    const { result } = renderHook(() => useLookupIdentifierCookie())

    const {
      readLookupIdentifierCookie,
      removeLookupFromIdentifierCookie,
      syncIdentifiersToIdentifierCookie,
    } = result.current

    expect(readLookupIdentifierCookie).not.toBeUndefined()
    expect(removeLookupFromIdentifierCookie).not.toBeUndefined()
    expect(syncIdentifiersToIdentifierCookie).not.toBeUndefined()
  })

  it('should set the cookie', async () => {
    let captured: any

    const cookies = new Cookies()

    render(
      <CookiesProvider cookies={cookies}>
        <HookWrapper
          hook={() => useLookupIdentifierCookie()}
          onRender={(v) => {
            captured = v
          }}
        />
      </CookiesProvider>,
    )

    let { syncIdentifiersToIdentifierCookie } = captured

    const lookupIdentifiers = ['abcd1234', 'efgh5678']

    await act(async () => {
      syncIdentifiersToIdentifierCookie(lookupIdentifiers)
    })

    expect(cookies.get('lookupIdentifiers').split(',')).toEqual(
      lookupIdentifiers,
    )
  })

  it('should read the cookie', async () => {
    let captured: any

    const lookupIdentifiers = ['abcd1234', 'efgh5678']

    const cookies = new Cookies(
      `lookupIdentifiers=${lookupIdentifiers.slice().reverse().join(',')};`,
    )

    render(
      <CookiesProvider cookies={cookies}>
        <HookWrapper
          hook={() => useLookupIdentifierCookie()}
          onRender={(v) => {
            captured = v
          }}
        />
      </CookiesProvider>,
    )

    let { readLookupIdentifierCookie } = captured

    expect(readLookupIdentifierCookie()).toEqual(lookupIdentifiers)
  })

  it('should remove a value from the cookie', async () => {
    let captured: any

    const lookupIdentifierToKeep = 'abcd1234'
    const lookupIdentifierToRemove = 'efgh5678'
    const lookupIdentifiers = [lookupIdentifierToKeep, lookupIdentifierToRemove]

    const cookies = new Cookies(
      `lookupIdentifiers=${lookupIdentifiers.slice().reverse().join(',')};`,
    )

    render(
      <CookiesProvider cookies={cookies}>
        <HookWrapper
          hook={() => useLookupIdentifierCookie()}
          onRender={(v) => {
            captured = v
          }}
        />
      </CookiesProvider>,
    )

    let { removeLookupFromIdentifierCookie } = captured

    await act(async () => {
      removeLookupFromIdentifierCookie(lookupIdentifierToRemove)
    })

    expect(cookies.get('lookupIdentifiers').split(',')).toEqual([
      lookupIdentifierToKeep,
    ])
  })
})
