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
      {
        inputLocation: 'Jewel Ave @ 113thst',
        standardizedLocation: 'Jewel Avenue and 113th Street',
      },
      {
        inputLocation: 'Grand Central Pkwy Svc Rd @ 72nd Rd',
        standardizedLocation:
          'Grand Central Parkway Service Road and 72nd Road',
      },
      {
        inputLocation: 'Queens Blvd @ 63rd Rd',
        standardizedLocation: 'Queens Boulevard and 63rd Road',
      },
      {
        inputLocation: 'Whitestone Expwy @ Farrington St',
        standardizedLocation: 'Whitestone Expressway and Farrington Street',
      },
      {
        inputLocation: '223 Ave B',
        standardizedLocation: '223 Avenue B',
      },
      {
        inputLocation: 'Queens Midtown Expwy @ 69th Ln',
        standardizedLocation: 'Queens Midtown Expressway and 69th Lane',
      },
      {
        inputLocation: 'Van Dam St @ 48thave',
        standardizedLocation: 'Van Dam Street and 48th Avenue',
      },
      {
        inputLocation: '123 1 Ave',
        standardizedLocation: '123 1st Avenue',
      },
      {
        inputLocation: '123 2 Ave',
        standardizedLocation: '123 2nd Avenue',
      },
      {
        inputLocation: '123 3 Ave',
        standardizedLocation: '123 3rd Avenue',
      },
      {
        inputLocation: '123 4 Ave',
        standardizedLocation: '123 4th Avenue',
      },
      {
        inputLocation: '123 11 Ave',
        standardizedLocation: '123 11th Avenue',
      },
      {
        inputLocation: '123 12 Ave',
        standardizedLocation: '123 12th Avenue',
      },
      {
        inputLocation: '123 13 Ave',
        standardizedLocation: '123 13th Avenue',
      },
      {
        inputLocation: '123 14 Ave',
        standardizedLocation: '123 14th Avenue',
      },
      {
        inputLocation: '123 21 Ave',
        standardizedLocation: '123 21st Avenue',
      },
      {
        inputLocation: '123 22 Ave',
        standardizedLocation: '123 22nd Avenue',
      },
      {
        inputLocation: '123 23 Ave',
        standardizedLocation: '123 23rd Avenue',
      },
      {
        inputLocation: '123 24 Ave',
        standardizedLocation: '123 24th Avenue',
      },
      {
        inputLocation: '123 1 Av',
        standardizedLocation: '123 1st Avenue',
      },
      {
        inputLocation: '123 1 Av.',
        standardizedLocation: '123 1st Avenue',
      },
      {
        inputLocation: '123 1 Ave.',
        standardizedLocation: '123 1st Avenue',
      },
      {
        inputLocation: '123 1 Avenue',
        standardizedLocation: '123 1st Avenue',
      },
      {
        inputLocation: "Selfridge Street Ns Nansen Street 75' Wo",
        standardizedLocation:
          'North side of Nansen Street 75 feet west of Selfridge Street',
      },
      {
        inputLocation: 'West of South 3rd Hewes Street',
        standardizedLocation: 'Hewes Street west of South 3rd Street',
      },
      {
        inputLocation: 'Fdr Dr @ E Houston St',
        standardizedLocation: 'FDR Drive and East Houston Street',
      },
      {
        inputLocation: 'Kings Hwy @ E 17th St',
        standardizedLocation: 'Kings Highway and East 17th Street',
      },
      {
        inputLocation: 'Lexington Ave @ E66th St',
        standardizedLocation: 'Lexington Avenue and East 66th Street',
      },
      {
        inputLocation: 'Lexington Ave @ W66th St',
        standardizedLocation: 'Lexington Avenue and West 66th Street',
      },
      {
        inputLocation: 'Lexington Ave @ E 66th St',
        standardizedLocation: 'Lexington Avenue and East 66th Street',
      },
      {
        inputLocation: 'Lexington Ave @ W 66th St',
        standardizedLocation: 'Lexington Avenue and West 66th Street',
      },
      {
        inputLocation: 'N1st St @ Kent Ave',
        standardizedLocation: 'North 1st Street and Kent Avenue',
      },
      {
        inputLocation: 'N 1st St @ Kent Ave',
        standardizedLocation: 'North 1st Street and Kent Avenue',
      },
      {
        inputLocation: 'S 1st St @ Kent Ave',
        standardizedLocation: 'South 1st Street and Kent Avenue',
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
      {
        inputLocation:
          'North side of Nansen Street 75 feet west of Selfridge Street',
        standardizedLocation: 'Nansen Street and Selfridge Street',
      },
      {
        inputLocation: 'West of South 3rd Hewes Street',
        standardizedLocation: 'Hewes Street and South 3rd Street',
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
