import { ReactNode } from 'react'
import { Cookies, CookiesProvider } from 'react-cookie'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'

import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'utils/tests/withStyleDisplayDecorator/withStyleDisplayDecorator'

import VehicleLookup from './VehicleLookup'

const meta: Meta<typeof VehicleLookup> = {
  title: 'Pages/VehicleLookup',
  component: VehicleLookup,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof VehicleLookup>

const ParentHtml = ({ children }: { children: ReactNode }) => {
  return (
    <CookiesProvider cookies={new Cookies('useSearchFilters=false;')}>
      <div className="site-container-wrapper">
        <div className="site-container container-fluid">
          <main>
            <div className="row">{children}</div>
          </main>
        </div>
      </div>
    </CookiesProvider>
  )
}

export const NoLookupsNewStyleDisplay: Story = {
  async play({ mount }) {
    window.localStorage.clear()
    await mount()
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const NoLookupsOldStyleDisplay: Story = {
  async play({ mount }) {
    window.localStorage.clear()
    await mount()
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

const lookupIdentifierFromLocalLookup = 'bnzphli3'
const lookupIdentifierFromSharedLookup = '6aur3wi3'

export const OneLookupFromStorageNewStyleDisplay: Story = {
  loaders: [
    () => {
      window.localStorage.clear()
      window.localStorage.setItem(
        'lookupIdentifiers',
        lookupIdentifierFromLocalLookup,
      )
    },
  ],
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}

export const OneLookupFromStorageOldStyleDisplay: Story = {
  loaders: [
    () => {
      window.localStorage.clear()
      window.localStorage.setItem(
        'lookupIdentifiers',
        lookupIdentifierFromLocalLookup,
      )
    },
  ],
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

const withUniqueIdentifierRoute: Decorator = (Story) => (
  <MemoryRouter initialEntries={[`/${lookupIdentifierFromSharedLookup}`]}>
    <Routes>
      <Route path="/:uniqueIdentifier" element={<Story />} />
    </Routes>
  </MemoryRouter>
)

export const OneLookupFromSharedLookupNewStyleDisplay: Story = {
  decorators: [newStyleDisplayDecorator(ParentHtml), withUniqueIdentifierRoute],
  loaders: [
    () => {
      window.localStorage.clear()
    },
  ],
}
export const OneLookupFromSharedLookupOldStyleDisplay: Story = {
  decorators: [oldStyleDisplayDecorator(ParentHtml), withUniqueIdentifierRoute],
  loaders: [
    () => {
      window.localStorage.clear()
    },
  ],
}

// export const OneLookupEachFromLocalLookupAndSharedLookupNewStyleDisplay: Story =
//   {
//     decorators: [
//       withRouter,
//       oldStyleDisplayDecorator(ParentHtml),
//     ],
//     loaders: [
//       () => {
//         window.localStorage.clear()
//         window.localStorage.setItem(
//           'lookupIdentifiers',
//           lookupIdentifierFromLocalLookup,
//         )
//       }
//     ],
//     parameters: reactRouterParametersForStory,
//   }
// export const OneLookupEachFromLocalLookupAndSharedLookupOldStyleDisplay: Story =
//   {
//     decorators: [
//       withRouter,
//       oldStyleDisplayDecorator(ParentHtml),
//     ],
//     loaders: [
//       () => {
//         window.localStorage.clear()
//         window.localStorage.setItem(
//           'lookupIdentifiers',
//           lookupIdentifierFromLocalLookup,
//         )
//       }
//     ],
//     parameters: reactRouterParametersForStory,
//   }

export default meta
