import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Violation from 'models/Violation/Violation'

import FinesBreakdown from 'view/VehicleResults/FinesBreakdown/FinesBreakdown'

import {
  BUS_LANE_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION,
  BUS_LANE_CAMERA_VIOLATION_CODE,
  MOBILE_BUS_LANE_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION,
  MOBILE_BUS_LANE_CAMERA_VIOLATION_CODE,
  RED_LIGHT_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION,
  RED_LIGHT_CAMERA_VIOLATION_CODE,
  SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION,
  SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_CODE,
} from 'constants/violations'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBus,
  faParking,
  faTachometerAlt,
  faTrafficLight,
} from '@fortawesome/free-solid-svg-icons'

// Add Font Awesome icons
library.add(faBus, faParking, faTachometerAlt, faTrafficLight)

type Props = {
  showFullFineData: boolean
  showFullText: boolean
  violation: Violation
}

type NonParkingViolationCode =
  | typeof BUS_LANE_CAMERA_VIOLATION_CODE
  | typeof MOBILE_BUS_LANE_CAMERA_VIOLATION_CODE
  | typeof RED_LIGHT_CAMERA_VIOLATION_CODE
  | typeof SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_CODE

type ViolationIcon = 'bus' | 'parking' | 'tachometer-alt' | 'traffic-light'

type NonParkingViolationDescription =
  | typeof BUS_LANE_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION
  | typeof MOBILE_BUS_LANE_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION
  | typeof RED_LIGHT_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION
  | typeof SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION

type RowClassName = 'table-danger' | 'table-primary' | 'table-warning' | ''

const VIOLATION_CODE_TO_ICON: Record<NonParkingViolationCode, ViolationIcon> = {
  [BUS_LANE_CAMERA_VIOLATION_CODE]: 'bus',
  [MOBILE_BUS_LANE_CAMERA_VIOLATION_CODE]: 'bus',
  [RED_LIGHT_CAMERA_VIOLATION_CODE]: 'traffic-light',
  [SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_CODE]: 'tachometer-alt',
}

const VIOLATION_DESCRIPTION_TO_ROW_CLASSNAME: Record<
  NonParkingViolationDescription,
  RowClassName
> = {
  [BUS_LANE_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION]: 'table-primary',
  [MOBILE_BUS_LANE_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION]: 'table-primary',
  [RED_LIGHT_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION]: 'table-danger',
  [SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION]: 'table-warning',
}

const TableRow = (props: Props): JSX.Element => {
  const { showFullFineData, showFullText, violation } = props

  const getViolationIcon = (violationCode: string): ViolationIcon => {
    // Convert code from string to int and back to string
    // to deal with leading zeros.
    const violationCodeWithLeadingZeroesRemoved =
      parseInt(violationCode).toString()

    if (violationCodeWithLeadingZeroesRemoved in VIOLATION_CODE_TO_ICON) {
      return VIOLATION_CODE_TO_ICON[
        violationCodeWithLeadingZeroesRemoved as NonParkingViolationCode
      ]
    }
    return 'parking'
  }

  const getViolationRowClassName = (
    humanizedDescription: string,
  ): RowClassName => {
    if (humanizedDescription in VIOLATION_DESCRIPTION_TO_ROW_CLASSNAME) {
      return VIOLATION_DESCRIPTION_TO_ROW_CLASSNAME[
        humanizedDescription as NonParkingViolationDescription
      ]
    }
    return ''
  }

  const violationIcon = getViolationIcon(violation.violationCode)
  const tableRowClass = getViolationRowClassName(violation.humanizedDescription)

  const padTableRow = !showFullFineData || violation.fineAmount == null

  const getViolationDescripton = () => {
    if (showFullText) {
      return (
        <div className="humanized-description">
          {violation.humanizedDescription}
        </div>
      )
    }

    return (
      <div className="icons">
        <FontAwesomeIcon
          icon={violationIcon}
          title={`${violationIcon.toString()} icon`}
          titleId={violationIcon.toString()}
        />
      </div>
    )
  }

  const getViolationLocationDescription = () => {
    const violationBorough = violation.getBorough()

    return (
      <>
        {violationBorough && (
          <span className="borough">{violation.getBorough()}</span>
        )}
        {showFullText && (
          <span className="location-description">
            {violation.getLocationDescription()}
          </span>
        )}
      </>
    )
  }

  return (
    <tr
      className={`violation-row ${tableRowClass} ${padTableRow ? 'no-fines-breakdown' : ''}`}
      key={violation.summonsNumber}
      data-testid={`summons ${violation.summonsNumber}`}
    >
      <td>{violation.getViolationTime()}</td>
      <td className="violation-description">{getViolationDescripton()}</td>
      <td className="location">{getViolationLocationDescription()}</td>

      <td className="fines">
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
      </td>
    </tr>
  )
}

export default TableRow
