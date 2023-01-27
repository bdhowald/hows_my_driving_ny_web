import * as React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Violation } from 'models/Violation'

import {
  BUS_LANE_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION,
  BUS_LANE_CAMERA_VIOLATION_CODE,
  MOBILE_BUS_LANE_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION,
  MOBILE_BUS_LANE_CAMERA_VIOLATION_CODE,
  RED_LIGHT_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION,
  RED_LIGHT_CAMERA_VIOLATION_CODE,
  SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION,
  SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_CODE
} from 'constants/violations'

const TableRow = (props: {showFullText: boolean, violation: Violation}): JSX.Element => {
  const { showFullText, violation } = props
  const totalFined: Number | null = violation.getTotalFined()

  let violationIcon: 'bus' | 'parking' | 'tachometer-alt' | 'traffic-light'

  // Convert code from string to int and back to string
  // to deal with leading zeros.
  const violationCodeAsInt = parseInt(violation.violationCode)

  switch(violationCodeAsInt.toString()) {
    case BUS_LANE_CAMERA_VIOLATION_CODE:
      violationIcon = 'bus'
      break
    case MOBILE_BUS_LANE_CAMERA_VIOLATION_CODE:
      violationIcon = 'bus'
      break
    case RED_LIGHT_CAMERA_VIOLATION_CODE:
      violationIcon = 'traffic-light'
      break
    case SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_CODE:
      violationIcon = 'tachometer-alt'
      break
    default:
      violationIcon = 'parking'
      break
  }

  let tableRowClass: 'table-danger' | 'table-primary' | 'table-warning' | ''

  switch(violation.humanizedDescription) {
    case BUS_LANE_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION:
    case MOBILE_BUS_LANE_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION:
      tableRowClass = 'table-primary'
      break
    case RED_LIGHT_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION:
      tableRowClass = 'table-warning'
      break
    case SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION:
      tableRowClass = 'table-danger'
      break
    default:
      tableRowClass = ''
      break
  }

  return (
    <tr
      className={`violation-row ${tableRowClass}`}
      key={violation.summonsNumber}
    >
      <td>
        {violation.getViolationTime()}
      </td>
      <td className='violation-description'>
        {showFullText ? (
          <div className='humanized-description'>
            {violation.humanizedDescription}
          </div>
        ) : (
          <div className='icons'>
            <FontAwesomeIcon icon={violationIcon}/>
          </div>
        )}
      </td>
      <td className='location'>
        {violation.getBorough() && (
          <span className='borough'>
            {violation.getBorough()}
          </span>
        )}
        {showFullText && (
          <span className='location-description'>
            {violation.getLocationDescription()}
          </span>
        )}
      </td>
      <td>
        {totalFined ? ('$' + totalFined.toFixed(2)) : 'N/A'}
      </td>
    </tr>
  )
}

export default TableRow