import React, { useRef } from 'react'
import { render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SettingsContext } from 'context/SettingsContext/SettingsContext'

import FiltersControl from './FiltersControl'

describe('FiltersControl', () => {
  const clearFilterFunction = jest.fn()
  const handleFilterFormSubmitFunction = jest.fn()

  const mockedSettings = {
    getSetting: jest.fn().mockReturnValue(true),
    removeSetting: jest.fn(),
    updateSetting: jest.fn(),
  }

  const defaultResultsFilters = {
    numberOfViolations: undefined,
    plateText: undefined,
    plateType: undefined,
    queryDateRange: {
      endDate: undefined,
      startDate: undefined,
    },
    state: undefined,
  }
  const maxViolationsCountForResults = 100

  const ref = renderHook(() => useRef<HTMLDivElement>(null)).result.current

  describe('rendering', () => {
    it('should render filter controls', () => {
      render(
        <SettingsContext.Provider value={mockedSettings}>
          <FiltersControl
            clearFilterFunction={clearFilterFunction}
            displayingPreviousLookup={false}
            handleFilterFormSubmitFunction={handleFilterFormSubmitFunction}
            maxViolationsCountForResults={maxViolationsCountForResults}
            resultsFilters={defaultResultsFilters}
            resultsLength={1}
            scrollRef={ref}
          />
        </SettingsContext.Provider>,
      )

      const filtersControl = screen.getByTestId('filters-wrapper-test-id')
      expect(filtersControl).toBeInTheDocument()

      const resultsHeader = screen.getByText('Showing 1 result')
      expect(resultsHeader).toBeInTheDocument()

      const showFilterMenuButton = screen.getByRole('button', {
        name: 'Filter',
      })
      expect(showFilterMenuButton).toBeInTheDocument()
    })
  })

  describe('results header text', () => {
    it('should display the correct header with one own result', () => {
      render(
        <SettingsContext.Provider value={mockedSettings}>
          <FiltersControl
            clearFilterFunction={clearFilterFunction}
            displayingPreviousLookup={false}
            handleFilterFormSubmitFunction={handleFilterFormSubmitFunction}
            maxViolationsCountForResults={maxViolationsCountForResults}
            resultsFilters={defaultResultsFilters}
            resultsLength={1}
            scrollRef={ref}
          />
        </SettingsContext.Provider>,
      )

      const resultsHeader = screen.getByText('Showing 1 result')
      expect(resultsHeader).toBeInTheDocument()
    })

    it('should display the correct header with one shared result', () => {
      render(
        <SettingsContext.Provider value={mockedSettings}>
          <FiltersControl
            clearFilterFunction={clearFilterFunction}
            displayingPreviousLookup={true}
            handleFilterFormSubmitFunction={handleFilterFormSubmitFunction}
            maxViolationsCountForResults={maxViolationsCountForResults}
            resultsFilters={defaultResultsFilters}
            resultsLength={1}
            scrollRef={ref}
          />
        </SettingsContext.Provider>,
      )

      const resultsHeader = screen.getByText('Showing 1 result shared via link')
      expect(resultsHeader).toBeInTheDocument()
    })

    it('should display the correct header with multiple own results', () => {
      render(
        <SettingsContext.Provider value={mockedSettings}>
          <FiltersControl
            clearFilterFunction={clearFilterFunction}
            displayingPreviousLookup={false}
            handleFilterFormSubmitFunction={handleFilterFormSubmitFunction}
            maxViolationsCountForResults={maxViolationsCountForResults}
            resultsFilters={defaultResultsFilters}
            resultsLength={2}
            scrollRef={ref}
          />
        </SettingsContext.Provider>,
      )

      const resultsHeader = screen.getByText('Showing 2 results')
      expect(resultsHeader).toBeInTheDocument()
    })

    it('should display the correct header with one own result and one shared result', () => {
      render(
        <SettingsContext.Provider value={mockedSettings}>
          <FiltersControl
            clearFilterFunction={clearFilterFunction}
            displayingPreviousLookup={true}
            handleFilterFormSubmitFunction={handleFilterFormSubmitFunction}
            maxViolationsCountForResults={maxViolationsCountForResults}
            resultsFilters={defaultResultsFilters}
            resultsLength={2}
            scrollRef={ref}
          />
        </SettingsContext.Provider>,
      )

      const ownResultsHeader = screen.getByText('Showing 1 result')
      expect(ownResultsHeader).toBeInTheDocument()

      const sharedResultHeader = screen.getByText('+ 1 shared via link')
      expect(sharedResultHeader).toBeInTheDocument()
    })

    it('should display the correct header with multiple own results and one shared result', () => {
      render(
        <SettingsContext.Provider value={mockedSettings}>
          <FiltersControl
            clearFilterFunction={clearFilterFunction}
            displayingPreviousLookup={true}
            handleFilterFormSubmitFunction={handleFilterFormSubmitFunction}
            maxViolationsCountForResults={maxViolationsCountForResults}
            resultsFilters={defaultResultsFilters}
            resultsLength={3}
            scrollRef={ref}
          />
        </SettingsContext.Provider>,
      )

      const ownResultsHeader = screen.getByText('Showing 2 results')
      expect(ownResultsHeader).toBeInTheDocument()

      const sharedResultHeader = screen.getByText('+ 1 shared via link')
      expect(sharedResultHeader).toBeInTheDocument()
    })
  })

  describe('opening the filter menu', () => {
    it('should open the filter menu when the filter button is clicked', () => {
      render(
        <SettingsContext.Provider value={mockedSettings}>
          <FiltersControl
            clearFilterFunction={clearFilterFunction}
            displayingPreviousLookup={false}
            handleFilterFormSubmitFunction={handleFilterFormSubmitFunction}
            maxViolationsCountForResults={maxViolationsCountForResults}
            resultsFilters={defaultResultsFilters}
            resultsLength={1}
            scrollRef={ref}
          />
        </SettingsContext.Provider>,
      )

      const showFilterMenuButton = screen.getByRole('button', {
        name: 'Filter',
      })

      // We expect the menu to not be visible by default
      expect(screen.queryByRole('dialog', { name: 'Filter menu' })).toBeNull()

      // Click on the filter menu button to open the menu
      userEvent.click(showFilterMenuButton)

      // Now the filter menu is open
      const filterMenu = screen.getByRole('dialog', { name: 'Filter menu' })
      expect(filterMenu).toBeInTheDocument()

      // Clicking outside the filter menu overlay closes the menu
      userEvent.click(showFilterMenuButton)
      expect(screen.queryByRole('dialog', { name: 'Filter menu' })).toBeNull()

      // Open the filter menu again
      userEvent.click(showFilterMenuButton)

      // Now the filter menu is open again
      const filterMenuReopened = screen.getByRole('dialog', {
        name: 'Filter menu',
      })
      expect(filterMenuReopened).toBeInTheDocument()

      // There is also a button to close the filter menu directly
      const closeFilterMenuButton = screen.getByRole('button', {
        name: 'close filter menu',
      })
      expect(closeFilterMenuButton).toBeInTheDocument()

      // Click on the close filter menu button
      userEvent.click(closeFilterMenuButton)

      // Now the close filter menu button should not be visible
      expect(closeFilterMenuButton).not.toBeInTheDocument()
      // Nor should the filter menu
      expect(filterMenuReopened).not.toBeInTheDocument()
    })
  })

  describe('setting and submitting filters', () => {
    it('should submit the form and hide filter menu when the apply filters button is clicked', () => {
      render(
        <SettingsContext.Provider value={mockedSettings}>
          <FiltersControl
            clearFilterFunction={clearFilterFunction}
            displayingPreviousLookup={false}
            handleFilterFormSubmitFunction={handleFilterFormSubmitFunction}
            maxViolationsCountForResults={maxViolationsCountForResults}
            resultsFilters={defaultResultsFilters}
            resultsLength={1}
            scrollRef={ref}
          />
        </SettingsContext.Provider>,
      )

      // Mock successful form validation and submission
      handleFilterFormSubmitFunction.mockReturnValue(true)

      const showFilterMenuButton = screen.getByRole('button', {
        name: 'Filter',
      })

      // Open the filter menu
      userEvent.click(showFilterMenuButton)

      const applyFiltersButton = screen.getByRole('button', {
        name: 'Apply filters',
      })

      // Now the filter menu is open
      const filterMenu = screen.getByRole('dialog', { name: 'Filter menu' })

      // Submit filter menu
      userEvent.click(applyFiltersButton)

      // Successfully applying filters also hides the filter menu
      expect(filterMenu).not.toBeInTheDocument()

      expect(handleFilterFormSubmitFunction).toHaveBeenCalledTimes(1)
    })

    it('should not hide the filter menu when submission fails validation', () => {
      render(
        <SettingsContext.Provider value={mockedSettings}>
          <FiltersControl
            clearFilterFunction={clearFilterFunction}
            displayingPreviousLookup={false}
            handleFilterFormSubmitFunction={handleFilterFormSubmitFunction}
            maxViolationsCountForResults={maxViolationsCountForResults}
            resultsFilters={defaultResultsFilters}
            resultsLength={1}
            scrollRef={ref}
          />
        </SettingsContext.Provider>,
      )

      // Mock failed form validation and submission
      handleFilterFormSubmitFunction.mockReturnValue(false)

      const showFilterMenuButton = screen.getByRole('button', {
        name: 'Filter',
      })

      // Open the filter menu
      userEvent.click(showFilterMenuButton)

      const applyFiltersButton = screen.getByRole('button', {
        name: 'Apply filters',
      })

      // Now the filter menu is open
      const filterMenu = screen.getByRole('dialog', { name: 'Filter menu' })

      // Submit filter menu
      userEvent.click(applyFiltersButton)

      // Failed form validation prevents hiding of the filter menu
      expect(filterMenu).toBeInTheDocument()

      expect(handleFilterFormSubmitFunction).toHaveBeenCalledTimes(1)
    })
  })

  describe('modifying filters', () => {
    it("clicking on a filter breadcrumb's x button calls the clear filter function", () => {
      const plateTextFilter = 'ABC1234'

      const resultsFiltersWithOneFilterApplied = {
        numberOfViolations: undefined,
        plateText: plateTextFilter,
        plateType: undefined,
        queryDateRange: {
          endDate: undefined,
          startDate: undefined,
        },
        state: undefined,
      }

      render(
        <SettingsContext.Provider value={mockedSettings}>
          <FiltersControl
            clearFilterFunction={clearFilterFunction}
            displayingPreviousLookup={false}
            handleFilterFormSubmitFunction={handleFilterFormSubmitFunction}
            maxViolationsCountForResults={maxViolationsCountForResults}
            resultsFilters={resultsFiltersWithOneFilterApplied}
            resultsLength={1}
            scrollRef={ref}
          />
        </SettingsContext.Provider>,
      )

      const removeFilterSpan = screen.getByLabelText('remove Plate label')
      expect(removeFilterSpan).toBeInTheDocument()

      // Remove the applied filter
      userEvent.click(removeFilterSpan)

      expect(clearFilterFunction).toHaveBeenCalledTimes(1)
    })

    it('should open the filter menu when the user clicks on a filter breadcrumb', () => {
      const plateTextFilter = 'ABC1234'

      const resultsFiltersWithOneFilterApplied = {
        numberOfViolations: undefined,
        plateText: plateTextFilter,
        plateType: undefined,
        queryDateRange: {
          endDate: undefined,
          startDate: undefined,
        },
        state: undefined,
      }

      render(
        <SettingsContext.Provider value={mockedSettings}>
          <FiltersControl
            clearFilterFunction={clearFilterFunction}
            displayingPreviousLookup={false}
            handleFilterFormSubmitFunction={handleFilterFormSubmitFunction}
            maxViolationsCountForResults={maxViolationsCountForResults}
            resultsFilters={resultsFiltersWithOneFilterApplied}
            resultsLength={1}
            scrollRef={ref}
          />
        </SettingsContext.Provider>,
      )

      // Expect filter menu to be closed by default
      expect(screen.queryByRole('dialog', { name: 'Filter menu' })).toBeNull()

      const filterBreadcrumb = screen.getByLabelText('display filters menu')
      expect(filterBreadcrumb).toBeInTheDocument()

      // Click on the filter breadcrumb
      userEvent.click(filterBreadcrumb)

      // Expect filter menu to be opened by click
      const filterMenu = screen.getByRole('dialog', { name: 'Filter menu' })
      expect(filterMenu).toBeInTheDocument()
    })
  })
})
