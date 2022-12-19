import * as React from 'react'

import { ListGroupItem } from 'reactstrap'

import { Vehicle } from 'utils/types/responses'

const DOLLAR_LOCALE_SETTINGS = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}

export default ({ vehicle }: { vehicle: Vehicle }) => {

  const lastQueriedDate = new Date(vehicle.previousLookupDate)
    .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit'})

  const newTicketsString = (vehicle.previousViolationCount - vehicle.violationsCount) > 0
    ? `(${vehicle.previousViolationCount - vehicle.violationsCount} new tickets)`
    : ''

  return (
    <>
      <ListGroupItem className='no-padding'>
        <div className='summary-box'>
          <div className='split-list-group-item'>
            <div>Lookups:</div>
            <div className='summary-value'>{vehicle.timesQueried}</div>
          </div>
          {vehicle.previousLookupDate && (
            <div className='split-list-group-item'>
              <div>Recent:</div>
              <div className='summary-value'>{`${lastQueriedDate} ${newTicketsString}`}</div>
            </div>
          )}
        </div>
      </ListGroupItem>
      <ListGroupItem className='no-padding'>
        <div className='summary-box'>
          <div className='split-list-group-item'>
            <div>Fined:</div>
            <div className='summary-value'>${
              vehicle.fines.totalFined.toLocaleString('en-US', DOLLAR_LOCALE_SETTINGS)
            }</div>
          </div>
          <div className='split-list-group-item'>
            <div>Reduced:</div>
            <div className='summary-value'>${
              vehicle.fines.totalReduced.toLocaleString('en-US', DOLLAR_LOCALE_SETTINGS)
            }</div>
          </div>
        </div>
      </ListGroupItem>
      <ListGroupItem  className='no-padding'>
        <div className='summary-box'>
          <div className='split-list-group-item'>
            <div>Paid:</div>
            <div className='summary-value'>${
              vehicle.fines.totalPaid.toLocaleString('en-US', DOLLAR_LOCALE_SETTINGS)
            }</div>
          </div>
          <div className='split-list-group-item'>
            <div>Outstanding:</div>
            <div className='summary-value'>${
              vehicle.fines.totalOutstanding.toLocaleString('en-US', DOLLAR_LOCALE_SETTINGS)
            }</div>
          </div>
        </div>
      </ListGroupItem>
    </>
  )
}
