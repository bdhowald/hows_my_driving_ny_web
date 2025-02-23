import * as React from 'react'

import L10N from 'constants/display'
import { Region } from 'constants/regions'
import {
  BUS_LANE_CAMERA_VIOLATION_CODE,
  MOBILE_BUS_LANE_CAMERA_VIOLATION_CODE,
  RED_LIGHT_CAMERA_VIOLATION_CODE,
  SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_CODE,
} from 'constants/violations'
import Vehicle from 'models/Vehicle/Vehicle'
import Violation from 'models/Violation/Violation'
import getPlateTypesString from 'utils/search/getPlateType/getPlateTypeDisplayString/getPlateTypeDisplayString'
import getRegionFromAbbreviation from 'utils/displayResults/getRegionFromAbbreviation/getRegionFromAbbreviation'
import { NonParkingViolationCode } from 'utils/types/violationCodes'
import FinesBreakdown from 'view/VehicleResults/FinesBreakdown/FinesBreakdown'

type ViolationTypeCounts = {
  busLane: number
  parking: number
  redLight: number
  speeding: number
}

type ViolationType = keyof ViolationTypeCounts

const VIOLATION_TYPES = [
  'speeding',
  'redLight',
  'busLane',
  'parking',
] as ViolationType[]

const VIOLATION_CODE_TO_VIOLATION_TYPE: Record<
  NonParkingViolationCode,
  ViolationType
> = {
  [BUS_LANE_CAMERA_VIOLATION_CODE]: 'busLane',
  [MOBILE_BUS_LANE_CAMERA_VIOLATION_CODE]: 'busLane',
  [RED_LIGHT_CAMERA_VIOLATION_CODE]: 'redLight',
  [SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_CODE]: 'speeding',
}

const convertCamelCaseToTitleCase = (original: string) => {
  const converted = original.replace(/([A-Z])/g, ' $1')
  return converted.charAt(0).toUpperCase() + converted.slice(1)
}

const getLastQueriedDateString = (
  vehiclePreviousLookupDate: string | undefined,
) =>
  vehiclePreviousLookupDate
    ? new Date(vehiclePreviousLookupDate).toLocaleDateString(
        'en-US',
        L10N.sitewide.dateFormat,
      )
    : undefined

const getViolationTypeCounts = (
  violations: Violation[],
): ViolationTypeCounts => {
  const violationTypeCounts: ViolationTypeCounts = {
    busLane: 0,
    parking: 0,
    redLight: 0,
    speeding: 0,
  }

  violations.forEach((violation: Violation) => {
    // Convert code from string to int and back to string
    // to deal with leading zeros.
    const violationCodeWithLeadingZeroesRemoved = parseInt(
      violation.violationCode,
    ).toString()

    if (
      violationCodeWithLeadingZeroesRemoved in VIOLATION_CODE_TO_VIOLATION_TYPE
    ) {
      const violationType =
        VIOLATION_CODE_TO_VIOLATION_TYPE[
          violationCodeWithLeadingZeroesRemoved as NonParkingViolationCode
        ]
      violationTypeCounts[violationType] += 1
    } else {
      violationTypeCounts['parking'] += 1
    }
  })

  return violationTypeCounts
}

const LookupSummaryKeyFields = ({ vehicle }: { vehicle: Vehicle }) => {
  const getRegionKeyName = (regionObject: Region | undefined) => {
    if (!regionObject) {
      return 'Region'
    }
    if (regionObject.type === 'province') {
      return 'Province'
    }
    if (regionObject.type === 'state') {
      return 'State'
    }
    if (regionObject.type === 'territory') {
      return 'Territory'
    }
    return 'Region'
  }

  const getViolationTypeKeys = (violationTypeCounts: ViolationTypeCounts) => {
    const violationTypesList: JSX.Element[] = []

    VIOLATION_TYPES.forEach((violationType: ViolationType) => {
      if (violationTypeCounts[violationType] > 0) {
        violationTypesList.push(
          React.createElement(
            'div',
            { className: 'violation-count-type' },
            `${convertCamelCaseToTitleCase(violationType)}:`,
          ),
        )
      }
    })

    return (
      <div className="violation-count-types">
        <div>Violations:</div>
        {violationTypesList}
      </div>
    )
  }

  const lastQueriedDateString = getLastQueriedDateString(
    vehicle.previousLookupDate,
  )
  const region = getRegionFromAbbreviation(vehicle.state)

  const violationTypeCounts = getViolationTypeCounts(vehicle.violations)
  const violationTypesList = getViolationTypeKeys(violationTypeCounts)

  return (
    <div className="summary-box keys lookup-info">
      <div className="vehicle-info-group vehicle-identity">
        <div>Plate:</div>
        <div>{getRegionKeyName(region)}:</div>
        <div>Plate type:</div>
      </div>
      <div className="vehicle-info-group vehicle-violations">
        {violationTypesList}
      </div>
      <div className="vehicle-info-group vehicle-lookups">
        <div>Lookups:</div>
        {!!lastQueriedDateString && <div>Previous:</div>}
      </div>
    </div>
  )
}

