import React, { useRef } from 'react'
import { Cookies, CookiesProvider } from 'react-cookie'
import { render, renderHook, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { VehicleFactory } from '__fixtures__/models/Vehicle'

import VehicleResults from './VehicleResults'

describe('VehicleResults', () => {
  const refreshLookupFunction: () => Promise<void> = () => new Promise(() => {})
  const removeLookupFunction = () => null

  describe('renders without error', () => {
    it('should render successfully with the new-style display', () => {
      const vehicle = VehicleFactory.build()
      const vehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle,
      }
      const ref = renderHook(() => useRef<HTMLDivElement>(null)).result.current

      render(
        <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
          <VehicleResults
            existingQueriesInFlight={false}
            lookupInFlight={false}
            refreshLookupFunction={refreshLookupFunction}
            removeLookupFunction={removeLookupFunction}
            scrollRef={ref}
            vehicleDisplayResults={[vehicleDisplayResult]}
          />
          ,
        </CookiesProvider>,
      )

      expect(
        screen.getByTestId(`lookup-${vehicle.uniqueIdentifier}`),
      ).toBeInTheDocument()
    })

    it('should render successfully with the old-style display', () => {
      const vehicle = VehicleFactory.build()
      const vehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle,
      }
      const ref = renderHook(() => useRef<HTMLDivElement>(null)).result.current

      render(
        <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
          <VehicleResults
            existingQueriesInFlight={false}
            lookupInFlight={false}
            refreshLookupFunction={refreshLookupFunction}
            removeLookupFunction={removeLookupFunction}
            scrollRef={ref}
            vehicleDisplayResults={[vehicleDisplayResult]}
          />
          ,
        </CookiesProvider>,
      )

      expect(
        screen.getByTestId(`lookup-${vehicle.uniqueIdentifier}`),
      ).toBeInTheDocument()
    })

    it('should render a shimmer component when existing queries are in flight', () => {
      const vehicle = VehicleFactory.build()
      const vehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle,
      }
      const ref = renderHook(() => useRef<HTMLDivElement>(null)).result.current

      render(
        <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
          <VehicleResults
            existingQueriesInFlight={true}
            lookupInFlight={false}
            refreshLookupFunction={refreshLookupFunction}
            removeLookupFunction={removeLookupFunction}
            scrollRef={ref}
            vehicleDisplayResults={[vehicleDisplayResult]}
          />
          ,
        </CookiesProvider>,
      )

      expect(screen.getByTestId('shimmer-loader')).toBeInTheDocument()
    })

    it('should render a shimmer component when a new query is in flight', () => {
      const vehicle = VehicleFactory.build()
      const vehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle,
      }
      const ref = renderHook(() => useRef<HTMLDivElement>(null)).result.current

      render(
        <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
          <VehicleResults
            existingQueriesInFlight={false}
            lookupInFlight={true}
            refreshLookupFunction={refreshLookupFunction}
            removeLookupFunction={removeLookupFunction}
            scrollRef={ref}
            vehicleDisplayResults={[vehicleDisplayResult]}
          />
          ,
        </CookiesProvider>,
      )

      expect(screen.getByTestId('shimmer-loader')).toBeInTheDocument()
    })
  })

  describe('filters', () => {
    beforeEach(() => {
      window.HTMLElement.prototype.scrollIntoView = function () {}
    })

    it('should display the filters control if there are results to display', () => {
      const vehicle = VehicleFactory.build()
      const vehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle,
      }
      const ref = renderHook(() => useRef<HTMLDivElement>(null)).result.current

      render(
        <VehicleResults
          existingQueriesInFlight={false}
          lookupInFlight={true}
          refreshLookupFunction={refreshLookupFunction}
          removeLookupFunction={removeLookupFunction}
          scrollRef={ref}
          vehicleDisplayResults={[vehicleDisplayResult]}
        />,
      )

      const resultsheader = screen.getByText('Showing 1 result')
      const showFilterMenuButton = screen.getByRole('button', {
        name: 'Filter',
      })

      expect(resultsheader).toBeInTheDocument()
      expect(showFilterMenuButton).toBeInTheDocument()
    })

    it('should not display the filters control if there are no results to display', () => {
      const ref = renderHook(() => useRef<HTMLDivElement>(null)).result.current

      render(
        <VehicleResults
          existingQueriesInFlight={false}
          lookupInFlight={true}
          refreshLookupFunction={refreshLookupFunction}
          removeLookupFunction={removeLookupFunction}
          scrollRef={ref}
          vehicleDisplayResults={[]}
        />,
      )

      const resultsheader = screen.queryByText('Showing 1 result')
      const showFilterMenuButton = screen.queryByRole('button', {
        name: 'Filter',
      })

      expect(resultsheader).toBeNull()
      expect(showFilterMenuButton).toBeNull()
    })

    it('should allow a user to set and apply filters and then filter those results for matches', () => {
      const ref = renderHook(() => useRef<HTMLDivElement>(null)).result.current

      const plate = 'ABC1234'

      const desiredPlateTextFilter = 'ABC'
      const desiredPlateTypeFilter = 'passenger'
      const desiredRegionFilter = 'NY'
      const searchedFromFilter = '2025-07-04'
      const searchedToFilter = '2025-07-11'
      const desiredNumberOfViolationsSliderValue = 50

      const matchingVehicleByAllFilters = VehicleFactory.build({
        lookupDateEastern: '2025-07-06T17:34:02.837-04:00',
        violationsCount: 63,
        plate: 'ABC1234',
        plateTypes: [
          'AGR',
          'ARG',
          'AYG',
          'BOB',
          'CMH',
          'FPW',
          'GSM',
          'HAM',
          'HIS',
          'JWV',
          'MCL',
          'NLM',
          'ORG',
          'PAS',
          'PHS',
          'PPH',
          'RGL',
          'SOS',
          'SPO',
          'SRF',
          'WUG',
        ],
        state: desiredRegionFilter,
        uniqueIdentifier: 'a1b2c3d4',
      })

      // Vehicle matches filters, except by plate text
      const matchingVehicleByAllButOneFilter = VehicleFactory.build({
        lookupDateEastern: '2025-07-08T10:12:44.948-04:00',
        violationsCount: 63,
        plate: 'ADC1234',
        plateTypes: [
          'AGR',
          'ARG',
          'AYG',
          'BOB',
          'CMH',
          'FPW',
          'GSM',
          'HAM',
          'HIS',
          'JWV',
          'MCL',
          'NLM',
          'ORG',
          'PAS',
          'PHS',
          'PPH',
          'RGL',
          'SOS',
          'SPO',
          'SRF',
          'WUG',
        ],
        state: desiredRegionFilter,
        uniqueIdentifier: 'e5f6g7h8',
      })

      const vehicleDisplayResults = [
        {
          expandResults: false,
          fromPreviousLookupUniqueIdentifier: false,
          isSuccessfulLookup: true,
          vehicle: matchingVehicleByAllFilters,
        },
        {
          expandResults: false,
          fromPreviousLookupUniqueIdentifier: false,
          isSuccessfulLookup: true,
          vehicle: matchingVehicleByAllButOneFilter,
        },
      ]

      render(
        <VehicleResults
          existingQueriesInFlight={false}
          lookupInFlight={true}
          refreshLookupFunction={refreshLookupFunction}
          removeLookupFunction={removeLookupFunction}
          scrollRef={ref}
          vehicleDisplayResults={vehicleDisplayResults}
        />,
      )

      // Expect one result to start
      const resultsheader = screen.getByText('Showing 2 results')
      expect(resultsheader).toBeInTheDocument()

      const showFilterMenuButton = screen.getByRole('button', {
        name: 'Filter',
      })

      // Click to open filter menu
      userEvent.click(showFilterMenuButton)

      const plateTextInput = screen.getByRole('textbox', {
        name: 'Plate',
      })
      const plateTypeSelect = screen.getByRole('combobox', {
        name: 'Type',
      })
      const regionSelect = screen.getByRole('combobox', {
        name: 'Region',
      })
      const searchedFromTextInput = screen.getByLabelText('Searched from')
      const searchedToTextInput = screen.getByLabelText('Searched to')
      const numberOfViolationsCheckbox = screen.getByRole('checkbox', {
        name: 'Number of violations ≥ ...',
      })
      const numberOfViolationsSlider = screen.getByRole('slider')

      const applyFiltersButton = screen.getByRole('button', {
        name: 'Apply filters',
      })

      // Type plate text into filter
      userEvent.type(plateTextInput, desiredPlateTextFilter)
      expect(plateTextInput).toHaveValue(desiredPlateTextFilter)

      // Select plate type from filter
      userEvent.selectOptions(plateTypeSelect, desiredPlateTypeFilter)
      expect(plateTypeSelect).toHaveValue(desiredPlateTypeFilter)

      // Select region from filter
      userEvent.selectOptions(regionSelect, desiredRegionFilter)
      expect(regionSelect).toHaveValue(desiredRegionFilter)

      // Type start date into filter
      userEvent.type(searchedFromTextInput, searchedFromFilter)
      expect(searchedFromTextInput).toHaveValue(searchedFromFilter)

      // Type end date into filter
      userEvent.type(searchedToTextInput, searchedToFilter)
      expect(searchedToTextInput).toHaveValue(searchedToFilter)

      // Search for filter enable/disable checkbox
      expect(numberOfViolationsCheckbox).not.toBeChecked()
      expect(numberOfViolationsSlider).toHaveClass('d-none') // can't test bootstrap applied styles

      // Enable filter with checkbox
      userEvent.click(numberOfViolationsCheckbox)
      expect(numberOfViolationsCheckbox).toBeChecked()
      expect(numberOfViolationsSlider).not.toHaveClass('d-none')

      // Drag slider to desired value in filter
      fireEvent.change(numberOfViolationsSlider, {
        target: { value: desiredNumberOfViolationsSliderValue },
      })
      expect(numberOfViolationsSlider).toHaveValue(
        desiredNumberOfViolationsSliderValue.toString(),
      )

      // Submit filter menu
      userEvent.click(applyFiltersButton)

      // Expect one result with filters
      expect(resultsheader).toHaveTextContent('Showing 1 result')

      // The vehicle card should be visible
      const vehicleResultCard = screen.getByTestId(
        `lookup-${matchingVehicleByAllFilters.uniqueIdentifier}`,
      )
      expect(vehicleResultCard).toBeInTheDocument()

      // Filter breadcrumbs should be on the page
      const filterBreadcrumbs = screen.getAllByLabelText('display filters menu')

      // There are five possible filters and all should be showing
      expect(filterBreadcrumbs.length).toBe(5)

      // Check all five breadcrumbs
      const plateTextFilterBreadcrumb = screen.getByText(': ABC')
      expect(plateTextFilterBreadcrumb).toBeInTheDocument()

      const stateFilterBreadcrumb = screen.getByText(': NY')
      expect(stateFilterBreadcrumb).toBeInTheDocument()

      const plateTypeFilterBreadcrumb = screen.getByText(': Passenger')
      expect(plateTypeFilterBreadcrumb).toBeInTheDocument()

      const dateRangeFilterBreadcrumb = screen.getByText(
        ': 07/04/2025 - 07/11/2025',
      )
      expect(dateRangeFilterBreadcrumb).toBeInTheDocument()

      const numberOfViolationsFilterBreadcrumb = screen.getByText(': 50')
      expect(numberOfViolationsFilterBreadcrumb).toBeInTheDocument()
    })

    it('should allow show no vehicle results if none match filters', () => {
      const ref = renderHook(() => useRef<HTMLDivElement>(null)).result.current

      const plate = 'ABC1234'

      const desiredPlateTextFilter = 'ABC'
      const desiredPlateTypeFilter = 'passenger'
      const desiredRegionFilter = 'NY'
      const searchedFromFilter = '2025-07-04'
      const searchedToFilter = '2025-07-11'
      const desiredNumberOfViolationsSliderValue = 50

      // Vehicle matches filters, except by number of violations
      const matchingVehicleByAllButOneFilter = VehicleFactory.build({
        lookupDateEastern: '2025-07-08T10:12:44.948-04:00',
        violationsCount: 63,
        plate: 'ADC1234',
        plateTypes: [
          'AGR',
          'ARG',
          'AYG',
          'BOB',
          'CMH',
          'FPW',
          'GSM',
          'HAM',
          'HIS',
          'JWV',
          'MCL',
          'NLM',
          'ORG',
          'PAS',
          'PHS',
          'PPH',
          'RGL',
          'SOS',
          'SPO',
          'SRF',
          'WUG',
        ],
        state: desiredRegionFilter,
        uniqueIdentifier: 'e5f6g7h8',
      })

      const vehicleDisplayResults = [
        {
          expandResults: false,
          fromPreviousLookupUniqueIdentifier: false,
          isSuccessfulLookup: true,
          vehicle: matchingVehicleByAllButOneFilter,
        },
      ]

      render(
        <VehicleResults
          existingQueriesInFlight={false}
          lookupInFlight={true}
          refreshLookupFunction={refreshLookupFunction}
          removeLookupFunction={removeLookupFunction}
          scrollRef={ref}
          vehicleDisplayResults={vehicleDisplayResults}
        />,
      )

      // Expect one result to start
      const resultsheader = screen.getByText('Showing 1 result')
      expect(resultsheader).toBeInTheDocument()

      const showFilterMenuButton = screen.getByRole('button', {
        name: 'Filter',
      })

      // Click to open filter menu
      userEvent.click(showFilterMenuButton)

      const plateTextInput = screen.getByRole('textbox', {
        name: 'Plate',
      })
      const plateTypeSelect = screen.getByRole('combobox', {
        name: 'Type',
      })
      const regionSelect = screen.getByRole('combobox', {
        name: 'Region',
      })
      const searchedFromTextInput = screen.getByLabelText('Searched from')
      const searchedToTextInput = screen.getByLabelText('Searched to')
      const numberOfViolationsCheckbox = screen.getByRole('checkbox', {
        name: 'Number of violations ≥ ...',
      })
      const numberOfViolationsSlider = screen.getByRole('slider')

      const applyFiltersButton = screen.getByRole('button', {
        name: 'Apply filters',
      })

      // Type plate text into filter
      userEvent.type(plateTextInput, desiredPlateTextFilter)
      expect(plateTextInput).toHaveValue(desiredPlateTextFilter)

      // Select plate type from filter
      userEvent.selectOptions(plateTypeSelect, desiredPlateTypeFilter)
      expect(plateTypeSelect).toHaveValue(desiredPlateTypeFilter)

      // Select region from filter
      userEvent.selectOptions(regionSelect, desiredRegionFilter)
      expect(regionSelect).toHaveValue(desiredRegionFilter)

      // Type start date into filter
      userEvent.type(searchedFromTextInput, searchedFromFilter)
      expect(searchedFromTextInput).toHaveValue(searchedFromFilter)

      // Type end date into filter
      userEvent.type(searchedToTextInput, searchedToFilter)
      expect(searchedToTextInput).toHaveValue(searchedToFilter)

      // Search for filter enable/disable checkbox
      expect(numberOfViolationsCheckbox).not.toBeChecked()
      expect(numberOfViolationsSlider).toHaveClass('d-none') // can't test bootstrap applied styles

      // Enable filter with checkbox
      userEvent.click(numberOfViolationsCheckbox)
      expect(numberOfViolationsCheckbox).toBeChecked()
      expect(numberOfViolationsSlider).not.toHaveClass('d-none')

      // Drag slider to desired value in filter
      fireEvent.change(numberOfViolationsSlider, {
        target: { value: desiredNumberOfViolationsSliderValue },
      })
      expect(numberOfViolationsSlider).toHaveValue(
        desiredNumberOfViolationsSliderValue.toString(),
      )

      // Submit filter menu
      userEvent.click(applyFiltersButton)

      // Expect one result with filters
      expect(resultsheader).toHaveTextContent('Showing 0 results')

      // Filter breadcrumbs should be on the page
      const filterBreadcrumbs = screen.getAllByLabelText('display filters menu')

      // There are five possible filters and all should be showing
      expect(filterBreadcrumbs.length).toBe(5)

      // Check all five breadcrumbs
      const plateTextFilterBreadcrumb = screen.getByText(': ABC')
      expect(plateTextFilterBreadcrumb).toBeInTheDocument()

      const stateFilterBreadcrumb = screen.getByText(': NY')
      expect(stateFilterBreadcrumb).toBeInTheDocument()

      const plateTypeFilterBreadcrumb = screen.getByText(': Passenger')
      expect(plateTypeFilterBreadcrumb).toBeInTheDocument()

      const dateRangeFilterBreadcrumb = screen.getByText(
        ': 07/04/2025 - 07/11/2025',
      )
      expect(dateRangeFilterBreadcrumb).toBeInTheDocument()

      const numberOfViolationsFilterBreadcrumb = screen.getByText(': 50')
      expect(numberOfViolationsFilterBreadcrumb).toBeInTheDocument()
    })
  })
})
