import * as React from 'react'
import { render, screen } from '@testing-library/react'

import L10N from 'constants/display'

import SingleViolationFinesBreakdown from './SingleViolationFinesBreakdown'

type SingleViolationFineTestCaseData = {
  dueAmount: number
  fineAmount: number
  interestAmount: number
  isViolationInJudgment?: boolean
  paymentAmount: number
  penaltyAmount: number
  reductionAmount: number
}

describe('SingleViolationsFinesBreakdown', () => {
  describe('renders without error', () => {
    it('should render successfully when showFullFineData is true', () => {
      render(
        <SingleViolationFinesBreakdown
          dueAmount={0}
          fineAmount={0}
          interestAmount={0}
          isViolationInJudgment={false}
          paymentAmount={0}
          penaltyAmount={0}
          reductionAmount={0}
          showFullFineData={true}
        />,
      )

      expect(screen.getByText('N/A')).toBeInTheDocument()
    })
    it('should render successfully when showFullFineData is true', () => {
      render(
        <SingleViolationFinesBreakdown
          dueAmount={0}
          fineAmount={0}
          interestAmount={0}
          isViolationInJudgment={false}
          paymentAmount={0}
          penaltyAmount={0}
          reductionAmount={0}
          showFullFineData={false}
        />,
      )

      expect(screen.getByText('N/A')).toBeInTheDocument()
    })
  })

  const fineCombinations = [
    {
      dueAmount: 0,
      fineAmount: 0,
      interestAmount: 0,
      paymentAmount: 0,
      penaltyAmount: 0,
      reductionAmount: 0,
    },
    {
      dueAmount: 50,
      fineAmount: 50,
      interestAmount: 0,
      paymentAmount: 0,
      penaltyAmount: 0,
      reductionAmount: 0,
    },
    {
      dueAmount: 50,
      fineAmount: 50,
      interestAmount: 0,
      paymentAmount: 0,
      penaltyAmount: 25,
      reductionAmount: 0,
    },
    {
      dueAmount: 61.79,
      fineAmount: 50,
      interestAmount: 11.79,
      paymentAmount: 0,
      penaltyAmount: 0,
      reductionAmount: 0,
    },
    {
      dueAmount: 86.79,
      fineAmount: 50,
      interestAmount: 11.79,
      paymentAmount: 0,
      penaltyAmount: 25,
      reductionAmount: 0,
    },
    {
      dueAmount: 0,
      fineAmount: 50,
      interestAmount: 11.79,
      paymentAmount: 86.79,
      penaltyAmount: 25,
      reductionAmount: 0,
    },
    {
      dueAmount: 0,
      fineAmount: 50,
      interestAmount: 11.79,
      paymentAmount: 86,
      penaltyAmount: 25,
      reductionAmount: 0.79,
    },
    {
      dueAmount: 50,
      fineAmount: 50,
      interestAmount: 11.79,
      paymentAmount: 36,
      penaltyAmount: 25,
      reductionAmount: 0.79,
    },
    {
      dueAmount: 25,
      fineAmount: 50,
      interestAmount: 0,
      paymentAmount: 25,
      penaltyAmount: 0,
      reductionAmount: 0,
    },
    {
      dueAmount: 0,
      fineAmount: 50,
      interestAmount: 0,
      paymentAmount: 0,
      penaltyAmount: 50,
      reductionAmount: 0,
    },
  ]

  const fineCombinationsInJudgment: SingleViolationFineTestCaseData[] =
    fineCombinations.map((existing) => {
      const complete = Object.create({
        ...existing,
        ...{ isViolationInJudgment: true },
      })
      return complete
    })

  const fineCombinationsNotInJudgment: SingleViolationFineTestCaseData[] =
    fineCombinations.map((existing) => {
      const complete = Object.create({
        ...existing,
        ...{ isViolationInJudgment: false },
      })
      return complete
    })

  describe('show summary fine data for a single violation', () => {
    test.each(fineCombinations)(
      'shows a single value: fineAmount + interestAmount + penaltyAmount - reductionAmount',
      ({
        dueAmount,
        fineAmount,
        interestAmount,
        paymentAmount,
        penaltyAmount,
        reductionAmount,
      }) => {
        render(
          <SingleViolationFinesBreakdown
            dueAmount={dueAmount}
            fineAmount={fineAmount}
            interestAmount={interestAmount}
            isViolationInJudgment={false}
            paymentAmount={paymentAmount}
            penaltyAmount={penaltyAmount}
            reductionAmount={reductionAmount}
            showFullFineData={false}
          />,
        )

        if (!fineAmount) {
          expect(screen.getByText('N/A')).toBeInTheDocument()
          return
        }

        const expectedFineValue =
          fineAmount + interestAmount + penaltyAmount - reductionAmount

        expect(
          screen.getByText(
            `$${expectedFineValue.toLocaleString('en-US', L10N.sitewide.currency)}`,
          ),
        ).toBeInTheDocument()
      },
    )

    it('should ensure that fine amounts that sum to negative zero display as positive zero', () => {
      // taken from real case
      const dueAmount = 0
      const paymentAmount = 0

      const fineAmount = 115
      const interestAmount = 1.21
      const penaltyAmount = 60
      const reductionAmount = 176.21

      render(
        <SingleViolationFinesBreakdown
          dueAmount={dueAmount}
          fineAmount={fineAmount}
          interestAmount={interestAmount}
          isViolationInJudgment={false}
          paymentAmount={paymentAmount}
          penaltyAmount={penaltyAmount}
          reductionAmount={reductionAmount}
          showFullFineData={false}
        />,
      )

      expect(screen.getByText('$0.00')).toBeInTheDocument()
    })
  })

  describe('show full fine data for a single violation', () => {
    test.each([
      ...fineCombinationsInJudgment,
      ...fineCombinationsNotInJudgment,
    ])(
      'shows various labels and amount with the following values: amount fined: $fineAmount, amount in interest $interestAmount, amount paid $paymentAmount, amount in penalties $penaltyAmount, amount reduced $reductionAmount, and whose judgment status is $isViolationInJudgment',
      ({
        dueAmount,
        fineAmount,
        interestAmount,
        isViolationInJudgment,
        paymentAmount,
        penaltyAmount,
        reductionAmount,
      }) => {
        render(
          <SingleViolationFinesBreakdown
            dueAmount={dueAmount}
            fineAmount={fineAmount}
            interestAmount={interestAmount}
            isViolationInJudgment={isViolationInJudgment ?? false}
            paymentAmount={paymentAmount}
            penaltyAmount={penaltyAmount}
            reductionAmount={reductionAmount}
            showFullFineData={true}
          />,
        )

        if (!fineAmount) {
          expect(screen.getByText('N/A')).toBeInTheDocument()
          return
        }

        expect(screen.getByText('Initial:')).toBeInTheDocument()
        expect(
          screen.getAllByText(
            `$${fineAmount.toLocaleString('en-US', L10N.sitewide.currency)}`,
          ).length,
        ).toBeGreaterThanOrEqual(1)

        if (interestAmount) {
          expect(screen.getByText('Interest:')).toBeInTheDocument()
          expect(
            screen.getAllByText(
              `$${interestAmount.toLocaleString('en-US', L10N.sitewide.currency)}`,
            ).length,
          ).toBeGreaterThanOrEqual(1)
        }

        if (penaltyAmount) {
          expect(screen.getByText('Penalties:')).toBeInTheDocument()
          expect(
            screen.getAllByText(
              `$${penaltyAmount.toLocaleString('en-US', L10N.sitewide.currency)}`,
            ).length,
          ).toBeGreaterThanOrEqual(1)
        }

        if (interestAmount || penaltyAmount) {
          expect(screen.getByText('Total:')).toBeInTheDocument()
          expect(
            screen.getAllByText(
              `$${(fineAmount + interestAmount + penaltyAmount).toLocaleString('en-US', L10N.sitewide.currency)}`,
            ).length,
          ).toBeGreaterThanOrEqual(1)
        }

        expect(screen.getByText('Paid:')).toBeInTheDocument()
        expect(
          screen.getAllByText(
            `$${paymentAmount.toLocaleString('en-US', L10N.sitewide.currency)}`,
          ).length,
        ).toBeGreaterThanOrEqual(1)

        if (reductionAmount) {
          expect(screen.getByText('Reductions:')).toBeInTheDocument()
          expect(
            screen.getAllByText(
              `$${reductionAmount.toLocaleString('en-US', L10N.sitewide.currency)}`,
            ).length,
          ).toBeGreaterThanOrEqual(1)
        }

        // If nothing is due, do not expect judgment label
        if (isViolationInJudgment && dueAmount > 0) {
          expect(screen.getByText('In judgment:')).toBeInTheDocument()
        } else {
          expect(screen.getByText('Outstanding:')).toBeInTheDocument()
        }

        const computedDueAmount =
          fineAmount +
          interestAmount +
          penaltyAmount -
          paymentAmount -
          reductionAmount
        expect(
          screen.getAllByText(
            `$${dueAmount.toLocaleString('en-US', L10N.sitewide.currency)}`,
          ).length,
        ).toBeGreaterThanOrEqual(1)

        // Math.abs is needed to avoid -0 in Javascript.
        expect(
          screen.getAllByText(
            `$${Math.abs(computedDueAmount).toLocaleString('en-US', L10N.sitewide.currency)}`,
          ).length,
        ).toBeGreaterThanOrEqual(1)
      },
    )
  })
})
