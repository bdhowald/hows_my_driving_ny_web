import React, { useCallback, useEffect, useState } from 'react'

import mixpanel, { Mixpanel } from 'mixpanel-browser'
import Row from 'react-bootstrap/Row'
import { useCookies } from 'react-cookie'

import { getPreviousLookup } from 'boundaries/http'
import {
  LOOKUP_IDENTIFIER_COOKIE,
  USE_NEW_STYLE_DISPLAY_COOKIE,
} from 'constants/cookies'
import L10N from 'constants/display'
import { PlateType } from 'constants/plateTypes'
import handleLookupResults from 'utils/processResults/handleLookupResults/handleLookupResults'
import performLookup from 'utils/search/performLookup/performLookup'
import PlateLookup from 'utils/types/plateLookup'
import VehicleDisplayResult from 'utils/types/vehicleDisplayResult'
import { VehicleQueryResponse } from 'utils/types/responses'

import SearchControls from 'view/Search/SearchControls/SearchControls'

type InputChangeType =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>

type SearchPageProps = {
  fingerprintId: string | undefined
  lookupInFlight: boolean
  mixpanelInstance: Mixpanel | undefined
  previousLookupUniqueIdentifierFromQuery?: string
  queriedVehicles: VehicleDisplayResult[]
  searchError: boolean
  setLookupInFlight: React.Dispatch<React.SetStateAction<boolean>>
  setQueriedVehiclesFunction: React.Dispatch<
    React.SetStateAction<VehicleDisplayResult[]>
  >
  setSearchErrorFunction: React.Dispatch<React.SetStateAction<boolean>>
}

const ErrorMessage = ({
  setErrorFunction,
}: {
  setErrorFunction: (arg0: boolean) => void
}) => (
  <div className="alert alert-warning" role="alert">
    <span className="alert-text">Oops! Please try again.</span>
    <button
      aria-label="Close"
      className="btn-close"
      data-bs-dismiss="alert"
      onClick={() => {
        setErrorFunction(false)
      }}
      type="button"
    />
  </div>
)
ErrorMessage.displayName = 'ErrorMessage'

const JumbotronHeader = React.memo(() => (
  <>
    <h1 className="display-4">{L10N.sitewide.title}</h1>
    {L10N.query.jumbotronHeaderText}
    <hr className="opacity-25" />
  </>
))
JumbotronHeader.displayName = 'JumbotronHeader'

