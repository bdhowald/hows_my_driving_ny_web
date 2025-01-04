import * as React from 'react'
import { render, screen } from '@testing-library/react'

import { PlateType } from 'constants/plateTypes'

import SearchSelect from './SearchSelect'

describe('SearchSelect', () => {
  const handleChange = () => null

  it('renders without error', () => {
    const currentLookup = {
      plateId: undefined,
      plateType: 'none' as PlateType,
      state: 'NY',
    }

    const optionData = [
      {
        name: 'Option 1',
        value: '1',
      },
      {
        name: 'Option 2',
        value: '2',
      },
      {
        name: 'Option 3',
        value: '3',
      },
    ]

    const selectOptions = optionData.map((optionInfo) => (
      <option key={optionInfo.value} value={optionInfo.value}>
        {optionInfo.name}
      </option>
    ))

    render(
      <SearchSelect
        currentLookup={currentLookup}
        handleChange={handleChange}
        label={'Region'}
        selectOptions={selectOptions}
        valueKey="state"
      />,
    )

    const selectOptionHtmlElements = screen.getAllByRole('option')

    expect(selectOptionHtmlElements.map((elem) => elem.textContent)).toEqual(
      optionData.map((optionInfo) => optionInfo.name),
    )
  })

  it('should display the option that matches currentLookup[valueKey], if possible', () => {
    const currentLookup = {
      plateId: undefined,
      plateType: 'none' as PlateType,
      state: 'NY',
    }

    const selectOptions = [
      <option key="MA" value="MA">
        Massachusetts (MA)
      </option>,
      <option key="NY" value="NY">
        New York (NY)
      </option>,
    ]

    render(
      <SearchSelect
        currentLookup={currentLookup}
        handleChange={handleChange}
        label={'Region'}
        selectOptions={selectOptions}
        valueKey="state"
      />,
    )

    expect(
      (
        screen.getByRole('option', {
          name: 'New York (NY)',
        }) as HTMLOptionElement
      ).selected,
    ).toBe(true)
    expect(
      (
        screen.getByRole('option', {
          name: 'Massachusetts (MA)',
        }) as HTMLOptionElement
      ).selected,
    ).toBe(false)
  })

  it('should display the first option if none matches currentLookup[valueKey]', () => {
    const currentLookup = {
      plateId: undefined,
      plateType: 'none' as PlateType,
      state: 'NY',
    }

    const selectOptions = [
      <option key="IA" value="IA">
        Iowa (IA)
      </option>,
      <option key="UT" value="UT">
        Utah (UT)
      </option>,
    ]

    render(
      <SearchSelect
        currentLookup={currentLookup}
        handleChange={handleChange}
        label={'Region'}
        selectOptions={selectOptions}
        valueKey="state"
      />,
    )

    expect(
      (screen.getByRole('option', { name: 'Iowa (IA)' }) as HTMLOptionElement)
        .selected,
    ).toBe(true)
    expect(
      (screen.getByRole('option', { name: 'Utah (UT)' }) as HTMLOptionElement)
        .selected,
    ).toBe(false)
  })
})
