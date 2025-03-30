import React from 'react'
import { render, screen } from '@testing-library/react'

import { ViolationFactory } from '__fixtures__/models/Violation'
import standardizeLocation from 'utils/displayResults/standardizeLocation/standardizeLocation'

import ViolationDetail from './ViolationDetail'

describe('ViolationDetail', () => {
  const hideOffCanvasFunction = () => null

  describe('renders without error', () => {
    const violation = ViolationFactory.build({
      amountDue: 15,
      fineAmount: 65,
      fromDatabases: [
        {
          dataUpdatedAt: '2017-11-15T17:04:39.000Z',
          endpoint: 'https://data.cityofnewyork.us/resource/jt7v-77mi.json',
          name: 'Parking Violations Issued - Fiscal Year 2014',
        },
      ],
      getLocationDescription: () => '17th St and 8th Ave',
      getBorough: () => 'Manhattan',
      getTotalFined: () => 90.0,
      interestAmount: 0.69,
      registrationState: 'NY',
      paymentAmount: 75,
      penaltyAmount: 25,
      plateId: 'ABC1234',
      plateType: 'PAS',
      reductionAmount: 0.19,
      summonsImage: {
        url: 'https://nycserv.nyc.gov/NYCServWeb/ShowImage?searchID=12345',
        description: 'View Summons',
      },
      vehicleBodyType: '4DSD',
      vehicleColor: 'YW',
      vehicleMake: 'KIA',
      vehicleYear: '2019',
    })

    const standardizedLocation =
      standardizeLocation.standardizeDisplayedLocation(
        violation.getLocationDescription(),
      )

    it('should render a ViolationDetail component when it is visible', () => {
      render(
        <ViolationDetail
          hideOffCanvas={hideOffCanvasFunction}
          showViolationDetail={true}
          violationToInspect={violation}
        />,
      )

      // Header: summons number
      expect(screen.getByText('Summons #')).toBeInTheDocument()
      expect(screen.getByText(violation.summonsNumber)).toBeInTheDocument()

      // Time
      expect(screen.getByText('Time')).toBeInTheDocument()
      expect(
        screen.getByText(violation.getViolationDateTime()),
      ).toBeInTheDocument()

      const locationString = `${standardizedLocation} (${violation.getBorough()})`

      // Location
      expect(screen.getByText('Location')).toBeInTheDocument()
      expect(screen.getByText(locationString)).toBeInTheDocument()
      expect(
        screen.getByRole('link', { name: locationString }),
      ).toHaveAttribute(
        'href',
        'https://www.google.com/maps/search/17th+Street+and+8th+Avenue+Manhattan',
      )

      // Violation
      expect(screen.getByText('Violation')).toBeInTheDocument()
      expect(
        screen.getByText(violation.humanizedDescription),
      ).toBeInTheDocument()

      const plateString = 'New York ABC1234 (PAS)'

      // Plate
      expect(screen.getByText('Plate')).toBeInTheDocument()
      expect(screen.getByText(plateString)).toBeInTheDocument()

      const vehicleString = 'Yellow 2019 Kia Sedan'

      // Vehicle
      expect(screen.getByText('Vehicle')).toBeInTheDocument()
      expect(screen.getByText(vehicleString)).toBeInTheDocument()

      // Fines
      expect(screen.getByText('Fines')).toBeInTheDocument()

      expect(screen.getByText('Initial:')).toBeInTheDocument()
      expect(screen.getByText('$65.00')).toBeInTheDocument()

      expect(screen.getByText('Interest:')).toBeInTheDocument()
      expect(screen.getByText('$0.69')).toBeInTheDocument()

      expect(screen.getByText('Penalties:')).toBeInTheDocument()
      expect(screen.getByText('$25.00')).toBeInTheDocument()

      expect(screen.getByText('Total:')).toBeInTheDocument()
      expect(screen.getByText('$25.00')).toBeInTheDocument()

      expect(screen.getByText('Reductions:')).toBeInTheDocument()
      expect(screen.getByText('$0.19')).toBeInTheDocument()

      expect(screen.getByText('Paid:')).toBeInTheDocument()
      expect(screen.getByText('$75.00')).toBeInTheDocument()

      expect(screen.getByText('Outstanding:')).toBeInTheDocument()
      expect(screen.getByText('$15.00')).toBeInTheDocument()

      // Summons Image
      expect(screen.getByText('Summons Image')).toBeInTheDocument()
      expect(
        screen.getByRole('link', { name: 'See summons image' }),
      ).toHaveAttribute(
        'href',
        'https://nycserv.nyc.gov/NYCServWeb/ShowImage?searchID=12345',
      )

      // Data Sources
      expect(screen.getByText('Data Sources')).toBeInTheDocument()
      expect(
        screen.getByRole('link', {
          name: 'Parking Violations Issued - Fiscal Year 2014',
        }),
      ).toHaveAttribute(
        'href',
        `https://data.cityofnewyork.us/resource/jt7v-77mi.json?$where=summons_number=${violation.summonsNumber}`,
      )
    })

    it('should not render a ViolationDetail component when it is not visible', () => {
      render(
        <ViolationDetail
          hideOffCanvas={hideOffCanvasFunction}
          showViolationDetail={false}
          violationToInspect={violation}
        />,
      )

      // Header: summons number
      expect(screen.queryByText('Summons #')).not.toBeInTheDocument()
      expect(
        screen.queryByText(violation.summonsNumber),
      ).not.toBeInTheDocument()

      // Time
      expect(screen.queryByText('Time')).not.toBeInTheDocument()
      expect(
        screen.queryByText(violation.getViolationDateTime()),
      ).not.toBeInTheDocument()

      // Location
      expect(screen.queryByText('Location')).not.toBeInTheDocument()
      expect(
        screen.queryByText(
          `${standardizedLocation} (${violation.getBorough()})`,
        ),
      ).not.toBeInTheDocument()

      // Violation
      expect(screen.queryByText('Violation')).not.toBeInTheDocument()
      expect(
        screen.queryByText(violation.humanizedDescription),
      ).not.toBeInTheDocument()

      const plateString = 'New York ABC1234 (PAS)'

      // Plate
      expect(screen.queryByText('Plate')).not.toBeInTheDocument()
      expect(screen.queryByText(plateString)).not.toBeInTheDocument()

      const vehicleString = 'Yellow 2019 Kia Sedan'

      // Vehicle
      expect(screen.queryByText('Vehicle')).not.toBeInTheDocument()
      expect(screen.queryByText(vehicleString)).not.toBeInTheDocument()

      // Fines
      expect(screen.queryByText('Fines')).not.toBeInTheDocument()

      expect(screen.queryByText('Initial:')).not.toBeInTheDocument()
      expect(screen.queryByText('$65.00')).not.toBeInTheDocument()

      expect(screen.queryByText('Interest:')).not.toBeInTheDocument()
      expect(screen.queryByText('$0.69')).not.toBeInTheDocument()

      expect(screen.queryByText('Penalties:')).not.toBeInTheDocument()
      expect(screen.queryByText('$25.00')).not.toBeInTheDocument()

      expect(screen.queryByText('Total:')).not.toBeInTheDocument()
      expect(screen.queryByText('$25.00')).not.toBeInTheDocument()

      expect(screen.queryByText('Reductions:')).not.toBeInTheDocument()
      expect(screen.queryByText('$0.19')).not.toBeInTheDocument()

      expect(screen.queryByText('Paid:')).not.toBeInTheDocument()
      expect(screen.queryByText('$75.00')).not.toBeInTheDocument()

      expect(screen.queryByText('Outstanding:')).not.toBeInTheDocument()
      expect(screen.queryByText('$15.00')).not.toBeInTheDocument()

      // Summons Image
      expect(screen.queryByText('Summons Image')).not.toBeInTheDocument()
      expect(
        screen.queryByRole('link', { name: 'See violation image' }),
      ).not.toBeInTheDocument()

      // Data Sources
      expect(screen.queryByText('Data Sources')).not.toBeInTheDocument()
      expect(
        screen.queryByRole('link', {
          name: 'Parking Violations Issued - Fiscal Year 2014',
        }),
      ).not.toBeInTheDocument()
    })
  })

  it("should show 'Not available' for the violation description when there is none", () => {
    const violation = ViolationFactory.build({
      // fine, location, and summons image data to ensure only one 'Not available' on the page
      fineAmount: 50,
      getLocationDescription: () => '17th St and 8th Ave',
      getTotalFined: () => 50,
      summonsImage: {
        url: 'https://nycserv.nyc.gov/NYCServWeb/ShowImage?searchID=12345',
        description: 'View Summons',
      },

      humanizedDescription: undefined,
      violationCode: undefined,
    })

    render(
      <ViolationDetail
        hideOffCanvas={hideOffCanvasFunction}
        showViolationDetail={true}
        violationToInspect={violation}
      />,
    )

    expect(screen.getByText('Violation')).toBeInTheDocument()
    expect(screen.getByText('Not available')).toBeInTheDocument()
  })

  it('should show the borough for the location when the only location data is the borough', () => {
    const violation = ViolationFactory.build({
      // fine and summons image data to ensure only one 'Not available' on the page
      fineAmount: 50,
      getTotalFined: () => 50,
      summonsImage: {
        url: 'https://nycserv.nyc.gov/NYCServWeb/ShowImage?searchID=12345',
        description: 'View Summons',
      },

      getBorough: () => 'Staten Island',
      intersectingStreet: undefined,
      location: undefined,
      violationCounty: 'Staten Island',
    })

    render(
      <ViolationDetail
        hideOffCanvas={hideOffCanvasFunction}
        showViolationDetail={true}
        violationToInspect={violation}
      />,
    )

    expect(screen.getByText('Location')).toBeInTheDocument()
    expect(screen.getByText('Staten Island')).toBeInTheDocument()
    expect(screen.queryByText('Not available')).not.toBeInTheDocument()
  })

  it("should show 'No Location Available' for the location when there is no location data", () => {
    const violation = ViolationFactory.build({
      // fine and summons image data to ensure only one 'Not available' on the page
      fineAmount: 50,
      getTotalFined: () => 50,
      summonsImage: {
        url: 'https://nycserv.nyc.gov/NYCServWeb/ShowImage?searchID=12345',
        description: 'View Summons',
      },

      getBorough: () => 'N/A',
      intersectingStreet: undefined,
      location: undefined,
      violationCounty: undefined,
    })

    render(
      <ViolationDetail
        hideOffCanvas={hideOffCanvasFunction}
        showViolationDetail={true}
        violationToInspect={violation}
      />,
    )

    expect(screen.getByText('Location')).toBeInTheDocument()
    expect(screen.getByText('Not available')).toBeInTheDocument()
  })

  it("should show 'Not available' for the vehicle description string when there is no vehicle data", () => {
    const violation = ViolationFactory.build({
      // fine, location, and summons image data to ensure only one 'Not available' on the page
      fineAmount: 50,
      getLocationDescription: () => '17th St and 8th Ave',
      getTotalFined: () => 50,
      summonsImage: {
        url: 'https://nycserv.nyc.gov/NYCServWeb/ShowImage?searchID=12345',
        description: 'View Summons',
      },

      vehicleBodyType: undefined,
      vehicleColor: undefined,
      vehicleMake: undefined,
      vehicleYear: undefined,
    })

    render(
      <ViolationDetail
        hideOffCanvas={hideOffCanvasFunction}
        showViolationDetail={true}
        violationToInspect={violation}
      />,
    )

    expect(screen.getByText('Vehicle')).toBeInTheDocument()
    expect(screen.getByText('Not available')).toBeInTheDocument()
  })

  it("should show 'N/A' for the fines when there is no fine data", () => {
    const violation = ViolationFactory.build()

    render(
      <ViolationDetail
        hideOffCanvas={hideOffCanvasFunction}
        showViolationDetail={true}
        violationToInspect={violation}
      />,
    )

    expect(screen.getByText('Fines')).toBeInTheDocument()
    expect(screen.getByText('N/A')).toBeInTheDocument()
  })

  describe('summons images', () => {
    it("should show 'Not available' for the summons image when there is no summons image data", () => {
      const violation = ViolationFactory.build({
        // fine and location data to ensure only one 'Not available' on the page
        fineAmount: 50,
        getTotalFined: () => 50,
        getLocationDescription: () => '17th St and 8th Ave',
      })

      render(
        <ViolationDetail
          hideOffCanvas={hideOffCanvasFunction}
          showViolationDetail={true}
          violationToInspect={violation}
        />,
      )

      expect(screen.getByText('Summons Image')).toBeInTheDocument()
      expect(screen.getByText('Not available')).toBeInTheDocument()
      expect(screen.queryByText('See violation image')).not.toBeInTheDocument()
    })

    it("should show 'Not available for camera summons' for the summons image when it is a camera violation", () => {
      const violation = ViolationFactory.build({
        // fine and location data to ensure only one 'Not available' on the page
        fineAmount: 50,
        getTotalFined: () => 50,
        getLocationDescription: () => '17th St and 8th Ave',

        humanizedDescription: 'Mobile MTA Bus Stop Violation',
        isCameraViolation: () => true,
        violationCode: '43',
      })

      render(
        <ViolationDetail
          hideOffCanvas={hideOffCanvasFunction}
          showViolationDetail={true}
          violationToInspect={violation}
        />,
      )

      expect(screen.getByText('Summons Image')).toBeInTheDocument()
      expect(
        screen.getByText('Not available for camera summons'),
      ).toBeInTheDocument()
      expect(screen.queryByText('See violation image')).not.toBeInTheDocument()
    })
  })

  describe('should render a ViolationDetail component correctly given the window width', () => {
    const violation = ViolationFactory.build({
      amountDue: 15,
      fineAmount: 65,
      fromDatabases: [
        {
          dataUpdatedAt: '2017-11-15T17:04:39.000Z',
          endpoint: 'https://data.cityofnewyork.us/resource/jt7v-77mi.json',
          name: 'Parking Violations Issued - Fiscal Year 2014',
        },
      ],
      getLocationDescription: () => '17th St and 8th Ave',
      getBorough: () => 'Manhattan',
      getTotalFined: () => 90.0,
      interestAmount: 0.69,
      registrationState: 'NY',
      paymentAmount: 75,
      penaltyAmount: 25,
      plateId: 'ABC1234',
      plateType: 'PAS',
      reductionAmount: 0.19,
      summonsImage: {
        url: 'https://nycserv.nyc.gov/NYCServWeb/ShowImage?searchID=12345',
        description: 'View Summons',
      },
      vehicleBodyType: '4DSD',
      vehicleColor: 'YW',
      vehicleMake: 'KIA',
      vehicleYear: '2019',
    })

    let savedGlobalWidth: number

    beforeEach(() => {
      savedGlobalWidth = global.innerWidth
    })

    afterEach(() => {
      global.innerWidth = savedGlobalWidth
    })

    it('should render a ViolationDetail component when the page is greater than 576px', () => {
      // Change the viewport to show/hide full violation text
      global.innerWidth = 960

      // Trigger the window resize event.
      global.dispatchEvent(new Event('resize'))

      render(
        <ViolationDetail
          hideOffCanvas={hideOffCanvasFunction}
          showViolationDetail={true}
          violationToInspect={violation}
        />,
      )

      const offCanvas = screen.getByRole('dialog')

      expect(offCanvas).toBeInTheDocument()
      expect(offCanvas.classList.contains('offcanvas-start')).toBe(true)
    })

    it('should render a ViolationDetail component when the page is 576px', () => {
      // Change the viewport to show/hide full violation text
      global.innerWidth = 576

      // Trigger the window resize event.
      global.dispatchEvent(new Event('resize'))

      render(
        <ViolationDetail
          hideOffCanvas={hideOffCanvasFunction}
          showViolationDetail={true}
          violationToInspect={violation}
        />,
      )

      const offCanvas = screen.getByRole('dialog')

      expect(offCanvas).toBeInTheDocument()
      expect(offCanvas.classList.contains('offcanvas-start')).toBe(true)
    })

    it('should render a ViolationDetail component when the page is 480px', () => {
      // Change the viewport to show/hide full violation text
      global.innerWidth = 480

      // Trigger the window resize event.
      global.dispatchEvent(new Event('resize'))

      render(
        <ViolationDetail
          hideOffCanvas={hideOffCanvasFunction}
          showViolationDetail={true}
          violationToInspect={violation}
        />,
      )

      const offCanvas = screen.getByRole('dialog')

      expect(offCanvas).toBeInTheDocument()
      expect(offCanvas.classList.contains('offcanvas-bottom')).toBe(true)
    })
  })
})
