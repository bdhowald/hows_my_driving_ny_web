import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Sort from 'constants/sortOptions'

import ViolationCardListSortControls from './ViolationCardListSortControls'

const meta: Meta<typeof ViolationCardListSortControls> = {
  title:
    'Components/VehicleResults/VehicleResult/ViolationsInspector/ViolationCardList/ViolationCardListSortControls',
  component: ViolationCardListSortControls,
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="vehicles">
              <div className="vehicle card">
                <ul className="list-group-flush list-group">
                  <li className="list-group-item">
                    <div className="violation-card-list-wrapper">
                      {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                      <Story />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
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

type Story = StoryObj<typeof ViolationCardListSortControls>

const updateSort = () => null

export const DateAscending: Story = {
  args: {
    currentSortType: Sort.DATE,
    sortAscending: true,
    updateSortFunction: updateSort,
  },
}
export const DateDescending: Story = {
  args: {
    currentSortType: Sort.DATE,
    sortAscending: false,
    updateSortFunction: updateSort,
  },
}

export const TypeAscending: Story = {
  args: {
    currentSortType: Sort.KIND,
    sortAscending: true,
    updateSortFunction: updateSort,
  },
}
export const TypeDescending: Story = {
  args: {
    currentSortType: Sort.KIND,
    sortAscending: false,
    updateSortFunction: updateSort,
  },
}

export const BoroughAscending: Story = {
  args: {
    currentSortType: Sort.LOCATION,
    sortAscending: true,
    updateSortFunction: updateSort,
  },
}
export const BoroughDescending: Story = {
  args: {
    currentSortType: Sort.LOCATION,
    sortAscending: false,
    updateSortFunction: updateSort,
  },
}

export const FinesAscending: Story = {
  args: {
    currentSortType: Sort.FINED,
    sortAscending: true,
    updateSortFunction: updateSort,
  },
}
export const FinesDescending: Story = {
  args: {
    currentSortType: Sort.FINED,
    sortAscending: false,
    updateSortFunction: updateSort,
  },
}

export default meta
