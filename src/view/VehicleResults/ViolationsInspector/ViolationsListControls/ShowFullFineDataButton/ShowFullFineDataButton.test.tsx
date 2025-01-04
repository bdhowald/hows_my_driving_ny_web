import React from 'react'
import { render, screen } from '@testing-library/react'

import ShowFullFineDataButton from './ShowFullFineDataButton'

describe('ShowFullFineDataButton', () => {
  const setShowFullFineDataFunction = () => null

  describe('renders without error', () => {
    test.each([
      // No violations, show full fine data, violations list is visible
      {
        showFullFineData: true,
        violationsCount: 0,
        violationsListIsVisible: true,
      },
      // At least one violation, show full fine data, violations list is visible
      {
        showFullFineData: true,
        violationsCount: 1,
        violationsListIsVisible: true,
      },
      // No violations, show condensed fine data, violations list is visible
      {
        showFullFineData: false,
        violationsCount: 0,
        violationsListIsVisible: true,
      },
      // At least one violation, show condensed fine data, violations list is visible
      {
        showFullFineData: false,
        violationsCount: 1,
        violationsListIsVisible: true,
      },

      // No violations, show full fine data, violations list is not visible
      {
        showFullFineData: true,
        violationsCount: 0,
        violationsListIsVisible: false,
      },
      // At least one violation, show full fine data, violations list is not visible
      {
        showFullFineData: true,
        violationsCount: 1,
        violationsListIsVisible: false,
      },
      // No violations, show condensed fine data, violations list is not visible
      {
        showFullFineData: false,
        violationsCount: 0,
        violationsListIsVisible: false,
      },
      // At least one violation, show condensed fine data, violations list is not visible
      {
        showFullFineData: false,
        violationsCount: 1,
        violationsListIsVisible: false,
      },
    ])(
      'renders successfully with $violationsCount violations and showing full fine data set to $showFullFineData',
      ({ showFullFineData, violationsCount, violationsListIsVisible }) => {
        const vehicleHasViolations = violationsCount > 0

        render(
          <ShowFullFineDataButton
            setShowFullFineDataFunction={setShowFullFineDataFunction}
            showFullFineData={showFullFineData}
            violationsCount={violationsCount}
            violationsListIsVisible={violationsListIsVisible}
          />,
        )

        if (vehicleHasViolations && violationsListIsVisible) {
          expect(screen.getByRole('button')).toBeTruthy()
        } else {
          expect(screen.queryByRole('button')).toBeFalsy()
        }
      },
    )
  })

  describe('renders the correct text', () => {
    describe('when the list is visible', () => {
      describe('when the full fine data is visible', () => {
        it('should render nothing if the vehicle has no violations', () => {
          render(
            <ShowFullFineDataButton
              setShowFullFineDataFunction={setShowFullFineDataFunction}
              showFullFineData={true}
              violationsCount={0}
              violationsListIsVisible={true}
            />,
          )

          expect(screen.queryByRole('button')).toBeFalsy()
        })

        it("should say 'hide violations' if the vehicle has at least one violation", () => {
          render(
            <ShowFullFineDataButton
              setShowFullFineDataFunction={setShowFullFineDataFunction}
              showFullFineData={true}
              violationsCount={1}
              violationsListIsVisible={true}
            />,
          )

          const showViolationsButtonElement = screen.getByRole('button')

          expect(showViolationsButtonElement.textContent).toContain(
            'show fines summary',
          )
        })
      })

      describe('when the full fine data is not visible', () => {
        it('should render nothing if the vehicle has no violations', () => {
          render(
            <ShowFullFineDataButton
              setShowFullFineDataFunction={setShowFullFineDataFunction}
              showFullFineData={false}
              violationsCount={0}
              violationsListIsVisible={true}
            />,
          )

          expect(screen.queryByRole('button')).toBeFalsy()
        })

        it("should say 'hide violations' if the vehicle has at least one violation", () => {
          render(
            <ShowFullFineDataButton
              setShowFullFineDataFunction={setShowFullFineDataFunction}
              showFullFineData={false}
              violationsCount={1}
              violationsListIsVisible={true}
            />,
          )

          const showViolationsButtonElement = screen.getByRole('button')

          expect(showViolationsButtonElement.textContent).toContain(
            'show fines details',
          )
        })
      })
    })

    describe('when the list is not visible', () => {
      describe('when the full fine data is visible', () => {
        it('should render nothing if the vehicle has no violations', () => {
          render(
            <ShowFullFineDataButton
              setShowFullFineDataFunction={setShowFullFineDataFunction}
              showFullFineData={true}
              violationsCount={0}
              violationsListIsVisible={false}
            />,
          )

          expect(screen.queryByRole('button')).toBeFalsy()
        })

        it('should render nothing if the vehicle has at least one violation', () => {
          render(
            <ShowFullFineDataButton
              setShowFullFineDataFunction={setShowFullFineDataFunction}
              showFullFineData={true}
              violationsCount={1}
              violationsListIsVisible={false}
            />,
          )

          expect(screen.queryByRole('button')).toBeFalsy()
        })
      })

      describe('when the full fine data is not visible', () => {
        it('should render nothing if the vehicle has no violations', () => {
          render(
            <ShowFullFineDataButton
              setShowFullFineDataFunction={setShowFullFineDataFunction}
              showFullFineData={false}
              violationsCount={0}
              violationsListIsVisible={false}
            />,
          )

          expect(screen.queryByRole('button')).toBeFalsy()
        })

        it("should say 'hide violations' if the vehicle has at least one violation", () => {
          render(
            <ShowFullFineDataButton
              setShowFullFineDataFunction={setShowFullFineDataFunction}
              showFullFineData={false}
              violationsCount={1}
              violationsListIsVisible={false}
            />,
          )

          expect(screen.queryByRole('button')).toBeFalsy()
        })
      })
    })
  })
})
