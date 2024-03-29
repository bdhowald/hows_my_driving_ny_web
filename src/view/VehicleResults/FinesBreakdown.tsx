import * as React from 'react'

const DOLLAR_LOCALE_SETTINGS = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}

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

type CombinedViolationsFinesProps = {
  totalFined: number
  totalInJudgment: number
  totalOutstanding: number
  totalPaid: number
  totalReduced: number
}

const CombinedViolationsFinesSubtractionAmounts = (
  { totalPaid, totalReduced }: { totalPaid: number | undefined, totalReduced: number | undefined }
) => {
  const totalPaidString = (totalPaid ?? 0).toLocaleString(
    'en-US', DOLLAR_LOCALE_SETTINGS
  )

  const totalReducedString = (totalReduced ?? 0).toLocaleString(
    'en-US', DOLLAR_LOCALE_SETTINGS
  )

  if (totalPaid && totalReduced) {
    return (
      <>
        <div>${totalReducedString}</div>
        <div className='fines-reduced'>${totalPaidString}</div>
      </>
    )
  }

  if (totalPaid) {
    return (
      <div className='fines-reduced'>${totalPaidString}</div>
    )
  }

  return (
    <div className='fines-reduced'>${totalReducedString}</div>
  )
}

const CombinedViolationsFinesSubtractionLabels = (
  { totalPaidPresent, totalReducedPresent }: { totalPaidPresent: boolean, totalReducedPresent: boolean }
) => {
  if (totalPaidPresent && totalReducedPresent) {
    return (
      <>
        <div>Reduced:</div>
        <div className='fines-reduced'>Paid:</div>
      </>
    )
  }

  if (totalReducedPresent) {
    return (
      <div className='fines-reduced'>Reduced:</div>
    )
  }

  return (
    <div className='fines-reduced'>Paid:</div>
  )
}

const CombinedViolationsFinesSubtractionSymbols = (
  { totalPaidPresent, totalReducedPresent }: { totalPaidPresent: boolean, totalReducedPresent: boolean }
) => {
  if (totalPaidPresent && totalReducedPresent) {
    return (
      <>
        <div>{'\u00A0\u00A0\u00A0'}</div>
        <div className='fines-reduced'>–{'\u00A0'}</div>
      </>
    )
  }

  return (
    <div className='fines-reduced'>–{'\u00A0'}</div>
  )
}

const CombinedViolationsFinesBreakdown = (props: CombinedViolationsFinesProps) => {
  const {
    totalFined,
    totalInJudgment,
    totalOutstanding,
    totalPaid,
    totalReduced,
  } = props

  const totalFinedString = totalFined.toLocaleString(
    'en-US', DOLLAR_LOCALE_SETTINGS
  )
  const totalPaidString = totalPaid.toLocaleString(
    'en-US', DOLLAR_LOCALE_SETTINGS
  )
  const totalReducedString = totalReduced.toLocaleString(
    'en-US', DOLLAR_LOCALE_SETTINGS
  )
  const totalOutstandingString = totalOutstanding.toLocaleString(
    'en-US', DOLLAR_LOCALE_SETTINGS
  )
  const totalinJudgmentString = totalInJudgment.toLocaleString(
    'en-US', DOLLAR_LOCALE_SETTINGS
  )

  const finesAriaLabel = `$${totalFinedString} fined - $${totalPaidString} paid - $${totalReducedString} reduced = $${totalOutstandingString} outstanding`

  const anyFinesInJudgment = totalInJudgment > 0

  return (
    <div className='summary-section col-xs-12 col-sm-6'>
      <div className='summary-box keys'>
        <div>Fined:</div>
        <CombinedViolationsFinesSubtractionLabels
          totalPaidPresent={!!totalPaid}
          totalReducedPresent={!!totalReduced}
        />
        <div>Owed:</div>
        {anyFinesInJudgment && (
          <div className='in-judgment'>In judgment:</div>
        )}
      </div>
      <div className='summary-box values fines' role="math" aria-label={finesAriaLabel}>
        <div className='math-symbols'>
          <div>{'\u00A0\u00A0\u00A0'}</div>
          <CombinedViolationsFinesSubtractionSymbols
            totalPaidPresent={!!totalPaid}
            totalReducedPresent={!!totalReduced}
          />
          <div>{'\u00A0\u00A0\u00A0'}</div>
          {anyFinesInJudgment && (
            <div>{'\u00A0\u00A0\u00A0'}</div>
          )}
        </div>
        <div className='amounts'>
          <div>${totalFinedString}</div>
          <CombinedViolationsFinesSubtractionAmounts
            totalPaid={totalPaid}
            totalReduced={totalReduced}
          />
          <div>${totalOutstandingString}</div>
          {anyFinesInJudgment && (
            <div className='in-judgment'>${totalinJudgmentString}</div>
          )}
        </div>
      </div>
    </div>
  )
}

