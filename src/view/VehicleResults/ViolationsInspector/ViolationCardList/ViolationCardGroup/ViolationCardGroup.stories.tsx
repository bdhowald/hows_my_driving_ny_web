import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { ViolationFactory } from '__fixtures__/models/Violation'

import Sort from 'constants/sortOptions'
import Violation from 'models/Violation/Violation'

import ViolationCardGroup from './ViolationCardGroup'

const meta: Meta<typeof ViolationCardGroup> = {
  title:
    'Components/VehicleResults/ViolationsInspector/ViolationCardList/ViolationCardGroup',
  component: ViolationCardGroup,
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="vehicles">
              <div className="vehicle card">
                <ul className="list-group-flush list-group">
                  <li className="list-group-item">
                    <div
                      className="violation-card-list-wrapper"
                      style={{ width: '100%' }}
                    >
                      <div className="violation-card-list bg-body">
                        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                        <Story />
                      </div>
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

type Story = StoryObj<typeof ViolationCardGroup>

const showOffCanvasFunction = (_: Violation) => null

const violations = [
  ViolationFactory.build(),
  ViolationFactory.build(),
  ViolationFactory.build(),
]

export const Default: Story = {
  args: {
    bucket: violations,
    bucketName: '2024',
    currentSortType: Sort.DATE,
    index: 'NY:ABC1234:-2024-date-true',
    showFullFineData: false,
    showFullLocationData: false,
    showOffCanvasFunction,
    sortAscending: true,
  },
}

export const ShowFullFineData: Story = {
  args: {
    bucket: violations,
    bucketName: '2024',
    currentSortType: Sort.DATE,
    index: 'NY:ABC1234:-2024-date-true',
    showFullFineData: true,
    showFullLocationData: false,
    showOffCanvasFunction,
    sortAscending: true,
  },
}

export const ShowFullLocationData: Story = {
  args: {
    bucket: violations,
    bucketName: '2024',
    currentSortType: Sort.DATE,
    index: 'NY:ABC1234:-2024-date-true',
    showFullFineData: false,
    showFullLocationData: true,
    showOffCanvasFunction,
    sortAscending: true,
  },
}

export const ShowFullFineAndLocationData: Story = {
  args: {
    bucket: violations,
    bucketName: '2024',
    currentSortType: Sort.DATE,
    index: 'NY:ABC1234:-2024-date-true',
    showFullFineData: true,
    showFullLocationData: true,
    showOffCanvasFunction,
    sortAscending: true,
  },
}

export default meta
