import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import { SettingsContext } from 'context/SettingsContext/SettingsContext'

import SiteContainer from './SiteContainer'

describe('SiteContainer', () => {
  const mockedSettings = {
    getSetting: vi.fn(),
    removeSetting: vi.fn(),
    updateSetting: vi.fn(),
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
