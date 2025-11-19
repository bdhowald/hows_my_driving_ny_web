import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import FilterMenu from './FilterMenu'

describe('FilterMenu', () => {
  const handleFilterFormSubmitFunction = jest.fn()
  const hideFiltersFunction = jest.fn()

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

  describe('rendering', () => {
    it('should render successfully when menu is visible', () => {
      render(
        <FilterMenu
          filtersAreVisible={true}
          handleFilterFormSubmitFunction={handleFilterFormSubmitFunction}
          hideFiltersFunction={hideFiltersFunction}
          maxViolationsCountForResults={42}
          resultsFilters={defaultResultsFilters}
        />,
      )

      const filterMenu = screen.getByRole('dialog', {
        name: 'Filter menu',
      })
      expect(filterMenu).toBeVisible()
    })

    it('should render successfully when menu is not visible', () => {
      render(
        <FilterMenu
          filtersAreVisible={false}
          handleFilterFormSubmitFunction={handleFilterFormSubmitFunction}
          hideFiltersFunction={hideFiltersFunction}
          maxViolationsCountForResults={42}
          resultsFilters={defaultResultsFilters}
        />,
      )

      const filterMenu = screen.queryByRole('dialog', {
        name: 'Filter menu',
      })
      expect(filterMenu).toBe(null)
    })

    it('should render with initial state', () => {
      const populatedFilters = {
        numberOfViolations: 15,
        plateText: 'ABC1234',
        plateType: 'passenger',
        queryDateRange: {
          endDate: new Date('2025-07-11T00:00:00-04:00'),
          startDate: new Date('2025-07-04T00:00:00-04:00'),
        },
        state: 'NY',
      }

      render(
        <FilterMenu
          filtersAreVisible={true}
          handleFilterFormSubmitFunction={handleFilterFormSubmitFunction}
          hideFiltersFunction={hideFiltersFunction}
          maxViolationsCountForResults={42}
          resultsFilters={populatedFilters}
        />,
      )

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
        name: 'Number of violations ≥ 15',
      })
      const numberOfViolationsSlider = screen.getByRole('slider')

      expect(plateTextInput).toHaveValue(populatedFilters['plateText'])
      expect(plateTypeSelect).toHaveValue(populatedFilters['plateType'])
      expect(regionSelect).toHaveValue(populatedFilters['state'])
      expect(searchedFromTextInput).toHaveValue(
        populatedFilters.queryDateRange.startDate.toISOString().split('T')[0],
      )
      expect(searchedToTextInput).toHaveValue(
        populatedFilters.queryDateRange.endDate.toISOString().split('T')[0],
      )
      expect(numberOfViolationsCheckbox).toBeChecked()
      expect(numberOfViolationsSlider).toHaveValue(
        populatedFilters['numberOfViolations'].toString(),
      )
    })
  })

  it('should allow the user to set the filters when visible', () => {
    const desiredPlateTextFilter = 'ABC1234'
    const desiredPlateTypeFilter = 'passenger'
    const desiredRegionFilter = 'NY'
    const searchedFromFilter = '2025-07-04'
    const searchedToFilter = '2025-07-11'
    const desiredNumberOfViolationsSliderValue = 50

    render(
      <FilterMenu
        filtersAreVisible={true}
        handleFilterFormSubmitFunction={handleFilterFormSubmitFunction}
        hideFiltersFunction={hideFiltersFunction}
        maxViolationsCountForResults={100}
        resultsFilters={defaultResultsFilters}
      />,
    )

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
  })

  it('should submit the form', () => {
    const desiredPlateTextFilter = 'ABC1234'

    render(
      <FilterMenu
        filtersAreVisible={true}
        handleFilterFormSubmitFunction={handleFilterFormSubmitFunction}
        hideFiltersFunction={hideFiltersFunction}
        maxViolationsCountForResults={100}
        resultsFilters={defaultResultsFilters}
      />,
    )

    const plateTextInput = screen.getByRole('textbox', {
      name: 'Plate',
    })
    const submitFilterFormButton = screen.getByRole('button', {
      name: 'Apply filters',
    })

    // Type plate text into filter
    userEvent.type(plateTextInput, desiredPlateTextFilter)
    expect(plateTextInput).toHaveValue(desiredPlateTextFilter)

    // Click 'Apply filters' button
    userEvent.click(submitFilterFormButton)

    expect(handleFilterFormSubmitFunction).toHaveBeenCalledTimes(1)
  })

  it('should fail validation for a searched to date before a searched from date', async () => {
    render(
      <FilterMenu
        filtersAreVisible={true}
        handleFilterFormSubmitFunction={handleFilterFormSubmitFunction}
        hideFiltersFunction={hideFiltersFunction}
        maxViolationsCountForResults={100}
        resultsFilters={defaultResultsFilters}
      />,
    )

    const searchedFromTextInput = screen.getByLabelText('Searched from')
    const searchedToTextInput = screen.getByLabelText('Searched to')

    const earlierDateFilter = '2025-07-04'
    const laterDateFilter = '2025-07-11'

    // Type start date into filter
    userEvent.type(searchedFromTextInput, laterDateFilter)

    // Type end date into filter
    userEvent.type(searchedToTextInput, earlierDateFilter)

    await waitFor(() => {
      expect(searchedToTextInput).toBeInvalid()
    })
  })
})
