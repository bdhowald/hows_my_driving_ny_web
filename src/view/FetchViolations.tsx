import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import smoothscroll from 'smoothscroll-polyfill'
import 'bootstrap/dist/css/bootstrap.min.css'

// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

import 'index.css'

import L10N from 'constants/display'
import { Vehicle } from 'utils/types/responses'
import Search from 'view/Search'
import VehicleResults from 'view/VehicleResults'

library.add(faAngleDown, faAngleUp)
smoothscroll.polyfill()

const FetchViolations = () => {

  const { uniqueIdentifier } = useParams()
  const listRef = useRef<HTMLDivElement>(null)

  const [queriedVehicles, setQueriedVehicles] = useState<Array<Vehicle>>([])

  useEffect(() => {
    document.title = L10N.sitewide.title
  })

  useEffect(() => {
    console.log(listRef)
    if (listRef.current) {
      listRef.current.scrollIntoView({behavior: 'smooth'})
    }
  })

  return (
    <div>
      <Container fluid={true}>
        <Row>
          <div className='col-md-12'>
            <Search
              previousLookupIdentifier={uniqueIdentifier}
              queriedVehicles={queriedVehicles}
              setQueriedVehiclesFn={setQueriedVehicles}
            />
            <VehicleResults vehicles={queriedVehicles} scrollRef={listRef}/>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default FetchViolations
