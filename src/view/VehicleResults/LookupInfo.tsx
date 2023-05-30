import * as React from 'react'
import { ListGroupItem } from 'reactstrap'

import L10N from 'constants/display'
import plateTypes from 'constants/plateTypes'
import getRegionNameFromAbbreviation from 'utils/getRegionNameFromAbbreviation'
import { Vehicle } from 'utils/types/responses'

const DOLLAR_LOCALE_SETTINGS = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}

const LookupInfo = ({ vehicle }: { vehicle: Vehicle }) => {

  const lastQueriedDateString = !!vehicle.previousLookupDate
    ? new Date(vehicle.previousLookupDate).toLocaleDateString('en-US', L10N.sitewide.dateFormat)
    : 'Never'

  const newTicketsSinceLastLookup = vehicle.previousViolationCount - vehicle.violationsCount
  const newTicketsString = (vehicle.previousLookupDate && newTicketsSinceLastLookup > 0)
    ? `(${newTicketsSinceLastLookup} new ticket${newTicketsSinceLastLookup > 1 ? 's' : ''})`
    : ''

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

  const totalFinedString = vehicle.fines.totalFined.toLocaleString(
    'en-US', DOLLAR_LOCALE_SETTINGS
  )
  const totalPaidString = vehicle.fines.totalPaid.toLocaleString(
    'en-US', DOLLAR_LOCALE_SETTINGS
  )
  const totalReducedString = vehicle.fines.totalReduced.toLocaleString(
    'en-US', DOLLAR_LOCALE_SETTINGS
  )
  const totalOutstandingString = vehicle.fines.totalOutstanding.toLocaleString(
    'en-US', DOLLAR_LOCALE_SETTINGS
  )

  const finesAriaLabel = `$${totalFinedString} fined - $${totalPaidString} paid - $${totalReducedString} reduced = $${totalOutstandingString} outstanding`

  const smallColumnWidth = showFines ? 6 : 6

  return (
    <ListGroupItem className='no-padding'>
      <div className='row'>
        <div className={`summary-section col-xs-12 col-sm-${smallColumnWidth}`}>
          <div className='summary-box keys lookup-info'>
            <div>Plate:</div>
            <div>Region:</div>
            <div>Plate type:</div>
            <div>Lookups:</div>
            <div>Recent:</div>
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
            <div className='summary-value'>{vehicle.timesQueried}</div>
            <div className='summary-value'>{`${lastQueriedDateString} ${newTicketsString}`}</div>
          </div>
        </div>
        {showFines && (
          <div className='summary-section col-xs-12 col-sm-6'>
            <div className='summary-box keys'>
              <div>Fined:</div>
              <div>Paid:</div>
              <div className='fines-reduced'>Reduced:</div>
              <div>Outstanding:</div>
            </div>
            <div className='summary-box values fines' role="math" aria-label={finesAriaLabel}>
              <div className='math-symbols'>
                <div>{'\u00A0\u00A0\u00A0'}</div>
                <div>{'\u00A0\u00A0\u00A0'}</div>
                <div className='fines-reduced'>–{'\u00A0'}</div>
                <div>{'\u00A0\u00A0\u00A0'}</div>
              </div>
              <div className='amounts'>
                <div>${totalFinedString}</div>
                <div>${totalPaidString}</div>
                <div className='fines-reduced'>${totalReducedString}</div>
                <div>${totalOutstandingString}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ListGroupItem>
  )
}

LookupInfo.displayName = 'VehicleResults.LookupInfo'

export default LookupInfo