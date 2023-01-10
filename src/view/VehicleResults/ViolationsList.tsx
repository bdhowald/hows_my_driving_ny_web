import * as React from 'react'
import { useState } from 'react'

import { ListGroupItem } from 'reactstrap'

import L10N from 'constants/display'
import { Vehicle } from 'utils/types/responses'
import ViolationsTable from 'view/ViolationsTable'

const ViolationsList = ({ vehicle }: { vehicle: Vehicle}) => {
  const [violationsListIsVisible, setViolationsListVisibility] = useState(true)
  const [showFullText, setShowFullText] = useState(window.innerWidth > 768)

  const violationsCount = vehicle.violationsCount
  const vehicleHasViolations = violationsCount > 0

  const ShowFullViolationTextLink = () => (
    <span
      className='see-full-violation-text-table-link'
      onClick={(e) => {
        e.stopPropagation()
        setShowFullText(!showFullText)
      }}
    >
      {showFullText && vehicleHasViolations
        ? `(${L10N.lookups.toggleFullViolationText.hide})`
        : vehicleHasViolations
        ? `(${L10N.lookups.toggleFullViolationText.show})`
        : ''
      }
    </span>
  )

  const ShowViolationsLink = () => (
    <span
      className='see-violations-table-link'
      onClick={(e) => {
        e.stopPropagation()
        setViolationsListVisibility(!violationsListIsVisible)
      }}
    >
      {violationsListIsVisible && vehicleHasViolations
        ? `(${L10N.lookups.toggleViolationsView.hide})`
        : vehicleHasViolations
        ? `(${L10N.lookups.toggleViolationsView.show})`
        : ''
      }
    </span>
  )

  return (
    <ListGroupItem>
      <div className='violations-table-wrapper' style={{width: '100%'}}>
        <div className='violations-table-header'>
          <div>
            Violations:
            <span className='violations-count'>
              {violationsCount}
            </span>
          </div>
          {violationsListIsVisible && <ShowFullViolationTextLink />}
          <ShowViolationsLink />
        </div>
        {vehicleHasViolations && violationsListIsVisible &&
          <ViolationsTable showFullText={showFullText} vehicle={vehicle}/>
        }
      </div>
    </ListGroupItem>
  )
}

ViolationsList.displayName = 'ViolationsList'

export default ViolationsList