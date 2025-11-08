import React, { useCallback, useContext, useEffect, useState } from 'react'

import Row from 'react-bootstrap/Row'
import { useCookies } from 'react-cookie'

import { getPreviousLookup } from 'boundaries/http'
import {
  DEFAULT_COOKIE_PATH,
  DISPLAY_INTELLIGENT_SPEED_ASSISTANCE_NOTICE_COOKIE,
  LOOKUP_IDENTIFIER_COOKIE,
  USE_NEW_STYLE_DISPLAY_COOKIE,
} from 'constants/cookies'
import L10N from 'constants/display'
import HttpStatusCode from 'constants/httpStatusCode'
import { PlateType } from 'constants/plateTypes'
import { MILLISECONDS_IN_SECOND } from 'constants/time'
import useLookupIdentifierCookie from 'hooks/useLookupIdentifierCookie'
import getListOfQueriedVehiclesAfterResponse from 'utils/processResults/getListOfQueriedVehiclesAfterResponse/getListOfQueriedVehiclesAfterResponse'
import getQueriedVehicleFromResponse from 'utils/processResults/getQueriedVehicleFromResponse/getQueriedVehicleFromResponse'
import performLookup from 'utils/search/performLookup/performLookup'
import retryRequest from 'utils/search/retryRequest/retryRequest'
import isApiErrorObject from 'utils/types/isApiErrorObject/isApiErrorObject'
import isErrorQueryResponse from 'utils/types/isErrorQueryResponse/isErrorQueryResponse'
import PlateLookup from 'types/plateLookup'
import {
  VehicleDisplayErrorResult,
  VehicleDisplayResult,
} from 'types/vehicleDisplayResult'
import { VehicleQueryResponse } from 'types/responses'

import SearchControls from 'view/Search/SearchControls/SearchControls'
import { TrackingContext } from 'view/FetchViolations/FetchViolations'

type InputChangeType =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>

type SearchPageProps = {
  fingerprintId: string | undefined
  lookupInFlight: boolean
  previousLookupUniqueIdentifierFromQuery?: string
  queriedVehicles: VehicleDisplayResult[]
  searchError: boolean | string
  setExistingQueriesInFlightFunction: React.Dispatch<
    React.SetStateAction<boolean>
  >
  setLookupInFlightFunction: React.Dispatch<React.SetStateAction<boolean>>
  setQueriedVehiclesFunction: React.Dispatch<
    React.SetStateAction<VehicleDisplayResult[]>
  >
  setSearchErrorFunction: React.Dispatch<React.SetStateAction<boolean | string>>
}

