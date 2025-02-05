import * as React from 'react'

import L10N from 'constants/display'
import { Region } from 'constants/regions'
import Vehicle from 'models/Vehicle/Vehicle'

import getPlateTypesString from 'utils/search/getPlateType/getPlateTypeDisplayString/getPlateTypeDisplayString'
import getRegionFromAbbreviation from 'utils/displayResults/getRegionFromAbbreviation/getRegionFromAbbreviation'

import FinesBreakdown from 'view/VehicleResults/FinesBreakdown/FinesBreakdown'

const LookupSummaryKeyFields = ({
  lastQueriedDateStringPresent,
  region,
}: {
  lastQueriedDateStringPresent: boolean
  region: Region | undefined
}) => {
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

  return (
    <div className="summary-box keys lookup-info">
      <div>Plate:</div>
      <div>{getRegionKeyName(region)}:</div>
      <div>Plate type:</div>
      <div>Violations:</div>
      <div>Lookups:</div>
      {lastQueriedDateStringPresent && <div>Previous:</div>}
    </div>
  )
}

const LookupSummaryValueFields = ({
  lastQueriedDateString,
  plate,
  region,
  timesVehicleQueried,
  vehiclePlateTypes,
  violationsString,
}: {
  lastQueriedDateString: string | undefined
  plate: string
  region: Region | undefined
  timesVehicleQueried: number
  vehiclePlateTypes: string[] | undefined
  violationsString: string
}) => (
  <div className="summary-box values lookup-info">
    <div className="summary-value">{plate}</div>
    <div className="summary-value region">
      <div className="region-abbreviation">{region?.code ?? 'N/A'}</div>
      <div className="region-full-name">{region?.name || 'N/A'}</div>
    </div>
    <div className="summary-value">
      {getPlateTypesString(vehiclePlateTypes)}
    </div>
    <div className="summary-value">{violationsString}</div>
    <div className="summary-value">{timesVehicleQueried}</div>
    {lastQueriedDateString && (
      <div className="summary-value">{lastQueriedDateString}</div>
    )}
  </div>
)

const LookupInfo = ({ vehicle }: { vehicle: Vehicle }) => {
  const lastQueriedDateString = vehicle.previousLookupDate
    ? new Date(vehicle.previousLookupDate).toLocaleDateString(
        'en-US',
        L10N.sitewide.dateFormat,
      )
    : undefined

  const newViolationsSinceLastLookup =
    vehicle.violationsCount - (vehicle.previousViolationCount ?? 0)

  const violationsString =
    vehicle.previousLookupDate && newViolationsSinceLastLookup > 0
      ? `${vehicle.violationsCount} (${newViolationsSinceLastLookup} new)`
      : `${vehicle.violationsCount}`

  const showFines = !!vehicle.violationsCount

  const region = getRegionFromAbbreviation(vehicle.state)

  return (
    <li className="list-group-item no-padding">
      <div className="row">
        <div className="summary-section col-xs-12 col-sm-6">
          <LookupSummaryKeyFields
            lastQueriedDateStringPresent={!!lastQueriedDateString}
            region={region}
          />
          <LookupSummaryValueFields
            lastQueriedDateString={lastQueriedDateString}
            plate={vehicle.plate}
            region={region}
            timesVehicleQueried={vehicle.timesQueried}
            vehiclePlateTypes={vehicle.plateTypes}
            violationsString={violationsString}
          />
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
