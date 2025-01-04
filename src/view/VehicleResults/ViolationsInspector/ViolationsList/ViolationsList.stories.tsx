import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import {
  ViolationFactory,
  ViolationInJudgmentFactory,
} from '__fixtures__/models/Violation'

import ViolationsList from './ViolationsList'

const meta: Meta<typeof ViolationsList> = {
  title: 'Components/VehicleResults/ViolationsInspector/ViolationsList',
  component: ViolationsList,
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

type Story = StoryObj<typeof ViolationsList>

const busLaneViolationInBronxIn2021Fined50Dollars = ViolationFactory.build({
  amountDue: 50,
  fineAmount: 50,
  formattedTime: '2021-04-21T07:27:00.000-04:00',
  getViolationTime: () => '04/21/2021',
  humanizedDescription: 'Bus Lane Violation',
  interestAmount: 0,
  location: 'E 161st St. @ Sherman Ave.',
  paymentAmount: 0,
  penaltyAmount: 0,
  reductionAmount: 0,
  violationCode: '5',
  violationCounty: 'Bronx',
})
const busLaneViolationInQueensIn2024Fined75Dollars = ViolationFactory.build({
  amountDue: 0,
  fineAmount: 50,
  formattedTime: '2024-07-01T07:27:00.000-04:00',
  getLocationDescription: () => '()',
  getViolationTime: () => '07/01/2024',
  humanizedDescription: 'Bus Lane Violation',
  interestAmount: 0,
  location: 'Cross Bay Blvd. @ 107th Ave.',
  paymentAmount: 75,
  penaltyAmount: 25,
  reductionAmount: 0,
  violationCode: '5',
  violationCounty: 'Queens',
})
const parkingViolationInManhattanIn2022Fined107Dollars =
  ViolationInJudgmentFactory.build({
    amountDue: 82,
    fineAmount: 95,
    formattedTime: '2022-11-13T07:27:00.000-04:00',
    getViolationTime: () => '11/13/2022',
    humanizedDescription: 'Double Parking',
    interestAmount: 12.45,
    location: '1047 Broadway',
    paymentAmount: 25,
    penaltyAmount: 0,
    reductionAmount: 0.45,
    violationCode: '46',
    violationCounty: 'Manhattan',
  })
const redLightCameraViolationInBrooklynIn2022Fined50Dollars =
  ViolationFactory.build({
    amountDue: 25,
    fineAmount: 50,
    formattedTime: '2022-12-27T07:27:00.000-04:00',
    getViolationTime: () => '02/27/2022',
    humanizedDescription: 'Failure to Stop at Red Light',
    interestAmount: 0,
    location: 'Williamsburg St. W. @ Flushing Ave.',
    paymentAmount: 25,
    penaltyAmount: 0,
    reductionAmount: 0,
    violationCode: '7',
    violationCounty: 'Brooklyn',
  })
const speedCameraViolationInStatenIslandIn2024Fined50Dollars =
  ViolationFactory.build({
    amountDue: 0,
    fineAmount: 50,
    formattedTime: '2024-08-13T07:27:00.000-04:00',
    getBorough: () => 'Staten Island',
    getViolationTime: () => '08/13/2024',
    humanizedDescription: 'School Zone Speed Camera Violation',
    interestAmount: 0,
    location: 'Victory Blvd. @ Eddy St.',
    paymentAmount: 50,
    penaltyAmount: 0,
    reductionAmount: 0,
    violationCode: '36',
    violationCounty: 'Staten Island',
  })

const violations = [
  busLaneViolationInBronxIn2021Fined50Dollars,
  redLightCameraViolationInBrooklynIn2022Fined50Dollars,
  parkingViolationInManhattanIn2022Fined107Dollars,
  busLaneViolationInQueensIn2024Fined75Dollars,
  speedCameraViolationInStatenIslandIn2024Fined50Dollars,
]

export const Default: Story = {
  args: {
    showFullFineData: false,
    showFullText: false,
    vehicle: VehicleFactory.build({ violations }),
  },
}
export const WithFullFineData: Story = {
  args: {
    showFullFineData: true,
    showFullText: false,
    vehicle: VehicleFactory.build({ violations }),
  },
}
export const WithFullText: Story = {
  args: {
    showFullFineData: false,
    showFullText: true,
    vehicle: VehicleFactory.build({ violations }),
  },
}
export const WithFullFineDataAndText: Story = {
  args: {
    showFullFineData: true,
    showFullText: true,
    vehicle: VehicleFactory.build({ violations }),
  },
}

export default meta
