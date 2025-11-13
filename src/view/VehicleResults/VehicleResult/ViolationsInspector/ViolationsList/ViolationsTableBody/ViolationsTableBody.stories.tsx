import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  ViolationFactory,
  ViolationInJudgmentFactory,
} from '__fixtures__/models/Violation'
import Sort from 'constants/sortOptions'

import ViolationsTableBody from './ViolationsTableBody'

const meta: Meta<typeof ViolationsTableBody> = {
  title:
    'Components/VehicleResults/VehicleResult/ViolationsInspector/ViolationsList/ViolationsTableBody',
  component: ViolationsTableBody,
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 page-content-container">
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

type Story = StoryObj<typeof ViolationsTableBody>

const busLaneViolationInBronxIn2021Fined50Dollars = ViolationFactory.build({
  amountDue: 50,
  fineAmount: 50,
  formattedTime: '2021-04-21T07:27:00.000-04:00',
  getBorough: () => 'Bronx',
  getLocationDescription: () => 'E 161st St. @ Sherman Ave.',
  getViolationDate: () => '04/21/2021',
  humanizedDescription: 'Bus Lane Violation',
  interestAmount: 0,
  paymentAmount: 0,
  penaltyAmount: 0,
  reductionAmount: 0,
  violationCode: '5',
})
const busLaneViolationInQueensIn2024Fined75Dollars = ViolationFactory.build({
  amountDue: 0,
  fineAmount: 50,
  formattedTime: '2024-07-01T07:27:00.000-04:00',
  getBorough: () => 'Queens',
  getLocationDescription: () => 'Cross Bay Blvd. @ 107th Ave.',
  getViolationDate: () => '07/01/2024',
  humanizedDescription: 'Bus Lane Violation',
  interestAmount: 0,
  paymentAmount: 75,
  penaltyAmount: 25,
  reductionAmount: 0,
  violationCode: '5',
})
const parkingViolationInManhattanIn2022Fined107Dollars =
  ViolationInJudgmentFactory.build({
    amountDue: 82,
    fineAmount: 95,
    formattedTime: '2022-11-13T07:27:00.000-04:00',
    getBorough: () => 'Manhattan',
    getLocationDescription: () => '1047 Broadway',
    getViolationDate: () => '11/13/2022',
    humanizedDescription: 'Double Parking',
    interestAmount: 12.45,
    paymentAmount: 25,
    penaltyAmount: 0,
    reductionAmount: 0.45,
    violationCode: '46',
  })
const redLightCameraViolationInBrooklynIn2022Fined50Dollars =
  ViolationFactory.build({
    amountDue: 25,
    fineAmount: 50,
    formattedTime: '2022-12-27T07:27:00.000-04:00',
    getBorough: () => 'Brooklyn',
    getLocationDescription: () => 'Williamsburg St. W. @ Flushing Ave.',
    getViolationDate: () => '02/27/2022',
    humanizedDescription: 'Failure to Stop at Red Light',
    interestAmount: 0,
    paymentAmount: 25,
    penaltyAmount: 0,
    reductionAmount: 0,
    violationCode: '7',
  })
const speedCameraViolationInStatenIslandIn2024Fined50Dollars =
  ViolationFactory.build({
    amountDue: 0,
    fineAmount: 50,
    formattedTime: '2024-08-13T07:27:00.000-04:00',
    getBorough: () => 'Staten Island',
    getLocationDescription: () => 'Victory Blvd. @ Eddy St.',
    getViolationDate: () => '08/13/2024',
    humanizedDescription: 'School Zone Speed Camera Violation',
    interestAmount: 0,
    paymentAmount: 50,
    penaltyAmount: 0,
    reductionAmount: 0,
    violationCode: '36',
  })

export const Default: Story = {
  args: {
    currentSortType: Sort.DATE,
    sortAscending: true,
    violations: [
      busLaneViolationInBronxIn2021Fined50Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
    ],
  },
}

// sort by date ascending
export const SortByDateAscending: Story = {
  args: {
    currentSortType: Sort.DATE,
    sortAscending: true,
    violations: [
      busLaneViolationInBronxIn2021Fined50Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
    ],
  },
}
export const SortByDateAscendingWithFullFines: Story = {
  args: {
    currentSortType: Sort.DATE,
    showFullFineData: true,
    sortAscending: true,
    violations: [
      busLaneViolationInBronxIn2021Fined50Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
    ],
  },
}
export const SortByDateAscendingWithFullText: Story = {
  args: {
    currentSortType: Sort.DATE,
    showFullText: true,
    sortAscending: true,
    violations: [
      busLaneViolationInBronxIn2021Fined50Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
    ],
  },
}
export const SortByDateAscendingWithFullFinesAndFullText: Story = {
  args: {
    currentSortType: Sort.DATE,
    showFullFineData: true,
    showFullText: true,
    sortAscending: true,
    violations: [
      busLaneViolationInBronxIn2021Fined50Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
    ],
  },
}

// sort by date descending
export const SortByDateDescending: Story = {
  args: {
    currentSortType: Sort.DATE,
    sortAscending: false,
    violations: [
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      busLaneViolationInBronxIn2021Fined50Dollars,
    ],
  },
}
export const SortByDateDescendingWithFullFines: Story = {
  args: {
    currentSortType: Sort.DATE,
    showFullFineData: true,
    sortAscending: false,
    violations: [
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      busLaneViolationInBronxIn2021Fined50Dollars,
    ],
  },
}
export const SortByDateDescendingWithFullText: Story = {
  args: {
    currentSortType: Sort.DATE,
    showFullText: true,
    sortAscending: false,
    violations: [
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      busLaneViolationInBronxIn2021Fined50Dollars,
    ],
  },
}
export const SortByDateDescendingWithFullFinesAndFullText: Story = {
  args: {
    currentSortType: Sort.DATE,
    showFullFineData: true,
    showFullText: true,
    sortAscending: false,
    violations: [
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      busLaneViolationInBronxIn2021Fined50Dollars,
    ],
  },
}

// sort by fines ascending
export const SortByFinesAscending: Story = {
  args: {
    currentSortType: Sort.FINED,
    sortAscending: true,
    violations: [
      busLaneViolationInBronxIn2021Fined50Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
    ],
  },
}
export const SortByFinesAscendingWithFullFines: Story = {
  args: {
    currentSortType: Sort.FINED,
    showFullFineData: true,
    sortAscending: true,
    violations: [
      busLaneViolationInBronxIn2021Fined50Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
    ],
  },
}
export const SortByFinesAscendingWithFullText: Story = {
  args: {
    currentSortType: Sort.FINED,
    showFullText: true,
    sortAscending: true,
    violations: [
      busLaneViolationInBronxIn2021Fined50Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
    ],
  },
}
export const SortByFinesAscendingWithFullFinesAndFullText: Story = {
  args: {
    currentSortType: Sort.FINED,
    showFullFineData: true,
    showFullText: true,
    sortAscending: true,
    violations: [
      busLaneViolationInBronxIn2021Fined50Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
    ],
  },
}

// sort by fines descending
export const SortByFinesDescending: Story = {
  args: {
    currentSortType: Sort.FINED,
    sortAscending: false,
    violations: [
      parkingViolationInManhattanIn2022Fined107Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      busLaneViolationInBronxIn2021Fined50Dollars,
    ],
  },
}
export const SortByFinesDescendingWithFullFines: Story = {
  args: {
    currentSortType: Sort.FINED,
    showFullFineData: true,
    sortAscending: false,
    violations: [
      parkingViolationInManhattanIn2022Fined107Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      busLaneViolationInBronxIn2021Fined50Dollars,
    ],
  },
}
export const SortByFinesDescendingWithFullText: Story = {
  args: {
    currentSortType: Sort.FINED,
    showFullText: true,
    sortAscending: false,
    violations: [
      parkingViolationInManhattanIn2022Fined107Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      busLaneViolationInBronxIn2021Fined50Dollars,
    ],
  },
}
export const SortByFinesDescendingWithFullFinesAndFullText: Story = {
  args: {
    currentSortType: Sort.FINED,
    showFullFineData: true,
    showFullText: true,
    sortAscending: false,
    violations: [
      parkingViolationInManhattanIn2022Fined107Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      busLaneViolationInBronxIn2021Fined50Dollars,
    ],
  },
}

// sort by kind ascending
export const SortByKindAscending: Story = {
  args: {
    currentSortType: Sort.KIND,
    sortAscending: true,
    violations: [
      busLaneViolationInBronxIn2021Fined50Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
    ],
  },
}
export const SortByKindAscendingWithFullFines: Story = {
  args: {
    currentSortType: Sort.KIND,
    showFullFineData: true,
    sortAscending: true,
    violations: [
      busLaneViolationInBronxIn2021Fined50Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
    ],
  },
}
export const SortByKindAscendingWithFullText: Story = {
  args: {
    currentSortType: Sort.KIND,
    showFullText: true,
    sortAscending: true,
    violations: [
      busLaneViolationInBronxIn2021Fined50Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
    ],
  },
}
export const SortByKindAscendingWithFullFinesAndFullText: Story = {
  args: {
    currentSortType: Sort.KIND,
    showFullFineData: true,
    showFullText: true,
    sortAscending: true,
    violations: [
      busLaneViolationInBronxIn2021Fined50Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
    ],
  },
}

// sort by kind descending
export const SortByKindDescending: Story = {
  args: {
    currentSortType: Sort.KIND,
    sortAscending: true,
    violations: [
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      busLaneViolationInBronxIn2021Fined50Dollars,
    ],
  },
}
export const SortByKindDescendingWithFullFines: Story = {
  args: {
    currentSortType: Sort.KIND,
    showFullFineData: true,
    sortAscending: false,
    violations: [
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      busLaneViolationInBronxIn2021Fined50Dollars,
    ],
  },
}
export const SortByKindDescendingWithFullText: Story = {
  args: {
    currentSortType: Sort.KIND,
    showFullText: true,
    sortAscending: false,
    violations: [
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      busLaneViolationInBronxIn2021Fined50Dollars,
    ],
  },
}
export const SortByKindDescendingWithFullFinesAndFullText: Story = {
  args: {
    currentSortType: Sort.KIND,
    showFullFineData: true,
    showFullText: true,
    sortAscending: false,
    violations: [
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      busLaneViolationInBronxIn2021Fined50Dollars,
    ],
  },
}

// sort by location ascending
export const SortByLocationAscending: Story = {
  args: {
    currentSortType: Sort.LOCATION,
    sortAscending: true,
    violations: [
      busLaneViolationInBronxIn2021Fined50Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
    ],
  },
}
export const SortByLocationAscendingWithFullFines: Story = {
  args: {
    currentSortType: Sort.LOCATION,
    showFullFineData: true,
    sortAscending: true,
    violations: [
      busLaneViolationInBronxIn2021Fined50Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
    ],
  },
}
export const SortByLocationAscendingWithFullText: Story = {
  args: {
    currentSortType: Sort.LOCATION,
    showFullText: true,
    sortAscending: true,
    violations: [
      busLaneViolationInBronxIn2021Fined50Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
    ],
  },
}
export const SortByLocationAscendingWithFullFinesAndFullText: Story = {
  args: {
    currentSortType: Sort.LOCATION,
    showFullFineData: true,
    showFullText: true,
    sortAscending: true,
    violations: [
      busLaneViolationInBronxIn2021Fined50Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
    ],
  },
}

// sort by location descending
export const SortByLocationDescending: Story = {
  args: {
    currentSortType: Sort.LOCATION,
    sortAscending: false,
    violations: [
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      busLaneViolationInBronxIn2021Fined50Dollars,
    ],
  },
}
export const SortByLocationDescendingWithFullFines: Story = {
  args: {
    currentSortType: Sort.LOCATION,
    showFullFineData: true,
    sortAscending: false,
    violations: [
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      busLaneViolationInBronxIn2021Fined50Dollars,
    ],
  },
}
export const SortByLocationDescendingWithFullText: Story = {
  args: {
    currentSortType: Sort.LOCATION,
    showFullText: true,
    sortAscending: false,
    violations: [
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      busLaneViolationInBronxIn2021Fined50Dollars,
    ],
  },
}
export const SortByLocationDescendingWithFullFinesAndFullText: Story = {
  args: {
    currentSortType: Sort.LOCATION,
    showFullFineData: true,
    showFullText: true,
    sortAscending: false,
    violations: [
      speedCameraViolationInStatenIslandIn2024Fined50Dollars,
      busLaneViolationInQueensIn2024Fined75Dollars,
      parkingViolationInManhattanIn2022Fined107Dollars,
      redLightCameraViolationInBrooklynIn2022Fined50Dollars,
      busLaneViolationInBronxIn2021Fined50Dollars,
    ],
  },
}

export default meta
