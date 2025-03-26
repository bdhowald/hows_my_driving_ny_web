import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

import Borough from 'constants/boroughs'
import { USE_NEW_STYLE_DISPLAY_COOKIE } from 'constants/cookies'
import {
  BUS_LANE_CAMERA_VIOLATION_CODE,
  MOBILE_BUS_LANE_CAMERA_VIOLATION_CODE,
  RED_LIGHT_CAMERA_VIOLATION_CODE,
  SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_CODE,
} from 'constants/violations'
import Vehicle from 'models/Vehicle/Vehicle'
import Violation from 'models/Violation/Violation'
import convertCamelCaseToTitleCase from 'utils/displayResults/convertCamelCaseToTitleCase/convertCamelCaseToTitleCase'
import { NonParkingViolationCode } from 'utils/types/violationCodes'

const NO_BOROUGH_AVAILABLE = 'No Borough Available'

const VIOLATION_BOROUGHS = [
  Borough.BRONX,
  Borough.BROOKLYN,
  Borough.MANHATTAN,
  Borough.QUEENS,
  Borough.STATEN_ISLAND,
  NO_BOROUGH_AVAILABLE,
] as ViolationBorough[]

const VIOLATION_CODE_TO_VIOLATION_TYPE: Record<
  NonParkingViolationCode,
  ViolationType
> = {
  [BUS_LANE_CAMERA_VIOLATION_CODE]: 'busLane',
  [MOBILE_BUS_LANE_CAMERA_VIOLATION_CODE]: 'busLane',
  [RED_LIGHT_CAMERA_VIOLATION_CODE]: 'redLight',
  [SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_CODE]: 'speeding',
}

const VIOLATION_TYPES = [
  'busLane',
  'parking',
  'redLight',
  'speeding',
] as ViolationType[]

type ViolationBoroughCounts = {
  [Borough.BRONX]: number
  [Borough.BROOKLYN]: number
  [Borough.MANHATTAN]: number
  [Borough.QUEENS]: number
  [Borough.STATEN_ISLAND]: number
  [NO_BOROUGH_AVAILABLE]: number
}

type ViolationBorough = keyof ViolationBoroughCounts

type ViolationTypeCounts = {
  busLane: number
  parking: number
  redLight: number
  speeding: number
}

type ViolationType = keyof ViolationTypeCounts

const ViolationAspectFields = (props: {
  showComponent: boolean
  children: JSX.Element
}) => {
  if (props.showComponent) {
    return <>{props.children}</>
  }
}

