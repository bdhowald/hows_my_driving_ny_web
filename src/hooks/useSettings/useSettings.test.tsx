import React, { ReactNode } from 'react'
import { act, renderHook } from '@testing-library/react'

import { SettingsContext } from 'context/SettingsContext/SettingsContext'

import useSettings from './useSettings'

describe('useSettingsStorage', () => {
  afterEach(() => {
    localStorage.removeItem('siteSettings')
  })

  it('should expose the functions from the hook/function', () => {
    const mockedUseSettingsStorage = {
      getSetting: jest.fn(),
      removeSetting: jest.fn(),
      updateSetting: jest.fn(),
    }
    const wrapper = ({ children }: { children: ReactNode }) => (
      <SettingsContext.Provider value={mockedUseSettingsStorage}>
        {children}
      </SettingsContext.Provider>
    )
    const { result } = renderHook(() => useSettings(), { wrapper })

    const { getSetting, removeSetting, updateSetting } = result.current

    expect(getSetting).not.toBeUndefined()
    expect(removeSetting).not.toBeUndefined()
    expect(updateSetting).not.toBeUndefined()
  })

  it('should throw an error if used outside of a SettingsContext provider', () => {
    expect(() => {
      renderHook(() => useSettings())
    }).toThrow('useSettings must be used within a SettingsProvider')
  })
})
