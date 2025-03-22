import React from 'react'
import { render, screen } from '@testing-library/react'

import { ViolationFactory } from '__fixtures__/models/Violation'

import ViolationCard from './ViolationCard'

describe('ViolationCard', () => {
  const inspectViolationFunction = () => null

  describe('renders without error', () => {
    it('displays the violation time, date, borough, type, and fines', () => {
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
          violation={violation}
        />,
      )

      const finesString = `$${(
        violation.getTotalFined() as number
      ).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`

      expect(
        screen.getByText(violation.getViolationDateTime()),
      ).toBeInTheDocument()
      expect(screen.getByText(violation.getBorough())).toBeInTheDocument()
      expect(
        screen.getByText(violation.humanizedDescription),
      ).toBeInTheDocument()
      expect(screen.getByText(finesString)).toBeInTheDocument()
    })
  })
})
