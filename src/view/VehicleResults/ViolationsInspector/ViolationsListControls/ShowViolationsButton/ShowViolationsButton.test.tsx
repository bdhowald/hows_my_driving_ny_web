import React from 'react'
import { render, screen } from '@testing-library/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import { ViolationFactory } from '__fixtures__/models/Violation'

import ShowViolationsButton from './ShowViolationsButton'

describe('ShowViolationsButton', () => {
  const setViolationsListVisibilityFunction = () => null

  describe('renders without error', () => {
    test.each([
      // No violations, list is set to visible (vacuously so)
      {
        violationsCount: 0,
        violationsListIsVisible: true,
      },
      // No violations, list is not visible
      {
        violationsCount: 0,
        violationsListIsVisible: false,
      },
      // One violation, list is set to visible (vacuously so)
      {
        violationsCount: 1,
        violationsListIsVisible: true,
      },
      // One violation, list is not visible
      {
        violationsCount: 1,
        violationsListIsVisible: false,
      },
      // Multiple violations, list is set to visible (vacuously so)
      {
        violationsCount: 2,
        violationsListIsVisible: true,
      },
      // Multiple violations, list is not visible
      {
        violationsCount: 2,
        violationsListIsVisible: false,
      },
    ])(
      'renders successfully with $violationsCount violations and violations list visibility set to $violationsListIsVisible',
      ({ violationsCount, violationsListIsVisible }) => {
        const vehicle = VehicleFactory.build({
          violations: [
            ...Array(violationsCount)
              .fill(0)
              .map((_) => ViolationFactory.build()),
          ],
          violationsCount,
        })

        render(
          <ShowViolationsButton
            setViolationsListVisibilityFunction={
              setViolationsListVisibilityFunction
            }
            vehicle={vehicle}
            violationsListIsVisible={violationsListIsVisible}
          />,
        )

        const showViolationsButtonElement = screen.getByRole('button')

        expect(showViolationsButtonElement.textContent).toContain('violation')
      },
    )
  })

  describe('renders the correct text', () => {
    describe('when the list is visible', () => {
      it("should say 'no violations' if the vehicle has no violations", () => {
        const vehicle = VehicleFactory.build({
          violations: [],
          violationsCount: 0,
        })

        render(
          <ShowViolationsButton
            setViolationsListVisibilityFunction={
              setViolationsListVisibilityFunction
            }
            vehicle={vehicle}
            violationsListIsVisible={true}
          />,
        )

        const showViolationsButtonElement = screen.getByRole('button')

        expect(showViolationsButtonElement.textContent).toContain(
          'no violations',
        )
      })
    })

    it("should say 'hide violations' if the vehicle has one violation", () => {
      const vehicle = VehicleFactory.build({
        violations: [ViolationFactory.build()],
        violationsCount: 1,
      })

      render(
        <ShowViolationsButton
          setViolationsListVisibilityFunction={
            setViolationsListVisibilityFunction
          }
          vehicle={vehicle}
          violationsListIsVisible={true}
        />,
      )

      const showViolationsButtonElement = screen.getByRole('button')

      expect(showViolationsButtonElement.textContent).toContain(
        'hide violations',
      )
    })

    it("should say 'hide violations' if the vehicle has more than one violation", () => {
      const vehicle = VehicleFactory.build({
        violations: [ViolationFactory.build(), ViolationFactory.build()],
        violationsCount: 2,
      })

      render(
        <ShowViolationsButton
          setViolationsListVisibilityFunction={
            setViolationsListVisibilityFunction
          }
          vehicle={vehicle}
          violationsListIsVisible={true}
        />,
      )

      const showViolationsButtonElement = screen.getByRole('button')

      expect(showViolationsButtonElement.textContent).toContain(
        'hide violations',
      )
    })

    describe('when the list is not visible', () => {
      it("should say 'no violations' if the vehicle has no violations", () => {
        const vehicle = VehicleFactory.build({
          violations: [],
          violationsCount: 0,
        })

        render(
          <ShowViolationsButton
            setViolationsListVisibilityFunction={
              setViolationsListVisibilityFunction
            }
            vehicle={vehicle}
            violationsListIsVisible={false}
          />,
        )

        const showViolationsButtonElement = screen.getByRole('button')

        expect(showViolationsButtonElement.textContent).toContain(
          'no violations',
        )
      })

      it("should say 'show 1 violation' if the vehicle has one violation", () => {
        const vehicle = VehicleFactory.build({
          violations: [ViolationFactory.build()],
          violationsCount: 1,
        })

        render(
          <ShowViolationsButton
            setViolationsListVisibilityFunction={
              setViolationsListVisibilityFunction
            }
            vehicle={vehicle}
            violationsListIsVisible={false}
          />,
        )

        const showViolationsButtonElement = screen.getByRole('button')

        expect(showViolationsButtonElement.textContent).toContain(
          'show 1 violation',
        )
      })

      it("should say 'show 2 violations' if the vehicle has two violations", () => {
        const vehicle = VehicleFactory.build({
          violations: [ViolationFactory.build(), ViolationFactory.build()],
          violationsCount: 2,
        })

        render(
          <ShowViolationsButton
            setViolationsListVisibilityFunction={
              setViolationsListVisibilityFunction
            }
            vehicle={vehicle}
            violationsListIsVisible={false}
          />,
        )

        const showViolationsButtonElement = screen.getByRole('button')

        expect(showViolationsButtonElement.textContent).toContain(
          'show 2 violations',
        )
      })
    })
  })
})
