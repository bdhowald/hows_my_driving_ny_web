import { Violation } from 'utils/types/responses'

export default (violation: Violation): Number | null => {
  if (!violation.fineAmount) {
    return null
  }

  const fineAmount = violation.fineAmount
  const interestAmount = violation.interestAmount ?? 0
  const penaltyAmount = violation.penaltyAmount ?? 0
  const reductionAmount = violation.reductionAmount ?? 0

  return (fineAmount + interestAmount + penaltyAmount - reductionAmount)
}