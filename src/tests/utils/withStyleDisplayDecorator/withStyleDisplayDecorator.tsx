import React, { ComponentType, ReactNode } from 'react'
import { Decorator, StoryFn } from '@storybook/react'

import { SettingsContext } from 'context/SettingsContext/SettingsContext'

type ParentHtmlProps = {
  useNewStyleDisplay: boolean
  children: ReactNode
}

const withStyleDisplayDecorator = <P extends { useNewStyleDisplay: boolean }>(
  ParentHtmlComponent: ComponentType<ParentHtmlProps>,
  useNewStyleDisplay: boolean,
): Decorator => {
  const mockedSettings = {
    getSetting: () => useNewStyleDisplay,
    removeSetting: () => null,
    updateSetting: () => null,
  }

  const DecoratorFn = (Story: StoryFn) => (
    <SettingsContext.Provider value={mockedSettings}>
      <ParentHtmlComponent
        useNewStyleDisplay={useNewStyleDisplay as P['useNewStyleDisplay']}
      >
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </ParentHtmlComponent>
    </SettingsContext.Provider>
  )

  return DecoratorFn
}

export const newStyleDisplayDecorator = (
  ParentHtmlComponent: ComponentType<ParentHtmlProps>,
) => withStyleDisplayDecorator(ParentHtmlComponent, true)

export const oldStyleDisplayDecorator = (
  ParentHtmlComponent: ComponentType<ParentHtmlProps>,
) => withStyleDisplayDecorator(ParentHtmlComponent, false)
