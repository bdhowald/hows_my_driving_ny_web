import React from 'react'
import { act, renderHook } from '@testing-library/react'

import useSettingsStorage from './useSettingsStorage'

describe('useSettingsStorage', () => {
  afterEach(() => {
    localStorage.removeItem('siteSettings')
  })

  it('should expose the functions from the hook/function', () => {
    const { result } = renderHook(() => useSettingsStorage())

    const { getSetting, removeSetting, updateSetting } = result.current

    expect(getSetting).not.toBeUndefined()
    expect(removeSetting).not.toBeUndefined()
    expect(updateSetting).not.toBeUndefined()
  })

  it('should return undefined for an uninitialized setting', () => {
    const { result } = renderHook(() => useSettingsStorage())

    const { getSetting } = result.current

    expect(getSetting('not_yet_set')).toBeUndefined()
  })

  it('should initialize a setting', async () => {
    const { result } = renderHook(() => useSettingsStorage())

    const { updateSetting } = result.current

    const settingName = 'setting'
    const valueToSet = 1

    await act(async () => {
      updateSetting(settingName, valueToSet)
    })

    const { getSetting } = result.current

    expect(getSetting(settingName)).toBe(valueToSet)
  })

  it('should update a setting', async () => {
    const { result } = renderHook(() => useSettingsStorage())

    const { updateSetting } = result.current

    const settingName = 'setting'
    const initialValue = 1
    const updatedValue = 2

    await act(async () => {
      updateSetting(settingName, initialValue)
    })

    const { getSetting: getSettingFirstTime } = result.current
    expect(getSettingFirstTime(settingName)).toBe(initialValue)

    await act(async () => {
      updateSetting(settingName, updatedValue)
    })

    const { getSetting: getSettingSecondTime } = result.current
    expect(getSettingSecondTime(settingName)).toBe(updatedValue)
  })

  it('should set multiple settings', async () => {
    const { result } = renderHook(() => useSettingsStorage())

    const { updateSetting } = result.current

    const firstSettingName = 'setting 1'
    const secondSettingName = 'setting 2'
    const thirdSettingName = 'setting 3'

    const firstSettingInitialValue = true
    const firstSettingUpdatedValue = false
    const secondSettingValue = 42
    const thirdSettingValue = 'indubitably'

    await act(async () => {
      updateSetting(firstSettingName, firstSettingInitialValue)
    })

    expect(result.current.getSetting(firstSettingName)).toBe(
      firstSettingInitialValue,
    )

    await act(async () => {
      result.current.updateSetting(secondSettingName, secondSettingValue)
    })

    expect(result.current.getSetting(firstSettingName)).toBe(
      firstSettingInitialValue,
    )
    expect(result.current.getSetting(secondSettingName)).toBe(
      secondSettingValue,
    )

    await act(async () => {
      result.current.updateSetting(firstSettingName, firstSettingUpdatedValue)
    })

    await act(async () => {
      result.current.updateSetting(thirdSettingName, thirdSettingValue)
    })

    expect(result.current.getSetting(firstSettingName)).toBe(
      firstSettingUpdatedValue,
    )
    expect(result.current.getSetting(secondSettingName)).toBe(
      secondSettingValue,
    )
    expect(result.current.getSetting(thirdSettingName)).toBe(thirdSettingValue)
  })

  it('should remove a set setting', async () => {
    const { result } = renderHook(() => useSettingsStorage())

    const settingName = 'setting'
    const valueToSet = 1

    await act(async () => {
      result.current.updateSetting(settingName, valueToSet)
    })

    expect(result.current.getSetting(settingName)).toBe(valueToSet)

    await act(async () => {
      result.current.removeSetting(settingName)
    })

    expect(result.current.getSetting(settingName)).toBe(undefined)
  })

  it('should silently do nothing when asked to remove a setting not already set', async () => {
    const { result } = renderHook(() => useSettingsStorage())

    const settingName = 'setting'

    await act(async () => {
      result.current.removeSetting(settingName)
    })

    expect(result.current.getSetting(settingName)).toBe(undefined)
  })
})
