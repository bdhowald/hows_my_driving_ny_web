import React from 'react'
import { render, screen } from '@testing-library/react'

import ShowFineDetailsButton from './ShowFineDetailsButton'

describe('ShowFineDetailsButton', () => {
  const setShowFullFineDataFunction = () => null

  describe('renders without error', () => {
    test.each([
      // Extra small page, no violations, show full fine data, violations list is visible
      {
        pageWidth: 575,
        showFullFineData: true,
        violationsCount: 0,
        violationsListIsVisible: true,
      },
      // Extra small page, at least one violation, show full fine data, violations list is visible
      {
        pageWidth: 575,
        showFullFineData: true,
        violationsCount: 1,
        violationsListIsVisible: true,
      },
      // Extra small page, no violations, show condensed fine data, violations list is visible
      {
        pageWidth: 575,
        showFullFineData: false,
        violationsCount: 0,
        violationsListIsVisible: true,
      },
      // Extra small page, at least one violation, show condensed fine data, violations list is visible
      {
        pageWidth: 575,
        showFullFineData: false,
        violationsCount: 1,
        violationsListIsVisible: true,
      },

      // Extra small page, no violations, show full fine data, violations list is not visible
      {
        pageWidth: 575,
        showFullFineData: true,
        violationsCount: 0,
        violationsListIsVisible: false,
      },
      // Extra small page, at least one violation, show full fine data, violations list is not visible
      {
        pageWidth: 575,
        showFullFineData: true,
        violationsCount: 1,
        violationsListIsVisible: false,
      },
      // Extra small page, no violations, show condensed fine data, violations list is not visible
      {
        pageWidth: 575,
        showFullFineData: false,
        violationsCount: 0,
        violationsListIsVisible: false,
      },
      // Extra small page, at least one violation, show condensed fine data, violations list is not visible
      {
        pageWidth: 575,
        showFullFineData: false,
        violationsCount: 1,
        violationsListIsVisible: false,
      },

      // Small page, no violations, show full fine data, violations list is visible
      {
        pageWidth: 576,
        showFullFineData: true,
        violationsCount: 0,
        violationsListIsVisible: true,
      },
      // Small page, at least one violation, show full fine data, violations list is visible
      {
        pageWidth: 576,
        showFullFineData: true,
        violationsCount: 1,
        violationsListIsVisible: true,
      },
      // Small page, no violations, show condensed fine data, violations list is visible
      {
        pageWidth: 576,
        showFullFineData: false,
        violationsCount: 0,
        violationsListIsVisible: true,
      },
      // At least one violation, show condensed fine data, violations list is visible
      {
        pageWidth: 576,
        showFullFineData: false,
        violationsCount: 1,
        violationsListIsVisible: true,
      },

      // Small page, no violations, show full fine data, violations list is not visible
      {
        pageWidth: 576,
        showFullFineData: true,
        violationsCount: 0,
        violationsListIsVisible: false,
      },
      // Small page, at least one violation, show full fine data, violations list is not visible
      {
        pageWidth: 576,
        showFullFineData: true,
        violationsCount: 1,
        violationsListIsVisible: false,
      },
      // Small page, no violations, show condensed fine data, violations list is not visible
      {
        pageWidth: 576,
        showFullFineData: false,
        violationsCount: 0,
        violationsListIsVisible: false,
      },
      // Small page, at least one violation, show condensed fine data, violations list is not visible
      {
        pageWidth: 576,
        showFullFineData: false,
        violationsCount: 1,
        violationsListIsVisible: false,
      },
    ])(
      'renders successfully with $violationsCount violations and showing full fine data set to $showFullFineData with a page width of $pageWidth',
      ({
        pageWidth,
        showFullFineData,
        violationsCount,
        violationsListIsVisible,
      }) => {
        // Change the viewport to show/hide full violation text
        global.innerWidth = pageWidth

        // Trigger the window resize event.
        global.dispatchEvent(new Event('resize'))

        const vehicleHasViolations = violationsCount > 0

        render(
          <ShowFineDetailsButton
            showFullFineData={showFullFineData}
            toggleShowFullFineDataFunction={setShowFullFineDataFunction}
            violationsCount={violationsCount}
            violationsListIsVisible={violationsListIsVisible}
          />,
        )

        if (
          vehicleHasViolations &&
          violationsListIsVisible &&
          pageWidth >= 576
        ) {
          expect(screen.getByRole('button')).toBeTruthy()
        } else {
          expect(screen.queryByRole('button')).toBeFalsy()
        }
      },
    )
  })

  describe('renders the correct text', () => {
    describe('when the list is visible', () => {
      describe('when the full fine data is set to visible', () => {
        it('should render nothing if the vehicle has no violations', () => {
          render(
            <ShowFineDetailsButton
              showFullFineData={true}
              toggleShowFullFineDataFunction={setShowFullFineDataFunction}
              violationsCount={0}
              violationsListIsVisible={true}
            />,
          )

          expect(screen.queryByRole('button')).toBeFalsy()
        })

        it("should say 'hide violations' if the vehicle has at least one violation", () => {
          render(
            <ShowFineDetailsButton
              showFullFineData={true}
              toggleShowFullFineDataFunction={setShowFullFineDataFunction}
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

      describe('when the full fine data is set to not visible', () => {
        it('should render nothing if the vehicle has no violations', () => {
          render(
            <ShowFineDetailsButton
              showFullFineData={false}
              toggleShowFullFineDataFunction={setShowFullFineDataFunction}
              violationsCount={0}
              violationsListIsVisible={true}
            />,
          )

          expect(screen.queryByRole('button')).toBeFalsy()
        })

        it("should say 'hide violations' if the vehicle has at least one violation", () => {
          render(
            <ShowFineDetailsButton
              showFullFineData={false}
              toggleShowFullFineDataFunction={setShowFullFineDataFunction}
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
      describe('when the full fine data is set to visible', () => {
        it('should not render the button if the vehicle has no violations', () => {
          render(
            <ShowFineDetailsButton
              showFullFineData={true}
              toggleShowFullFineDataFunction={setShowFullFineDataFunction}
              violationsCount={0}
              violationsListIsVisible={false}
            />,
          )

          expect(screen.queryByRole('button')).toBeFalsy()
        })

        it('should not render the button even if the vehicle has at least one violation', () => {
          render(
            <ShowFineDetailsButton
              showFullFineData={true}
              toggleShowFullFineDataFunction={setShowFullFineDataFunction}
              violationsCount={1}
              violationsListIsVisible={false}
            />,
          )

          expect(screen.queryByRole('button')).toBeFalsy()
        })
      })

      describe('when the full fine data is set to not visible', () => {
        it('should not render the button if the vehicle has no violations', () => {
          render(
            <ShowFineDetailsButton
              showFullFineData={false}
              toggleShowFullFineDataFunction={setShowFullFineDataFunction}
              violationsCount={0}
              violationsListIsVisible={false}
            />,
          )

          expect(screen.queryByRole('button')).toBeFalsy()
        })

        it('should not render the button even if the vehicle has at least one violation', () => {
          render(
            <ShowFineDetailsButton
              showFullFineData={false}
              toggleShowFullFineDataFunction={setShowFullFineDataFunction}
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
