import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import SiteContainer from './SiteContainer'

describe('SiteContainer', () => {
  it('should render successfully', () => {
    render(
      <MemoryRouter>
        <SiteContainer>
          <></>
        </SiteContainer>
      </MemoryRouter>,
    )

    // navigation
    expect(screen.getByText('Search')).toBeInTheDocument()
    expect(screen.getByText('Updates')).toBeInTheDocument()
    expect(screen.getByText('FAQs')).toBeInTheDocument()

    // footer
    expect(screen.getByText('@bdhowald')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '@bdhowald' })).toHaveAttribute(
      'href',
      'https://github.com/bdhowald',
    )
  })
})
