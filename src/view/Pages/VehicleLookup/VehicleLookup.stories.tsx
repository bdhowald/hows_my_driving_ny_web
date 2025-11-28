import React, { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  withRouter,
  reactRouterParameters,
} from 'storybook-addon-remix-react-router'

import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator'

import VehicleLookup from './VehicleLookup'

const meta: Meta<typeof VehicleLookup> = {
  title: 'Pages/VehicleLookup',
  component: VehicleLookup,
  decorators: [
    (Story) => (
      <div className="site-container-wrapper">
        <div className="site-container container-fluid">
          <main>
            <div className="row">
              {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
              <Story />
            </div>
          </main>
        </div>
      </div>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof VehicleLookup>

const ParentHtml = ({ children }: { children: ReactNode }) => (
  <div className="site-container-wrapper">
    <div className="site-container container-fluid">
      <main>
        <div className="row">{children}</div>
      </main>
    </div>
  </div>
)

export const NoLookupsNewStyleDisplay: Story = {
  decorators: [
    (Story) => {
      window.localStorage.clear()
      return <Story />
    },
    newStyleDisplayDecorator(ParentHtml),
  ],
}
export const NoLookupsOldStyleDisplay: Story = {
  decorators: [
    (Story) => {
      window.localStorage.clear()

      return <Story />
    },
    oldStyleDisplayDecorator(ParentHtml),
  ],
}

const lookupIdentifierFromLocalLookup = 'bnzphli3'
const lookupIdentifierFromSharedLookup = '6aur3wi3'

export const OneLookupFromCookiesNewStyleDisplay: Story = {
  decorators: [
    (Story) => {
      window.localStorage.clear()
      window.localStorage.setItem(
        'lookupIdentifiers',
        lookupIdentifierFromLocalLookup,
      )

      return <Story />
    },
    newStyleDisplayDecorator(ParentHtml),
  ],
}
export const OneLookupFromCookiesOldStyleDisplay: Story = {
  decorators: [
    (Story) => {
      window.localStorage.clear()
      window.localStorage.setItem(
        'lookupIdentifiers',
        lookupIdentifierFromLocalLookup,
      )

      return <Story />
    },
    oldStyleDisplayDecorator(ParentHtml),
  ],
}

const reactRouterParametersForStory = {
  reactRouter: reactRouterParameters({
    location: {
      pathParams: { uniqueIdentifier: lookupIdentifierFromSharedLookup },
    },
    routing: {
      path: `/:uniqueIdentifier`,
    },
  }),
}

export const OneLookupFromSharedLookupNewStyleDisplay: Story = {
  parameters: reactRouterParametersForStory,
  decorators: [
    withRouter,
    (Story) => {
      window.localStorage.clear()

      return <Story />
    },
    newStyleDisplayDecorator(ParentHtml),
  ],
}
export const OneLookupFromSharedLookupOldStyleDisplay: Story = {
  parameters: reactRouterParametersForStory,
  decorators: [
    withRouter,
    (Story) => {
      window.localStorage.clear()

      return <Story />
    },
    oldStyleDisplayDecorator(ParentHtml),
  ],
}

export const OneLookupEachFromLocalLookupAndSharedLookupNewStyleDisplay: Story =
  {
    parameters: reactRouterParametersForStory,
    decorators: [
      withRouter,
      (Story) => {
        window.localStorage.clear()
        window.localStorage.setItem(
          'lookupIdentifiers',
          lookupIdentifierFromLocalLookup,
        )

        return <Story />
      },
      newStyleDisplayDecorator(ParentHtml),
    ],
  }
export const OneLookupEachFromLocalLookupAndSharedLookupOldStyleDisplay: Story =
  {
    parameters: reactRouterParametersForStory,
    decorators: [
      withRouter,
      (Story) => {
        window.localStorage.clear()
        window.localStorage.setItem(
          'lookupIdentifiers',
          lookupIdentifierFromLocalLookup,
        )

        return <Story />
      },
      oldStyleDisplayDecorator(ParentHtml),
    ],
  }

export default meta