const ErrorMessage = ({
  errorMessage,
  setErrorFunction,
}: {
  errorMessage: string | undefined
  setErrorFunction: (arg0: boolean) => void
}) => {
  const errorMessageToDisplay = errorMessage
    ? errorMessage
    : 'Oops! Please try again.'

  return (
    <div className="alert alert-warning" role="alert">
      <span className="alert-text">{errorMessageToDisplay}</span>
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
}
ErrorMessage.displayName = 'ErrorMessage'

const JumbotronHeader = React.memo(() => (
  <>
    <h1 className="display-4">{L10N.sitewide.title}</h1>
    {L10N.query.jumbotronHeaderText}
    <hr className="opacity-25" />
  </>
))
JumbotronHeader.displayName = 'JumbotronHeader'

const JumbotronHeaderAprilFools = React.memo(() => (
  <>
    <h1 className="display-4">
      How&apos;s My <span className="driving-strikethrough">Driving</span>{' '}
      Walking NY
    </h1>
    {L10N.query.jumbotronHeaderTextAprilFools}
    <hr className="opacity-25" />
  </>
))
JumbotronHeaderAprilFools.displayName = 'JumbotronHeaderAprilFools'

const Search = ({
  fingerprintId,
  lookupInFlight,
  previousLookupUniqueIdentifierFromQuery,
  queriedVehicles,
  searchError,
  setExistingQueriesInFlightFunction,
  setLookupInFlightFunction,
  setQueriedVehiclesFunction,
  setSearchErrorFunction,
}: SearchPageProps) => {
  const [currentLookup, setCurrentLookup] = useState<PlateLookup>({
    plateId: undefined,
    plateType: 'none',
    state: 'NY',
  })
  const [cookies, setCookie] = useCookies([
    DISPLAY_INTELLIGENT_SPEED_ASSISTANCE_NOTICE_COOKIE,
    LOOKUP_IDENTIFIER_COOKIE,
    USE_NEW_STYLE_DISPLAY_COOKIE,
  ])

  const { readLookupIdentifierCookie, syncIdentifiersToIdentifierCookie } =
    useLookupIdentifierCookie()

  const tracker = useContext(TrackingContext)

  const useNewStyleDisplay = cookies[USE_NEW_STYLE_DISPLAY_COOKIE] === true

  useEffect(() => {
    const queryParameters = new URLSearchParams(document.location.search)

    const useNewStyleDisplayCookiePresent =
      cookies[USE_NEW_STYLE_DISPLAY_COOKIE] !== null &&
      cookies[USE_NEW_STYLE_DISPLAY_COOKIE] !== undefined

    const queryParamFeatureFlagEnabled =
      queryParameters.get(USE_NEW_STYLE_DISPLAY_COOKIE) === 'true'

    const queryParamFeatureFlagDisabled =
      queryParameters.get(USE_NEW_STYLE_DISPLAY_COOKIE) === 'false'

    if (
      !useNewStyleDisplayCookiePresent ||
      !useNewStyleDisplay ||
      queryParamFeatureFlagEnabled ||
      queryParamFeatureFlagDisabled
    ) {
      // 100% of sessions are in experimental group
      // 0% of sessions are in control group
      // 0% of sessions are available for progressive rollout
      //
      // Only show old-style display if query params force it
      const inExperimentalGroup = !queryParamFeatureFlagDisabled
      const inControlGroup = queryParamFeatureFlagDisabled

      const inReserveGroup = !inControlGroup && !inExperimentalGroup

      if (inExperimentalGroup) {
        setCookie(USE_NEW_STYLE_DISPLAY_COOKIE, 'true', {
          maxAge: 31536000,
          path: DEFAULT_COOKIE_PATH,
        })
      }

      if (inControlGroup) {
        setCookie(USE_NEW_STYLE_DISPLAY_COOKIE, 'false', {
          maxAge: 31536000,
          path: DEFAULT_COOKIE_PATH,
        })
      }

      if (inReserveGroup) {
        setCookie(USE_NEW_STYLE_DISPLAY_COOKIE, 'none', {
          maxAge: 31536000,
          path: DEFAULT_COOKIE_PATH,
        })
      }
    }
  }, [])

  useEffect(() => {
    const queryParameters = new URLSearchParams(document.location.search)

    const displayIntelligentSpeedAssistanceNoticeCookie =
      !!cookies[DISPLAY_INTELLIGENT_SPEED_ASSISTANCE_NOTICE_COOKIE]

    const queryParamFeatureFlagEnabled =
      queryParameters.get(
        DISPLAY_INTELLIGENT_SPEED_ASSISTANCE_NOTICE_COOKIE,
      ) === 'true'

    const queryParamFeatureFlagDisabled =
      queryParameters.get(
        DISPLAY_INTELLIGENT_SPEED_ASSISTANCE_NOTICE_COOKIE,
      ) === 'false'

    if (
      !displayIntelligentSpeedAssistanceNoticeCookie ||
      queryParamFeatureFlagEnabled ||
      queryParamFeatureFlagDisabled
    ) {
      // 25% of sessions are in experimental group (plus some internal testers)
      // 50% of sessions are in control group
      // 25% of sessions are available for progressive rollout
      const randomVariable = Math.random()
      const inExperimentalGroup =
        randomVariable * 10 > 7.5 || queryParamFeatureFlagEnabled
      const inControlGroup =
        (randomVariable * 10 < 5.0 && !queryParamFeatureFlagEnabled) ||
        queryParamFeatureFlagDisabled

      const inReserveGroup = !inControlGroup && !inExperimentalGroup

      if (inExperimentalGroup) {
        setCookie(DISPLAY_INTELLIGENT_SPEED_ASSISTANCE_NOTICE_COOKIE, 'true', {
          maxAge: 31536000,
          path: DEFAULT_COOKIE_PATH,
        })
      }

      if (inControlGroup) {
        setCookie(DISPLAY_INTELLIGENT_SPEED_ASSISTANCE_NOTICE_COOKIE, 'false', {
          maxAge: 31536000,
          path: DEFAULT_COOKIE_PATH,
        })
      }

      if (inReserveGroup) {
        setCookie(DISPLAY_INTELLIGENT_SPEED_ASSISTANCE_NOTICE_COOKIE, 'none', {
          maxAge: 31536000,
          path: DEFAULT_COOKIE_PATH,
        })
      }
    }
  }, [])

  const getErrorType = (statusCode: number | undefined) => {
    if (statusCode === undefined) {
      return 'unknown error'
    }
    if (
      statusCode >= HttpStatusCode.BadRequest &&
      statusCode < HttpStatusCode.InternalServerError
    ) {
      return 'client error'
    }
    if (
      statusCode >= HttpStatusCode.InternalServerError &&
      statusCode <= HttpStatusCode.NetworkAuthenticationRequired
    ) {
      return 'server error'
    }
    return 'unknown error (status code unexpected)'
  }

  const trackUserReceivedError = (error: unknown, action: string) => {
    const wrappedError =
      error instanceof Error
        ? error
        : new Error(typeof error === 'string' ? error : JSON.stringify(error))

    const statusCode =
      isApiErrorObject(error) && isErrorQueryResponse(error.body)
        ? error.body.data[0].statusCode
        : undefined

    tracker?.trackEvent('user_saw_search_error', {
      action,
      errorType: getErrorType(statusCode),
      message: wrappedError.message,
      online: navigator.onLine,
      raw: String(error),
      stack: wrappedError.stack,
    })
  }

  const retrieveLookupsFromCookieIdentifiers = () => {
    // Prevent another button press/submission
    setExistingQueriesInFlightFunction(true)

    // Previous lookups available in cookie
    try {
      // Get unique identifiers from cookie
      const uniqueIdentifiersFromCookies = readLookupIdentifierCookie()

      // Filter out duplicate values.
      const uniqueIdentifiersWithoutDuplicates =
        uniqueIdentifiersFromCookies.filter(
          (value, index, self) =>
            self.indexOf(value) === index &&
            // Don't lookup unique identifier twice if cookie value matches route.
            value !== previousLookupUniqueIdentifierFromQuery,
        )

      // Gather the promises for the previous lookups
      const lookupRequestsWithRetry: {
        promise: Promise<VehicleQueryResponse>
        uniqueIdentifier: string
      }[] = uniqueIdentifiersWithoutDuplicates.map((identifier: string) => ({
        promise: retryRequest({
          // query for each
          asyncRequestFunction: () => {
            return getPreviousLookup(identifier)
          },
        }),
        uniqueIdentifier: identifier,
      }))

      const start = new Date()

      let numFailedResponses = 0

      // Handle results
      Promise.allSettled(lookupRequestsWithRetry.map((r) => r.promise))
        .then((allResponses) => {
          allResponses.forEach((settledResponse, index) => {
            const { status } = settledResponse

            if (status === 'fulfilled') {
              const { value: response } = settledResponse
              const queriedVehicle = getQueriedVehicleFromResponse(response)
              if (!queriedVehicle) {
                return
              }

              setQueriedVehiclesFunction(
                (previouslyQueriedVehicleDisplayResults) =>
                  getListOfQueriedVehiclesAfterResponse({
                    expandResults: false,
                    fromPreviousLookupUniqueIdentifier: false,
                    previouslyQueriedVehicles:
                      previouslyQueriedVehicleDisplayResults,
                    queriedVehicle,
                    useNewStyleDisplay,
                  }),
              )

              // If query successful, reset error state
              setSearchErrorFunction(false)

              return
            }

            numFailedResponses += 1

            const failedRequest = lookupRequestsWithRetry[index]
            const failedQueryVehiclePlaceholder: VehicleDisplayErrorResult['vehicle'] =
              {
                uniqueIdentifier: failedRequest.uniqueIdentifier,
              }

            setQueriedVehiclesFunction(
              (previouslyQueriedVehicleDisplayResults) =>
                getListOfQueriedVehiclesAfterResponse({
                  expandResults: false,
                  fromPreviousLookupUniqueIdentifier: false,
                  previouslyQueriedVehicles:
                    previouslyQueriedVehicleDisplayResults,
                  queriedVehicle: failedQueryVehiclePlaceholder,
                  useNewStyleDisplay,
                }),
            )
          })

          const finish = new Date()

          tracker?.trackEvent('lookups_retrieved_from_cookies', {
            numLookups: lookupRequestsWithRetry.length,
            timeToCompleteInSeconds:
              (finish.getTime() - start.getTime()) / MILLISECONDS_IN_SECOND,
            useNewStyleDisplay,
          })

          if (numFailedResponses > 0) {
            throw `${numFailedResponses} lookups failed. Please try again.`
          }
        })
        .catch((error) => {
          if (error) {
            setSearchErrorFunction(true)

            trackUserReceivedError(error, 'retrieve_lookups_from_cookie')
          }
        })
        .finally(() => setExistingQueriesInFlightFunction(false))
    } catch (error: unknown) {
      // If there is some unexpected synchronous error not with the requests themselves
      setSearchErrorFunction(true)

      trackUserReceivedError(error, 'retrieve_lookups_from_cookie')
    }
  }

  useEffect(() => {
    // Update cookie from unique identifiers
    const uniqueIdentifiersFromCurrentlyQueriedVehicles =
      getLookupIdentifiersForCurrentlyQueriedVehicles(queriedVehicles)

    syncIdentifiersToIdentifierCookie(
      uniqueIdentifiersFromCurrentlyQueriedVehicles,
    )
  }, [queriedVehicles])

  useEffect(() => {
    const displayPreviousLookup = async () => {
      if (previousLookupUniqueIdentifierFromQuery) {
        // Prevent another button press/submission
        setExistingQueriesInFlightFunction(true)

        tracker?.trackEvent('display_previous_lookup', {
          uniqueIdentifier: previousLookupUniqueIdentifierFromQuery,
          useNewStyleDisplay,
        })

        try {
          // url is of format howsmydrivingny.nyc/xxxxxxxx
          const response: VehicleQueryResponse = await retryRequest({
            asyncRequestFunction: () =>
              getPreviousLookup(previousLookupUniqueIdentifierFromQuery),
          })

          // If query successful, reset error state
          setSearchErrorFunction(false)

          const queriedVehicle = getQueriedVehicleFromResponse(response)
          if (!queriedVehicle) {
            return
          }

          // Parse the results
          setQueriedVehiclesFunction((previouslyQueriedVehicleDisplayResults) =>
            getListOfQueriedVehiclesAfterResponse({
              fromPreviousLookupUniqueIdentifier: true,
              previouslyQueriedVehicles: previouslyQueriedVehicleDisplayResults,
              queriedVehicle,
              useNewStyleDisplay,
            }),
          )
        } catch (error: unknown) {
          if (error) {
            setSearchErrorFunction(true)

            trackUserReceivedError(error, 'display_previous_lookup')
          }
        }

        // Re-enable button
        setExistingQueriesInFlightFunction(false)
      }

      if (cookies[LOOKUP_IDENTIFIER_COOKIE]) {
        retrieveLookupsFromCookieIdentifiers()
      }
    }
    displayPreviousLookup()
  }, [])

  const getLookupIdentifiersForCurrentlyQueriedVehicles = (
    vehicleDisplayResults: VehicleDisplayResult[],
  ): string[] =>
    vehicleDisplayResults
      .map(
        (vehicleDisplayResult) => vehicleDisplayResult.vehicle.uniqueIdentifier,
      )
      .filter(
        (identifier) => identifier !== previousLookupUniqueIdentifierFromQuery,
      )

  const handleInputChange = useCallback(
    (changeEvent: InputChangeType) => {
      const modififedInputValue =
        changeEvent.currentTarget.name === 'plateId'
          ? changeEvent.currentTarget.value.replace(/\s/g, '').toUpperCase()
          : changeEvent.currentTarget.value.replace(/\s/g, '')

      return setCurrentLookup({
        ...currentLookup,
        ...{
          [changeEvent.currentTarget.name]: modififedInputValue,
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

      performLookupAndHandleResults(trimmedPlate, plateType, state)
    }
  }

  const performLookupAndHandleResults = async (
    plate: string,
    plateType: PlateType | undefined,
    state: string,
  ) => {
    const start = new Date()

    // Prevent another button press/submission
    setLookupInFlightFunction(true)

    if (searchError && cookies[LOOKUP_IDENTIFIER_COOKIE]) {
      // If we are recovering from a previous query error,
      // try to retrieve the previous lookups first. Otherwise,
      // we'll lose all of our previous queries.
      retrieveLookupsFromCookieIdentifiers()
    }

    const mixpanelId = tracker?.getDistinctId('mixpanel')

    try {
      // Perform the search
      const response: VehicleQueryResponse = await retryRequest({
        asyncRequestFunction: () =>
          performLookup(plate, plateType, state, fingerprintId, mixpanelId),
      })

      const finish = new Date()

      tracker?.trackEvent('plate_lookup', {
        plate,
        plate_type: plateType,
        state,
        timeToCompleteInSeconds:
          (finish.getTime() - start.getTime()) / MILLISECONDS_IN_SECOND,
        useNewStyleDisplay,
      })

      // If query successful, reset error state
      setSearchErrorFunction(false)

      const queriedVehicle = getQueriedVehicleFromResponse(response)
      if (!queriedVehicle) {
        return
      }

      // Parse the results
      setQueriedVehiclesFunction((previouslyQueriedVehicleDisplayResults) =>
        getListOfQueriedVehiclesAfterResponse({
          queriedVehicle,
          previouslyQueriedVehicles: previouslyQueriedVehicleDisplayResults,
          tracker,
          useNewStyleDisplay,
        }),
      )
    } catch (error: unknown) {
      if (error) {
        if (isApiErrorObject(error) && isErrorQueryResponse(error.body)) {
          const errorBody = error.body
          const { data } = errorBody

          const erroredLookup = data[0]

          if (typeof erroredLookup.error === 'string') {
            setSearchErrorFunction(erroredLookup.error)
          }
        } else {
          setSearchErrorFunction(true)
        }

        trackUserReceivedError(error, 'perform_lookup')
      }
    }

    // Re-enable button
    setLookupInFlightFunction(false)
  }

  const newStyleDisplayClassName = useNewStyleDisplay ? 'new-style' : ''

  const now = new Date()
  const day = now.getDate()
  const month = now.getMonth() + 1

  const useAprilFoolsJumbotron =
    month === L10N.dates.aprilFoolsDay.month &&
    day === L10N.dates.aprilFoolsDay.day

  return (
    <div className={`jumbotron ${newStyleDisplayClassName}`}>
      {useAprilFoolsJumbotron ? (
        <JumbotronHeaderAprilFools />
      ) : (
        <JumbotronHeader />
      )}
      <Row>
        <SearchControls
          currentLookup={currentLookup}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          lookupInFlight={lookupInFlight}
        />
        {searchError && (
          <ErrorMessage
            errorMessage={searchError === true ? undefined : searchError}
            setErrorFunction={setSearchErrorFunction}
          />
        )}
      </Row>
    </div>
  )
}
Search.displayName = 'Search'

export default Search
