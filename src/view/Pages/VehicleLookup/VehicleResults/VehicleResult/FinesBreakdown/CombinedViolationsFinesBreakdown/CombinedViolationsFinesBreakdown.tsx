import * as React from 'react'

import L10N from 'constants/display'

import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/FinesBreakdown/CombinedViolationsFinesBreakdown/CombinedViolationsFinesBreakdown.css'

const NON_BREAKING_SPACES = '\u00A0\u00A0\u00A0'

type CombinedViolationsFinesProps = {
  totalFined: number
  totalInJudgment: number
  totalOutstanding: number
  totalPaid: number
  totalReduced: number
}

const CombinedViolationsFinesSubtractionAmounts = ({
  totalPaid,
  totalReduced,
}: {
  totalPaid: number | undefined
  totalReduced: number | undefined
}) => {
  const totalPaidString = (totalPaid ?? 0).toLocaleString(
    'en-US',
    L10N.sitewide.currency,
  )

  const totalReducedString = (totalReduced ?? 0).toLocaleString(
    'en-US',
    L10N.sitewide.currency,
  )

  if (totalPaid && totalReduced) {
    return (
      <>
        <div>${totalReducedString}</div>
        <div className="fines-reduced">${totalPaidString}</div>
      </>
    )
  }

  if (totalPaid) {
    return <div className="fines-reduced">${totalPaidString}</div>
  }

  return <div className="fines-reduced">${totalReducedString}</div>
}

const CombinedViolationsFinesSubtractionLabels = ({
  totalPaidPresent,
  totalReducedPresent,
}: {
  totalPaidPresent: boolean
  totalReducedPresent: boolean
}) => {
  if (totalPaidPresent && totalReducedPresent) {
    return (
      <>
        <div>Reduced:</div>
        <div className="fines-reduced">Paid:</div>
      </>
    )
  }

  if (totalReducedPresent) {
    return <div className="fines-reduced">Reduced:</div>
  }

  return <div className="fines-reduced">Paid:</div>
}

const CombinedViolationsFinesSubtractionSymbols = ({
  totalPaidPresent,
  totalReducedPresent,
}: {
  totalPaidPresent: boolean
  totalReducedPresent: boolean
}) => {
  if (totalPaidPresent && totalReducedPresent) {
    return (
      <>
        <div>{NON_BREAKING_SPACES}</div>
        <div className="fines-reduced">–{'\u00A0'}</div>
      </>
    )
  }

  return <div className="fines-reduced">–{'\u00A0'}</div>
}

const CombinedViolationsFinesBreakdown = (
  props: CombinedViolationsFinesProps,
) => {
  const {
    totalFined,
    totalInJudgment,
    totalOutstanding,
    totalPaid,
    totalReduced,
  } = props

  const totalFinedString = totalFined.toLocaleString(
    'en-US',
    L10N.sitewide.currency,
  )
  const totalPaidString = totalPaid.toLocaleString(
    'en-US',
    L10N.sitewide.currency,
  )
  const totalReducedString = totalReduced.toLocaleString(
    'en-US',
    L10N.sitewide.currency,
  )
  const totalOutstandingString = totalOutstanding.toLocaleString(
    'en-US',
    L10N.sitewide.currency,
  )
  const totalinJudgmentString = totalInJudgment.toLocaleString(
    'en-US',
    L10N.sitewide.currency,
  )

  const finesAriaLabel = `$${totalFinedString} fined - $${totalPaidString} paid - $${totalReducedString} reduced = $${totalOutstandingString} outstanding`

  const anyFinesInJudgment = totalInJudgment > 0

  return (
    <div className="summary-box">
      <div className="vehicle-info-group vehicle-fines">
        <div className="keys lookup-info">
          <div>Fined:</div>
          <CombinedViolationsFinesSubtractionLabels
            totalPaidPresent={!!totalPaid}
            totalReducedPresent={!!totalReduced}
          />
          <div>Owed:</div>
          {anyFinesInJudgment && (
            <div className="in-judgment">In judgment:</div>
          )}
        </div>
        <div
          className="values lookup-info"
          role="math"
          aria-label={finesAriaLabel}
        >
          <div className="math-symbols">
            <div>{NON_BREAKING_SPACES}</div>
            <CombinedViolationsFinesSubtractionSymbols
              totalPaidPresent={!!totalPaid}
              totalReducedPresent={!!totalReduced}
            />
            <div>{NON_BREAKING_SPACES}</div>
            {anyFinesInJudgment && <div>{NON_BREAKING_SPACES}</div>}
          </div>
          <div className="amounts">
            <div>${totalFinedString}</div>
            <CombinedViolationsFinesSubtractionAmounts
              totalPaid={totalPaid}
              totalReduced={totalReduced}
            />
            <div>${totalOutstandingString}</div>
            {anyFinesInJudgment && (
              <div className="in-judgment">${totalinJudgmentString}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

CombinedViolationsFinesBreakdown.displayName =
  'VehicleResults.CombinedFinesBreakdown'

export default CombinedViolationsFinesBreakdown
