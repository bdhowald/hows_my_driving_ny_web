import React, { useEffect, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
// import Geocode from "react-geocode";


import 'index.css'

import L10N from 'constants/display'
import { Vehicle } from 'utils/types/responses'
import Search from 'view/Search'
import VehicleResults from 'view/VehicleResults'

library.add(faAngleDown, faAngleUp)

// Geocode.enableDebug();

const FetchViolations = () => {

  const [queriedVehicles, setQueriedVehicles] = useState<Array<Vehicle>>([])

  useEffect(() => {
    document.title = L10N.sitewide.title
  })

  return (
    <div>
      <Container fluid={true}>
        <Row>
          <div className='col-md-12'>
            <Search
              queriedVehicles={queriedVehicles}
              setQueriedVehiclesFn={setQueriedVehicles}
            />
            <VehicleResults vehicles={queriedVehicles} />
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default FetchViolations
