import * as React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import FilterMenu from './FilterMenu'

const meta: Meta<typeof FilterMenu> = {
  title: 'Components/VehicleResults/FiltersControl/FilterMenu',
  component: FilterMenu,
  args: {
    handleFilterFormSubmitFunction: (e) => {
      e.preventDefault()
      return true
    },
    hideFiltersFunction: () => null,
    maxViolationsCountForResults: 100,
  },
  decorators: [
    (Story) => (
      <>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof FilterMenu>

const defaultFilters = {
  numberOfViolations: undefined,
  plateText: undefined,
  plateType: undefined,
  queryDateRange: {
    endDate: undefined,
    startDate: undefined,
  },
  state: undefined,
}

export const Hidden: Story = {
  args: {
    filtersAreVisible: false,
    resultsFilters: defaultFilters,
  },
}

export const CleanFilters: Story = {
  args: {
    filtersAreVisible: true,
    resultsFilters: defaultFilters,
  },
}

export const WithFullFulters: Story = {
  args: {
    filtersAreVisible: true,
    resultsFilters: {
      numberOfViolations: 17,
      plateText: 'ABC1234',
      plateType: 'passenger',
      queryDateRange: {
        endDate: new Date('2025-07-11T00:00:00-04:00'),
        startDate: new Date('2025-07-04T00:00:00-04:00'),
      },
      state: 'NY',
    },
  },
}

export default meta
