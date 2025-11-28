import * as React from 'react'

import L10N from 'constants/display'

import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/FinesBreakdown/SingleViolationFinesBreakdown/SingleViolationFinesBreakdown.css'

const NON_BREAKING_SPACES = '\u00A0\u00A0\u00A0'

type SingleViolationFinesProps = {
  dueAmount: number | undefined
  fineAmount: number | undefined
  interestAmount: number | undefined
  isViolationInJudgment: boolean
  paymentAmount: number | undefined
  penaltyAmount: number | undefined
  reductionAmount: number | undefined
  showFullFineData: boolean
}

const SingleViolationFinesAdditionAmounts = ({
  fineAmount,
  interestAmount,
  penaltyAmount,
}: {
  fineAmount: number
  interestAmount: number | undefined
  penaltyAmount: number | undefined
}) => {
  if (!interestAmount && !penaltyAmount) {
    return <></>
  }

  const interestAmountString = interestAmount
    ? interestAmount.toLocaleString('en-US', L10N.sitewide.currency)
    : ''
  const penaltyAmountString = penaltyAmount
    ? penaltyAmount.toLocaleString('en-US', L10N.sitewide.currency)
    : ''

  const totalFinedString = (
    fineAmount +
    (interestAmount ?? 0) +
    (penaltyAmount ?? 0)
  ).toLocaleString('en-US', L10N.sitewide.currency)

  if (interestAmount && penaltyAmount) {
    return (
      <>
        <div>${interestAmountString}</div>
        <div className="fine-added">${penaltyAmountString}</div>
        <div>${totalFinedString}</div>
      </>
    )
  }

  if (interestAmount) {
    return (
      <>
        <div className="fine-added">${interestAmountString}</div>
        <div>${totalFinedString}</div>
      </>
    )
  }

  return (
    <>
      <div className="fine-added">${penaltyAmountString}</div>
      <div>${totalFinedString}</div>
    </>
  )
}

const SingleViolationFinesAdditionLabels = ({
  interestAmountPresent,
  penaltyAmountPresent,
}: {
  interestAmountPresent: boolean
  penaltyAmountPresent: boolean
}) => {
  if (!interestAmountPresent && !penaltyAmountPresent) {
    return <></>
  }

  if (interestAmountPresent && penaltyAmountPresent) {
    return (
      <>
        <div>Interest:</div>
        <div className="fine-added">Penalties:</div>
        <div>Total:</div>
      </>
    )
  }

  if (interestAmountPresent) {
    return (
      <>
        <div className="fine-added">Interest:</div>
        <div>Total:</div>
      </>
    )
  }

  return (
    <>
      <div className="fine-added">Penalties:</div>
      <div>Total:</div>
    </>
  )
}

const SingleViolationFinesAdditionSymbols = ({
  interestAmountPresent,
  penaltyAmountPresent,
}: {
  interestAmountPresent: boolean
  penaltyAmountPresent: boolean
}) => {
  if (!interestAmountPresent && !penaltyAmountPresent) {
    return <></>
  }

  if (interestAmountPresent && penaltyAmountPresent) {
    return (
      <>
        <div>{NON_BREAKING_SPACES}</div>
        <div className="fine-added">+{'\u00A0'}</div>
        <div>{NON_BREAKING_SPACES}</div>
      </>
    )
  }

  return (
    <>
      <div className="fine-added">+{'\u00A0'}</div>
      <div>{NON_BREAKING_SPACES}</div>
    </>
  )
}

const SingleViolationFinesSubtractionAmounts = ({
  paymentAmount,
  reductionAmount,
}: {
  paymentAmount: number | undefined
  reductionAmount: number | undefined
}) => {
  const paymentAmountString = (paymentAmount ?? 0).toLocaleString(
    'en-US',
    L10N.sitewide.currency,
  )

  const reductionAmountString = reductionAmount
    ? reductionAmount.toLocaleString('en-US', L10N.sitewide.currency)
    : ''

  if (paymentAmount && reductionAmount) {
    return (
      <>
        <div>${reductionAmountString}</div>
        <div className="fine-subtracted">${paymentAmountString}</div>
      </>
    )
  }

  if (reductionAmount) {
    return <div className="fine-subtracted">${reductionAmountString}</div>
  }

  return <div className="fine-subtracted">${paymentAmountString}</div>
}

const SingleViolationFinesSubtractionLabels = ({
  paymentAmountPresent,
  reductionAmountPresent,
}: {
  paymentAmountPresent: boolean
  reductionAmountPresent: boolean
}) => {
  if (paymentAmountPresent && reductionAmountPresent) {
    return (
      <>
        <div>Reductions:</div>
        <div className="fine-subtracted">Paid:</div>
      </>
    )
  }

  if (reductionAmountPresent) {
    return <div className="fine-subtracted">Reductions:</div>
  }

  return <div className="fine-subtracted">Paid:</div>
}

