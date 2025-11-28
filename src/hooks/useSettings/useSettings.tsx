import React, { useContext } from 'react'

import {
  SettingsContext,
  SettingsContextType,
} from 'context/SettingsContext/SettingsContext'

const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}

export default useSettings
