import React from 'react'

import Vehicle from 'models/Vehicle/Vehicle'

import ShowViolationsButton from './ShowViolationsButton/ShowViolationsButton'

type ViolationCardListControlProps = {
  setViolationsListVisibilityFunction: (arg1: boolean) => void
  vehicle: Vehicle
  violationsListIsVisible: boolean
}

const ViolationCardListControls = ({
  setViolationsListVisibilityFunction,
  vehicle,
  violationsListIsVisible,
}: ViolationCardListControlProps) => (
  <div
    className="violation-card-list-controls"
    data-testid="vehicle-violation-card-list-controls"
  >
    <div className="row">
      <div className={'d-grid gap-2'}>
        <ShowViolationsButton
          setViolationsListVisibilityFunction={
            setViolationsListVisibilityFunction
          }
          vehicle={vehicle}
          violationsListIsVisible={violationsListIsVisible}
        />
      </div>
    </div>
  </div>
)

export default ViolationCardListControls
