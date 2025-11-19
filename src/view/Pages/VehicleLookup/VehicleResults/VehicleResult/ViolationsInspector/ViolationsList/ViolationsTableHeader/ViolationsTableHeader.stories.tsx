import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Sort from 'constants/sortOptions'

import ViolationsTableHeader from './ViolationsTableHeader'

const meta: Meta<typeof ViolationsTableHeader> = {
  title:
    'Components/VehicleResults/VehicleResult/ViolationsInspector/ViolationsList/ViolationsTableHeader',
  component: ViolationsTableHeader,
  decorators: [
    (Story) => (
      <div className="site-container-wrapper">
        <div className="site-container container-fluid">
          <main>
            <div className="row">
              <div className="col-md-12 vehicle-lookup-content-container">
                <div className="vehicles">
                  <div className="vehicle card">
                    <ul className="list-group-flush list-group">
                      <li className="list-group-item">
                        <div className="violations-table-wrapper">
                          <div className="table-responsive violations-table-body-wrapper">
                            <table className="table table-striped table-sm violations-table">
                              {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                              <Story />
                            </table>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
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

type Story = StoryObj<typeof ViolationsTableHeader>

export const DateAscending: Story = {
  args: {
    currentSortType: Sort.DATE,
    sortAscending: true,
    updateSortFunction: () => null,
  },
}
export const DateDescending: Story = {
  args: {
    currentSortType: Sort.DATE,
    sortAscending: false,
    updateSortFunction: () => null,
  },
}
export const FinedAscending: Story = {
  args: {
    currentSortType: Sort.FINED,
    sortAscending: true,
    updateSortFunction: () => null,
  },
}
export const FinedDescending: Story = {
  args: {
    currentSortType: Sort.FINED,
    sortAscending: false,
    updateSortFunction: () => null,
  },
}
export const KindAscending: Story = {
  args: {
    currentSortType: Sort.KIND,
    sortAscending: true,
    updateSortFunction: () => null,
  },
}
export const KindDescending: Story = {
  args: {
    currentSortType: Sort.KIND,
    sortAscending: false,
    updateSortFunction: () => null,
  },
}
export const LocationAscending: Story = {
  args: {
    currentSortType: Sort.LOCATION,
    sortAscending: true,
    updateSortFunction: () => null,
  },
}
export const LocationDescending: Story = {
  args: {
    currentSortType: Sort.LOCATION,
    sortAscending: false,
    updateSortFunction: () => null,
  },
}

export default meta
