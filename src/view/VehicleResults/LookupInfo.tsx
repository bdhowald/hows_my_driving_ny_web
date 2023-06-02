import * as React from 'react'
import { ListGroupItem } from 'reactstrap'

import L10N from 'constants/display'
import plateTypes from 'constants/plateTypes'
import getRegionNameFromAbbreviation from 'utils/getRegionNameFromAbbreviation'
import { Vehicle } from 'utils/types/responses'

import FinesBreakdown from './FinesBreakdown'

const LookupInfo = ({ vehicle }: { vehicle: Vehicle }) => {

  const lastQueriedDateString = !!vehicle.previousLookupDate
    ? new Date(vehicle.previousLookupDate).toLocaleDateString('en-US', L10N.sitewide.dateFormat)
    : null

  const newViolationsSinceLastLookup = vehicle.violationsCount - vehicle.previousViolationCount
  const violationsString = (vehicle.previousLookupDate && newViolationsSinceLastLookup > 0)
    ? `${vehicle.violationsCount} (${newViolationsSinceLastLookup} new)`
    : `${vehicle.violationsCount}`

  const showFines = !!vehicle.violationsCount

  const getPlateTypesString = (vehicle: Vehicle) => {
    let plateCategory: string | undefined = undefined
    Object.entries(plateTypes).forEach(([_, type]) => {
      if (vehicle.plateTypes?.sort().toString() === type.codes?.sort().toString()) {
        plateCategory = type.displayName
      }
    })
    const plateTypesString: string | undefined = vehicle.plateTypes ? plateCategory : 'All'
    return plateTypesString
  }

  return (
    <ListGroupItem className='no-padding'>
      <div className='row'>
        <div className={`summary-section col-xs-12 col-sm-6`}>
          <div className='summary-box keys lookup-info'>
            <div>Plate:</div>
            <div>Region:</div>
            <div>Plate type:</div>
            <div>Violations:</div>
            <div>Lookups:</div>
            {lastQueriedDateString && (
              <div>Previous:</div>
            )}
          </div>
          <div className='summary-box values lookup-info'>
            <div className='summary-value'>{vehicle.plate}</div>
            <div className='summary-value region'>
              <div className='region-abbreviation'>{vehicle.state}</div>
              <div className='region-full-name'>
                {getRegionNameFromAbbreviation(vehicle.state)}
              </div>
            </div>
            <div className='summary-value'>{getPlateTypesString(vehicle)}</div>
            <div className='summary-value'>{violationsString}</div>
            <div className='summary-value'>{vehicle.timesQueried}</div>
            {lastQueriedDateString && (
              <div className='summary-value'>{lastQueriedDateString}</div>
            )}
          </div>
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
    </ListGroupItem>
  )
}

LookupInfo.displayName = 'VehicleResults.LookupInfo'

export default LookupInfo