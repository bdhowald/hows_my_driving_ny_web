import * as React from 'react'
import { render, screen } from '@testing-library/react'

import Footer from './Footer'

describe('Footer', () => {
  describe('renders without error', () => {
    it('should render successfully', () => {
      render(<Footer />)

      expect(screen.getByText('@bdhowald')).toBeInTheDocument()
      expect(screen.getByRole('link', { name: '@bdhowald' })).toHaveAttribute(
        'href',
        'https://github.com/bdhowald',
      )
    })
  })
})
