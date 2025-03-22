import * as React from 'react'

import L10N from 'constants/display'
import { Region } from 'constants/regions'
import Vehicle from 'models/Vehicle/Vehicle'
import getPlateTypesString from 'utils/search/getPlateType/getPlateTypeDisplayString/getPlateTypeDisplayString'
import getRegionFromAbbreviation from 'utils/displayResults/getRegionFromAbbreviation/getRegionFromAbbreviation'

const PlateInfo = ({ vehicle }: { vehicle: Vehicle }) => {
  const getLastQueriedDateString = (
    vehiclePreviousLookupDate: string | undefined,
  ) =>
    vehiclePreviousLookupDate
      ? new Date(vehiclePreviousLookupDate).toLocaleDateString(
          'en-US',
          L10N.sitewide.dateFormat,
        )
      : undefined

  const getRegionKeyName = (regionObject: Region | undefined) => {
    if (!regionObject) {
      return 'Region'
    }
    if (regionObject.type === 'province') {
      return 'Province'
    }
    if (regionObject.type === 'state') {
      return 'State'
    }
    if (regionObject.type === 'territory') {
      return 'Territory'
    }
    return 'Region'
  }

  const lastQueriedDateString = getLastQueriedDateString(
    vehicle.previousLookupDate,
  )

  const region = getRegionFromAbbreviation(vehicle.state)

  return (
    <div className="summary-box">
      <div className="vehicle-info-group vehicle-identity">
        <div className="keys lookup-info">
          <div>Plate:</div>
          <div>{getRegionKeyName(region)}:</div>
          <div>Plate type:</div>
          <div>Lookups:</div>
          {!!lastQueriedDateString && <div>Previous:</div>}
        </div>
        <div className="values lookup-info">
          <div>{vehicle.plate}</div>
          <div className="region">
            <div className="region-abbreviation">{region?.code ?? 'N/A'}</div>
            <div className="region-full-name">{region?.name || 'N/A'}</div>
          </div>
          <div>{getPlateTypesString(vehicle.plateTypes)}</div>
          <div>{vehicle.timesQueried}</div>
          {lastQueriedDateString && <div>{lastQueriedDateString}</div>}
        </div>
      </div>
    </div>
  )
}

export default PlateInfo
