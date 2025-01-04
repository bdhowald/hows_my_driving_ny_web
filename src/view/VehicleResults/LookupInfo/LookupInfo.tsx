import * as React from 'react'

import L10N from 'constants/display'
import Vehicle from 'models/Vehicle/Vehicle'

import getPlateTypesString from 'utils/search/getPlateType/getPlateTypeDisplayString/getPlateTypeDisplayString'
import getRegionNameFromAbbreviation from 'utils/displayResults/getRegionNameFromAbbreviation/getRegionNameFromAbbreviation'

import FinesBreakdown from 'view/VehicleResults/FinesBreakdown/FinesBreakdown'

const LookupSummaryKeyFields = ({
  lastQueriedDateStringPresent,
}: {
  lastQueriedDateStringPresent: boolean
}) => (
  <div className="summary-box keys lookup-info">
    <div>Plate:</div>
    <div>Region:</div>
    <div>Plate type:</div>
    <div>Violations:</div>
    <div>Lookups:</div>
    {lastQueriedDateStringPresent && <div>Previous:</div>}
  </div>
)

const LookupSummaryValueFields = ({
  lastQueriedDateString,
  plate,
  state,
  timesVehicleQueried,
  vehiclePlateTypes,
  violationsString,
}: {
  lastQueriedDateString: string | undefined
  plate: string
  state: string
  timesVehicleQueried: number
  vehiclePlateTypes: string[] | undefined
  violationsString: string
}) => (
  <div className="summary-box values lookup-info">
    <div className="summary-value">{plate}</div>
    <div className="summary-value region">
      <div className="region-abbreviation">{state}</div>
      <div className="region-full-name">
        {getRegionNameFromAbbreviation(state)}
      </div>
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

  return (
    <li className="list-group-item no-padding">
      <div className="row">
        <div className="summary-section col-xs-12 col-sm-6">
          <LookupSummaryKeyFields
            lastQueriedDateStringPresent={!!lastQueriedDateString}
          />
          <LookupSummaryValueFields
            lastQueriedDateString={lastQueriedDateString}
            plate={vehicle.plate}
            state={vehicle.state}
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
