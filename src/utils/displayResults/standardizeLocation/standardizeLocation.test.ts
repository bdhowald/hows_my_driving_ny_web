import standardizeLocation from './standardizeLocation'

describe('standardizeLocation', () => {
  describe('standardizeDisplayedLocation', () => {
    test.each([
      {
        inputLocation: 'Neptune Ave @ W 5th St',
        standardizedLocation: 'Neptune Avenue and West 5th Street',
      },
      {
        inputLocation: 'Ave W @ W 1st St',
        standardizedLocation: 'Avenue W and West 1st Street',
      },
      {
        inputLocation: 'Neptune Ave @ Sheepshead Bay Rd',
        standardizedLocation: 'Neptune Avenue and Sheepshead Bay Road',
      },
      {
        inputLocation: 'Van Duzer Street 100ft n/of Broad Street',
        standardizedLocation: 'Van Duzer Street 100 feet north of Broad Street',
      },
    ])(
      'renders the search-friendly query text $standardizedLocation when called with $inputLocation',
      ({ inputLocation, standardizedLocation }) => {
        expect(
          standardizeLocation.standardizeDisplayedLocation(inputLocation),
        ).toBe(standardizedLocation)
      },
    )
  })

  describe('standardizeLinkedSearchLocation', () => {
    test.each([
      {
        inputLocation: 'Knickerbocker Avenue 40 feet west of Flushing Avenue',
        standardizedLocation: 'Knickerbocker Avenue and Flushing Avenue',
      },
      {
        inputLocation: '23rd Street 50 feet east of 7th Avenue',
        standardizedLocation: '23rd Street and 7th Avenue',
      },
      {
        inputLocation: '21st Street 25 feet south of 44th Drive',
        standardizedLocation: '21st Street and 44th Drive',
      },
      {
        inputLocation: 'Van Duzer Street 100 feet north of Broad Street',
        standardizedLocation: 'Van Duzer Street and Broad Street',
      },
    ])(
      'renders the search-friendly query text $standardizedLocation when called with $inputLocation',
      ({ inputLocation, standardizedLocation }) => {
        expect(
          standardizeLocation.standardizeLinkedSearchLocation(inputLocation),
        ).toBe(standardizedLocation)
      },
    )
  })
})
