import React, { useCallback, useEffect, useState } from 'react'

import fp from 'fingerprintjs2'
import mixpanel from 'mixpanel-browser'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Row from 'react-bootstrap/Row'
import { useCookies } from 'react-cookie'

import { getPreviousLookup, performNewLookup } from 'boundaries/http'
import { LOOKUP_IDENTIFIER_COOKIE } from 'constants/cookies'
import L10N from 'constants/display'
import plateTypes, { PlateType } from 'constants/plateTypes'
import regions from 'constants/regions'
import { VehicleQueryRequest } from 'utils/types/requests'
import { Vehicle, VehicleQueryResponse } from 'utils/types/responses'

import SearchSelect from './SearchSelect'

type FingerprintJSResponse = [{key: string, value: string}]

type InputChangeType = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>

type InputHandlerType = {
  currentLookup: PlateLookup,
  handleInputChange: (changeEvent: InputChangeType) => void
}

type PlateLookup = {
  plateId: string | undefined,
  plateType: PlateType | undefined,
  state: string,
}

type SearchPageProps = {
  lookupInFlight: boolean
  previousLookupUniqueIdentifierFromQuery?: string
  queriedVehicles: Vehicle[]
  setLookupInFlight: React.Dispatch<React.SetStateAction<boolean>>
  setQueriedVehiclesFn: React.Dispatch<React.SetStateAction<Vehicle[]>>
}

const inputHandlerPropsEqual = (
  prevProps: InputHandlerType,
  nextProps: InputHandlerType
) => (
  prevProps.currentLookup === nextProps.currentLookup &&
    prevProps.handleInputChange === nextProps.handleInputChange
)

const JumbotronHeader = React.memo(() => (
  <>
    <h1 className='display-4'>{L10N.sitewide.title}</h1>
    {L10N.query.jumbotronHeaderText}
    <hr className="my-1" />
  </>
))
JumbotronHeader.displayName = 'JumbotronHeader'

const PlateTypeSelect = React.memo((
  { currentLookup, handleInputChange }: InputHandlerType
) => (
  <Col md>
    <Form.Group>
      <SearchSelect
        currentLookup={currentLookup}
        handleChange={handleInputChange}
        label='License Plate Type'
        selectFn={Object.entries(plateTypes).map(([name, info]) =>
          [name, info.displayName, info.codes] as [string, string, string[]]
        ).map(type => (
          <option
            key={type[0]}
            value={type[0]}
          >
            {type[1]}
          </option>
        ))}
        valueKey='plateType'
      />
    </Form.Group>
  </Col>
), inputHandlerPropsEqual)
PlateTypeSelect.displayName = 'PlateTypeSelect'

const RegionSelect = React.memo((
  { currentLookup, handleInputChange }: InputHandlerType
) => (
  <Col md>
    <Form.Group>
      <SearchSelect
        currentLookup={currentLookup}
        handleChange={handleInputChange}
        label={'Region'}
        selectFn={regions.map((region: { code: string, name: string} ) =>
          [region.code, `${region.name} (${region.code})`] as [string, string]
        ).map((region: [string, string]) => (
          <option
            key={region[0]}
            value={region[0]}
          >
            {region[1]}
          </option>
        ))}
        valueKey='state'
      />
    </Form.Group>
  </Col>
))
RegionSelect.displayName = 'RegionSelect'

const SearchButton = React.memo((
  { plateIdPresent, lookupInFlight }: { plateIdPresent: boolean, lookupInFlight: boolean }
) => (
  <Col md>
    <Form.Group>
      <input
        className='form-control btn btn-primary'
        disabled={!plateIdPresent || lookupInFlight}
        role="button"
        type="submit"
        value="Search"
      />
    </Form.Group>
  </Col>
))
SearchButton.displayName = 'SearchButton'

