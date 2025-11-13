import * as React from 'react'

import L10N from 'constants/display'
import { Region } from 'constants/regions'
import Vehicle from 'models/Vehicle/Vehicle'
import getPlateTypesString from 'utils/search/getPlateType/getPlateTypeDisplayString/getPlateTypeDisplayString'
import getRegionFromAbbreviation from 'utils/displayResults/getRegionFromAbbreviation/getRegionFromAbbreviation'

const MAX_DATE_DIFF_TO_BE_CONSIDERED_RECENT = 1000 * 5 * 60

const PlateInfo = ({ vehicle }: { vehicle: Vehicle }) => {
  const getDateStringforDisplay = (
    lookupDateAsString: string | undefined,
    compareToCurrentTime: boolean,
  ): string | undefined => {
    if (!lookupDateAsString) {
      return undefined
    }
    if (isNaN(Date.parse(lookupDateAsString))) {
      return undefined
    }
    const now = new Date()
    const lookupDateAsDate = new Date(lookupDateAsString)

    if (
      compareToCurrentTime &&
      now.getTime() - lookupDateAsDate.getTime() <=
        MAX_DATE_DIFF_TO_BE_CONSIDERED_RECENT
    ) {
      return 'Now'
    }

    return L10N.sitewide.dateFormat.format(new Date(lookupDateAsString))
  }

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

  const thisQueryLookupDateString = getDateStringforDisplay(
    vehicle.lookupDate,
    true,
  )
  const lastQueriedLookupDateString = getDateStringforDisplay(
    vehicle.previousLookupDate,
    false,
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
          {!!thisQueryLookupDateString && <div>Queried On:</div>}
          {!!lastQueriedLookupDateString && <div>Prev. Queried:</div>}
        </div>
        <div className="values lookup-info">
          <div>{vehicle.plate}</div>
          <div className="region">
            <div className="region-abbreviation">{region?.code ?? 'N/A'}</div>
            <div className="region-full-name">{region?.name || 'N/A'}</div>
          </div>
          <div>{getPlateTypesString(vehicle.plateTypes)}</div>
          <div>{vehicle.timesQueried}</div>
          {thisQueryLookupDateString && <div>{thisQueryLookupDateString}</div>}
          {lastQueriedLookupDateString && (
            <div>{lastQueriedLookupDateString}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PlateInfo
