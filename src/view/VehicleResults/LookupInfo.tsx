import * as React from 'react'

import { ListGroupItem } from 'reactstrap'

import { Vehicle } from 'utils/types/responses'

export default ({ vehicle }: { vehicle: Vehicle }) => {

  const lookups = `Lookups: ${vehicle.timesQueried}`

  const lastQueriedDate = new Date(vehicle.previousLookupDate)
    .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit'})

  const newTicketsString = (vehicle.previousViolationCount - vehicle.violationsCount) > 0
    ? `(${vehicle.previousViolationCount - vehicle.violationsCount} new tickets)`
    : ''

  const recentLookupString = `Recent: ${lastQueriedDate} ${newTicketsString}`

  return (
    <ListGroupItem className='no-padding'>
      <div className='split-list-group-item'>
        {lookups}
      </div>
      {vehicle.previousLookupDate && (
        <div className='split-list-group-item'>
          {recentLookupString}
        </div>
      )}
    </ListGroupItem>
  )
}
