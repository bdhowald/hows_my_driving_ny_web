import React from 'react'
import { render, screen } from '@testing-library/react'

import { ViolationFactory } from '__fixtures__/models/Violation'

import ViolationCard from './ViolationCard'

describe('ViolationCard', () => {
  const inspectViolationFunction = () => null

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
      'displays the violation time, date, and violation type when showFullFineData is $showFullFineData and showFullLocationData is $showFullLocationData',
      ({ showFullFineData, showFullLocationData }) => {
        const violation = ViolationFactory.build({
          amountDue: 25,
          fineAmount: 65,
          getTotalFined: () => 90.0,
          interestAmount: 0.69,
          paymentAmount: 75,
          penaltyAmount: 25,
          reductionAmount: 0.69,
        })

        render(
          <ViolationCard
            index={0}
            inspectViolationFunction={inspectViolationFunction}
            showFullFineData={showFullFineData}
            showFullLocationData={showFullLocationData}
            violation={violation}
          />,
        )

        expect(
          screen.getByText(violation.getViolationDateTime()),
        ).toBeInTheDocument()
        expect(screen.getByText(violation.getBorough())).toBeInTheDocument()
        expect(
          screen.getByText(violation.humanizedDescription),
        ).toBeInTheDocument()
      },
    )
  })

  describe('showFullFineData', () => {
    it('displays all the fine details when showFullFineData is true', () => {
      const violation = ViolationFactory.build({
        amountDue: 30.02,
        fineAmount: 65,
        getTotalFined: () => 90.0,
        interestAmount: 0.69,
        paymentAmount: 70,
        penaltyAmount: 25,
        reductionAmount: 0.67,
      })

      render(
        <ViolationCard
          index={0}
          inspectViolationFunction={inspectViolationFunction}
          showFullFineData={true}
          showFullLocationData={false}
          violation={violation}
        />,
      )

      const getAmountString = (amount: number) =>
        `$${(amount as number).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`

      const amountDueString = getAmountString(violation.amountDue as number)
      const fineAmountString = getAmountString(violation.fineAmount as number)
      const interestAmountString = getAmountString(
        violation.interestAmount as number,
      )
      const paymentAmountString = getAmountString(
        violation.paymentAmount as number,
      )
      const penaltyAmountString = getAmountString(
        violation.penaltyAmount as number,
      )
      const reductionAmountString = getAmountString(
        violation.reductionAmount as number,
      )

      expect(screen.getByText(amountDueString)).toBeInTheDocument()
      expect(screen.getByText(fineAmountString)).toBeInTheDocument()
      expect(screen.getByText(interestAmountString)).toBeInTheDocument()
      expect(screen.getByText(paymentAmountString)).toBeInTheDocument()
      expect(screen.getByText(penaltyAmountString)).toBeInTheDocument()
      expect(screen.getByText(reductionAmountString)).toBeInTheDocument()
    })

    it('displays only the borough when showFullLocationData is false', () => {
      const violation = ViolationFactory.build({
        location: '233 Spring Street',
      })

      render(
        <ViolationCard
          index={0}
          inspectViolationFunction={inspectViolationFunction}
          showFullFineData={false}
          showFullLocationData={false}
          violation={violation}
        />,
      )

      expect(
        screen.queryByText(violation.location as string),
      ).not.toBeInTheDocument()
      expect(screen.getByText(violation.getBorough())).toBeInTheDocument()
    })
  })

  describe('showFullLocationData', () => {
    it('displays the borough and full location when showFullLocationData is true', () => {
      const violation = ViolationFactory.build({
        location: '233 Spring Street',
      })

      render(
        <ViolationCard
          index={0}
          inspectViolationFunction={inspectViolationFunction}
          showFullFineData={false}
          showFullLocationData={true}
          violation={violation}
        />,
      )

      expect(screen.getByText(violation.location as string)).toBeInTheDocument()
      expect(screen.getByText(violation.getBorough())).toBeInTheDocument()
    })

    it('displays only the borough when showFullLocationData is false', () => {
      const violation = ViolationFactory.build({
        location: '233 Spring Street',
      })

      render(
        <ViolationCard
          index={0}
          inspectViolationFunction={inspectViolationFunction}
          showFullFineData={false}
          showFullLocationData={false}
          violation={violation}
        />,
      )

      expect(
        screen.queryByText(violation.location as string),
      ).not.toBeInTheDocument()
      expect(screen.getByText(violation.getBorough())).toBeInTheDocument()
    })
  })
})
