import React, { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import type { Meta, StoryObj } from '@storybook/react'

import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator/withStyleDisplayDecorator'

import FiltersControl from './FiltersControl'

const meta: Meta<typeof FiltersControl> = {
  title: 'Components/VehicleResults/FiltersControl',
  component: FiltersControl,
  args: {
    handleFilterFormSubmitFunction: (e) => {
      e.preventDefault()
      return true
    },
    maxViolationsCountForResults: 100,
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof FiltersControl>

const ParentHtml = ({
  children,
  useNewStyleDisplay,
}: {
  children: ReactNode
  useNewStyleDisplay: boolean
}) => {
  const newStyleDisplayClassName = useNewStyleDisplay ? 'new-style' : ''

  return (
    <MemoryRouter>
      <div className="site-container-wrapper">
        <div className="site-container container-fluid">
          <main>
            <div className="row">
              <div
                className={`col-md-12 vehicle-lookup-content-container ${newStyleDisplayClassName}`}
              >
                <div className="jumbotron"></div>
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </MemoryRouter>
  )
}

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

export const WithBreadcrumbNewStyleDisplay: Story = {
  args: {
    displayingPreviousLookup: false,
    resultsFilters: {
      ...defaultFilters,
      plateText: 'ABC',
    },
    resultsLength: 0,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}

export const WithMultipleOwnResultsNewStyleDisplay: Story = {
  args: {
    displayingPreviousLookup: false,
    resultsFilters: defaultFilters,
    resultsLength: 2,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}

export const WithOwnResultNewStyleDisplay: Story = {
  args: {
    displayingPreviousLookup: false,
    resultsFilters: defaultFilters,
    resultsLength: 1,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}

export const WithSharedResultOnlyNewStyleDisplay: Story = {
  args: {
    displayingPreviousLookup: true,
    resultsFilters: defaultFilters,
    resultsLength: 1,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}

export const WithSharedAndOwnResultsNewStyleDisplay: Story = {
  args: {
    displayingPreviousLookup: true,
    resultsFilters: defaultFilters,
    resultsLength: 2,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}

export const WithSharedAndMultipleOwnResultsNewStyleDisplay: Story = {
  args: {
    displayingPreviousLookup: true,
    resultsFilters: defaultFilters,
    resultsLength: 3,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}

export const WithBreadcrumbOldStyleDisplay: Story = {
  args: {
    displayingPreviousLookup: false,
    resultsFilters: {
      ...defaultFilters,
      plateText: 'ABC',
    },
    resultsLength: 0,
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const WithMultipleOwnResultsOldStyleDisplay: Story = {
  args: {
    displayingPreviousLookup: false,
    resultsFilters: defaultFilters,
    resultsLength: 2,
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const WithOwnResultOldStyleDisplay: Story = {
  args: {
    displayingPreviousLookup: false,
    resultsFilters: defaultFilters,
    resultsLength: 1,
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const WithSharedResultOnlyOldStyleDisplay: Story = {
  args: {
    displayingPreviousLookup: true,
    resultsFilters: defaultFilters,
    resultsLength: 1,
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const WithSharedAndOwnResultsOldStyleDisplay: Story = {
  args: {
    displayingPreviousLookup: true,
    resultsFilters: defaultFilters,
    resultsLength: 2,
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const WithSharedAndMultipleOwnResultsOldStyleDisplay: Story = {
  args: {
    displayingPreviousLookup: true,
    resultsFilters: defaultFilters,
    resultsLength: 3,
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export default meta
