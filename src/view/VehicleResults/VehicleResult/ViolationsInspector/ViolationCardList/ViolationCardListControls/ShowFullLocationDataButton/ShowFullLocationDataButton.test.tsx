import React from 'react'
import { render, screen } from '@testing-library/react'

import ShowFullLocationDataButton from './ShowFullLocationDataButton'

describe('showFullLocationDataButton', () => {
  const toggleShowFullLocationDataFunction = () => null

  describe('renders without error', () => {
    test.each([
      // Extra small page, no violations, show full violation text, violations list is visible
      {
        pageWidth: 575,
        showFullLocationData: true,
        violationsCount: 0,
        violationsListIsVisible: true,
      },
      // Extra small page, at least one violation, show full violation text, violations list is visible
      {
        pageWidth: 575,
        showFullLocationData: true,
        violationsCount: 1,
        violationsListIsVisible: true,
      },
      // Extra small page, no violations, show condensed violation text, violations list is visible
      {
        pageWidth: 575,
        showFullLocationData: false,
        violationsCount: 0,
        violationsListIsVisible: true,
      },
      // Extra small page, at least one violation, show condensed violation text, violations list is visible
      {
        pageWidth: 575,
        showFullLocationData: false,
        violationsCount: 1,
        violationsListIsVisible: true,
      },

      // Extra small page, no violations, show full violation text, violations list is not visible
      {
        pageWidth: 575,
        showFullLocationData: true,
        violationsCount: 0,
        violationsListIsVisible: false,
      },
      // Extra small page, at least one violation, show full violation text, violations list is not visible
      {
        pageWidth: 575,
        showFullLocationData: true,
        violationsCount: 1,
        violationsListIsVisible: false,
      },
      // Extra small page, no violations, show condensed violation text, violations list is not visible
      {
        pageWidth: 575,
        showFullLocationData: false,
        violationsCount: 0,
        violationsListIsVisible: false,
      },
      // Extra small page, at least one violation, show condensed violation text, violations list is not visible
      {
        pageWidth: 575,
        showFullLocationData: false,
        violationsCount: 1,
        violationsListIsVisible: false,
      },

      // Extra small page, no violations, show full violation text, violations list is visible
      {
        pageWidth: 576,
        showFullLocationData: true,
        violationsCount: 0,
        violationsListIsVisible: true,
      },
      // Extra small page, at least one violation, show full violation text, violations list is visible
      {
        pageWidth: 576,
        showFullLocationData: true,
        violationsCount: 1,
        violationsListIsVisible: true,
      },
      // Extra small page, no violations, show condensed violation text, violations list is visible
      {
        pageWidth: 576,
        showFullLocationData: false,
        violationsCount: 0,
        violationsListIsVisible: true,
      },
      // Extra small page, at least one violation, show condensed violation text, violations list is visible
      {
        pageWidth: 576,
        showFullLocationData: false,
        violationsCount: 1,
        violationsListIsVisible: true,
      },

      // Extra small page, no violations, show full violation text, violations list is not visible
      {
        pageWidth: 576,
        showFullLocationData: true,
        violationsCount: 0,
        violationsListIsVisible: false,
      },
      // Extra small page, at least one violation, show full violation text, violations list is not visible
      {
        pageWidth: 576,
        showFullLocationData: true,
        violationsCount: 1,
        violationsListIsVisible: false,
      },
      // Extra small page, no violations, show condensed violation text, violations list is not visible
      {
        pageWidth: 576,
        showFullLocationData: false,
        violationsCount: 0,
        violationsListIsVisible: false,
      },
      // Extra small page, at least one violation, show condensed violation text, violations list is not visible
      {
        pageWidth: 576,
        showFullLocationData: false,
        violationsCount: 1,
        violationsListIsVisible: false,
      },
    ])(
      'renders successfully with $violationsCount violations and showing full violation text set to $showFullLocationData with a page width of $pageWidth',
      ({
        pageWidth,
        showFullLocationData,
        violationsCount,
        violationsListIsVisible,
      }) => {
        // Change the viewport to show/hide full violation text
        global.innerWidth = pageWidth

        // Trigger the window resize event.
        global.dispatchEvent(new Event('resize'))

        const vehicleHasViolations = violationsCount > 0

        render(
          <ShowFullLocationDataButton
            showFullLocationData={showFullLocationData}
            toggleShowFullLocationDataFunction={
              toggleShowFullLocationDataFunction
            }
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
      describe('when the full location data is set to visible', () => {
        it('should not render the button if the vehicle has no violations', () => {
          render(
            <ShowFullLocationDataButton
              showFullLocationData={true}
              toggleShowFullLocationDataFunction={
                toggleShowFullLocationDataFunction
              }
              violationsCount={0}
              violationsListIsVisible={true}
            />,
          )

          expect(screen.queryByRole('button')).toBeFalsy()
        })

        it("should say 'show location summary' if the vehicle has at least one violation", () => {
          render(
            <ShowFullLocationDataButton
              showFullLocationData={true}
              toggleShowFullLocationDataFunction={
                toggleShowFullLocationDataFunction
              }
              violationsCount={1}
              violationsListIsVisible={true}
            />,
          )

          const showViolationsButtonElement = screen.getByRole('button')

          expect(showViolationsButtonElement.textContent).toContain(
            'show location summary',
          )
        })
      })

      describe('when the full location data is set to not visible', () => {
        it('should not render the button if the vehicle has no violations', () => {
          render(
            <ShowFullLocationDataButton
              showFullLocationData={false}
              toggleShowFullLocationDataFunction={
                toggleShowFullLocationDataFunction
              }
              violationsCount={0}
              violationsListIsVisible={true}
            />,
          )

          expect(screen.queryByRole('button')).toBeFalsy()
        })

        it("should say 'show full location' if the vehicle has at least one violation", () => {
          render(
            <ShowFullLocationDataButton
              showFullLocationData={false}
              toggleShowFullLocationDataFunction={
                toggleShowFullLocationDataFunction
              }
              violationsCount={1}
              violationsListIsVisible={true}
            />,
          )

          const showViolationsButtonElement = screen.getByRole('button')

          expect(showViolationsButtonElement.textContent).toContain(
            'show full location',
          )
        })
      })
    })

    describe('when the list is not visible', () => {
      describe('when the full location data is set to visible', () => {
        it('should not render the button if the vehicle has no violations', () => {
          render(
            <ShowFullLocationDataButton
              showFullLocationData={true}
              toggleShowFullLocationDataFunction={
                toggleShowFullLocationDataFunction
              }
              violationsCount={0}
              violationsListIsVisible={false}
            />,
          )

          expect(screen.queryByRole('button')).toBeFalsy()
        })

        it('should render nothing if the vehicle has at least one violation', () => {
          render(
            <ShowFullLocationDataButton
              showFullLocationData={true}
              toggleShowFullLocationDataFunction={
                toggleShowFullLocationDataFunction
              }
              violationsCount={1}
              violationsListIsVisible={false}
            />,
          )

          expect(screen.queryByRole('button')).toBeFalsy()
        })
      })

      describe('when the full location data is not visible', () => {
        it('should not render the button if the vehicle has no violations', () => {
          render(
            <ShowFullLocationDataButton
              showFullLocationData={false}
              toggleShowFullLocationDataFunction={
                toggleShowFullLocationDataFunction
              }
              violationsCount={0}
              violationsListIsVisible={false}
            />,
          )

          expect(screen.queryByRole('button')).toBeFalsy()
        })

        it('should not render the button even if the vehicle has at least one violation', () => {
          render(
            <ShowFullLocationDataButton
              showFullLocationData={false}
              toggleShowFullLocationDataFunction={
                toggleShowFullLocationDataFunction
              }
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
