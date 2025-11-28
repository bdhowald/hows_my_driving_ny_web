import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ViolationFactory } from '__fixtures__/models/Violation'
import Sort from 'constants/sortOptions'
import Violation from 'models/Violation/Violation'
import { SettingsContext } from 'context/SettingsContext/SettingsContext'

import ViolationCardGroup from './ViolationCardGroup'

describe('ViolationCardGroup', () => {
  const showOffCanvasFunction = (_: Violation) => null

  const mockedSettings = {
    getSetting: jest.fn(),
    removeSetting: jest.fn(),
    updateSetting: jest.fn(),
  }

  const violations = [
    ViolationFactory.build({
      getViolationDateTime: () => '11/06/2024 3:13 PM',
    }),
    ViolationFactory.build({
      getViolationDateTime: () => '11/07/2024 10:24 AM',
    }),
    ViolationFactory.build({
      getViolationDateTime: () => '11/08/2024 7:44 AM',
    }),
  ]

  describe('renders without error', () => {
    test.each([
      // Show full fine and location data
      {
        showFullFineData: true,
        showFullLocationData: true,
      },
      // Show full fine data only
      {
        showFullFineData: true,
        showFullLocationData: false,
      },
      // Show full location data only
      {
        showFullFineData: false,
        showFullLocationData: true,
      },
      // Show summaries only
      {
        showFullFineData: false,
        showFullLocationData: false,
      },
    ])(
      'should render without error',
      ({ showFullFineData, showFullLocationData }) => {
        render(
          <SettingsContext.Provider value={mockedSettings}>
            <ViolationCardGroup
              bucket={violations}
              bucketName="2024"
              currentSortType={Sort.DATE}
              index="NY:ABC1234:-2024-date-true"
              showFullFineData={showFullFineData}
              showFullLocationData={showFullLocationData}
              showOffCanvasFunction={showOffCanvasFunction}
              sortAscending={true}
            />
          </SettingsContext.Provider>,
        )
      },
    )
  })

  it('should display the group header and group violations when expanded', () => {
    render(
      <SettingsContext.Provider value={mockedSettings}>
        <ViolationCardGroup
          bucket={violations}
          bucketName="2024"
          currentSortType={Sort.DATE}
          index="NY:ABC1234:-2024-date-true"
          showFullFineData={false}
          showFullLocationData={false}
          showOffCanvasFunction={showOffCanvasFunction}
          sortAscending={true}
        />
      </SettingsContext.Provider>,
    )

    // group header is visible
    expect(screen.getByText('2024')).toBeInTheDocument()

    // number of violations and expanded state also visible
    expect(screen.getByText('3 violations [–]')).toBeInTheDocument()

    // violation dates visible
    expect(screen.getByText('11/06/2024 3:13 PM')).toBeInTheDocument()
    expect(screen.getByText('11/07/2024 10:24 AM')).toBeInTheDocument()
    expect(screen.getByText('11/08/2024 7:44 AM')).toBeInTheDocument()
  })

  it('should display the group header but not the group violations when collapsed', () => {
    render(
      <SettingsContext.Provider value={mockedSettings}>
        <ViolationCardGroup
          bucket={violations}
          bucketName="2024"
          currentSortType={Sort.DATE}
          index="NY:ABC1234:-2024-date-true"
          showFullFineData={false}
          showFullLocationData={false}
          showOffCanvasFunction={showOffCanvasFunction}
          sortAscending={true}
        />
      </SettingsContext.Provider>,
    )

    const violationCardGroupVisibilityToggle =
      screen.getByText('3 violations [–]')
    expect(violationCardGroupVisibilityToggle).toBeInTheDocument()

    userEvent.click(violationCardGroupVisibilityToggle)

    // group header is visible
    expect(screen.getByText('2024')).toBeInTheDocument()

    // number of violations and collapsed state also visible
    expect(screen.getByText('3 violations [+]')).toBeInTheDocument()

    // violation dates are not visible
    expect(screen.queryByText('11/06/2024 3:13 PM')).not.toBeInTheDocument()
    expect(screen.queryByText('11/07/2024 10:24 AM')).not.toBeInTheDocument()
    expect(screen.queryByText('11/08/2024 7:44 AM')).not.toBeInTheDocument()
  })
})
