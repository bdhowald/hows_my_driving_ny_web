import * as React from 'react'
import { render, screen } from '@testing-library/react'

import L10N from 'constants/display'

import CombinedViolationsFinesBreakdown from './CombinedViolationsFinesBreakdown'

describe('CombinedViolationsFinesBreakdown', () => {
  describe('renders without error', () => {
    it('should render successfully', () => {
      render(
        <CombinedViolationsFinesBreakdown
          totalFined={0}
          totalInJudgment={0}
          totalOutstanding={0}
          totalPaid={0}
          totalReduced={0}
        />,
      )

      expect(screen.getByText('Fined:')).toBeInTheDocument()
      expect(screen.getByText('Paid:')).toBeInTheDocument()
      expect(screen.getByText('Owed:')).toBeInTheDocument()
    })
  })

  const fineCombinations = [
    {
      totalFined: 0,
      totalInJudgment: 0,
      totalOutstanding: 0,
      totalPaid: 0,
      totalReduced: 0,
    },
    {
      totalFined: 50,
      totalInJudgment: 0,
      totalOutstanding: 50,
      totalPaid: 0,
      totalReduced: 0,
    },
    {
      totalFined: 50,
      totalInJudgment: 0,
      totalOutstanding: 0,
      totalPaid: 50,
      totalReduced: 0,
    },
    {
      totalFined: 50,
      totalInJudgment: 0,
      totalOutstanding: 0,
      totalPaid: 25,
      totalReduced: 25,
    },
    {
      totalFined: 50,
      totalInJudgment: 0,
      totalOutstanding: 25,
      totalPaid: 25,
      totalReduced: 0,
    },
    {
      totalFined: 50,
      totalInJudgment: 0,
      totalOutstanding: 15,
      totalPaid: 25,
      totalReduced: 10,
    },
    {
      totalFined: 50,
      totalInJudgment: 10,
      totalOutstanding: 15,
      totalPaid: 25,
      totalReduced: 10,
    },
  ]

  describe('show aggregated fine data for a vehicle', () => {
    test.each(fineCombinations)(
      'shows various labels and amount with the following values: total fined $totalFined, total in judgment $totalInJudgment, total outstanding: $totalOustanding, total paid $totalPaid, total reduced $totalReduced',
      ({
        totalFined,
        totalInJudgment,
        totalOutstanding,
        totalPaid,
        totalReduced,
      }) => {
        render(
          <CombinedViolationsFinesBreakdown
            totalFined={totalFined}
            totalInJudgment={totalInJudgment}
            totalOutstanding={totalOutstanding}
            totalPaid={totalPaid}
            totalReduced={totalReduced}
          />,
        )

        expect(screen.getByText('Fined:')).toBeInTheDocument()
        expect(
          screen.getAllByText(
            `$${totalFined.toLocaleString('en-US', L10N.sitewide.currency)}`,
          ).length,
        ).toBeGreaterThanOrEqual(1)

        if (totalReduced) {
          expect(screen.getByText('Reduced:')).toBeInTheDocument()
          expect(
            screen.getAllByText(
              `$${totalReduced.toLocaleString('en-US', L10N.sitewide.currency)}`,
            ).length,
          ).toBeGreaterThanOrEqual(1)
        }

        expect(screen.getByText('Paid:')).toBeInTheDocument()
        expect(
          screen.getAllByText(
            `$${totalPaid.toLocaleString('en-US', L10N.sitewide.currency)}`,
          ).length,
        ).toBeGreaterThanOrEqual(1)

        expect(screen.getByText('Owed:')).toBeInTheDocument()
        expect(
          screen.getAllByText(
            `$${totalOutstanding.toLocaleString('en-US', L10N.sitewide.currency)}`,
          ).length,
        ).toBeGreaterThanOrEqual(1)

        // If nothing is due, do not expect judgment label
        if (totalInJudgment) {
          expect(screen.getByText('In judgment:')).toBeInTheDocument()
          expect(
            screen.getAllByText(
              `$${totalInJudgment.toLocaleString('en-US', L10N.sitewide.currency)}`,
            ).length,
          ).toBeGreaterThanOrEqual(1)
        }
      },
    )
  })
})