const ViolationSummary = ({ vehicle }: { vehicle: Vehicle }) => {
  const getViolationBoroughCounts = (
    violations: Violation[],
  ): ViolationBoroughCounts => {
    const violationBoroughCounts: ViolationBoroughCounts = {
      [Borough.BRONX]: 0,
      [Borough.BROOKLYN]: 0,
      [Borough.MANHATTAN]: 0,
      [Borough.QUEENS]: 0,
      [Borough.STATEN_ISLAND]: 0,
      [NO_BOROUGH_AVAILABLE]: 0,
    }

    violations.forEach((violation: Violation) => {
      const violationCounty = violation.violationCounty
      if (violationCounty === 'The Bronx') {
        // Temporary fix for discrepancy between Bronx/The Bronx
        violationBoroughCounts['Bronx'] += 1
      } else {
        violationBoroughCounts[violationCounty as ViolationBorough] += 1
      }
    })

    return violationBoroughCounts
  }

  const getViolationBoroughKeys = (
    violationBoroughCounts: ViolationBoroughCounts,
  ) => {
    const violationBoroughList: JSX.Element[] = []

    VIOLATION_BOROUGHS.forEach(
      (violationBorough: ViolationBorough, index: number) => {
        if (violationBoroughCounts[violationBorough] > 0) {
          violationBoroughList.push(
            React.createElement(
              'div',
              { className: 'violation-count-aspect', key: index },
              `${convertCamelCaseToTitleCase(violationBorough)}:`,
            ),
          )
        }
      },
    )

    return (
      <div className="violation-count-aspects">
        <div className="violation-count-aspect-header">Borough:</div>
        {violationBoroughList}
      </div>
    )
  }

  /**
   * Takes in a counts object an an aspects array where the elements
   * of the aspects array are the keys of the counts object and returns
   * divs for each aspect and its corresponding count.
   */
  const getViolationAspectValues = (
    counts: ViolationBoroughCounts | ViolationTypeCounts,
    aspects: ViolationBorough[] | ViolationType[],
  ) => {
    const countsList: JSX.Element[] = [
      <div key="0" className="violation-count">
        &nbsp;
      </div>,
    ]

    aspects.forEach(
      (aspect: ViolationBorough | ViolationType, index: number) => {
        if (isViolationBorough(aspect)) {
          if ((counts as ViolationBoroughCounts)[aspect] > 0) {
            countsList.push(
              React.createElement(
                'div',
                { className: 'violation-count', key: index + 1 },
                (counts as ViolationBoroughCounts)[aspect],
              ),
            )
          }
        } else if (isViolationType(aspect)) {
          if ((counts as ViolationTypeCounts)[aspect] > 0) {
            countsList.push(
              React.createElement(
                'div',
                { className: 'violation-count', key: index + 1 },
                (counts as ViolationTypeCounts)[aspect],
              ),
            )
          }
        } else {
          throw Error('unrecognized violation aspect')
        }
      },
    )

    const classNameString = isViolationBorough(aspects[0])
      ? 'violation-borough-counts'
      : 'violation-type-counts'

    return <div className={classNameString}>{countsList}</div>
  }

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
        violationCodeWithLeadingZeroesRemoved in
        VIOLATION_CODE_TO_VIOLATION_TYPE
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

  const getViolationTypeKeys = (violationTypeCounts: ViolationTypeCounts) => {
    const violationTypesList: JSX.Element[] = []

    VIOLATION_TYPES.forEach((violationType: ViolationType, index: number) => {
      if (violationTypeCounts[violationType] > 0) {
        violationTypesList.push(
          React.createElement(
            'div',
            { className: 'violation-count-aspect', key: index },
            `${convertCamelCaseToTitleCase(violationType)}:`,
          ),
        )
      }
    })

    return (
      <div className="violation-count-aspects">
        <div className="violation-count-aspect-header">Type:</div>
        {violationTypesList}
      </div>
    )
  }

  const isViolationBorough = (x: unknown): x is ViolationBorough => {
    if (typeof x !== 'string') {
      return false
    }
    return (
      Object.values(Borough).includes(x as Borough) ||
      x === NO_BOROUGH_AVAILABLE
    )
  }

  const isViolationType = (x: unknown): x is ViolationType => {
    if (typeof x !== 'string') {
      return false
    }
    return VIOLATION_TYPES.includes(x as ViolationType)
  }

  const [showViolationsBreakdown, setShowViolationsBreakDown] = useState(false)
  const [cookies, _, __] = useCookies([USE_NEW_STYLE_DISPLAY_COOKIE])

  const hasAtLeastOneViolation = vehicle.violationsCount > 0

  const newViolationsSinceLastLookup =
    vehicle.violationsCount - (vehicle.previousViolationCount ?? 0)

  const violationsString =
    vehicle.previousLookupDate && newViolationsSinceLastLookup > 0
      ? `(${newViolationsSinceLastLookup} new) ${vehicle.violationsCount}`
      : `${vehicle.violationsCount}`

  const violationBoroughCounts = getViolationBoroughCounts(vehicle.violations)
  const violationBoroughsList = getViolationBoroughKeys(violationBoroughCounts)

  const violationTypeCounts = getViolationTypeCounts(vehicle.violations)
  const violationTypesList = getViolationTypeKeys(violationTypeCounts)

  const showShowDetailsLink = !showViolationsBreakdown && hasAtLeastOneViolation

  const useNewStyleDisplay = cookies[USE_NEW_STYLE_DISPLAY_COOKIE] === true
  const newStyleDisplayClassName = useNewStyleDisplay ? 'new-style' : ''

  return (
    <div className={`summary-box ${newStyleDisplayClassName}`}>
      <div className="vehicle-info-group vehicle-violations">
        <div className="keys lookup-info">
          <div>Violations:</div>
          <ViolationAspectFields showComponent={showViolationsBreakdown}>
            <>
              {violationTypesList}
              {violationBoroughsList}
            </>
          </ViolationAspectFields>
          {showShowDetailsLink && (
            <div>
              (
              <a
                className="show-violations-aspect-details"
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setShowViolationsBreakDown(true)
                }}
                target="_blank"
              >
                show details
              </a>
              )
            </div>
          )}
        </div>
        <div className="values lookup-info">
          <div className="violation-total">{violationsString}</div>
          <ViolationAspectFields showComponent={showViolationsBreakdown}>
            {hasAtLeastOneViolation ? (
              <>
                {getViolationAspectValues(violationTypeCounts, VIOLATION_TYPES)}
                {getViolationAspectValues(
                  violationBoroughCounts,
                  VIOLATION_BOROUGHS,
                )}
              </>
            ) : (
              <></>
            )}
          </ViolationAspectFields>
        </div>
      </div>
    </div>
  )
}

ViolationSummary.displayName = 'ViolationSummary'

export default ViolationSummary
