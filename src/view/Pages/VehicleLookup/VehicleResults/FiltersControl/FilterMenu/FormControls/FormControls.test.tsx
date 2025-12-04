import React from 'react'
import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import FormControls from './FormControls'

describe('FormControls', () => {
  describe('RangeWithCheckboxControl', () => {
    const id = 'range-control'
    const labelText = 'Number >'

    it('renders successfully', () => {
      const enabled = true
      const maxValue = 100

      render(
        <FormControls.RangeWithCheckboxControl
          enabled={enabled}
          id={id}
          labelText={labelText}
          maxValue={maxValue}
        />,
      )
    })

    it('sets the default value to the given initial value', () => {
      const enabled = true
      const initialValue = 37
      const maxValue = 100

      render(
        <FormControls.RangeWithCheckboxControl
          enabled={enabled}
          id={id}
          initialValue={initialValue}
          labelText={labelText}
          maxValue={maxValue}
        />,
      )

      const slider = screen.getByRole('slider')
      expect(slider).toHaveValue(initialValue.toString())
    })

    it('sets the default value to half the max value when no initial or min values given', () => {
      const enabled = true
      const maxValue = 100

      render(
        <FormControls.RangeWithCheckboxControl
          enabled={enabled}
          id={id}
          labelText={labelText}
          maxValue={maxValue}
        />,
      )

      const slider = screen.getByRole('slider')
      expect(slider).toHaveValue((maxValue / 2).toString())
    })

    it('sets the default value to halfway between max and min values when no initial value given', () => {
      const enabled = true
      const minValue = 50
      const maxValue = 100

      render(
        <FormControls.RangeWithCheckboxControl
          enabled={enabled}
          id={id}
          labelText={labelText}
          minValue={minValue}
          maxValue={maxValue}
        />,
      )

      const slider = screen.getByRole('slider')
      expect(slider).toHaveValue(((maxValue + minValue) / 2).toString())
    })

    it('drags the slider to the desired value', () => {
      const enabled = true
      const maxValue = 100
      const desiredValue = 37

      render(
        <FormControls.RangeWithCheckboxControl
          enabled={enabled}
          id={id}
          labelText={labelText}
          maxValue={maxValue}
        />,
      )

      const slider = screen.getByRole('slider')
      fireEvent.change(slider, { target: { value: desiredValue } })

      expect(slider).toHaveValue(desiredValue.toString())
    })
  })

  describe('SelectWithClearButton', () => {
    const labelText = 'Monty Hall Doors'

    it('renders successfully', () => {
      render(
        <FormControls.SelectWithClearButton
          id="select-with-clear"
          innerLabel={labelText}
        >
          <option key="1" value="1" />
          <option key="2" value="2" />
          <option key="3" value="3" />
        </FormControls.SelectWithClearButton>,
      )
    })

    it('allows the user to select an option', () => {
      const desiredOption = '2'

      render(
        <FormControls.SelectWithClearButton
          aria-label={labelText}
          id="select-with-clear"
          innerLabel={labelText}
        >
          <option key="1" value="1" />
          <option key="2" value="2" />
          <option key="3" value="3" />
        </FormControls.SelectWithClearButton>,
      )

      const select = screen.getByRole('combobox', {
        name: labelText,
      })
      userEvent.selectOptions(select, desiredOption)

      expect(select).toHaveValue(desiredOption)
    })

    it('clears the value when the clear button is pressed', () => {
      const desiredOption = '2'

      render(
        <FormControls.SelectWithClearButton
          aria-label={labelText}
          defaultValue={desiredOption}
          id="select-with-clear"
          innerLabel={labelText}
        >
          <option key="1" value="1" />
          <option key="2" value="2" />
          <option key="3" value="3" />
        </FormControls.SelectWithClearButton>,
      )

      const select = screen.getByRole('combobox', {
        name: labelText,
      }) as HTMLSelectElement

      expect(select).toHaveValue(desiredOption)

      const clearButton = screen.getByRole('button')
      userEvent.click(clearButton)
      expect(select.value).toBe('')
    })
  })
})