CombinedViolationsFinesBreakdown.displayName = 'VehicleResults.CombinedFinesBreakdown'

const SingleViolationFinesAdditionAmounts = (
  { fineAmount, interestAmount, penaltyAmount }: { fineAmount: number, interestAmount: number | undefined, penaltyAmount: number | undefined }
) => {
  if (!interestAmount && !penaltyAmount) {
    return <></>
  }

  const interestAmountString = interestAmount
    ? interestAmount.toLocaleString(
      'en-US', DOLLAR_LOCALE_SETTINGS
    )
    : ''
  const penaltyAmountString = penaltyAmount
    ? penaltyAmount.toLocaleString(
      'en-US', DOLLAR_LOCALE_SETTINGS
    )
    : ''

  const totalFinedString = (fineAmount + (interestAmount ?? 0) + (penaltyAmount ?? 0)).toLocaleString(
    'en-US', DOLLAR_LOCALE_SETTINGS
  )

  if (interestAmount && penaltyAmount) {
    return (
      <>
        <div>${interestAmountString}</div>
        <div className='fine-added'>${penaltyAmountString}</div>
        <div>${totalFinedString}</div>
      </>
    )
  }

  if (interestAmount) {
    return (
      <>
        <div className='fine-added'>${interestAmountString}</div>
        <div>${totalFinedString}</div>
      </>
    )
  }

  return (
    <>
      <div className='fine-added'>${penaltyAmountString}</div>
      <div>${totalFinedString}</div>
    </>
  )
}

const SingleViolationFinesAdditionLabels = (
  { interestAmountPresent, penaltyAmountPresent }: { interestAmountPresent: boolean, penaltyAmountPresent: boolean }
) => {
  if (!interestAmountPresent && !penaltyAmountPresent) {
    return <></>
  }

  if (interestAmountPresent && penaltyAmountPresent) {
    return (
      <>
        <div>Interest:</div>
        <div className='fine-added'>Penalties:</div>
        <div>Total:</div>
      </>
    )
  }

  if (interestAmountPresent) {
    return (
      <>
        <div className='fine-added'>Interest:</div>
        <div>Total:</div>
      </>
    )
  }

  return (
    <>
      <div className='fine-added'>Penalties:</div>
      <div>Total:</div>
    </>
  )
}

const SingleViolationFinesAdditionSymbols = (
  { interestAmountPresent, penaltyAmountPresent }: { interestAmountPresent: boolean, penaltyAmountPresent: boolean }
) => {
  if (!interestAmountPresent && !penaltyAmountPresent) {
    return <></>
  }

  if (interestAmountPresent && penaltyAmountPresent) {
    return (
      <>
        <div>{'\u00A0\u00A0\u00A0'}</div>
        <div className='fine-added'>+{'\u00A0'}</div>
        <div>{'\u00A0\u00A0\u00A0'}</div>
      </>
    )
  }

  return (
    <>
      <div className='fine-added'>+{'\u00A0'}</div>
      <div>{'\u00A0\u00A0\u00A0'}</div>
    </>
  )
}

const SingleViolationFinesSubtractionAmounts = (
  { paymentAmount, reductionAmount }: { paymentAmount: number | undefined, reductionAmount: number | undefined }
) => {
  const paymentAmountString = (paymentAmount ?? 0).toLocaleString(
    'en-US', DOLLAR_LOCALE_SETTINGS
  )

  const reductionAmountString = reductionAmount
    ? reductionAmount.toLocaleString(
      'en-US', DOLLAR_LOCALE_SETTINGS
    )
    : ''

  if (paymentAmount && reductionAmount) {
    return (
      <>
        <div>${reductionAmountString}</div>
        <div className='fine-subtracted'>${paymentAmountString}</div>
      </>
    )
  }

  if (reductionAmount) {
    return (
      <div className='fine-subtracted'>${reductionAmountString}</div>
    )
  }

  return (
    <div className='fine-subtracted'>${paymentAmountString}</div>
  )
}

