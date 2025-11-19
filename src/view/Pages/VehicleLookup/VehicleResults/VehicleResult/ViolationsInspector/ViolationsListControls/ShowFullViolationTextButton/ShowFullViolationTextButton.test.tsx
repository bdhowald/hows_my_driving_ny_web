import React from 'react'
import { render, screen } from '@testing-library/react'

import ShowFullViolationTextButton from './ShowFullViolationTextButton'

describe('ShowFullViolationTextButton', () => {
  const setShowFullViolationTextFunction = () => null

  describe('renders without error', () => {
    test.each([
      // No violations, show full violation text, violations list is visible
      {
        showFullViolationText: true,
        violationsCount: 0,
        violationsListIsVisible: true,
      },
      // At least one violation, show full violation text, violations list is visible
      {
        showFullViolationText: true,
        violationsCount: 1,
        violationsListIsVisible: true,
      },
      // No violations, show condensed violation text, violations list is visible
      {
        showFullViolationText: false,
        violationsCount: 0,
        violationsListIsVisible: true,
      },
      // At least one violation, show condensed violation text, violations list is visible
      {
        showFullViolationText: false,
        violationsCount: 1,
        violationsListIsVisible: true,
      },

      // No violations, show full violation text, violations list is not visible
      {
        showFullViolationText: true,
        violationsCount: 0,
        violationsListIsVisible: false,
      },
      // At least one violation, show full violation text, violations list is not visible
      {
        showFullViolationText: true,
        violationsCount: 1,
        violationsListIsVisible: false,
      },
      // No violations, show condensed violation text, violations list is not visible
      {
        showFullViolationText: false,
        violationsCount: 0,
        violationsListIsVisible: false,
      },
      // At least one violation, show condensed violation text, violations list is not visible
      {
        showFullViolationText: false,
        violationsCount: 1,
        violationsListIsVisible: false,
      },
    ])(
      'renders successfully with $violationsCount violations and showing full violation text set to $showFullViolationText',
      ({ showFullViolationText, violationsCount, violationsListIsVisible }) => {
        const vehicleHasViolations = violationsCount > 0

        render(
          <ShowFullViolationTextButton
            setShowFullViolationTextFunction={setShowFullViolationTextFunction}
            showFullViolationText={showFullViolationText}
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
      describe('when the full violation text is visible', () => {
        it('should render nothing if the vehicle has no violations', () => {
          render(
            <ShowFullViolationTextButton
              setShowFullViolationTextFunction={
                setShowFullViolationTextFunction
              }
              showFullViolationText={true}
              violationsCount={0}
              violationsListIsVisible={true}
            />,
          )

          expect(screen.queryByRole('button')).toBeFalsy()
        })

        it("should say 'hide violations' if the vehicle has at least one violation", () => {
          render(
            <ShowFullViolationTextButton
              setShowFullViolationTextFunction={
                setShowFullViolationTextFunction
              }
              showFullViolationText={true}
              violationsCount={1}
              violationsListIsVisible={true}
            />,
          )

          const showViolationsButtonElement = screen.getByRole('button')

          expect(showViolationsButtonElement.textContent).toContain(
            'show violation summary',
          )
        })
      })

      describe('when the full violation text is not visible', () => {
        it('should render nothing if the vehicle has no violations', () => {
          render(
            <ShowFullViolationTextButton
              setShowFullViolationTextFunction={
                setShowFullViolationTextFunction
              }
              showFullViolationText={false}
              violationsCount={0}
              violationsListIsVisible={true}
            />,
          )

          expect(screen.queryByRole('button')).toBeFalsy()
        })

        it("should say 'hide violations' if the vehicle has at least one violation", () => {
          render(
            <ShowFullViolationTextButton
              setShowFullViolationTextFunction={
                setShowFullViolationTextFunction
              }
              showFullViolationText={false}
              violationsCount={1}
              violationsListIsVisible={true}
            />,
          )

          const showViolationsButtonElement = screen.getByRole('button')

          expect(showViolationsButtonElement.textContent).toContain(
            'show full violation',
          )
        })
      })
    })

    describe('when the list is not visible', () => {
      describe('when the full violation text is visible', () => {
        it('should render nothing if the vehicle has no violations', () => {
          render(
            <ShowFullViolationTextButton
              setShowFullViolationTextFunction={
                setShowFullViolationTextFunction
              }
              showFullViolationText={true}
              violationsCount={0}
              violationsListIsVisible={false}
            />,
          )

          expect(screen.queryByRole('button')).toBeFalsy()
        })

        it('should render nothing if the vehicle has at least one violation', () => {
          render(
            <ShowFullViolationTextButton
              setShowFullViolationTextFunction={
                setShowFullViolationTextFunction
              }
              showFullViolationText={true}
              violationsCount={1}
              violationsListIsVisible={false}
            />,
          )

          expect(screen.queryByRole('button')).toBeFalsy()
        })
      })

      describe('when the full violation text is not visible', () => {
        it('should render nothing if the vehicle has no violations', () => {
          render(
            <ShowFullViolationTextButton
              setShowFullViolationTextFunction={
                setShowFullViolationTextFunction
              }
              showFullViolationText={false}
              violationsCount={0}
              violationsListIsVisible={false}
            />,
          )

          expect(screen.queryByRole('button')).toBeFalsy()
        })

        it("should say 'hide violations' if the vehicle has at least one violation", () => {
          render(
            <ShowFullViolationTextButton
              setShowFullViolationTextFunction={
                setShowFullViolationTextFunction
              }
              showFullViolationText={false}
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
