import React, { useEffect } from 'react'
import { useState } from 'react'

import { ListGroupItem } from 'reactstrap'

import L10N from 'constants/display'
import { Vehicle } from 'utils/types/responses'
import ViolationsTable from 'view/ViolationsTable'

const ViolationsList = ({ vehicle }: { vehicle: Vehicle}) => {
  const [violationsListIsVisible, setViolationsListVisibility] = useState(vehicle.expandResults)
  const [showFullText, setShowFullText] = useState(window.innerWidth > 768)

  const violationsCount = vehicle.violationsCount
  const vehicleHasViolations = violationsCount > 0

  useEffect(() => {
    setViolationsListVisibility(vehicle.expandResults)
  }, [vehicle.expandResults])

  const ShowFullViolationTextButton = () => {
    if (!(violationsListIsVisible && vehicleHasViolations)) {
      return <></>
    }

    return (
      <button
        className="btn btn-outline-primary btn-block"
        onClick={(e) => {
          e.stopPropagation()
          setShowFullText(!showFullText)
        }}
        type="button"
      >
        {showFullText
          ? L10N.lookups.toggleFullViolationText.hide
          : vehicleHasViolations
          ? L10N.lookups.toggleFullViolationText.show
          : ''
        }
      </button>
    )
  }

  const ShowViolationsButton = ({ vehicle }: { vehicle: Vehicle}) => {
    const newViolationsSinceLastLookup = 7//vehicle.previousViolationCount - vehicle.violationsCount
    const newViolationsString = (vehicle.previousLookupDate && newViolationsSinceLastLookup > 0)
      ? ` (${newViolationsSinceLastLookup} new)`
      : ''

    const buttonText = vehicleHasViolations
      ? (violationsListIsVisible
        ? L10N.lookups.toggleViolationsView.hide
        : `show ${violationsCount} violation${violationsCount === 0 ? '' : 's'}`
      )
      : L10N.lookups.toggleViolationsView.noViolations

    return (
      <button
      aria-controls={`violations-table-${vehicle.uniqueIdentifier}`}
      aria-expanded='false'
        className={`btn btn-block ${
          vehicleHasViolations
            ? 'btn-outline-primary'
            : 'btn-outline-secondary'
          }`
        }
        disabled={!vehicleHasViolations}
        onClick={(e) => {
          e.stopPropagation()
          setViolationsListVisibility(!violationsListIsVisible)
        }}
        type="button"
      >
        {buttonText}
        <span>{newViolationsString}</span>
      </button>
    )
  }

  return (
    <ListGroupItem>
      <div className='violations-table-wrapper' style={{width: '100%'}}>
        <div className='violations-table-header'>
          <div className='row'>
            <div className={`col-12 ${(violationsListIsVisible && vehicleHasViolations) ? 'col-md-6' : ''}`}>
              <ShowViolationsButton vehicle={vehicle}/>
            </div>
            <div className='col-12 col-md-6'>
              <ShowFullViolationTextButton />
            </div>
          </div>
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