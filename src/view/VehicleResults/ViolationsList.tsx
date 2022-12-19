import * as React from 'react'
import { useState } from 'react'

import { ListGroupItem } from 'reactstrap'

import { Vehicle } from 'utils/types/responses'
import ViolationsTable from 'view/ViolationsTable'

export default ({ vehicle }: { vehicle: Vehicle}) => {
  const [visible, setVisibility] = useState(true)
  const [showFullText, setShowFullText] = useState(window.innerWidth > 768)

  const violationsCount = vehicle.violationsCount

  return (
    <ListGroupItem>
      <div className='violations-table-wrapper' style={{width: '100%'}}>
        <div className='violations-table-header'>
          Violations: {violationsCount}
          {visible && (
            <span
              className='see-full-violation-text-table-link'
              onClick={(e) => {
                e.stopPropagation()
                setShowFullText(!showFullText)
              }}
            >
              {showFullText ? '(hide full text)' : (violationsCount > 0 ? '(show full text)' : '')}
            </span>
          )}
          <span
            className='see-violations-table-link'
            onClick={(e) => {
              e.stopPropagation()
              setVisibility(!visible)
            }}
          >
            {visible ? '(hide violations)' : (violationsCount > 0 ? '(see violations)' : '')}
          </span>
        </div>
        {violationsCount > 0 && visible &&
          <ViolationsTable showFullText={showFullText} vehicle={vehicle}/>
        }
      </div>
    </ListGroupItem>
  )
}