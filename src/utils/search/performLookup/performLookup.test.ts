import * as boundaryFunctions from 'boundaries/http'

import performLookup from './performLookup'

describe('performLookup', () => {
  it('should call performNewLookup with plate and state', () => {
    const performNewLookupSpy = jest.spyOn(
      boundaryFunctions,
      'performNewLookup',
    )

    const plate = 'ABC1234'
    const state = 'NY'

    performLookup(plate, undefined, state)

    expect(performNewLookupSpy).toHaveBeenCalledWith({
      lookupSource: 'web_client',
      plate: 'ABC1234:NY',
    })
  })

  it('should call performNewLookup with plate, plateType, and state when they are provided', () => {
    const performNewLookupSpy = jest.spyOn(
      boundaryFunctions,
      'performNewLookup',
    )

    const plate = 'ABC1234'
    const state = 'NY'
    const plateType = 'commercial'

    performLookup(plate, plateType, state)

    expect(performNewLookupSpy).toHaveBeenCalledWith({
      lookupSource: 'web_client',
      plate:
        'ABC1234:NY:AGC,APP,CHC,CMB,COM,CSP,FAR,HAC,IRP,LOC,ORC,RGC,SPC,STG,THC,TRC',
    })
  })

  it('should call performNewLookup with plate and state, and fingerprintId and mixpanelId, if they are present', () => {
    const performNewLookupSpy = jest.spyOn(
      boundaryFunctions,
      'performNewLookup',
    )

    const plate = 'ABC1234'
    const state = 'NY'
    const fingerprintId = 'a1b2c3d4e5f6g7h8'
    const mixpanelId = '8h7g6f5e4d3c2b1a'

    performLookup(plate, undefined, state, fingerprintId, mixpanelId)

    expect(performNewLookupSpy).toHaveBeenCalledWith({
      fingerprintId,
      lookupSource: 'web_client',
      mixpanelId,
      plate: 'ABC1234:NY',
    })
  })
})
