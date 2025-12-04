import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { PlateType } from 'constants/plateTypes'

import SearchControls from './SearchControls'

describe('SearchControls', () => {
  const handleInputChange = () => null
  const handleSubmit = () => null

  it('renders without error', () => {
    const currentLookup = {
      plateId: undefined,
      plateType: 'none' as PlateType,
      state: 'NY',
    }

    render(
      <SearchControls
        currentLookup={currentLookup}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        lookupInFlight={false}
      />,
    )

    // plate search input
    expect(screen.getByRole('textbox')).toBeInTheDocument()

    // region select
    expect(
      screen.getByRole('option', {
        name: 'New York (NY)',
      }) as HTMLOptionElement,
    ).toBeInTheDocument()

    // plate type select
    expect(
      screen.getByRole('option', { name: 'Commercial' }) as HTMLOptionElement,
    ).toBeInTheDocument()

    // search button
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
  })

  it('should have the search button disabled if currentLookup.plateId is undefined', () => {
    const currentLookup = {
      plateId: undefined,
      plateType: 'none' as PlateType,
      state: 'NY',
    }

    render(
      <SearchControls
        currentLookup={currentLookup}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        lookupInFlight={false}
      />,
    )

    expect(screen.getByRole('button', { name: 'Search' })).toBeDisabled()
  })

  it('should have the search button disabled if a lookup is in flight', () => {
    const currentLookup = {
      plateId: undefined,
      plateType: 'none' as PlateType,
      state: 'NY',
    }

    render(
      <SearchControls
        currentLookup={currentLookup}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        lookupInFlight={true}
      />,
    )

    expect(screen.getByRole('button', { name: 'Search' })).toBeDisabled()
  })

  it('should have the search button enabled if currentLookup.plateId defined and no lookup in flight', () => {
    const currentLookup = {
      plateId: 'ABC1234',
      plateType: 'none' as PlateType,
      state: 'NY',
    }

    render(
      <SearchControls
        currentLookup={currentLookup}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        lookupInFlight={false}
      />,
    )

    expect(screen.getByRole('button', { name: 'Search' })).not.toBeDisabled()
  })

  it('should enable a search button that is disabled due to currentLookup.plateId being disabled', () => {
    const currentLookup = {
      plateId: undefined as string | undefined,
      plateType: 'none' as PlateType,
      state: 'NY',
    }

    const handleInputChange = (
      changeEvent:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>,
    ) => {
      currentLookup.plateId = changeEvent.currentTarget.value
    }

    const { rerender } = render(
      <SearchControls
        currentLookup={currentLookup}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        lookupInFlight={false}
      />,
    )

    expect(screen.getByRole('button', { name: 'Search' })).toBeDisabled()

    const plateSearchInputHtmlElement = screen.getByRole('textbox')

    userEvent.type(plateSearchInputHtmlElement, 'ABC1234')

    rerender(
      <SearchControls
        currentLookup={currentLookup}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        lookupInFlight={false}
      />,
    )

    expect(screen.getByRole('button', { name: 'Search' })).not.toBeDisabled()
  })

  it('should submit the form when the search button is clicked while enabled', () => {
    const currentLookup = {
      plateId: 'ABC1234',
      plateType: 'none' as PlateType,
      state: 'NY',
    }

    const handleSubmitFunction = jest.fn((e) => e.preventDefault())

    render(
      <SearchControls
        currentLookup={currentLookup}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmitFunction}
        lookupInFlight={false}
      />,
    )

    const searchButtonHtmlElement = screen.getByRole('button', {
      name: 'Search',
    })

    userEvent.click(searchButtonHtmlElement)

    expect(handleSubmitFunction).toHaveBeenCalled()
  })

  it('should not submit the form when the search button is clicked while disabled', () => {
    const currentLookup = {
      plateId: undefined,
      plateType: 'none' as PlateType,
      state: 'NY',
    }

    const handleSubmitFunction = jest.fn((e) => e.preventDefault())

    render(
      <SearchControls
        currentLookup={currentLookup}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmitFunction}
        lookupInFlight={false}
      />,
    )

    const searchButtonHtmlElement = screen.getByRole('button', {
      name: 'Search',
    })
    expect(searchButtonHtmlElement).toBeDisabled()

    userEvent.click(searchButtonHtmlElement)

    expect(handleSubmitFunction).not.toHaveBeenCalled()
  })
})
