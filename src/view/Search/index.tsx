import React, { useEffect, useState } from 'react'

import fp from 'fingerprintjs2'
import mixpanel from 'mixpanel-browser'

import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Row from 'react-bootstrap/Row'

import { getPreviousLookup, performNewLookup } from 'boundaries/http'
import L10N from 'constants/display'
import plateTypes, { PlateType } from 'constants/plateTypes'
import regions from 'constants/regions'
import { VehicleQueryRequest } from 'utils/types/requests'
import { Vehicle, VehicleQueryResponse } from 'utils/types/responses'

import SearchSelect from './SearchSelect'

type OwnProps = {
  previousLookupIdentifier?: string
  queriedVehicles: Vehicle[]
  setQueriedVehiclesFn: (arg0: Vehicle[]) => void
}

export default ({
  previousLookupIdentifier,
  setQueriedVehiclesFn,
  queriedVehicles
}: OwnProps) => {
  const [fingerprintId, setFingerprintId] = useState<string | undefined>()
  const [currentLookup, setCurrentLookup] = useState<{
    plateId: string | undefined,
    plateType: PlateType | undefined,
    state: string,
  }>({
    plateId: undefined,
    plateType: 'passenger',
    state: 'NY',
  })
  const [lookupInFlight, setLookupInFlight] = useState(false)
  const [mixpanelId, setMixpanelId] = useState<string | undefined>()
  
  useEffect(() => {
    type FingerprintJSResponse = [{key: string, value: string}]
    const getFingerprint = (): Promise<FingerprintJSResponse> =>
      new Promise(resolve => {
        fp.get({ excludes: { adBlock: true}}, (components: any) => {
          resolve(components);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    return setCurrentLookup({
      ...currentLookup,
      ...{[e.currentTarget.name]: e.currentTarget.value}
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault()

    const { plateId, plateType, state } = currentLookup

    if (plateId && state) {
      mixpanel.track('plate_lookup', {
        plate           : plateId,
        plate_type      : plateTypes,
        state           : state,
      })

      performLookup(plateId, plateType, state);
    }
  }

  const parseResults = (query: VehicleQueryResponse) => {
    const { data } = query

    if (data?.[0]) {
      const firstLookup = data[0]

      if (firstLookup.successfulLookup) {
        const queriedVehicle: Vehicle = firstLookup.vehicle

        const existingVehicle = queriedVehicles.find((vehicle: Vehicle) => {
          return vehicle.plate === queriedVehicle.plate &&
            vehicle.state === queriedVehicle.state &&
            // hacky way to determine array equality
            vehicle.plateTypes.toString() === queriedVehicle.plateTypes?.toString()
        })

        const index = existingVehicle ? queriedVehicles.indexOf(existingVehicle) : -1

        if (index !== -1) {
          const newList: Vehicle[] = [
            ...queriedVehicles.slice(0, index),
            ...queriedVehicles.slice(index + 1),
            queriedVehicle
          ]
          setQueriedVehiclesFn(newList)
        } else {
          const newList: Vehicle[] = [
            queriedVehicle,
            ...queriedVehicles
          ]
          setQueriedVehiclesFn(newList)
        }
      }
    }
  }

  const performLookup = async (plate: string, plateType: PlateType | undefined, state: string) => {

    setLookupInFlight(true)

    const plateString = plateType && plateTypes[plateType]?.codes ? `${plate.trim()}:${state}:${plateTypes[plateType]?.codes}` : `${plate}:${state}`

    console.log(plateString)

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

    const query: VehicleQueryResponse = await performNewLookup(requestParams)
    parseResults(query)

    setLookupInFlight(false)
  }

  useEffect(() => {
    const displayPreviousLookup = async () => {
      if (previousLookupIdentifier) {
        const query: VehicleQueryResponse = await getPreviousLookup(previousLookupIdentifier)
        parseResults(query)
      }
    }
    displayPreviousLookup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousLookupIdentifier])

  const JumbotronHeader = () => (
    <>
      <h1 className='display-4'>{L10N.sitewide.title}</h1>
      {L10N.queryPage.jumbotronHeaderText}
      <hr className="my-1" />
    </>
  )

  return (
    <Jumbotron>
      <JumbotronHeader />
      <Row>
        <Form className='form' onSubmit={handleSubmit}>
          <Form.Row>
            <Col md={true}>
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
            <Col md={true}>
              <Form.Group>
                <SearchSelect
                  currentLookup={currentLookup}
                  handleChange={handleInputChange}
                  label={'Region'}
                  selectFn={regions.map((region: { code: string, name: string} ) =>
                    [region.code, `${region.name} (${region.code})`] as [string, string]
                  ).map((region: [string, string]) => 
                    <option key={region[0]} value={region[0]}>{region[1]}</option>
                  )}
                  valueKey={'state'}
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col md={true}>
              <Form.Group>
                <SearchSelect
                  currentLookup={currentLookup}
                  handleChange={handleInputChange}
                  label={'License Plate Type'}
                  selectFn={Object.entries(plateTypes).map(([name, info]) => 
                    [name, info.displayName, info.codes] as [string, string, string[]]).map(type =>
                    <option key={type[0]} value={type[0]}>{type[1]}</option>
                  )}
                  valueKey={'plateType'}
                />
              </Form.Group>
            </Col>
            <Col md={true}>
              <Form.Group>
                <input
                  className='form-control btn btn-primary'
                  disabled={!currentLookup.plateId || lookupInFlight}
                  type="submit"
                  value="Search"
                />
              </Form.Group>
            </Col>
          </Form.Row>
        </Form>
      </Row>
    </Jumbotron>
  )
}
