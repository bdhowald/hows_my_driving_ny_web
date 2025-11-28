import React, { useContext } from 'react'
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
    const mockGetSettingsFunction = jest.fn()

    const mockedUseSettingsFunctions = {
      getSetting: mockGetSettingsFunction,
      removeSetting: jest.fn(),
      updateSetting: jest.fn(),
    }

    jest
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
