import { useContext } from 'react'
import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as useSettingsStorage from 'hooks/useSettingsStorage/useSettingsStorage'

import SettingsProvider, { SettingsContext } from './SettingsContext'

describe('SettingsContext', () => {
  const DummyComponent = () => {
    const settingsContext = useContext(SettingsContext)

    return (
      <button
        onClick={() => {
          settingsContext?.getSetting('setting to read')
        }}
      />
    )
  }

  it('should expose settings', () => {
    const mockGetSettingsFunction = vi.fn()

    const mockedUseSettingsFunctions = {
      getSetting: mockGetSettingsFunction,
      removeSetting: vi.fn(),
      updateSetting: vi.fn(),
    }

    vi
      .spyOn(useSettingsStorage, 'default')
      .mockReturnValue(mockedUseSettingsFunctions)

    render(
      <SettingsProvider>
        <DummyComponent />
      </SettingsProvider>,
    )

    const dummyButton = screen.getByRole('button')
    userEvent.click(dummyButton)

    expect(mockGetSettingsFunction).toHaveBeenCalledTimes(2)

    // First call is by default to initialize settings
    expect(mockGetSettingsFunction).toHaveBeenNthCalledWith(
      1,
      'useNewStyleDisplay',
    )

    // Second call is from above
    expect(mockGetSettingsFunction).toHaveBeenNthCalledWith(
      2,
      'setting to read',
    )
  })
})
