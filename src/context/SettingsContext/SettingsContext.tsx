import React, { createContext, useEffect, ReactNode } from 'react'

import { USER_SETTINGS_STORAGE_KEYS } from 'constants/userSettings'
import useSettingsStorage from 'hooks/useSettingsStorage/useSettingsStorage'

export type SettingsContextType = ReturnType<typeof useSettingsStorage>

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
)

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const settings = useSettingsStorage()

  useEffect(() => {
    const initializeDefaultSettings = () => {
      const useNewStyleDisplaySetting =  settings.getSetting(USER_SETTINGS_STORAGE_KEYS.useNewStyleDisplay)

      if (useNewStyleDisplaySetting === undefined) {
        settings.updateSetting(
          USER_SETTINGS_STORAGE_KEYS.useNewStyleDisplay,
          true,
        )
      }
    }

    initializeDefaultSettings()
  }, [])

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider
