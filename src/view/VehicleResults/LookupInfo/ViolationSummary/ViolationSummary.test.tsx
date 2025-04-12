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
      const vehicle = VehicleFactory.build({
        violations: [
          ViolationFactory.build({
            humanizedDescription: 'No Standing - Bus Stop',
            violationCode: '19',
            violationCounty: 'Queens',
          }),
          ViolationFactory.build({
            humanizedDescription: 'School Zone Speed Camera Violation',
            violationCode: '36',
            violationCounty: 'Staten Island',
          }),
        ],
        violationsCount: 2,
      })

      render(
        <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
          <ViolationSummary vehicle={vehicle} />
        </CookiesProvider>,
      )

      expect(screen.getByText('Violations:')).toBeInTheDocument()
      expect(screen.getByText(vehicle.violationsCount)).toBeInTheDocument()
    })

    it('renders without error with the old-style display', () => {
      const vehicle = VehicleFactory.build({
        violations: [
          ViolationFactory.build({
            humanizedDescription: 'No Standing - Bus Stop',
            violationCode: '19',
            violationCounty: 'Queens',
          }),
          ViolationFactory.build({
            humanizedDescription: 'School Zone Speed Camera Violation',
            violationCode: '36',
            violationCounty: 'Staten Island',
          }),
        ],
        violationsCount: 2,
      })

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
      test.each([
        {
          width: 420,
        },
        {
          width: 576,
        },
        {
          width: 640,
        },
      ])(
        'render the counts for different types of violations for a page $width wide',
        async ({ width }) => {
          // Change the viewport to show/hide the violations count depending on the width
          global.innerWidth = width

          // Trigger the window resize event.
          global.dispatchEvent(new Event('resize'))

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

          if (width < 576) {
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
          } else {
            const showMoreDetailsLink = screen.queryByRole('link', {
              name: 'show details',
              hidden: true,
            })

            expect(showMoreDetailsLink).not.toBeInTheDocument()

            // keys
            expect(screen.queryByText('Speeding:')).toBeInTheDocument()
            expect(screen.queryByText('Red Light:')).toBeInTheDocument()
            expect(screen.queryByText('Bus Lane:')).toBeInTheDocument()

            // values
            expect(screen.queryByText('13')).toBeInTheDocument()
            expect(screen.queryByText('6')).toBeInTheDocument()
            expect(screen.queryByText('4')).toBeInTheDocument()
          }
        },
      )

      test.each([
        {
          width: 420,
        },
        {
          width: 576,
        },
        {
          width: 640,
        },
      ])(
        'render the counts for violations in different boroughs for a page $width wide',
        async ({ width }) => {
          // Change the viewport to show/hide the violations count depending on the width
          global.innerWidth = width

          // Trigger the window resize event.
          global.dispatchEvent(new Event('resize'))

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

          if (width < 576) {
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
            expect(screen.queryByText('Unknown:')).not.toBeInTheDocument()

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

              // no Manhattan violations
              expect(screen.queryByText('Manhattan:')).not.toBeInTheDocument()
              expect(screen.queryByText('Unknown:')).not.toBeInTheDocument()

              // values
              expect(screen.queryByText('3')).toBeInTheDocument()
              expect(screen.queryByText('4')).toBeInTheDocument()
              expect(screen.queryByText('1')).toBeInTheDocument()
              expect(screen.queryByText('2')).toBeInTheDocument()
            })
          } else {
            const showMoreDetailsLink = screen.queryByRole('link', {
              name: 'show details',
              hidden: true,
            })

            expect(showMoreDetailsLink).not.toBeInTheDocument()

            // keys
            expect(screen.queryByText('Bronx:')).toBeInTheDocument()
            expect(screen.queryByText('Brooklyn:')).toBeInTheDocument()
            expect(screen.queryByText('Manhattan:')).not.toBeInTheDocument()
            expect(screen.queryByText('Queens:')).toBeInTheDocument()
            expect(screen.queryByText('Staten Island:')).toBeInTheDocument()
            expect(screen.queryByText('Unknown:')).not.toBeInTheDocument()

            // values
            expect(screen.queryByText('3')).toBeInTheDocument()
            expect(screen.queryByText('4')).toBeInTheDocument()
            expect(screen.queryByText('1')).toBeInTheDocument()
            expect(screen.queryByText('2')).toBeInTheDocument()
          }
        },
      )

      test.each([
        {
          width: 420,
        },
        {
          width: 576,
        },
        {
          width: 640,
        },
      ])(
        'render the counts for violations in different boroughs for a page $width wide including when violations have no borough data',
        async ({ width }) => {
          // Change the viewport to show/hide the violations count depending on the width
          global.innerWidth = width

          // Trigger the window resize event.
          global.dispatchEvent(new Event('resize'))

          const vehicle = VehicleFactory.build({
            plate: 'ABC1234',
            state: 'NY',
            violations: [
              // three Bronx Violations
              ViolationFactory.build({ violationCounty: 'Bronx' }),
              ViolationFactory.build({ violationCounty: 'Bronx' }),
              ViolationFactory.build({ violationCounty: 'Bronx' }),

              // one violation with no borough
              ViolationFactory.build({
                violationCounty: 'No Borough Available',
              }),
            ],
          })

          render(
            <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
              <ViolationSummary vehicle={vehicle} />
            </CookiesProvider>,
          )

          if (width < 576) {
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
            expect(
              screen.queryByText('No Borough Available:'),
            ).not.toBeInTheDocument()

            // values
            expect(screen.queryByText('3')).not.toBeInTheDocument()
            expect(screen.queryByText('1')).not.toBeInTheDocument()

            // Click "show details" link
            userEvent.click(showMoreDetailsLink)

            await waitFor(() => {
              // keys
              expect(screen.queryByText('Bronx:')).toBeInTheDocument()
              expect(screen.queryByText('Unknown:')).toBeInTheDocument()

              // no Manhattan violations
              expect(screen.queryByText('Brooklyn:')).not.toBeInTheDocument()
              expect(screen.queryByText('Manhattan:')).not.toBeInTheDocument()
              expect(screen.queryByText('Queens:')).not.toBeInTheDocument()
              expect(
                screen.queryByText('Staten Island:'),
              ).not.toBeInTheDocument()

              // values
              expect(screen.queryByText('3')).toBeInTheDocument()
              expect(screen.queryByText('1')).toBeInTheDocument()
            })
          } else {
            const showMoreDetailsLink = screen.queryByRole('link', {
              name: 'show details',
              hidden: true,
            })

            expect(showMoreDetailsLink).not.toBeInTheDocument()

            // keys
            expect(screen.queryByText('Bronx:')).toBeInTheDocument()
            expect(screen.queryByText('Brooklyn:')).not.toBeInTheDocument()
            expect(screen.queryByText('Manhattan:')).not.toBeInTheDocument()
            expect(screen.queryByText('Unknown:')).toBeInTheDocument()
            expect(screen.queryByText('Queens:')).not.toBeInTheDocument()
            expect(screen.queryByText('Staten Island:')).not.toBeInTheDocument()

            // values
            expect(screen.queryByText('3')).toBeInTheDocument()
            expect(screen.queryByText('1')).toBeInTheDocument()
          }
        },
      )
    })

    describe('old-style display', () => {
      let savedGlobalWidth: number

      beforeEach(() => {
        savedGlobalWidth = global.innerWidth
      })

      afterEach(() => {
        global.innerWidth = savedGlobalWidth
      })

      test.each([
        {
          width: 420,
        },
        {
          width: 576,
        },
        {
          width: 640,
        },
      ])(
        'render the counts for different types of violations for a page $width wide',
        async ({ width }) => {
          // Change the viewport to show/hide the violations count depending on the width
          global.innerWidth = width

          // Trigger the window resize event.
          global.dispatchEvent(new Event('resize'))

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

          if (width < 576) {
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
          } else {
            const showMoreDetailsLink = screen.queryByRole('link', {
              name: 'show details',
              hidden: true,
            })

            expect(showMoreDetailsLink).not.toBeInTheDocument()

            // keys
            expect(screen.queryByText('Speeding:')).toBeInTheDocument()
            expect(screen.queryByText('Red Light:')).toBeInTheDocument()
            expect(screen.queryByText('Bus Lane:')).toBeInTheDocument()

            // values
            expect(screen.queryByText('13')).toBeInTheDocument()
            expect(screen.queryByText('6')).toBeInTheDocument()
            expect(screen.queryByText('4')).toBeInTheDocument()
          }
        },
      )

      test.each([
        {
          width: 420,
        },
        {
          width: 576,
        },
        {
          width: 640,
        },
      ])(
        'render the counts for violations in different boroughs for a page $width wide',
        async ({ width }) => {
          // Change the viewport to show/hide the violations count depending on the width
          global.innerWidth = width

          // Trigger the window resize event.
          global.dispatchEvent(new Event('resize'))

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

          if (width < 576) {
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

              // no Manhattan violations
              expect(screen.queryByText('Manhattan:')).not.toBeInTheDocument()

              // values
              expect(screen.queryByText('3')).toBeInTheDocument()
              expect(screen.queryByText('4')).toBeInTheDocument()
              expect(screen.queryByText('1')).toBeInTheDocument()
              expect(screen.queryByText('2')).toBeInTheDocument()
            })
          } else {
            const showMoreDetailsLink = screen.queryByRole('link', {
              name: 'show details',
              hidden: true,
            })

            expect(showMoreDetailsLink).not.toBeInTheDocument()

            // keys
            expect(screen.queryByText('Bronx:')).toBeInTheDocument()
            expect(screen.queryByText('Brooklyn:')).toBeInTheDocument()
            expect(screen.queryByText('Manhattan:')).not.toBeInTheDocument()
            expect(screen.queryByText('Queens:')).toBeInTheDocument()
            expect(screen.queryByText('Staten Island:')).toBeInTheDocument()

            // values
            expect(screen.queryByText('3')).toBeInTheDocument()
            expect(screen.queryByText('4')).toBeInTheDocument()
            expect(screen.queryByText('1')).toBeInTheDocument()
            expect(screen.queryByText('2')).toBeInTheDocument()
          }
        },
      )

      test.each([
        {
          width: 420,
        },
        {
          width: 576,
        },
        {
          width: 640,
        },
      ])(
        'render the counts for violations in different boroughs for a page $width wide including when violations have no borough data',
        async ({ width }) => {
          // Change the viewport to show/hide the violations count depending on the width
          global.innerWidth = width

          // Trigger the window resize event.
          global.dispatchEvent(new Event('resize'))

          const vehicle = VehicleFactory.build({
            plate: 'ABC1234',
            state: 'NY',
            violations: [
              // three Bronx Violations
              ViolationFactory.build({ violationCounty: 'Bronx' }),
              ViolationFactory.build({ violationCounty: 'Bronx' }),
              ViolationFactory.build({ violationCounty: 'Bronx' }),

              // one violation with no borough
              ViolationFactory.build({
                violationCounty: 'No Borough Available',
              }),
            ],
          })

          render(
            <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
              <ViolationSummary vehicle={vehicle} />
            </CookiesProvider>,
          )

          if (width < 576) {
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
            expect(
              screen.queryByText('No Borough Available:'),
            ).not.toBeInTheDocument()

            // values
            expect(screen.queryByText('3')).not.toBeInTheDocument()
            expect(screen.queryByText('1')).not.toBeInTheDocument()

            // Click "show details" link
            userEvent.click(showMoreDetailsLink)

            await waitFor(() => {
              // keys
              expect(screen.queryByText('Bronx:')).toBeInTheDocument()
              expect(screen.queryByText('Unknown:')).toBeInTheDocument()

              // no Manhattan violations
              expect(screen.queryByText('Brooklyn:')).not.toBeInTheDocument()
              expect(screen.queryByText('Manhattan:')).not.toBeInTheDocument()
              expect(screen.queryByText('Queens:')).not.toBeInTheDocument()
              expect(
                screen.queryByText('Staten Island:'),
              ).not.toBeInTheDocument()

              // values
              expect(screen.queryByText('3')).toBeInTheDocument()
              expect(screen.queryByText('1')).toBeInTheDocument()
            })
          } else {
            const showMoreDetailsLink = screen.queryByRole('link', {
              name: 'show details',
              hidden: true,
            })

            expect(showMoreDetailsLink).not.toBeInTheDocument()

            // keys
            expect(screen.queryByText('Bronx:')).toBeInTheDocument()
            expect(screen.queryByText('Brooklyn:')).not.toBeInTheDocument()
            expect(screen.queryByText('Manhattan:')).not.toBeInTheDocument()
            expect(screen.queryByText('Unknown:')).toBeInTheDocument()
            expect(screen.queryByText('Queens:')).not.toBeInTheDocument()
            expect(screen.queryByText('Staten Island:')).not.toBeInTheDocument()

            // values
            expect(screen.queryByText('3')).toBeInTheDocument()
            expect(screen.queryByText('1')).toBeInTheDocument()
          }
        },
      )
    })
  })
})
