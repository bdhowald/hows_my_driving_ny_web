import React from 'react'

import {
  BUS_LANE_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION,
  MOBILE_BUS_LANE_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION,
  RED_LIGHT_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION,
  SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION,
} from 'constants/violations'

import Violation from 'models/Violation/Violation'
import FinesBreakdown from 'view/VehicleResults/FinesBreakdown/FinesBreakdown'

type NonParkingViolationDescription =
  | typeof BUS_LANE_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION
  | typeof MOBILE_BUS_LANE_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION
  | typeof RED_LIGHT_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION
  | typeof SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION

type RowClassName =
  | 'bg-danger-subtle'
  | 'bg-body-secondary'
  | 'bg-primary-subtle'
  | 'bg-warning-subtle'
  | 'bg-body-tertiary'

const VIOLATION_DESCRIPTION_TO_ROW_CLASSNAME: Record<
  NonParkingViolationDescription,
  RowClassName
> = {
  [BUS_LANE_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION]: 'bg-primary-subtle',
  [MOBILE_BUS_LANE_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION]: 'bg-primary-subtle',
  [RED_LIGHT_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION]: 'bg-danger-subtle',
  [SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION]:
    'bg-warning-subtle',
}

const ViolationDateTimeAspect = ({
  violation,
  inspectViolationFunction,
}: {
  violation: Violation
  inspectViolationFunction: (violation: Violation) => void
}) => {
  const potentialDateTime = violation.getViolationDateTime()

  if (potentialDateTime !== 'N/A') {
    return (
      <div>
        <a
          data-bs-toggle="offcanvas"
          href="#showViolationDetails"
          onClick={(e) => {
            e.preventDefault()
            inspectViolationFunction(violation)
          }}
          role="button"
          aria-controls="showViolationDetails"
        >
          {violation.getViolationDateTime()}
        </a>
      </div>
    )
  }

  return (
    <div>
      <>{potentialDateTime}</>
    </div>
  )
}

const ViolationCard = ({
  index,
  inspectViolationFunction,
  violation,
}: {
  index: number
  inspectViolationFunction: (violation: Violation) => void
  violation: Violation
}) => {
  const getViolationRowClassName = (
    humanizedDescription: string,
  ): RowClassName => {
    if (humanizedDescription in VIOLATION_DESCRIPTION_TO_ROW_CLASSNAME) {
      return VIOLATION_DESCRIPTION_TO_ROW_CLASSNAME[
        humanizedDescription as NonParkingViolationDescription
      ]
    }
    // Alternate white/light gray background
    if (index % 2 == 1) {
      return 'bg-body-secondary'
    }
    return 'bg-body-tertiary'
  }

  const tableRowClass = getViolationRowClassName(violation.humanizedDescription)

  const violationDescription =
    violation.humanizedDescription ?? 'No Description Available'

  return (
    <div className={`violation-card ${tableRowClass}`}>
      <div className="violation-card-row">
        <ViolationDateTimeAspect
          violation={violation}
          inspectViolationFunction={inspectViolationFunction}
        />
        <div>{violation.getBorough()}</div>
      </div>
      <div className="violation-card-row">
        <div>{violationDescription}</div>
        <div>
          <FinesBreakdown.SingleViolationFinesBreakdown
            dueAmount={violation.amountDue}
            fineAmount={violation.fineAmount}
            interestAmount={violation.interestAmount}
            isViolationInJudgment={!!violation.judgmentEntryDate}
            paymentAmount={violation.paymentAmount}
            penaltyAmount={violation.penaltyAmount}
            reductionAmount={violation.reductionAmount}
            showFullFineData={false}
          />
        </div>
      </div>
    </div>
  )
}

ViolationCard.displayName = 'ViolationCard'

export default ViolationCard
