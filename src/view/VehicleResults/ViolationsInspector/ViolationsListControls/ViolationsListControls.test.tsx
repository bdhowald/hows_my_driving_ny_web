import React from 'react'
import { render, screen } from '@testing-library/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import { ViolationFactory } from '__fixtures__/models/Violation'

import ViolationsListControls from './ViolationsListControls'

describe('ViolationsListControls', () => {
  const setShowFullFineDataFunction = () => null
  const setShowFullViolationTextFunction = () => null
  const setViolationsListVisibilityFunction = () => null

  describe('renders without error', () => {
    test.each([
      // show full fine data
      // show full violation text
      // show violations list
      // no violations
      {
        showFullFineData: true,
        showFullViolationText: true,
        violationsCount: 0,
        violationsListIsVisible: true,
      },
      // show full fine data
      // show full violation text
      // hide violations list
      // no violations
      {
        showFullFineData: true,
        showFullViolationText: true,
        violationsCount: 0,
        violationsListIsVisible: false,
      },
      // show full fine data
      // show violation summary
      // show violations list
      // no violations
      {
        showFullFineData: true,
        showFullViolationText: false,
        violationsCount: 0,
        violationsListIsVisible: true,
      },
      // show full fine data
      // show violation summary
      // hide violations list
      // no violations
      {
        showFullFineData: true,
        showFullViolationText: false,
        violationsCount: 0,
        violationsListIsVisible: false,
      },
      // show condensed fine data
      // show full violation text
      // show violations list
      // no violations
      {
        showFullFineData: false,
        showFullViolationText: true,
        violationsCount: 0,
        violationsListIsVisible: true,
      },
      // show condensed fine data
      // show full violation text
      // hide violations list
      // no violations
      {
        showFullFineData: false,
        showFullViolationText: true,
        violationsCount: 0,
        violationsListIsVisible: false,
      },
      // show condensed fine data
      // show violation summary
      // show violations list
      // no violations
      {
        showFullFineData: false,
        showFullViolationText: false,
        violationsCount: 0,
        violationsListIsVisible: true,
      },
      // show condensed fine data
      // show violation summary
      // hide violations list
      // no violations
      {
        showFullFineData: false,
        showFullViolationText: false,
        violationsCount: 0,
        violationsListIsVisible: false,
      },

      // show full fine data
      // show full violation text
      // show violations list
      // at least one violation
      {
        showFullFineData: true,
        showFullViolationText: true,
        violationsCount: 1,
        violationsListIsVisible: true,
      },
      // show full fine data
      // show full violation text
      // hide violations list
      // at least one violation
      {
        showFullFineData: true,
        showFullViolationText: true,
        violationsCount: 1,
        violationsListIsVisible: false,
      },
      // show full fine data
      // show violation summary
      // show violations list
      // at least one violation
      {
        showFullFineData: true,
        showFullViolationText: false,
        violationsCount: 1,
        violationsListIsVisible: true,
      },
      // show full fine data
      // show violation summary
      // hide violations list
      // at least one violation
      {
        showFullFineData: true,
        showFullViolationText: false,
        violationsCount: 1,
        violationsListIsVisible: false,
      },
      // show condensed fine data
      // show full violation text
      // show violations list
      // at least one violation
      {
        showFullFineData: false,
        showFullViolationText: true,
        violationsCount: 1,
        violationsListIsVisible: true,
      },
      // show condensed fine data
      // show full violation text
      // hide violations list
      // at least one violation
      {
        showFullFineData: false,
        showFullViolationText: true,
        violationsCount: 1,
        violationsListIsVisible: false,
      },
      // show condensed fine data
      // show violation summary
      // show violations list
      // at least one violation
      {
        showFullFineData: false,
        showFullViolationText: false,
        violationsCount: 1,
        violationsListIsVisible: true,
      },
      // show condensed fine data
      // show violation summary
      // hide violations list
      // at least one violation
      {
        showFullFineData: false,
        showFullViolationText: false,
        violationsCount: 1,
        violationsListIsVisible: false,
      },
    ])(
      'renders successfully with $violationsCount violations, violations list visibility set to $violationsListIsVisible, showing full fines data set to $showFullFineData, and showing full violation text set to $showFullViolationText',
      ({
        showFullFineData,
        showFullViolationText,
        violationsCount,
        violationsListIsVisible,
      }) => {
        const vehicle = VehicleFactory.build({
          violations: [
            ...Array(violationsCount)
              .fill(0)
              .map((_) => ViolationFactory.build()),
          ],
          violationsCount,
        })

        render(
          <ViolationsListControls
            setShowFullFineDataFunction={setShowFullFineDataFunction}
            setShowFullViolationTextFunction={setShowFullViolationTextFunction}
            setViolationsListVisibilityFunction={
              setViolationsListVisibilityFunction
            }
            showFullFineData={showFullFineData}
            showFullViolationText={showFullViolationText}
            vehicle={vehicle}
            violationsListIsVisible={violationsListIsVisible}
          />,
        )

        const violationListControlButtonElements = screen.getAllByRole('button')
        expect(
          violationListControlButtonElements.length,
        ).toBeGreaterThanOrEqual(1)
      },
    )
  })

  describe('renders the correct text', () => {
    describe('when the violations list is visible', () => {
      test.each([
        {
          showFullFineData: true,
          showFullViolationText: true,
        },
        {
          showFullFineData: true,
          showFullViolationText: false,
        },
        {
          showFullFineData: false,
          showFullViolationText: true,
        },
        {
          showFullFineData: false,
          showFullViolationText: false,
        },
      ])(
        'should show all three buttons when there is at least one violation',
        ({ showFullFineData, showFullViolationText }) => {
          const vehicle = VehicleFactory.build({
            violations: [ViolationFactory.build()],
            violationsCount: 1,
          })

          render(
            <ViolationsListControls
              setShowFullFineDataFunction={setShowFullFineDataFunction}
              setShowFullViolationTextFunction={
                setShowFullViolationTextFunction
              }
              setViolationsListVisibilityFunction={
                setViolationsListVisibilityFunction
              }
              showFullFineData={showFullFineData}
              showFullViolationText={showFullViolationText}
              vehicle={vehicle}
              violationsListIsVisible={true}
            />,
          )

          const violationListControlButtonElements =
            screen.getAllByRole('button')
          expect(violationListControlButtonElements.length).toEqual(3)
        },
      )

      test.each([
        {
          showFullFineData: true,
          showFullViolationText: true,
        },
        {
          showFullFineData: true,
          showFullViolationText: false,
        },
        {
          showFullFineData: false,
          showFullViolationText: true,
        },
        {
          showFullFineData: false,
          showFullViolationText: false,
        },
      ])(
        "should say 'no violations' when there are no violations",
        ({ showFullFineData, showFullViolationText }) => {
          const vehicle = VehicleFactory.build({
            violations: [],
            violationsCount: 0,
          })

          render(
            <ViolationsListControls
              setShowFullFineDataFunction={setShowFullFineDataFunction}
              setShowFullViolationTextFunction={
                setShowFullViolationTextFunction
              }
              setViolationsListVisibilityFunction={
                setViolationsListVisibilityFunction
              }
              showFullFineData={showFullFineData}
              showFullViolationText={showFullViolationText}
              vehicle={vehicle}
              violationsListIsVisible={true}
            />,
          )

          const violationListControlButtonElements =
            screen.getAllByRole('button')
          expect(violationListControlButtonElements.length).toEqual(1)

          const showViolationsButtonElement = screen.getByRole('button')
          expect(showViolationsButtonElement.textContent).toContain(
            'no violations',
          )
        },
      )
    })

    describe('when the violations list is not visible', () => {
      test.each([
        {
          showFullFineData: true,
          showFullViolationText: true,
        },
        {
          showFullFineData: true,
          showFullViolationText: false,
        },
        {
          showFullFineData: false,
          showFullViolationText: true,
        },
        {
          showFullFineData: false,
          showFullViolationText: false,
        },
      ])(
        "should say 'show X violations' when there is at least one violation",
        ({ showFullFineData, showFullViolationText }) => {
          const vehicle = VehicleFactory.build({
            violations: [ViolationFactory.build()],
            violationsCount: 1,
          })

          render(
            <ViolationsListControls
              setShowFullFineDataFunction={setShowFullFineDataFunction}
              setShowFullViolationTextFunction={
                setShowFullViolationTextFunction
              }
              setViolationsListVisibilityFunction={
                setViolationsListVisibilityFunction
              }
              showFullFineData={showFullFineData}
              showFullViolationText={showFullViolationText}
              vehicle={vehicle}
              violationsListIsVisible={false}
            />,
          )

          const violationListControlButtonElements =
            screen.getAllByRole('button')
          expect(violationListControlButtonElements.length).toEqual(1)

          const showViolationsButtonElement = screen.getByRole('button')
          expect(showViolationsButtonElement.textContent).toContain(
            'show 1 violation',
          )
        },
      )

      test.each([
        {
          showFullFineData: true,
          showFullViolationText: true,
        },
        {
          showFullFineData: true,
          showFullViolationText: false,
        },
        {
          showFullFineData: false,
          showFullViolationText: true,
        },
        {
          showFullFineData: false,
          showFullViolationText: false,
        },
      ])(
        "should say 'no violations' when there are no violations",
        ({ showFullFineData, showFullViolationText }) => {
          const vehicle = VehicleFactory.build({
            violations: [],
            violationsCount: 0,
          })

          render(
            <ViolationsListControls
              setShowFullFineDataFunction={setShowFullFineDataFunction}
              setShowFullViolationTextFunction={
                setShowFullViolationTextFunction
              }
              setViolationsListVisibilityFunction={
                setViolationsListVisibilityFunction
              }
              showFullFineData={showFullFineData}
              showFullViolationText={showFullViolationText}
              vehicle={vehicle}
              violationsListIsVisible={true}
            />,
          )

          const violationListControlButtonElements =
            screen.getAllByRole('button')
          expect(violationListControlButtonElements.length).toEqual(1)

          const showViolationsButtonElement = screen.getByRole('button')
          expect(showViolationsButtonElement.textContent).toContain(
            'no violations',
          )
        },
      )
    })
  })
})