const Search = ({
  lookupInFlight,
  previousLookupUniqueIdentifierFromQuery,
  queriedVehicles,
  setLookupInFlight,
  setQueriedVehiclesFn,
}: SearchPageProps) => {
  const [fingerprintId, setFingerprintId] = useState<string | undefined>()
  const [currentLookup, setCurrentLookup] = useState<PlateLookup>({
    plateId: undefined,
    plateType: 'none',
    state: 'NY',
  })
  const [mixpanelId, setMixpanelId] = useState<string | undefined>()
  const [cookies, setCookie, removeCookie] = useCookies([LOOKUP_IDENTIFIER_COOKIE])
  
  useEffect(() => {
    const getFingerprint = (): Promise<FingerprintJSResponse> =>
      new Promise(resolve => {
        fp.get({ excludes: { adBlock: true }}, (components: any) => {
          resolve(components)
        })
      })

    if (!fingerprintId) {
      getFingerprint().then((fpResponse: FingerprintJSResponse) => {
        const values = fpResponse.map(function (component) { return component.value })
        const murmur = fp.x64hash128(values.join(''), 31)
        setFingerprintId(murmur)  
      })
    }
  }, [fingerprintId])

  useEffect(() => {
    mixpanel.init('f8491ce35ed8262c61e16e6b6abb83b3', {
      loaded: (mixpanel: { get_distinct_id: () => string}) => {
        setMixpanelId(mixpanel.get_distinct_id())
      }
    })
  }, [])

  const handleInputChange = useCallback((changeEvent: InputChangeType) => {
    return setCurrentLookup({
      ...currentLookup,
      ...{[changeEvent.currentTarget.name]: changeEvent.currentTarget.value.replace(/\s/g, '')}
    })
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault()

    const { plateId, plateType, state } = currentLookup

    if (plateId && state) {
      const trimmedPlate: string = plateId.trim()

      mixpanel.track('plate_lookup', {
        plate           : trimmedPlate,
        plate_type      : plateType,
        state           : state,
      })

      performLookup(trimmedPlate, plateType, state)
    }
  }

  const setOrRemoveLookupIdentifierCookie = (cookieString: string | undefined) => {
    if (cookieString !== cookies[LOOKUP_IDENTIFIER_COOKIE] ) {
      setCookie(LOOKUP_IDENTIFIER_COOKIE, cookieString, {
        maxAge: 31536000,
        path: '/'
      })
      return
    }
    removeCookie(LOOKUP_IDENTIFIER_COOKIE)
  }

  const parseLookupResults = (query: VehicleQueryResponse) => {
    const { data } = query

    if (data?.[0]) {
      const firstLookup = data[0]

      if (firstLookup.successfulLookup) {
        const queriedVehicle: Vehicle = firstLookup.vehicle

        const existingVehicle = queriedVehicles.find((vehicle: Vehicle) => {
          return vehicle.plate === queriedVehicle.plate &&
            vehicle.state === queriedVehicle.state &&
            // hacky way to determine array equality
            vehicle.plateTypes?.toString() === queriedVehicle.plateTypes?.toString()
        })

        if (existingVehicle) {
          // Do not update state if we just have the same data
          if (existingVehicle.uniqueIdentifier !== queriedVehicle.uniqueIdentifier) {

            // new list with stale lookup removed and fresh lookup added
            setQueriedVehiclesFn(previousQueriedVehicles => {
              const index = previousQueriedVehicles.indexOf(existingVehicle)

              const newList: Vehicle[] = [
                queriedVehicle,
                ...previousQueriedVehicles.slice(0, index),
                ...previousQueriedVehicles.slice(index + 1),
              ]

              const uniqueIdentifiersToSaveInCookie = newList.map((vehicle) =>
                vehicle.uniqueIdentifier
              ).filter((identifier) =>
                identifier !== previousLookupUniqueIdentifierFromQuery
              ).toString()

              // Replace the old unique identifier for this vehicle
              // with the new unique identifier for this lookup.
              setOrRemoveLookupIdentifierCookie(
                uniqueIdentifiersToSaveInCookie
              )

              return newList
            })
          }
        } else {
          // lookup for vehicle not in existing list
          setQueriedVehiclesFn(previousQueriedVehicles => {
            const newList: Vehicle[] = [
              queriedVehicle,
              ...previousQueriedVehicles
            ]

            const uniqueIdentifiersToSaveInCookie = newList.map((vehicle) =>
              vehicle.uniqueIdentifier
            ).filter((identifier) =>
              identifier !== previousLookupUniqueIdentifierFromQuery
            ).toString()

            setOrRemoveLookupIdentifierCookie(
              uniqueIdentifiersToSaveInCookie
            )

            return newList
          })
        }
      }
    }
  }

  const performLookup = async (plate: string, plateType: PlateType | undefined, state: string) => {
    // Prevent another button press/submission
    setLookupInFlight(true)

    const plateString = plateType && plateTypes[plateType]?.codes
      ? `${plate}:${state}:${plateTypes[plateType].codes}`
      : `${plate}:${state}`

    let requestParams: VehicleQueryRequest = {
      lookupSource: 'web_client',
      plate: plateString
    }
    if (fingerprintId) {
      requestParams.fingerprintId = fingerprintId
    }
    if (mixpanelId) {
      requestParams.mixpanelId = mixpanelId
    }

    // Perform the search
    const query: VehicleQueryResponse = await performNewLookup(requestParams)

    // Partse the results
    parseLookupResults(query)

    // Re-enable button
    setLookupInFlight(false)
  }

  useEffect(() => {
    const displayPreviousLookup = async () => {
      if (previousLookupUniqueIdentifierFromQuery) {
        // Prevent another button press/submission
        setLookupInFlight(true)

        // url is of format howsmydrivingny.nyc/xxxxxxxx
        const query: VehicleQueryResponse = await getPreviousLookup(
          previousLookupUniqueIdentifierFromQuery
        )

        // Partse the results
        parseLookupResults(query)

        // Re-enable button
        setLookupInFlight(false)
      }

      if (cookies[LOOKUP_IDENTIFIER_COOKIE]) {
        // Previous lookups available in cookie
        try {
          // Get unique identifiers from cookie
          const cookieString: string = cookies[
            LOOKUP_IDENTIFIER_COOKIE
          ] ?? ''

          // Filter out duplicate values and reverse the array.
          // The cookies are stored with the most recent identifiers
          // first, so searching for them in reverse order preserves
          // the quality that top results are more recent.
          const uniqueIdentifiersFromCookies = cookieString.split(',').filter(
            (value, index, self) => self.indexOf(value) === index
          ).reverse()

          // Prevent another button press/submission
          setLookupInFlight(true)

          // Gather the promises for the previous lookups
          const lookupPromises: Promise<VehicleQueryResponse>[] = uniqueIdentifiersFromCookies.map(
            // query for each
            async (uniqueIdentifier: string) => getPreviousLookup(uniqueIdentifier)
          )

          // Handle results
          Promise.all(lookupPromises).then((queries) =>
            queries.forEach((query) => parseLookupResults(query))
          ).finally(() =>
            setLookupInFlight(false)
          )

        } catch(e) {
          // If queries return errors, blank out cookie
          console.error('Error fetching previous lookups')
          setOrRemoveLookupIdentifierCookie(undefined)
        }
      }
    }
    displayPreviousLookup()
  }, [])

  return (
    <Jumbotron>
      <JumbotronHeader />
      <Row>
        <Form className='form' onSubmit={handleSubmit}>
          <Form.Row>
            <Col md>
              <Form.Group>
                <input
                  className='form-control'
                  name='plateId'
                  onChange={handleInputChange}
                  placeholder='Enter a plate...'
                  type="text"
                  value={currentLookup.plateId ?? ''}
                />
              </Form.Group>
            </Col>
            <RegionSelect currentLookup={currentLookup} handleInputChange={handleInputChange}/>
          </Form.Row>
          <Form.Row>
            <PlateTypeSelect currentLookup={currentLookup} handleInputChange={handleInputChange}/>
            <SearchButton lookupInFlight={lookupInFlight} plateIdPresent={!!currentLookup.plateId}/>
          </Form.Row>
        </Form>
      </Row>
    </Jumbotron>
  )
}

Search.displayName = 'Search'

export default Search