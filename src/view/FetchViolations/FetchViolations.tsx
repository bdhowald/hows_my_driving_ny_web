import React, { createContext, useEffect, useRef, useState } from 'react'
import FingerprintJS, { Agent } from '@fingerprintjs/fingerprintjs'
import mixpanel, { Mixpanel } from 'mixpanel-browser'
import { useParams } from 'react-router-dom'
import smoothscroll from 'smoothscroll-polyfill'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useCookies } from 'react-cookie'

import {
  USE_NEW_STYLE_DISPLAY_COOKIE,
  USE_SEARCH_FILTERS_COOKIE,
} from 'constants/cookies'
import L10N from 'constants/display'
import {
  MIXPANEL_IDLE_TIMEOUT_MILLISECONDS,
  MIXPANEL_RECORD_SESSIONS_PERCENT,
} from 'constants/tracking'
import useLookupIdentifierCookie from 'hooks/useLookupIdentifierCookie/useLookupIdentifierCookie'
import Vehicle from 'models/Vehicle/Vehicle'
import getPlateTypeName from 'utils/search/getPlateType/getPlateTypeName/getPlateTypeName'
import getListOfQueriedVehiclesAfterResponse from 'utils/processResults/getListOfQueriedVehiclesAfterResponse/getListOfQueriedVehiclesAfterResponse'
import getQueriedVehicleFromResponse from 'utils/processResults/getQueriedVehicleFromResponse/getQueriedVehicleFromResponse'
import performLookup from 'utils/search/performLookup/performLookup'
import AnalyticsTracker from 'utils/analytics/tracking'
import MixpanelTracker from 'utils/analytics/trackers/mixpanel'
import { VehicleQueryResponse } from 'types/responses'
import { VehicleDisplayResult } from 'types/vehicleDisplayResult'
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

  const [cookies, _] = useCookies([
    USE_NEW_STYLE_DISPLAY_COOKIE,
    USE_SEARCH_FILTERS_COOKIE,
  ])
  const useNewStyleDisplay = cookies[USE_NEW_STYLE_DISPLAY_COOKIE] === true
  const useSearchFilters = cookies[USE_SEARCH_FILTERS_COOKIE] === true

  const newStyleDisplayClassName = useNewStyleDisplay ? 'new-style' : ''

  const { removeLookupFromIdentifierCookie } = useLookupIdentifierCookie()

  const [lookupInFlight, setLookupInFlight] = useState(false)
  const [existingQueriesInFlight, setExistingQueriesInFlight] = useState(false)
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

      const queriedVehicle = getQueriedVehicleFromResponse(response)
      if (!queriedVehicle) {
        return
      }

      // Parse the results
      setQueriedVehicles((previouslyQueriedVehicleDisplayResults) =>
        getListOfQueriedVehiclesAfterResponse({
          previouslyQueriedVehicles: previouslyQueriedVehicleDisplayResults,
          queriedVehicle,
          useNewStyleDisplay,
          useSearchFilters,
        }),
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
          useNewStyleDisplay,
          useSearchFilters,
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
    const removedVehicle = queriedVehicles[indexToRemove].vehicle

    removeLookupFromIdentifierCookie(removedVehicle.uniqueIdentifier)

    tracker?.trackEvent('remove_lookup', {
      uniqueIdentifier: removedVehicle.uniqueIdentifier,
      useNewStyleDisplay,
      useSearchFilters,
    })

    setQueriedVehicles(newList)
  }

  return (
    <TrackingContext.Provider value={tracker}>
      <div>
        <Container fluid>
          <Row>
            <div className={`col-md-12 page-content-container ${newStyleDisplayClassName}`}>
              <Search
                lookupInFlight={lookupInFlight}
                fingerprintId={fingerprintId}
                previousLookupUniqueIdentifierFromQuery={uniqueIdentifier}
                queriedVehicles={queriedVehicles}
                searchError={searchError}
                setExistingQueriesInFlightFunction={setExistingQueriesInFlight}
                setLookupInFlightFunction={setLookupInFlight}
                setQueriedVehiclesFunction={setQueriedVehicles}
                setSearchErrorFunction={setSearchError}
              />
              <VehicleResults
                existingQueriesInFlight={existingQueriesInFlight}
                lookupInFlight={lookupInFlight}
                refreshLookupFunction={refreshLookup}
                removeLookupFunction={removeLookup}
                scrollRef={listRef}
                vehicleDisplayResults={queriedVehicles}
              />
            </div>
          </Row>
          <Row>
            <div className="col-md-12 page-content-container">
              <Footer />
            </div>
          </Row>
        </Container>
      </div>
    </TrackingContext.Provider>
  )
}

export default FetchViolations
