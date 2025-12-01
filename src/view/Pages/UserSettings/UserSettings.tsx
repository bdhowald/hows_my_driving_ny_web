import React from 'react'

import L10N from 'constants/display'
import USER_SETTINGS, {
  USER_SETTINGS_STORAGE_KEYS,
} from 'constants/userSettings'
import useSettings from 'hooks/useSettings/useSettings'
import convertCamelCaseToTitleCase from 'utils/displayResults/convertCamelCaseToTitleCase/convertCamelCaseToTitleCase'

import 'view/Pages/UserSettings/UserSettings.css'

const UserSettings = () => {
  const { getSetting, updateSetting } = useSettings()
  const useNewStyleDisplay =
    getSetting(USER_SETTINGS_STORAGE_KEYS.useNewStyleDisplay) === true

  const newStyleDisplayClassName = useNewStyleDisplay ? 'new-style' : ''

  return (
    <div
      className={`col-md-12 user-settings-content-container ${newStyleDisplayClassName}`}
    >
      <div className="user-settings-header">
        <h1>Settings</h1>
      </div>
      <div className="user-settings-content">
        {Object.entries(USER_SETTINGS).map(([settingType, settings]) => {
          return (
            <div className="user-settings-type" key={settingType}>
              <div className="user-settings-type-title">
                {convertCamelCaseToTitleCase(settingType)}
              </div>
              <div className="user-settings-type-setting">
                {Object.values(settings).map((setting) => {
                  return (
                    <React.Fragment key={setting.storageKey}>
                      <div className="form-check form-switch">
                        <label
                          className="form-check-label"
                          htmlFor={setting.storageKey}
                        >
                          {setting.displayName}
                        </label>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id={setting.storageKey}
                          defaultChecked={useNewStyleDisplay}
                          onChange={(e) => {
                            updateSetting(
                              USER_SETTINGS_STORAGE_KEYS.useNewStyleDisplay,
                              e.target.checked,
                            )
                          }}
                        />
                      </div>
                    </React.Fragment>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default UserSettings
