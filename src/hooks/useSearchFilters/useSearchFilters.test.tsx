import { render, renderHook } from '@testing-library/react'
import { Cookies, CookiesProvider } from 'react-cookie'

import useSearchFiltersHook from './useSearchFilters'

type HookFunction = () => unknown

describe('useSearchFilters', () => {
  const HookWrapper = ({
    hook,
  }: {
    hook: () => Record<string, HookFunction>
  }) => {
    const hookFunctions = hook()

    Object.values(hookFunctions).forEach((hookFunction) => hookFunction())

    return null
  }

  it('should expose the functions from the hook', () => {
    const { result } = renderHook(() => useSearchFiltersHook())

    const { searchFiltersState } = result.current

    expect(searchFiltersState).not.toBeUndefined()
  })

  it('should set the useSearchFilters cookie if it is not already set', async () => {
    const cookies = new Cookies()

    render(
      <CookiesProvider cookies={cookies}>
        <HookWrapper hook={() => useSearchFiltersHook()} />
      </CookiesProvider>,
    )

    expect(cookies.get('useSearchFilters')).not.toBeUndefined()
  })
})
