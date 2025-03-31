import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { ViolationFactory } from '__fixtures__/models/Violation'

import ViolationDetail from './ViolationDetail'

const meta: Meta<typeof ViolationDetail> = {
  title:
    'Components/VehicleResults/ViolationsInspector/ViolationCardList/ViolationDetail',
  component: ViolationDetail,
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

type Story = StoryObj<typeof ViolationDetail>

const hideOffCanvas = () => null

export const Default: Story = {
  args: {
    hideOffCanvas,
    showViolationDetail: true,
    violationToInspect: ViolationFactory.build({
      amountDue: 15,
      fineAmount: 65,
      fromDatabases: [
        {
          dataUpdatedAt: '2017-11-15T17:04:39.000Z',
          endpoint: 'https://data.cityofnewyork.us/resource/jt7v-77mi.json',
          name: 'Parking Violations Issued - Fiscal Year 2014',
        },
      ],
      getLocationDescription: () => '17th St and 8th Ave',
      getBorough: () => 'Manhattan',
      getTotalFined: () => 90.0,
      interestAmount: 0.69,
      registrationState: 'NY',
      paymentAmount: 75,
      penaltyAmount: 25,
      plateId: 'ABC1234',
      plateType: 'PAS',
      reductionAmount: 0.19,
      summonsImage: {
        url: 'https://nycserv.nyc.gov/NYCServWeb/ShowImage?searchID=12345',
        description: 'View Summons',
      },
      vehicleBodyType: '4DSD',
      vehicleColor: 'YW',
      vehicleMake: 'KIA',
      vehicleYear: '2019',
    }),
  },
}

export const NoIssuingAgency: Story = {
  args: {
    hideOffCanvas,
    showViolationDetail: true,
    violationToInspect: ViolationFactory.build({
      amountDue: 15,
      fineAmount: 65,
      fromDatabases: [
        {
          dataUpdatedAt: '2017-11-15T17:04:39.000Z',
          endpoint: 'https://data.cityofnewyork.us/resource/jt7v-77mi.json',
          name: 'Parking Violations Issued - Fiscal Year 2014',
        },
      ],
      getLocationDescription: () => '17th St and 8th Ave',
      getBorough: () => 'Manhattan',
      getTotalFined: () => 90.0,
      interestAmount: 0.69,
      issuingAgency: undefined,
      registrationState: 'NY',
      paymentAmount: 75,
      penaltyAmount: 25,
      plateId: 'ABC1234',
      plateType: 'PAS',
      reductionAmount: 0.19,
      vehicleBodyType: '4DSD',
      vehicleColor: 'YW',
      vehicleMake: 'KIA',
      vehicleYear: '2019',
    }),
  },
}

export const NoSummonsImage: Story = {
  args: {
    hideOffCanvas,
    showViolationDetail: true,
    violationToInspect: ViolationFactory.build({
      amountDue: 15,
      fineAmount: 65,
      fromDatabases: [
        {
          dataUpdatedAt: '2017-11-15T17:04:39.000Z',
          endpoint: 'https://data.cityofnewyork.us/resource/jt7v-77mi.json',
          name: 'Parking Violations Issued - Fiscal Year 2014',
        },
      ],
      getLocationDescription: () => '17th St and 8th Ave',
      getBorough: () => 'Manhattan',
      getTotalFined: () => 90.0,
      interestAmount: 0.69,
      registrationState: 'NY',
      paymentAmount: 75,
      penaltyAmount: 25,
      plateId: 'ABC1234',
      plateType: 'PAS',
      reductionAmount: 0.19,
      vehicleBodyType: '4DSD',
      vehicleColor: 'YW',
      vehicleMake: 'KIA',
      vehicleYear: '2019',
    }),
  },
}

export const NoSummonsForCameraViolation: Story = {
  args: {
    hideOffCanvas,
    showViolationDetail: true,
    violationToInspect: ViolationFactory.build({
      amountDue: 15,
      fineAmount: 65,
      fromDatabases: [
        {
          dataUpdatedAt: '2017-11-15T17:04:39.000Z',
          endpoint: 'https://data.cityofnewyork.us/resource/jt7v-77mi.json',
          name: 'Parking Violations Issued - Fiscal Year 2014',
        },
      ],
      getLocationDescription: () => '17th St and 8th Ave',
      getBorough: () => 'Manhattan',
      getTotalFined: () => 90.0,
      humanizedDescription: 'Mobile MTA Bus Stop Violation',
      interestAmount: 0.69,
      isCameraViolation: () => true,
      registrationState: 'NY',
      paymentAmount: 75,
      penaltyAmount: 25,
      plateId: 'ABC1234',
      plateType: 'PAS',
      reductionAmount: 0.19,
      vehicleBodyType: '4DSD',
      vehicleColor: 'YW',
      vehicleMake: 'KIA',
      vehicleYear: '2019',
      violationCode: '43',
    }),
  },
}

export const NoFines: Story = {
  args: {
    hideOffCanvas,
    showViolationDetail: true,
    violationToInspect: ViolationFactory.build({
      fromDatabases: [
        {
          dataUpdatedAt: '2017-11-15T17:04:39.000Z',
          endpoint: 'https://data.cityofnewyork.us/resource/jt7v-77mi.json',
          name: 'Parking Violations Issued - Fiscal Year 2014',
        },
      ],
      getLocationDescription: () => '17th St and 8th Ave',
      getBorough: () => 'Manhattan',
      getTotalFined: () => null,
      registrationState: 'NY',
      plateId: 'ABC1234',
      plateType: 'PAS',
      summonsImage: {
        url: 'https://nycserv.nyc.gov/NYCServWeb/ShowImage?searchID=12345',
        description: 'View Summons',
      },
      vehicleBodyType: '4DSD',
      vehicleColor: 'YW',
      vehicleMake: 'KIA',
      vehicleYear: '2019',
    }),
  },
}

export const WithViolationStatus: Story = {
  args: {
    hideOffCanvas,
    showViolationDetail: true,
    violationToInspect: ViolationFactory.build({
      amountDue: 15,
      fineAmount: 65,
      fromDatabases: [
        {
          dataUpdatedAt: '2017-11-15T17:04:39.000Z',
          endpoint: 'https://data.cityofnewyork.us/resource/jt7v-77mi.json',
          name: 'Parking Violations Issued - Fiscal Year 2014',
        },
      ],
      getLocationDescription: () => '17th St and 8th Ave',
      getBorough: () => 'Manhattan',
      getTotalFined: () => 90.0,
      interestAmount: 0.69,
      registrationState: 'NY',
      paymentAmount: 75,
      penaltyAmount: 25,
      plateId: 'ABC1234',
      plateType: 'PAS',
      reductionAmount: 0.19,
      sanitized: {
        violationStatus: 'Hearing Held - Guilty',
      },
      summonsImage: {
        url: 'https://nycserv.nyc.gov/NYCServWeb/ShowImage?searchID=12345',
        description: 'View Summons',
      },
      vehicleBodyType: '4DSD',
      vehicleColor: 'YW',
      vehicleMake: 'KIA',
      vehicleYear: '2019',
      violationStatus: 'HEARING HELD-GUILTY',
    }),
  },
}

export default meta
