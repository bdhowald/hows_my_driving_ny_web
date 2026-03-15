import isApiErrorObject from './isApiErrorObject'

describe('isApiErrorObject', () => {
  it('should return true when the object is an api error object', () => {
    const legitApiErrorObject = {
      body: { stuff: 'something' },
      ok: false,
      status: 400,
      statusText: '',
      url: 'https://api.howsmydrivingny.nyc',
    }

    expect(isApiErrorObject(legitApiErrorObject)).toBe(true)
  })

  it('should return false when the object is a successful query response', () => {
    const impostorApiErrorObject = {
      body: { stuff: 'something' },
      ok: true,
      status: 200,
      statusText: '',
      url: 'https://api.howsmydrivingny.nyc',
    }

    expect(isApiErrorObject(impostorApiErrorObject)).toBe(false)
  })

  it('should return false when the object is missing required fields', () => {
    const impostorApiErrorObject = {
      body: { stuff: 'something' },
      ok: true,
      status: 200,
      statusText: '',
    }

    expect(isApiErrorObject(impostorApiErrorObject)).toBe(false)
  })

  it('should return false when the object is null', () => {
    const nullApiErrorObject = null

    expect(isApiErrorObject(nullApiErrorObject)).toBe(false)
  })

  it('should return false when the object is undefined', () => {
    const undefinedApiErrorObject = undefined

    expect(isApiErrorObject(undefinedApiErrorObject)).toBe(false)
  })

  it('should return false when the object is an empty object', () => {
    const emptyObjectApiErrorObject = {}

    expect(isApiErrorObject(emptyObjectApiErrorObject)).toBe(false)
  })
})