const LookupSummaryValueFields = ({ vehicle }: { vehicle: Vehicle }) => {
  const getViolationTypeValues = (
    vehiclePreviousLookupDate: string | undefined,
    vehiclePreviousViolationCount: number | undefined,
    vehicleViolationsCount: number,
    violationTypeCounts: ViolationTypeCounts,
  ) => {
    if (vehicleViolationsCount === 0) {
      return [
        <div className="summary-value" key="0">
          0
        </div>,
      ]
    }

    const newViolationsSinceLastLookup =
      vehicleViolationsCount - (vehiclePreviousViolationCount ?? 0)

    const violationsString =
      vehiclePreviousLookupDate && newViolationsSinceLastLookup > 0
        ? `(${newViolationsSinceLastLookup} new) ${vehicleViolationsCount}`
        : `${vehicleViolationsCount}`

    const violationTypeCountsList: JSX.Element[] = []

    VIOLATION_TYPES.forEach((violationType: ViolationType) => {
      if (violationTypeCounts[violationType] > 0) {
        violationTypeCountsList.push(
          React.createElement(
            'div',
            { className: 'violation-count' },
            violationTypeCounts[violationType],
          ),
        )
      }
    })

    return (
      <div className="violation-counts">
        <div className="violation-total">{violationsString}</div>
        {violationTypeCountsList}
      </div>
    )
  }

  const lastQueriedDateString = getLastQueriedDateString(
    vehicle.previousLookupDate,
  )
  const region = getRegionFromAbbreviation(vehicle.state)

  const violationTypeCounts = getViolationTypeCounts(vehicle.violations)

  return (
    <div className="summary-box values lookup-info">
      <div className="vehicle-info-group vehicle-identity">
        <div>{vehicle.plate}</div>
        <div className="region">
          <div className="region-abbreviation">{region?.code ?? 'N/A'}</div>
          <div className="region-full-name">{region?.name || 'N/A'}</div>
        </div>
        <div>{getPlateTypesString(vehicle.plateTypes)}</div>
      </div>
      <div className="vehicle-info-group vehicle-violations">
        {getViolationTypeValues(
          vehicle.previousLookupDate,
          vehicle.previousViolationCount,
          vehicle.violationsCount,
          violationTypeCounts,
        )}
      </div>
      <div className="vehicle-info-group vehicle-lookups">
        <div>{vehicle.timesQueried}</div>
        {lastQueriedDateString && <div>{lastQueriedDateString}</div>}
      </div>
    </div>
  )
}

const LookupInfo = ({ vehicle }: { vehicle: Vehicle }) => {
  const showFines = !!vehicle.violationsCount

  return (
    <li className="list-group-item no-padding">
      <div className="row">
        <div className="summary-section col-xs-12 col-sm-6">
          <LookupSummaryKeyFields vehicle={vehicle} />
          <LookupSummaryValueFields vehicle={vehicle} />
        </div>
        {showFines && (
          <FinesBreakdown.CombinedViolationsFinesBreakdown
            totalFined={vehicle.fines.totalFined}
            totalInJudgment={vehicle.fines.totalInJudgment}
            totalOutstanding={vehicle.fines.totalOutstanding}
            totalPaid={vehicle.fines.totalPaid}
            totalReduced={vehicle.fines.totalReduced}
          />
        )}
      </div>
    </li>
  )
}

LookupInfo.displayName = 'VehicleResults.LookupInfo'

export default LookupInfo
