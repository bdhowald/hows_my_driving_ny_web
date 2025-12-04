import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SettingsContext } from 'context/SettingsContext/SettingsContext'

import UserSettings from './UserSettings'

describe('UserSettings', () => {
  const mockedUpdateSettingFunction = jest.fn()

  const mockedSettings = {
    getSetting: jest.fn(),
    removeSetting: jest.fn(),
    updateSetting: mockedUpdateSettingFunction,
  }

  it('should render successfully', () => {
    render(
      <SettingsContext.Provider value={mockedSettings}>
        <UserSettings />
      </SettingsContext.Provider>,
    )
  })

  describe('content', () => {
    it('should render the header', () => {
      render(
        <SettingsContext.Provider value={mockedSettings}>
          <UserSettings />
        </SettingsContext.Provider>,
      )

      // title
      expect(screen.getByText('Settings')).toBeInTheDocument()
    })

    it('should display the display settings', () => {
      render(
        <SettingsContext.Provider value={mockedSettings}>
          <UserSettings />
        </SettingsContext.Provider>,
      )

      // Display settings header
      expect(screen.getByText('Display')).toBeInTheDocument()

      // Display settings
      expect(screen.getByText('Use compact display')).toBeInTheDocument()
    })

    it('should allow the toggling of settings', () => {
      render(
        <SettingsContext.Provider value={mockedSettings}>
          <UserSettings />
        </SettingsContext.Provider>,
      )

      const useCompactDisplaySetting = screen.getByRole(
        'switch',
      ) as HTMLInputElement
      const currentSetting = useCompactDisplaySetting.checked

      expect(useCompactDisplaySetting).toBeInTheDocument()

      userEvent.click(useCompactDisplaySetting)

      expect(mockedUpdateSettingFunction).toHaveBeenCalledWith(
        'useNewStyleDisplay',
        !currentSetting,
      )
    })
  })
})
