import * as React from 'react'

import { Vehicle } from 'utils/types/responses'

export default ({ vehicle }: { vehicle: Vehicle }) => {

  const violationCount = vehicle.violationsCount

  return (
    <>
      <meta name="twitter:card" content='summary' />
      <meta name="twitter:site" content='@HowsMyDrivingNY' />
      <meta name="twitter:title" content={`${violationCount} violation${vehicle.violationsCount === 1 ? '' : 's'} for ${vehicle.state}:${vehicle.plate}`} />
      <meta name="twitter:description" content={`See violations received by ${vehicle.state}:${vehicle.plate}.`} />
      <meta name="twitter:image" content='https://twitter.com/HowsMyDrivingNY/photo' />
      <meta name="twitter:image:alt" content='Profile image for @HowsMyDrivingNY' />
    </>
  )
}