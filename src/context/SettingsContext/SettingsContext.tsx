import React, { createContext, useEffect, ReactNode } from 'react'

import { USE_NEW_STYLE_DISPLAY_STORAGE_KEY } from 'constants/storage'
import useSettingsStorage from 'hooks/useSettingsStorage/useSettingsStorage'

export type SettingsContextType = ReturnType<typeof useSettingsStorage>

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
)

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const settings = useSettingsStorage()

  useEffect(() => {
    const initializeDefaultSettings = () => {
      const useNewStyleDisplay =
        settings.getSetting(USE_NEW_STYLE_DISPLAY_STORAGE_KEY) === true

      if (useNewStyleDisplay === undefined) {
        settings.updateSetting(USE_NEW_STYLE_DISPLAY_STORAGE_KEY, true)
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
