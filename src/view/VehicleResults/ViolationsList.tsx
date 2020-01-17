import * as React from 'react'
import { useState } from 'react'

import { ListGroupItem } from 'reactstrap'

import { Vehicle } from 'utils/types/responses'
import ViolationsTable from 'view/ViolationsTable'

export default ({ vehicle }: { vehicle: Vehicle}) => {
  const [visible, setVisibility] = useState(true)

  const violationsCount = vehicle.violationsCount

  return (
    <ListGroupItem>
      <div className='violations-table-wrapper' style={{width: '100%'}}>
        <div className='violations-table-header' onClick={() => setVisibility(!visible)}>
          Violations: {violationsCount}
          <span className='see-violations-table-link'>{visible ? '(hide violations)' : (violationsCount > 0 ? '(see violations)' : '')}</span>
        </div>
        {violationsCount > 0 && visible &&
          <ViolationsTable vehicle={vehicle}/>
        }
      </div>
    </ListGroupItem>
  )
}