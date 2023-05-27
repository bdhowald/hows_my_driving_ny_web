import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import smoothscroll from 'smoothscroll-polyfill'
import 'bootstrap/dist/css/bootstrap.min.css'
// import registerServiceWorker from './registerServiceWorker'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useCookies } from 'react-cookie'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

import 'index.css'

import { LOOKUP_IDENTIFIER_COOKIE } from 'constants/cookies'
import L10N from 'constants/display'
import { Vehicle } from 'utils/types/responses'
import Search from 'view/Search'
import VehicleResults from 'view/VehicleResults'

library.add(faAngleDown, faAngleUp)
smoothscroll.polyfill()

const FetchViolations = () => {
  const { uniqueIdentifier } = useParams<Record<string, string | undefined>>()
  const listRef = useRef<HTMLDivElement>(null)

  const [cookies, setCookie] = useCookies([LOOKUP_IDENTIFIER_COOKIE])
  const [lookupInFlight, setLookupInFlight] = useState(false)
  const [queriedVehicles, setQueriedVehicles] = useState<Array<Vehicle>>([])

  const removeLookup = (indexToRemove: number) => {
    const newList: Vehicle[] = [
      ...queriedVehicles.slice(0, indexToRemove),
      ...queriedVehicles.slice(indexToRemove + 1),
    ]
    const queriedUniqueIdentifiers = cookies[LOOKUP_IDENTIFIER_COOKIE]
      ? cookies[LOOKUP_IDENTIFIER_COOKIE].split(',')
      : []
    const remainingUniqueIdentifiers = queriedUniqueIdentifiers.filter(
      (_: any, index: number) => index !== indexToRemove
    )

    setCookie(LOOKUP_IDENTIFIER_COOKIE, remainingUniqueIdentifiers
      ? remainingUniqueIdentifiers.toString()
      : null,
      {
        maxAge: 31536000,
        path: '/'
      }
    )

    setQueriedVehicles(newList)
  }

  useEffect(() => {
    document.title = L10N.sitewide.title
  })

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({behavior: 'smooth'})
    }
  })

  return (
    <div>
      <Container fluid>
        <Row>
          <div className='col-md-12'>
            <Search
              lookupInFlight={lookupInFlight}
              previousLookupUniqueIdentifierFromQuery={uniqueIdentifier}
              queriedVehicles={queriedVehicles}
              setLookupInFlight={setLookupInFlight}
              setQueriedVehiclesFn={setQueriedVehicles}
            />
            <VehicleResults
              lookupInFlight={lookupInFlight}
              removeLookupFn={removeLookup}
              scrollRef={listRef}
              vehicles={queriedVehicles}
            />
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default FetchViolations
