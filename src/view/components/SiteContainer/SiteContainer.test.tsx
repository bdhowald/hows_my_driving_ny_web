import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import { SettingsContext } from 'context/SettingsContext/SettingsContext'

import SiteContainer from './SiteContainer'

describe('SiteContainer', () => {
  const mockedSettings = {
    getSetting: jest.fn(),
    removeSetting: jest.fn(),
    updateSetting: jest.fn(),
  }

  it('should render successfully', () => {
    render(
      <MemoryRouter>
        <SettingsContext.Provider value={mockedSettings}>
          <SiteContainer>
            <></>
          </SiteContainer>
        </SettingsContext.Provider>
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
