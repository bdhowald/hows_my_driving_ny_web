import React, { createContext, useEffect, useRef, useState } from 'react'

import FingerprintJS, { Agent } from '@fingerprintjs/fingerprintjs'
import mixpanel, { Mixpanel } from 'mixpanel-browser'
import { useParams } from 'react-router-dom'
import smoothscroll from 'smoothscroll-polyfill'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useCookies } from 'react-cookie'

import {
  LOOKUP_IDENTIFIER_COOKIE,
  MAX_AGE,
  USE_NEW_STYLE_DISPLAY_COOKIE,
} from 'constants/cookies'
import L10N from 'constants/display'
import {
  MIXPANEL_IDLE_TIMEOUT_MILLISECONDS,
  MIXPANEL_RECORD_SESSIONS_PERCENT,
} from 'constants/tracking'
import Vehicle from 'models/Vehicle/Vehicle'
import getPlateTypeName from 'utils/search/getPlateType/getPlateTypeName/getPlateTypeName'
import getListOfQueriedVehiclesAfterResponse from 'utils/processResults/getListOfQueriedVehiclesAfterResponse/getListOfQueriedVehiclesAfterResponse'
import performLookup from 'utils/search/performLookup/performLookup'
import AnalyticsTracker from 'utils/analytics/tracking'
import MixpanelTracker from 'utils/analytics/trackers/mixpanel'
import { VehicleQueryResponse } from 'types/responses'
import VehicleDisplayResult from 'types/vehicleDisplayResult'
import Footer from 'view/Footer/Footer'
import Search from 'view/Search/Search'
import VehicleResults from 'view/VehicleResults/VehicleResults'

smoothscroll.polyfill()

export const TrackingContext = createContext<AnalyticsTracker | undefined>(
  undefined,
)

const FetchViolations = () => {
  const { uniqueIdentifier } = useParams<Record<string, string | undefined>>()
  const listRef = useRef<HTMLDivElement>(null)

  const [cookies, setCookie] = useCookies([
    LOOKUP_IDENTIFIER_COOKIE,
    USE_NEW_STYLE_DISPLAY_COOKIE,
  ])
  const [lookupInFlight, setLookupInFlight] = useState(false)
  const [queriedVehicles, setQueriedVehicles] = useState<
    Array<VehicleDisplayResult>
  >([])
  const [searchError, setSearchError] = useState<boolean | string>(false)

  const [fingerprintAgent, setFingerprintAgent] =
    useState<Promise<Agent> | null>(null)
  const [fingerprintId, setFingerprintId] = useState<string | undefined>()

  // Create tracker for all analytics
  const [tracker] = useState<AnalyticsTracker | undefined>(
    new AnalyticsTracker(['mixpanel']),
  )

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
        const mixpanelTracker = new MixpanelTracker({
          mixpanelInstance: mixpanel,
        })

        tracker?.addTracker('mixpanel', mixpanelTracker)
      },
      record_idle_timeout_ms: MIXPANEL_IDLE_TIMEOUT_MILLISECONDS,
      record_mask_text_selector: '', // nothing here is secret or PII
      record_sessions_percent: MIXPANEL_RECORD_SESSIONS_PERCENT,
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
        tracker?.getDistinctId('mixpanel'),
      )

      // If query successful, reset error state
      setSearchError(false)

      // Parse the results
      setQueriedVehicles((previouslyQueriedVehicleDisplayResults) =>
        getListOfQueriedVehiclesAfterResponse({
          previouslyQueriedVehicles: previouslyQueriedVehicleDisplayResults,
          response,
          useNewStyleDisplay: cookies[USE_NEW_STYLE_DISPLAY_COOKIE] === true,
        })
      )
    } catch (error: unknown) {
      if (error) {
        setSearchError(true)

        const wrappedError =
          error instanceof Error
            ? error
            : new Error(
                typeof error === 'string' ? error : JSON.stringify(error),
              )

        tracker?.trackEvent('user_saw_search_error', {
          action: 'refresh_lookup',
          message: wrappedError.message,
          stack: wrappedError.stack,
          raw: String(error),
          online: navigator.onLine,
        })
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
    <TrackingContext.Provider value={tracker}>
      <div>
        <Container fluid>
          <Row>
            <div className="col-md-12">
              <Search
                lookupInFlight={lookupInFlight}
                fingerprintId={fingerprintId}
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
    </TrackingContext.Provider>
  )
}

export default FetchViolations
