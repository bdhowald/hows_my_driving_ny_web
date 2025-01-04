import * as React from 'react'
import { render, screen } from '@testing-library/react'

import PlateSearchInput from './PlateSearchInput'

describe('PlateSearchInput', () => {
  describe('it renders without error', () => {
    it('should render successfully when currentLookup.plateId is defined', () => {
      const currentLookup = {
        plateId: 'ABC1234',
        plateType: undefined,
        state: 'NY',
      }
      const onChangeFunction = () => null

      render(
        <PlateSearchInput
          currentLookup={currentLookup}
          onChangeFunction={onChangeFunction}
        />,
      )

      const plateSearchInputHtmlElement = screen.getByRole('textbox')
      expect(plateSearchInputHtmlElement).toBeInTheDocument()

      expect(
        screen.getByDisplayValue(currentLookup.plateId),
      ).toBeInTheDocument()
    })

    it('should render successfully when currentLookup.plateId is undefined', () => {
      const currentLookup = {
        plateId: undefined,
        plateType: undefined,
        state: 'NY',
      }
      const onChangeFunction = () => null

      render(
        <PlateSearchInput
          currentLookup={currentLookup}
          onChangeFunction={onChangeFunction}
        />,
      )

      const plateSearchInputHtmlElement = screen.getByRole('textbox')
      expect(plateSearchInputHtmlElement).toBeInTheDocument()

      expect(
        screen.getByPlaceholderText('Enter a plate...'),
      ).toBeInTheDocument()
    })
  })
})
