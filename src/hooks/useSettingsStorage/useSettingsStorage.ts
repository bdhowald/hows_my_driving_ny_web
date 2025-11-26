import { useCallback } from 'react'
import deepmerge from 'deepmerge'

import { SITE_SETTINGS_STORAGE_KEY } from 'constants/storage'
import useClientStorage from 'utils/storage/useClientStorage/useClientStorage'

type SettingValue = boolean | number | string

type Setting = {
  [key: string]: SettingValue | Record<string, SettingValue>
}

type Settings = Record<string, Setting>

const useSettingsStorage = () => {
  const [settings, updateSettings] = useClientStorage<Settings>(
    SITE_SETTINGS_STORAGE_KEY,
    {},
  )

  const getSetting = (key: string) => {
    return settings ? settings[key] : undefined
  }

  const updateSetting = (key: string, value: Setting | SettingValue) => {
    const updatedSettings = deepmerge(settings ?? {}, {
      [key]: value,
    }) as Settings

    updateSettings(updatedSettings)
  }

  return {
    getSetting,
    updateSetting,
  }
}

export default useSettingsStorage
