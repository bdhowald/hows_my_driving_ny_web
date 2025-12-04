import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import InputWithClearButton from './InputWithClearButton'

describe('InputWithClearButton', () => {
  it('renders successfully', () => {
    render(<InputWithClearButton innerLabel="Favorite number" />)
  })

  it('sets the default value to the input value', () => {
    const defaultValue = '123'
    const id = 'input-with-clear-button'

    render(
      <InputWithClearButton
        defaultValue={defaultValue}
        id={id}
        innerLabel="Favorite number"
      />,
    )

    const input = screen.getByRole('textbox')
    expect(input).toHaveValue(defaultValue)
  })

  it('clears the value when the clear button is pressed', () => {
    const defaultValue = '123'
    const id = 'input-with-clear-button'

    render(
      <InputWithClearButton
        defaultValue={defaultValue}
        id={id}
        innerLabel="Favorite number"
      />,
    )

    const input = screen.getByRole('textbox')
    expect(input).toHaveValue(defaultValue)

    const clearButton = screen.getByRole('button')
    userEvent.click(clearButton)
    expect(input).toHaveValue('')
  })
})
