import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  BusLaneCameraViolationFactory,
  RedLightCameraViolationFactory,
  SchoolZoneSpeedCameraViolationFactory,
  ViolationFactory,
} from '__fixtures__/models/Violation'
import { RawViolationData } from 'models/Violation/Violation'
import Violation from 'models/Violation/Violation'

import ViolationsTableRow from './ViolationsTableRow'

const meta: Meta<typeof ViolationsTableRow> = {
  title:
    'Components/VehicleResults/VehicleResult/ViolationsInspector/ViolationsList/ViolationsTableRow',
  component: ViolationsTableRow,
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="vehicles">
              <div className="vehicle card">
                <ul className="list-group-flush list-group">
                  <li className="list-group-item">
                    <div className="violations-table-wrapper">
                      <div className="table-responsive violations-table-body-wrapper">
                        <table className="table table-striped table-sm violations-table">
                          <thead className="thead-light">
                            <tr>
                              <th>Date</th>
                              <th>Violation</th>
                              <th>Location</th>
                              <th>Fines</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                            <Story />
                          </tbody>
                        </table>
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

type Story = StoryObj<typeof ViolationsTableRow>

export const ParkingViolation: Story = {
  args: {
    violation: ViolationFactory.build({ fineAmount: 60 }),
  },
}

export const BusLaneCameraViolation: Story = {
  args: {
    violation: BusLaneCameraViolationFactory.build({
      fineAmount: 100,
    }),
  },
}

export const RedLightCameraViolation: Story = {
  args: {
    violation: RedLightCameraViolationFactory.build({
      fineAmount: 50,
    }),
  },
}

export const SpeedCameraViolation: Story = {
  args: {
    violation: SchoolZoneSpeedCameraViolationFactory.build({
      fineAmount: 50,
    }),
  },
}

export const ViolationWithFullFineData: Story = {
  args: {
    showFullFineData: true,
    violation: BusLaneCameraViolationFactory.build({
      amountDue: 105,
      fineAmount: 100,
      interestAmount: 10,
      paymentAmount: 20,
      penaltyAmount: 25,
      reductionAmount: 10,
    }),
  },
}

export const ViolationWithFullLocation: Story = {
  args: {
    showFullText: true,
    violation: BusLaneCameraViolationFactory.build({
      fineAmount: 100,
      getLocationDescription: new Violation({} as RawViolationData)
        .getLocationDescription,
      intersectingStreet: 'ST',
      location: 'Jay St @ Johnson St',
      streetName: 'SB JAY ST @ JOHNSON',
    }),
  },
}

export const ViolationWithFullFineDataAndFullLocation: Story = {
  args: {
    showFullFineData: true,
    showFullText: true,
    violation: BusLaneCameraViolationFactory.build({
      amountDue: 105,
      fineAmount: 100,
      getLocationDescription: new Violation({} as RawViolationData)
        .getLocationDescription,
      interestAmount: 10,
      intersectingStreet: 'ST',
      location: 'Jay St @ Johnson St',
      paymentAmount: 20,
      penaltyAmount: 25,
      reductionAmount: 10,
      streetName: 'SB JAY ST @ JOHNSON',
    }),
  },
}

export default meta
