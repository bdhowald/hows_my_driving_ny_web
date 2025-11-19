import * as React from 'react'
import { Cookies, CookiesProvider } from 'react-cookie'
import type { Meta, StoryObj } from '@storybook/react'
import {
  withRouter,
  reactRouterParameters,
} from 'storybook-addon-remix-react-router'

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

export const NoLookups: Story = {
  decorators: [
    (Story) => {
      const cookies = new Cookies('lookupIdentifiers=;')

      return (
        <CookiesProvider cookies={cookies}>
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
        </CookiesProvider>
      )
    },
  ],
}

const lookupIdentifierFromLocalLookup = 'bnzphli3'
const lookupIdentifierFromSharedLookup = '6aur3wi3'

export const OneLookupFromCookies: Story = {
  decorators: [
    (Story) => {
      const cookies = new Cookies(
        `lookupIdentifiers=${lookupIdentifierFromLocalLookup};`,
      )

      return (
        <CookiesProvider cookies={cookies}>
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
        </CookiesProvider>
      )
    },
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

export const OneLookupFromSharedLookup: Story = {
  parameters: reactRouterParametersForStory,
  decorators: [
    withRouter,
    (Story) => {
      const cookies = new Cookies('lookupIdentifiers=;')

      return (
        <CookiesProvider cookies={cookies}>
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
        </CookiesProvider>
      )
    },
  ],
}

export const OneLookupEachFromLocalLookupAndSharedLookup: Story = {
  parameters: reactRouterParametersForStory,
  decorators: [
    withRouter,
    (Story) => {
      const cookies = new Cookies(
        `lookupIdentifiers=${lookupIdentifierFromLocalLookup};`,
      )

      return (
        <CookiesProvider cookies={cookies}>
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
        </CookiesProvider>
      )
    },
  ],
}

export default meta
