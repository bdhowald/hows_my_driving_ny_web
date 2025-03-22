import * as React from 'react'

import Vehicle from 'models/Vehicle/Vehicle'
import FinesBreakdown from 'view/VehicleResults/FinesBreakdown/FinesBreakdown'

import PlateInfo from './PlateInfo/PlateInfo'
import ViolationSummary from './ViolationSummary/ViolationSummary'

const LookupInfo = ({ vehicle }: { vehicle: Vehicle }) => {
  const showFines = !!vehicle.violationsCount

  return (
    <li className="list-group-item no-padding">
      <div className="row">
        <div className="summary-section col-xs-12 col-sm-6">
          <PlateInfo vehicle={vehicle} />
        </div>
        <div className="summary-section col-xs-12 col-sm-6">
          <ViolationSummary vehicle={vehicle} />
        </div>
        {showFines && (
          <div className="summary-section col-xs-12 col-sm-6">
            <FinesBreakdown.CombinedViolationsFinesBreakdown
              totalFined={vehicle.fines.totalFined}
              totalInJudgment={vehicle.fines.totalInJudgment}
              totalOutstanding={vehicle.fines.totalOutstanding}
              totalPaid={vehicle.fines.totalPaid}
              totalReduced={vehicle.fines.totalReduced}
            />
          </div>
        )}
      </div>
    </li>
  )
}

LookupInfo.displayName = 'VehicleResults.LookupInfo'

export default LookupInfo
