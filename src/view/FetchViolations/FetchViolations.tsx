import React, { createContext, useEffect, useRef, useState } from 'react'

import FingerprintJS, { Agent } from '@fingerprintjs/fingerprintjs'
import mixpanel, { Mixpanel } from 'mixpanel-browser'
import { useParams } from 'react-router-dom'
import smoothscroll from 'smoothscroll-polyfill'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useCookies } from 'react-cookie'

import { LOOKUP_IDENTIFIER_COOKIE, MAX_AGE } from 'constants/cookies'
import L10N from 'constants/display'
import Vehicle from 'models/Vehicle/Vehicle'
import getPlateTypeName from 'utils/search/getPlateType/getPlateTypeName/getPlateTypeName'
import handleLookupResults from 'utils/processResults/handleLookupResults/handleLookupResults'
import performLookup from 'utils/search/performLookup/performLookup'
import { VehicleQueryResponse } from 'utils/types/responses'
import VehicleDisplayResult from 'utils/types/vehicleDisplayResult'
import Footer from 'view/Footer/Footer'
import Search from 'view/Search/Search'
import VehicleResults from 'view/VehicleResults/VehicleResults'

smoothscroll.polyfill()

export const MixpanelContext = createContext<Mixpanel | undefined>(undefined)

const FetchViolations = () => {
  const { uniqueIdentifier } = useParams<Record<string, string | undefined>>()
  const listRef = useRef<HTMLDivElement>(null)

  const [cookies, setCookie] = useCookies([LOOKUP_IDENTIFIER_COOKIE])
  const [lookupInFlight, setLookupInFlight] = useState(false)
  const [queriedVehicles, setQueriedVehicles] = useState<
    Array<VehicleDisplayResult>
  >([])
  const [searchError, setSearchError] = useState<boolean>(false)

  const [fingerprintAgent, setFingerprintAgent] =
    useState<Promise<Agent> | null>(null)
  const [fingerprintId, setFingerprintId] = useState<string | undefined>()
  const [mixpanelInstance, setMixpanelInstance] = useState<Mixpanel>()

  useEffect(() => {
    const getFingerprint = async () => {
      const fingerprintingAgent = await fingerprintAgent
      const fingerprint = await fingerprintingAgent?.get()
      if (fingerprint) {
        setFingerprintId(fingerprint.visitorId)
      }
    }

    if (!fingerprintId) {
      getFingerprint()
    }
  }, [fingerprintAgent, fingerprintId])

  useEffect(() => {
    // Initialize an agent at application startup.
    setFingerprintAgent(FingerprintJS.load())
  }, [])

  useEffect(() => {
    document.title = L10N.sitewide.title
  })

  useEffect(() => {
    // Do not scroll to the results when lookup completes if there's an error in the search.
    if (!lookupInFlight && listRef.current && !searchError) {
      listRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [lookupInFlight])

  useEffect(() => {
    mixpanel.init('f8491ce35ed8262c61e16e6b6abb83b3', {
      loaded: (mixpanel: Mixpanel) => {
        setMixpanelInstance(mixpanel)
      },
    })
  }, [])

  const refreshLookup = async (vehicle: Vehicle) => {
    // Prevent another button press/submission
    setLookupInFlight(true)

    const plateType = getPlateTypeName(vehicle.plateTypes)

    try {
      // Perform the search
      const response: VehicleQueryResponse = await performLookup(
        vehicle.plate,
        plateType,
        vehicle.state,
        fingerprintId,
        mixpanel.get_distinct_id(),
      )

      // If query successful, reset error state
      setSearchError(false)

      // Parse the results
      handleLookupResults({
        response,
        setQueriedVehiclesFunction: setQueriedVehicles,
      })
    } catch (error: unknown) {
      if (error) {
        setSearchError(true)
      }
    }

    // Re-enable button
    setLookupInFlight(false)
  }

  const removeLookup = (indexToRemove: number) => {
    const newList: VehicleDisplayResult[] = [
      ...queriedVehicles.slice(0, indexToRemove),
      ...queriedVehicles.slice(indexToRemove + 1),
    ]
    const queriedUniqueIdentifiers = cookies[LOOKUP_IDENTIFIER_COOKIE]
      ? cookies[LOOKUP_IDENTIFIER_COOKIE].split(',')
      : []

    const remainingUniqueIdentifiers = queriedUniqueIdentifiers.filter(
      (_: unknown, index: number) => index !== indexToRemove,
    )

    setCookie(
      LOOKUP_IDENTIFIER_COOKIE,
      remainingUniqueIdentifiers ? remainingUniqueIdentifiers.toString() : null,
      {
        maxAge: MAX_AGE,
        path: '/',
      },
    )

    setQueriedVehicles(newList)
  }

  return (
    <MixpanelContext.Provider value={mixpanelInstance}>
      <div>
        <Container fluid>
          <Row>
            <div className="col-md-12">
              <Search
                lookupInFlight={lookupInFlight}
                fingerprintId={fingerprintId}
                mixpanelInstance={mixpanelInstance}
                previousLookupUniqueIdentifierFromQuery={uniqueIdentifier}
                queriedVehicles={queriedVehicles}
                searchError={searchError}
                setSearchErrorFunction={setSearchError}
                setLookupInFlight={setLookupInFlight}
                setQueriedVehiclesFunction={setQueriedVehicles}
              />
              <VehicleResults
                lookupInFlight={lookupInFlight}
                refreshLookupFunction={refreshLookup}
                removeLookupFunction={removeLookup}
                scrollRef={listRef}
                vehicleDisplayResults={queriedVehicles}
              />
            </div>
          </Row>
          <Row>
            <div className="col-md-12">
              <Footer />
            </div>
          </Row>
        </Container>
      </div>
    </MixpanelContext.Provider>
  )
}

export default FetchViolations
