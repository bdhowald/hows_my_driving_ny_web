import React, { useContext, useEffect, useRef, useState } from 'react'
import FingerprintJS, { Agent } from '@fingerprintjs/fingerprintjs'
import { useParams } from 'react-router-dom'
import smoothscroll from 'smoothscroll-polyfill'
import { useCookies } from 'react-cookie'

import {
  USE_NEW_STYLE_DISPLAY_COOKIE,
  USE_SEARCH_FILTERS_COOKIE,
} from 'constants/cookies'
import L10N from 'constants/display'
import { ApplicationContext } from 'context/ApplicationContext'

import useLookupIdentifierCookie from 'hooks/useLookupIdentifierCookie/useLookupIdentifierCookie'
import Vehicle from 'models/Vehicle/Vehicle'
import getPlateTypeName from 'utils/search/getPlateType/getPlateTypeName/getPlateTypeName'
import getListOfQueriedVehiclesAfterResponse from 'utils/processResults/getListOfQueriedVehiclesAfterResponse/getListOfQueriedVehiclesAfterResponse'
import getQueriedVehicleFromResponse from 'utils/processResults/getQueriedVehicleFromResponse/getQueriedVehicleFromResponse'
import performLookup from 'utils/search/performLookup/performLookup'
import { VehicleQueryResponse } from 'types/responses'
import { VehicleDisplayResult } from 'types/vehicleDisplayResult'

import Search from './Search/Search'
import VehicleResults from './VehicleResults/VehicleResults'

import './VehicleLookup.css'

smoothscroll.polyfill()

const VehicleLookup = () => {
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

  // Get tracker
  const applicationContext = useContext(ApplicationContext)
  const { tracker } = applicationContext

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
    <div
      className={`col-md-12 vehicle-lookup-content-container ${newStyleDisplayClassName}`}
    >
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
  )
}

export default VehicleLookup