const SingleViolationFinesSubtractionLabels = (
  { paymentAmountPresent, reductionAmountPresent }: { paymentAmountPresent: boolean, reductionAmountPresent: boolean }
) => {
  if (paymentAmountPresent && reductionAmountPresent) {
    return (
      <>
        <div>Reduction:</div>
        <div className='fine-subtracted'>Paid:</div>
      </>
    )
  }

  if (reductionAmountPresent) {
    return (
      <div className='fine-subtracted'>Reduction:</div>
    )
  }

  return (
    <div className='fine-subtracted'>Paid:</div>
  )
}

const SingleViolationFinesSubtractionSymbols = (
  { paymentAmountPresent, reductionAmountPresent }: { paymentAmountPresent: boolean, reductionAmountPresent: boolean }
) => {
  if (paymentAmountPresent && reductionAmountPresent) {
    return (
      <>
        <div>{'\u00A0\u00A0\u00A0'}</div>
        <div className='fine-subtracted'>–{'\u00A0'}</div>
      </>
    )
  }

  return (
    <div className='fine-subtracted'>–{'\u00A0'}</div>
  )
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
    showFullFineData
  } = props

  if (!fineAmount) {
    return (
      <td className='fines'>N/A</td>
    )
  }

  if (!showFullFineData) {
    const netFined = fineAmount + (interestAmount ?? 0) + (penaltyAmount ?? 0) - (reductionAmount ?? 0)
    const netFinedString = netFined.toLocaleString(
      'en-US', DOLLAR_LOCALE_SETTINGS
    )
    return (
      <td className='fines'>${netFinedString}</td>
    )
  }

  const showViolationInJudgment = isViolationInJudgment && dueAmount && dueAmount > 0

  const remainingFinesLabel = showViolationInJudgment ? 'In judgment' : 'Outstanding'

  const fineAmountString = fineAmount.toLocaleString('en-US', DOLLAR_LOCALE_SETTINGS)

  const interestAmountString = interestAmount !== undefined
    ? `+ $${interestAmount.toLocaleString('en-US', DOLLAR_LOCALE_SETTINGS)} in interest`
    : ''
  const penaltyAmountString = penaltyAmount !== undefined
    ? `+ $${penaltyAmount.toLocaleString('en-US', DOLLAR_LOCALE_SETTINGS)} in penalties`
    : ''
  const reductionAmountString = reductionAmount !== undefined
    ? `- $${reductionAmount.toLocaleString('en-US', DOLLAR_LOCALE_SETTINGS)} reduced`
    : ''
  const paymentAmountString = paymentAmount !== undefined
    ? `- $${paymentAmount.toLocaleString('en-US', DOLLAR_LOCALE_SETTINGS)} paid`
    : ''

  const dueAmountFormatted = dueAmount !== undefined
    ? dueAmount.toLocaleString('en-US', DOLLAR_LOCALE_SETTINGS)
    : '0.00'
  const dueAmountString = dueAmount !== undefined
    ? `= $${dueAmountFormatted} ${showViolationInJudgment ? 'in judgment' :'oustanding'}`
    : ''

  let finesAriaLabel = `$${fineAmountString} fined ${interestAmountString} ${penaltyAmountString} ${reductionAmountString} ${paymentAmountString} ${dueAmountString}`

  return (
    <td className='fines fines-breakdown'>
      <div className='summary-box keys'>
        <div>Initial:</div>
        <SingleViolationFinesAdditionLabels
          interestAmountPresent={!!interestAmount}
          penaltyAmountPresent={!!penaltyAmount}
        />
        <SingleViolationFinesSubtractionLabels
          paymentAmountPresent={!!paymentAmount}
          reductionAmountPresent={!!reductionAmount}
        />
        <div className={showViolationInJudgment ? 'in-judgment' : ''}>{remainingFinesLabel}:</div>
      </div>
      <div className='summary-box values fines' role="math" aria-label={finesAriaLabel}>
        <div className='math-symbols'>
          <div>{'\u00A0\u00A0\u00A0'}</div>
          <SingleViolationFinesAdditionSymbols
            interestAmountPresent={!!interestAmount}
            penaltyAmountPresent={!!penaltyAmount}
          />
          <SingleViolationFinesSubtractionSymbols
            paymentAmountPresent={!!paymentAmount}
            reductionAmountPresent={!!reductionAmount}
          />
          <div>{'\u00A0\u00A0\u00A0'}</div>
        </div>
        <div className='amounts'>
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
          <div className={showViolationInJudgment ? 'in-judgment' : ''}>${dueAmountFormatted}</div>
        </div>
      </div>
    </td>
  )
}

export default { CombinedViolationsFinesBreakdown, SingleViolationFinesBreakdown }