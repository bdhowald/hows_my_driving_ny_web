import React from 'react'
import { render, renderHook } from '@testing-library/react'
import { Cookies, CookiesProvider } from 'react-cookie'

import useSearchFiltersActiveCookie from './useSearchFiltersActiveCookie'

type HookFunction = () => unknown

describe('useSearchFiltersActiveCookie', () => {
  const HookWrapper = ({ hook }: { hook: () => Record<string, HookFunction> }) => {
    const hookFunctions = hook()

    Object.values(hookFunctions).forEach((hookFunction) => hookFunction())

    return null
  }

  it('should expose the functions from the hook', () => {
    const { result } = renderHook(() => useSearchFiltersActiveCookie())

    const { areSearchFiltersActive } = result.current

    expect(areSearchFiltersActive).not.toBeUndefined()
  })

  it('should set the useSearchFilters cookie if it is not already set', async () => {
    const cookies = new Cookies()

    render(
      <CookiesProvider cookies={cookies}>
        <HookWrapper hook={() => useSearchFiltersActiveCookie()} />
      </CookiesProvider>,
    )

    expect(cookies.get('useSearchFilters')).not.toBeUndefined()
  })
})
