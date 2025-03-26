import React from 'react'
import { Cookies, CookiesProvider } from 'react-cookie'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import {
  BusLaneCameraViolationFactory,
  MobileBusLaneCameraViolationFactory,
  RedLightCameraViolationFactory,
  SchoolZoneSpeedCameraViolationFactory,
  ViolationFactory,
} from '__fixtures__/models/Violation'

import ViolationSummary from './ViolationSummary'

describe('ViolationSummary', () => {
  describe('renders without error', () => {
    it('renders without error with the new-style display', () => {
      const vehicle = VehicleFactory.build()

      render(
        <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
          <ViolationSummary vehicle={vehicle} />
        </CookiesProvider>,
      )

      expect(screen.getByText('Violations:')).toBeInTheDocument()
      expect(screen.getByText(vehicle.violationsCount)).toBeInTheDocument()
    })

    it('renders without error with the old-style display', () => {
      const vehicle = VehicleFactory.build()

      render(
        <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
          <ViolationSummary vehicle={vehicle} />
        </CookiesProvider>,
      )

      expect(screen.getByText('Violations:')).toBeInTheDocument()
      expect(screen.getByText(vehicle.violationsCount)).toBeInTheDocument()
    })
  })

  describe('render violation aspect counts', () => {
    describe('new-style display', () => {
      it('it should render the counts for different types of violations', async () => {
        const vehicle = VehicleFactory.build({
          plate: 'ABC1234',
          state: 'NY',
          violations: [
            // four bus lane violations (two mobile, two not)
            BusLaneCameraViolationFactory.build(),
            BusLaneCameraViolationFactory.build(),
            MobileBusLaneCameraViolationFactory.build(),
            MobileBusLaneCameraViolationFactory.build(),

            // six red light camera violations
            RedLightCameraViolationFactory.build(),
            RedLightCameraViolationFactory.build(),
            RedLightCameraViolationFactory.build(),
            RedLightCameraViolationFactory.build(),
            RedLightCameraViolationFactory.build(),
            RedLightCameraViolationFactory.build(),

            // 13 school zone speed camera violations
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
          ],
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
            <ViolationSummary vehicle={vehicle} />
          </CookiesProvider>,
        )

        const showMoreDetailsLink = screen.getByRole('link', {
          name: 'show details',
          hidden: true,
        })

        expect(showMoreDetailsLink).toBeInTheDocument()

        // keys
        expect(screen.queryByText('Speeding:')).not.toBeInTheDocument()
        expect(screen.queryByText('Red Light:')).not.toBeInTheDocument()
        expect(screen.queryByText('Bus Lane:')).not.toBeInTheDocument()

        // values
        expect(screen.queryByText('13')).not.toBeInTheDocument()
        expect(screen.queryByText('6')).not.toBeInTheDocument()
        expect(screen.queryByText('4')).not.toBeInTheDocument()

        // Click "show details" link
        userEvent.click(showMoreDetailsLink)

        await waitFor(() => {
          // keys
          expect(screen.getByText('Speeding:')).toBeInTheDocument()
          expect(screen.getByText('Red Light:')).toBeInTheDocument()
          expect(screen.getByText('Bus Lane:')).toBeInTheDocument()

          // values
          expect(screen.getByText('13')).toBeInTheDocument()
          expect(screen.getByText('6')).toBeInTheDocument()
          expect(screen.getByText('4')).toBeInTheDocument()
        })
      })

      it('it should render the counts for violations in different boroughs', async () => {
        const vehicle = VehicleFactory.build({
          plate: 'ABC1234',
          state: 'NY',
          violations: [
            // three Bronx Violations
            ViolationFactory.build({ violationCounty: 'Bronx' }),
            ViolationFactory.build({ violationCounty: 'Bronx' }),
            ViolationFactory.build({ violationCounty: 'Bronx' }),

            // four Brooklyn violations
            ViolationFactory.build({ violationCounty: 'Brooklyn' }),
            ViolationFactory.build({ violationCounty: 'Brooklyn' }),
            ViolationFactory.build({ violationCounty: 'Brooklyn' }),
            ViolationFactory.build({ violationCounty: 'Brooklyn' }),

            // one Queens violation
            ViolationFactory.build({ violationCounty: 'Queens' }),

            // two Staten Island violations
            ViolationFactory.build({ violationCounty: 'Staten Island' }),
            ViolationFactory.build({ violationCounty: 'Staten Island' }),
          ],
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
            <ViolationSummary vehicle={vehicle} />
          </CookiesProvider>,
        )

        const showMoreDetailsLink = screen.getByRole('link', {
          name: 'show details',
          hidden: true,
        })

        expect(showMoreDetailsLink).toBeInTheDocument()

        // keys
        expect(screen.queryByText('Bronx:')).not.toBeInTheDocument()
        expect(screen.queryByText('Brooklyn:')).not.toBeInTheDocument()
        expect(screen.queryByText('Manhattan:')).not.toBeInTheDocument()
        expect(screen.queryByText('Queens:')).not.toBeInTheDocument()
        expect(screen.queryByText('Staten Island:')).not.toBeInTheDocument()

        // values
        expect(screen.queryByText('3')).not.toBeInTheDocument()
        expect(screen.queryByText('4')).not.toBeInTheDocument()
        expect(screen.queryByText('1')).not.toBeInTheDocument()
        expect(screen.queryByText('2')).not.toBeInTheDocument()

        // Click "show details" link
        userEvent.click(showMoreDetailsLink)

        await waitFor(() => {
          // keys
          expect(screen.queryByText('Bronx:')).toBeInTheDocument()
          expect(screen.queryByText('Brooklyn:')).toBeInTheDocument()
          expect(screen.queryByText('Queens:')).toBeInTheDocument()
          expect(screen.queryByText('Staten Island:')).toBeInTheDocument()

          // mo Manhattan violations
          expect(screen.queryByText('Manhattan:')).not.toBeInTheDocument()

          // values
          expect(screen.queryByText('3')).toBeInTheDocument()
          expect(screen.queryByText('4')).toBeInTheDocument()
          expect(screen.queryByText('1')).toBeInTheDocument()
          expect(screen.queryByText('2')).toBeInTheDocument()
        })
      })
    })

    describe('old-style display', () => {
      it('it should render the counts for different types of violations', async () => {
        const vehicle = VehicleFactory.build({
          plate: 'ABC1234',
          state: 'NY',
          violations: [
            // four bus lane violations (two mobile, two not)
            BusLaneCameraViolationFactory.build(),
            BusLaneCameraViolationFactory.build(),
            MobileBusLaneCameraViolationFactory.build(),
            MobileBusLaneCameraViolationFactory.build(),

            // six red light camera violations
            RedLightCameraViolationFactory.build(),
            RedLightCameraViolationFactory.build(),
            RedLightCameraViolationFactory.build(),
            RedLightCameraViolationFactory.build(),
            RedLightCameraViolationFactory.build(),
            RedLightCameraViolationFactory.build(),

            // 13 school zone speed camera violations
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
            SchoolZoneSpeedCameraViolationFactory.build(),
          ],
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
            <ViolationSummary vehicle={vehicle} />
          </CookiesProvider>,
        )

        const showMoreDetailsLink = screen.getByRole('link', {
          name: 'show details',
          hidden: true,
        })

        expect(showMoreDetailsLink).toBeInTheDocument()

        // keys
        expect(screen.queryByText('Speeding:')).not.toBeInTheDocument()
        expect(screen.queryByText('Red Light:')).not.toBeInTheDocument()
        expect(screen.queryByText('Bus Lane:')).not.toBeInTheDocument()

        // values
        expect(screen.queryByText('13')).not.toBeInTheDocument()
        expect(screen.queryByText('6')).not.toBeInTheDocument()
        expect(screen.queryByText('4')).not.toBeInTheDocument()

        // Click "show details" link
        userEvent.click(showMoreDetailsLink)

        await waitFor(() => {
          // keys
          expect(screen.getByText('Speeding:')).toBeInTheDocument()
          expect(screen.getByText('Red Light:')).toBeInTheDocument()
          expect(screen.getByText('Bus Lane:')).toBeInTheDocument()

          // values
          expect(screen.getByText('13')).toBeInTheDocument()
          expect(screen.getByText('6')).toBeInTheDocument()
          expect(screen.getByText('4')).toBeInTheDocument()
        })
      })

      it('it should render the counts for violations in different boroughs', async () => {
        const vehicle = VehicleFactory.build({
          plate: 'ABC1234',
          state: 'NY',
          violations: [
            // three Bronx Violations
            ViolationFactory.build({ violationCounty: 'Bronx' }),
            ViolationFactory.build({ violationCounty: 'Bronx' }),
            ViolationFactory.build({ violationCounty: 'Bronx' }),

            // four Brooklyn violations
            ViolationFactory.build({ violationCounty: 'Brooklyn' }),
            ViolationFactory.build({ violationCounty: 'Brooklyn' }),
            ViolationFactory.build({ violationCounty: 'Brooklyn' }),
            ViolationFactory.build({ violationCounty: 'Brooklyn' }),

            // one Queens violation
            ViolationFactory.build({ violationCounty: 'Queens' }),

            // two Staten Island violations
            ViolationFactory.build({ violationCounty: 'Staten Island' }),
            ViolationFactory.build({ violationCounty: 'Staten Island' }),
          ],
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
            <ViolationSummary vehicle={vehicle} />
          </CookiesProvider>,
        )

        const showMoreDetailsLink = screen.getByRole('link', {
          name: 'show details',
          hidden: true,
        })

        expect(showMoreDetailsLink).toBeInTheDocument()

        // keys
        expect(screen.queryByText('Bronx:')).not.toBeInTheDocument()
        expect(screen.queryByText('Brooklyn:')).not.toBeInTheDocument()
        expect(screen.queryByText('Manhattan:')).not.toBeInTheDocument()
        expect(screen.queryByText('Queens:')).not.toBeInTheDocument()
        expect(screen.queryByText('Staten Island:')).not.toBeInTheDocument()

        // values
        expect(screen.queryByText('3')).not.toBeInTheDocument()
        expect(screen.queryByText('4')).not.toBeInTheDocument()
        expect(screen.queryByText('1')).not.toBeInTheDocument()
        expect(screen.queryByText('2')).not.toBeInTheDocument()

        // Click "show details" link
        userEvent.click(showMoreDetailsLink)

        await waitFor(() => {
          // keys
          expect(screen.queryByText('Bronx:')).toBeInTheDocument()
          expect(screen.queryByText('Brooklyn:')).toBeInTheDocument()
          expect(screen.queryByText('Queens:')).toBeInTheDocument()
          expect(screen.queryByText('Staten Island:')).toBeInTheDocument()

          // mo Manhattan violations
          expect(screen.queryByText('Manhattan:')).not.toBeInTheDocument()

          // values
          expect(screen.queryByText('3')).toBeInTheDocument()
          expect(screen.queryByText('4')).toBeInTheDocument()
          expect(screen.queryByText('1')).toBeInTheDocument()
          expect(screen.queryByText('2')).toBeInTheDocument()
        })
      })
    })
  })
})
