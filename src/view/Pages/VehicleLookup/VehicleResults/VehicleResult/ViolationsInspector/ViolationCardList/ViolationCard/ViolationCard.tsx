import React, { useContext } from 'react'
import { useCookies } from 'react-cookie'

import { USE_SEARCH_FILTERS_STORAGE_KEY } from 'constants/storage'
import { USER_SETTINGS_STORAGE_KEYS } from 'constants/userSettings'
import {
  BUS_LANE_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION,
  MOBILE_BUS_LANE_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION,
  RED_LIGHT_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION,
  SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION,
} from 'constants/violations'
import { ApplicationContext } from 'context/ApplicationContext/ApplicationContext'
import useSettings from 'hooks/useSettings/useSettings'
import Violation from 'models/Violation/Violation'
import FinesBreakdown from 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/FinesBreakdown/FinesBreakdown'

import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationCardList/ViolationCard/ViolationCard.css'

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
  const { getSetting } = useSettings()

  const [cookies, _] = useCookies([USE_SEARCH_FILTERS_STORAGE_KEY])

  const applicationContext = useContext(ApplicationContext)
  const { tracker } = applicationContext

  const trackShowViolationDetails = () => {
    tracker?.trackEvent('show_violation_details', {
      location: 'ViolationCard',
      useNewStyleDisplay:
        getSetting(USER_SETTINGS_STORAGE_KEYS.useNewStyleDisplay) === true,
      useSearchFilters: cookies[USE_SEARCH_FILTERS_STORAGE_KEY] === true,
    })
  }

  const potentialDateTime = violation.getViolationDateTime()

  if (potentialDateTime !== 'N/A') {
    return (
      <div>
        <a
          data-bs-toggle="offcanvas"
          href="#showViolationDetails"
          onClick={(e) => {
            e.preventDefault()
            trackShowViolationDetails()
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
  showFullFineData,
  showFullLocationData,
  violation,
}: {
  index: number
  inspectViolationFunction: (violation: Violation) => void
  showFullFineData: boolean
  showFullLocationData: boolean
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

  const violationLocation = violation.location ?? 'No Location Available'

  const violationDescription =
    violation.humanizedDescription ?? 'No Description Available'

  if (showFullFineData || showFullLocationData) {
    return (
      <div className={`violation-card expanded-details ${tableRowClass}`}>
        <div className="violation-card-row">
          <ViolationDateTimeAspect
            violation={violation}
            inspectViolationFunction={inspectViolationFunction}
          />
          {showFullLocationData ? (
            <div className="expanded-location">
              <div className="violation-location">
                <span>{violationLocation}</span>
              </div>
              <div className="violation-borough-abbreviation">
                <span>{violation.getBorough()}</span>
              </div>
            </div>
          ) : (
            <div>{violation.getBorough()}</div>
          )}
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
              showFullFineData={showFullFineData}
            />
          </div>
        </div>
      </div>
    )
  }

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
