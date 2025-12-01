import * as React from 'react'

import { USER_SETTINGS_STORAGE_KEYS } from 'constants/userSettings'
import useSettings from 'hooks/useSettings/useSettings'
import Vehicle from 'models/Vehicle/Vehicle'
import FinesBreakdown from 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/FinesBreakdown/FinesBreakdown'

import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/LookupInfo/LookupInfo.css'

import PlateInfo from './PlateInfo/PlateInfo'
import ViolationSummary from './ViolationSummary/ViolationSummary'

const LookupInfo = ({ vehicle }: { vehicle: Vehicle }) => {
  const { getSetting } = useSettings()

  const useNewStyleDisplay =
    getSetting(USER_SETTINGS_STORAGE_KEYS.useNewStyleDisplay) === true
  const showFines = !!vehicle.violationsCount

  if (useNewStyleDisplay) {
    return (
      <li className="list-group-item no-padding">
        <div className="row new-style">
          <div className="summary-section new-style">
            <PlateInfo vehicle={vehicle} />
          </div>
          <div className="summary-section new-style">
            <ViolationSummary vehicle={vehicle} />
          </div>
          {showFines && (
            <div className="summary-section new-style">
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