const SingleViolationFinesSubtractionSymbols = ({
  paymentAmountPresent,
  reductionAmountPresent,
}: {
  paymentAmountPresent: boolean
  reductionAmountPresent: boolean
}) => {
  if (paymentAmountPresent && reductionAmountPresent) {
    return (
      <>
        <div>{NON_BREAKING_SPACES}</div>
        <div className="fine-subtracted">–{'\u00A0'}</div>
      </>
    )
  }

  return <div className="fine-subtracted">–{'\u00A0'}</div>
}

const SingleViolationFinesBreakdown = (props: SingleViolationFinesProps) => {
  const {
    dueAmount,
    fineAmount,
    interestAmount,
    isViolationInJudgment,
    paymentAmount,
    penaltyAmount,
    reductionAmount,
    showFullFineData,
  } = props

  if (!fineAmount) {
    return <>N/A</>
  }

  if (!showFullFineData) {
    const netFined =
      fineAmount +
      (interestAmount ?? 0) +
      (penaltyAmount ?? 0) -
      (reductionAmount ?? 0)
    const netFinedString = netFined.toLocaleString(
      'en-US',
      L10N.sitewide.currency,
    )

    if (netFinedString === '-0.00') {
      // Due to error with floating-point numbers,
      // we might end up with infinitesimal small numbers
      // that round to negative or positive zero. When
      // negative, we need to explicitly return positive.
      return <>$0.00</>
    }

    return <>${netFinedString}</>
  }

  const showViolationInJudgment =
    isViolationInJudgment && dueAmount && dueAmount > 0

  const remainingFinesLabel = showViolationInJudgment
    ? 'In judgment'
    : 'Outstanding'

  const fineAmountString = fineAmount.toLocaleString(
    'en-US',
    L10N.sitewide.currency,
  )

  const interestAmountString =
    interestAmount !== undefined
      ? `+ $${interestAmount.toLocaleString('en-US', L10N.sitewide.currency)} in interest`
      : ''
  const penaltyAmountString =
    penaltyAmount !== undefined
      ? `+ $${penaltyAmount.toLocaleString('en-US', L10N.sitewide.currency)} in penalties`
      : ''
  const reductionAmountString =
    reductionAmount !== undefined
      ? `- $${reductionAmount.toLocaleString('en-US', L10N.sitewide.currency)} reduced`
      : ''
  const paymentAmountString =
    paymentAmount !== undefined
      ? `- $${paymentAmount.toLocaleString('en-US', L10N.sitewide.currency)} paid`
      : ''

  const dueAmountFormatted =
    dueAmount !== undefined
      ? dueAmount.toLocaleString('en-US', L10N.sitewide.currency)
      : '0.00'
  const dueAmountString =
    dueAmount !== undefined
      ? `= $${dueAmountFormatted} ${showViolationInJudgment ? 'in judgment' : 'oustanding'}`
      : ''

  const finesAriaLabel = `$${fineAmountString} fined ${interestAmountString} ${penaltyAmountString} ${reductionAmountString} ${paymentAmountString} ${dueAmountString}`

  return (
    <div className="fines-breakdown">
      <div className="summary-box keys">
        <div>Initial:</div>
        <SingleViolationFinesAdditionLabels
          interestAmountPresent={!!interestAmount}
          penaltyAmountPresent={!!penaltyAmount}
        />
        <SingleViolationFinesSubtractionLabels
          paymentAmountPresent={!!paymentAmount}
          reductionAmountPresent={!!reductionAmount}
        />
        <div className={showViolationInJudgment ? 'in-judgment' : ''}>
          {remainingFinesLabel}:
        </div>
      </div>
      <div
        className="summary-box values fines"
        role="math"
        aria-label={finesAriaLabel}
      >
        <div className="math-symbols">
          <div>{NON_BREAKING_SPACES}</div>
          <SingleViolationFinesAdditionSymbols
            interestAmountPresent={!!interestAmount}
            penaltyAmountPresent={!!penaltyAmount}
          />
          <SingleViolationFinesSubtractionSymbols
            paymentAmountPresent={!!paymentAmount}
            reductionAmountPresent={!!reductionAmount}
          />
          <div>{NON_BREAKING_SPACES}</div>
        </div>
        <div className="amounts">
          <div>${fineAmountString}</div>
          <SingleViolationFinesAdditionAmounts
            fineAmount={fineAmount}
            interestAmount={interestAmount}
            penaltyAmount={penaltyAmount}
          />
          <SingleViolationFinesSubtractionAmounts
            paymentAmount={paymentAmount}
            reductionAmount={reductionAmount}
          />
          <div className={showViolationInJudgment ? 'in-judgment' : ''}>
            ${dueAmountFormatted}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleViolationFinesBreakdown
