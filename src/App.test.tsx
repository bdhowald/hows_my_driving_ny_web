import * as React from 'react'
import { CookiesProvider } from 'react-cookie'
import * as reactRouterDom from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import * as boundaryFunctions from 'boundaries/http'

import App from './App'

window.HTMLElement.prototype.scrollIntoView = function () {}

describe('App', () => {
  it('renders the entire app', () => {
    render(
      <reactRouterDom.MemoryRouter>
        <App />
      </reactRouterDom.MemoryRouter>,
    )
    const linkElement = screen.getByText(/How's My Driving NY/i)
    expect(linkElement).toBeInTheDocument()
  })

  it('should open up a previous lookup with the appropriate route', async () => {
    const plate = 'ABC1234'
    const uniqueIdentifier = 'prev10us'
    const previousLookupRoute = `/${uniqueIdentifier}`

    const vehicle = VehicleFactory.build({ plate, uniqueIdentifier })

    const getPreviousLookupSpy = jest.spyOn(
      boundaryFunctions,
      'getPreviousLookup',
    )
    getPreviousLookupSpy.mockResolvedValueOnce({
      data: [
        {
          successfulLookup: true,
          vehicle,
        },
      ],
    })

    render(
      <reactRouterDom.MemoryRouter initialEntries={[previousLookupRoute]}>
        <App />
      </reactRouterDom.MemoryRouter>,
    )

    await waitFor(() => {
      // Lookup has appeared on the page from the route
      screen.getByText('Plate:')
      screen.getByText(plate)
    })
  })

  it('should load a lookup only once if given a previous lookup unique identifier that is also present in the cookies', async () => {
    const uniqueIdentifier = 'prev10us'
    const previousLookupRoute = `/${uniqueIdentifier}`

    const vehicle = VehicleFactory.build({ uniqueIdentifier })

    // Set lookupIdentifiers cookie to have a previous lookup unique identifier
    document.cookie = `lookupIdentifiers=${uniqueIdentifier}; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None;`

    const getPreviousLookupSpy = jest.spyOn(
      boundaryFunctions,
      'getPreviousLookup',
    )

    getPreviousLookupSpy.mockResolvedValue({
      data: [
        {
          successfulLookup: true,
          vehicle,
        },
      ],
    })

    render(
      <CookiesProvider>
        <reactRouterDom.MemoryRouter initialEntries={[previousLookupRoute]}>
          <App />
        </reactRouterDom.MemoryRouter>
      </CookiesProvider>,
    )

    await waitFor(() => {
      expect(getPreviousLookupSpy).toHaveBeenCalledTimes(1)
    })
  })
})