const Search = ({
  fingerprintId,
  lookupInFlight,
  mixpanelInstance,
  previousLookupUniqueIdentifierFromQuery,
  queriedVehicles,
  searchError,
  setLookupInFlight,
  setQueriedVehiclesFunction,
  setSearchErrorFunction,
}: SearchPageProps) => {
  const [currentLookup, setCurrentLookup] = useState<PlateLookup>({
    plateId: undefined,
    plateType: 'none',
    state: 'NY',
  })
  const [cookies, setCookie, removeCookie] = useCookies([
    LOOKUP_IDENTIFIER_COOKIE,
    USE_NEW_STYLE_DISPLAY_COOKIE,
  ])

  useEffect(() => {
    const queryParameters = new URLSearchParams(document.location.search)
    const useNewStyleDisplayCookiePresent =
      cookies[USE_NEW_STYLE_DISPLAY_COOKIE]

    const queryParamFeatureFlagEnabled =
      queryParameters.get('useNewStyleDisplay')

    // 10% of sessions are in experimental group (plus some internal testers)
    // 50% of sessions are in control group
    // 40% of sessions are available for progressive rollout
    const randomVariable = Math.random()
    const inExperimentalGroup =
      randomVariable * 10 > 9.0 || !!queryParamFeatureFlagEnabled
    const inControlGroup =
      randomVariable * 10 < 5.0 && !queryParamFeatureFlagEnabled

    const inReserveGroup = !inControlGroup && !inExperimentalGroup

    if (!useNewStyleDisplayCookiePresent || queryParamFeatureFlagEnabled) {
      if (inExperimentalGroup) {
        setCookie(USE_NEW_STYLE_DISPLAY_COOKIE, 'true', {
          maxAge: 31536000,
          path: '/',
        })
      }

      if (inControlGroup) {
        setCookie(USE_NEW_STYLE_DISPLAY_COOKIE, 'false', {
          maxAge: 31536000,
          path: '/',
        })
      }
    }

    if (inReserveGroup) {
      setCookie(USE_NEW_STYLE_DISPLAY_COOKIE, 'none', {
        maxAge: 31536000,
        path: '/',
      })
    }
  }, [])

  useEffect(() => {
    const uniqueIdentifiersToSaveInCookie =
      constructLookupIdentifierCookie(queriedVehicles)

    // Replace the old unique identifier for this vehicle
    // with the new unique identifier for this lookup.
    if (uniqueIdentifiersToSaveInCookie) {
      setOrRemoveLookupIdentifierCookie(uniqueIdentifiersToSaveInCookie)
    }
  }, [queriedVehicles])

  useEffect(() => {
    const displayPreviousLookup = async () => {
      if (previousLookupUniqueIdentifierFromQuery) {
        // Prevent another button press/submission
        setLookupInFlight(true)

        try {
          // url is of format howsmydrivingny.nyc/xxxxxxxx
          const response: VehicleQueryResponse = await getPreviousLookup(
            previousLookupUniqueIdentifierFromQuery,
          )

          // Parse the results
          handleLookupResults({
            response,
            fromPreviousLookupUniqueIdentifier: true,
            setQueriedVehiclesFunction,
          })
        } catch (error: unknown) {
          if (error) {
            setSearchErrorFunction(true)
          }
        }

        // Re-enable button
        setLookupInFlight(false)
      }

      if (cookies[LOOKUP_IDENTIFIER_COOKIE]) {
        // Prevent another button press/submission
        setLookupInFlight(true)

        // Previous lookups available in cookie
        try {
          // Get unique identifiers from cookie
          const cookieString: string = cookies[LOOKUP_IDENTIFIER_COOKIE] ?? ''

          // Filter out duplicate values and reverse the array.
          // The cookies are stored with the most recent identifiers
          // first, so searching for them in reverse order preserves
          // the quality that top results are more recent.
          const uniqueIdentifiersFromCookies = cookieString
            .split(',')
            .filter(
              (value, index, self) =>
                self.indexOf(value) === index &&
                // Don't lookup unique identifier twice if cookie value matches route.
                value !== previousLookupUniqueIdentifierFromQuery,
            )
            .reverse()

          // Gather the promises for the previous lookups
          const lookupPromises: Promise<VehicleQueryResponse>[] =
            uniqueIdentifiersFromCookies.map(
              // query for each
              async (uniqueIdentifier: string) =>
                getPreviousLookup(uniqueIdentifier),
            )

          // Handle results
          Promise.all(lookupPromises)
            .then((queries) =>
              queries.forEach((response) =>
                handleLookupResults({
                  response,
                  fromPreviousLookupUniqueIdentifier: false,
                  expandResults: false,
                  setQueriedVehiclesFunction,
                }),
              ),
            )
            .catch((error) => {
              if (error) {
                setSearchErrorFunction(true)
              }
            })
            .finally(() => setLookupInFlight(false))
        } catch (_: unknown) {
          // If queries return errors, blank out cookie
          setOrRemoveLookupIdentifierCookie(undefined)
        }
      }
    }
    displayPreviousLookup()
  }, [])

  const constructLookupIdentifierCookie = (
    vehicleDisplayResults: VehicleDisplayResult[],
  ): string =>
    vehicleDisplayResults
      .map(
        (vehicleDisplayResult) => vehicleDisplayResult.vehicle.uniqueIdentifier,
      )
      .filter(
        (identifier) => identifier !== previousLookupUniqueIdentifierFromQuery,
      )
      .toString()

  const handleInputChange = useCallback(
    (changeEvent: InputChangeType) => {
      return setCurrentLookup({
        ...currentLookup,
        ...{
          [changeEvent.currentTarget.name]:
            changeEvent.currentTarget.value.replace(/\s/g, ''),
        },
      })
    },
    [currentLookup],
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { plateId, plateType, state } = currentLookup

    if (plateId && state) {
      const trimmedPlate: string = plateId.trim()

      mixpanelInstance?.track('plate_lookup', {
        plate: trimmedPlate,
        plate_type: plateType,
        state: state,
      })

      performLookupAndHandleResults(trimmedPlate, plateType, state)
    }
  }

  const setOrRemoveLookupIdentifierCookie = (
    cookieString: string | undefined,
  ) => {
    if (cookieString) {
      setCookie(LOOKUP_IDENTIFIER_COOKIE, cookieString, {
        maxAge: 31536000,
        path: '/',
      })
      return
    }
    removeCookie(LOOKUP_IDENTIFIER_COOKIE)
  }

  const performLookupAndHandleResults = async (
    plate: string,
    plateType: PlateType | undefined,
    state: string,
  ) => {
    // Prevent another button press/submission
    setLookupInFlight(true)

    const mixpanelId = mixpanel?.get_distinct_id()

    try {
      // Perform the search
      const response: VehicleQueryResponse = await performLookup(
        plate,
        plateType,
        state,
        fingerprintId,
        mixpanelId,
      )

      // If query successful, reset error state
      setSearchErrorFunction(false)

      // Parse the results
      handleLookupResults({ response, setQueriedVehiclesFunction })
    } catch (error: unknown) {
      if (error) {
        setSearchErrorFunction(true)
      }
    }

    // Re-enable button
    setLookupInFlight(false)
  }

  return (
    <div className="jumbotron">
      <JumbotronHeader />
      <Row>
        <SearchControls
          currentLookup={currentLookup}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          lookupInFlight={lookupInFlight}
        />
        {searchError && (
          <ErrorMessage setErrorFunction={setSearchErrorFunction} />
        )}
      </Row>
    </div>
  )
}
Search.displayName = 'Search'

export default Search
