import { VehicleFactory } from '__fixtures__/models/Vehicle'

import isErrorQueryResponse from './isErrorQueryResponse'

describe('isErrorQueryResponse', () => {
  it('should return true when the object is an error query response', () => {
    const legitErrorQueryResponse = {
      data: [
        {
          error: 'something bad',
          statusCode: 500,
          successfulLookup: false,
        },
      ],
    }

    expect(isErrorQueryResponse(legitErrorQueryResponse)).toBe(true)
  })

  it('should return false when the object is a successful query response', () => {
    const impostorErrorQueryResponse = {
      data: [
        {
          statusCode: 200,
          successfulLookup: false,
          vehicle: VehicleFactory.build(),
        },
      ],
    }

    expect(isErrorQueryResponse(impostorErrorQueryResponse)).toBe(false)
  })

  it('should return false when the object is a redirect query response', () => {
    const impostorErrorQueryResponse = {
      data: [
        {
          statusCode: 301,
          successfulLookup: false,
        },
      ],
    }

    expect(isErrorQueryResponse(impostorErrorQueryResponse)).toBe(false)
  })

  it('should return false when the object is null', () => {
    const nullErrorQueryResponse = null

    expect(isErrorQueryResponse(nullErrorQueryResponse)).toBe(false)
  })

  it('should return false when the object is undefined', () => {
    const undefinedErrorQueryResponse = undefined

    expect(isErrorQueryResponse(undefinedErrorQueryResponse)).toBe(false)
  })

  it('should return false when the object is an empty object', () => {
    const emptyObjectErrorQueryResponse = {}

    expect(isErrorQueryResponse(emptyObjectErrorQueryResponse)).toBe(false)
  })
})
