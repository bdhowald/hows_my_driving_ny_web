import React from 'react'
import { Cookies, CookiesProvider } from 'react-cookie'
import { render, screen } from '@testing-library/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'

import DangerousVehicleAbatementActNotice from './DangerousVehicleAbatementActNotice'

describe('DangerousVehicleAbatementAct', () => {
  describe('renders without error', () => {
    describe('new-style display', () => {
      test.each([
        {
          cameraStreakData: {
            schoolZoneSpeedCameraViolations: {
              maxStreak: 20,
              streakEnd: '2024-10-07T10:02:00.000-04:00',
              streakStart: '2023-12-31T15:34:00.000-05:00',
              total: 27,
            },
          },
          eligibilityType: 'speed camera violations',
        },
        {
          cameraStreakData: {
            redLightCameraViolations: {
              maxStreak: 7,
              streakEnd: '2024-05-06T14:59:00.000-04:00',
              streakStart: '2023-06-27T12:43:00.000-04:00',
              total: 9,
            },
          },
          eligibilityType: 'red light camera violations',
        },
        {
          cameraStreakData: {
            redLightCameraViolations: {
              maxStreak: 7,
              streakEnd: '2024-05-06T14:59:00.000-04:00',
              streakStart: '2023-06-27T12:43:00.000-04:00',
              total: 9,
            },
            schoolZoneSpeedCameraViolations: {
              maxStreak: 20,
              streakEnd: '2024-10-07T10:02:00.000-04:00',
              streakStart: '2023-12-31T15:34:00.000-05:00',
              total: 27,
            },
          },
          eligibilityType: 'red light camera and speed camera violations',
        },
      ])(
        'renders successfully when a vehicle is eligible for $eligibilityType',
        ({ cameraStreakData }) => {
          const vehicle = VehicleFactory.build({
            cameraStreakData,
          })

          render(
            <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
              <DangerousVehicleAbatementActNotice vehicle={vehicle} />
            </CookiesProvider>,
          )

          // Expect law name to be visible
          expect(
            screen.getByText('Dangerous Vehicle Abatement Act'),
          ).toBeInTheDocument()
        },
      )
    })

    describe('old-style display', () => {
      test.each([
        {
          cameraStreakData: {
            schoolZoneSpeedCameraViolations: {
              maxStreak: 20,
              streakEnd: '2024-10-07T10:02:00.000-04:00',
              streakStart: '2023-12-31T15:34:00.000-05:00',
              total: 27,
            },
          },
          eligibilityType: 'speed camera violations',
        },
        {
          cameraStreakData: {
            redLightCameraViolations: {
              maxStreak: 7,
              streakEnd: '2024-05-06T14:59:00.000-04:00',
              streakStart: '2023-06-27T12:43:00.000-04:00',
              total: 9,
            },
          },
          eligibilityType: 'red light camera violations',
        },
        {
          cameraStreakData: {
            redLightCameraViolations: {
              maxStreak: 7,
              streakEnd: '2024-05-06T14:59:00.000-04:00',
              streakStart: '2023-06-27T12:43:00.000-04:00',
              total: 9,
            },
            schoolZoneSpeedCameraViolations: {
              maxStreak: 20,
              streakEnd: '2024-10-07T10:02:00.000-04:00',
              streakStart: '2023-12-31T15:34:00.000-05:00',
              total: 27,
            },
          },
          eligibilityType: 'red light camera and speed camera violations',
        },
      ])(
        'renders successfully when a vehicle is eligible for $eligibilityType',
        ({ cameraStreakData }) => {
          const vehicle = VehicleFactory.build({
            cameraStreakData,
          })

          render(
            <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
              <DangerousVehicleAbatementActNotice vehicle={vehicle} />
            </CookiesProvider>,
          )

          // Expect law name to be visible
          expect(
            screen.getByText('Dangerous Vehicle Abatement Act'),
          ).toBeInTheDocument()
        },
      )
    })
  })

  describe('render the correct language', () => {
    describe('new-style display', () => {
      it('should render the correct language when a vehicle is eligible by its red light camera and speed camera violations', () => {
        const vehicle = VehicleFactory.build({
          cameraStreakData: {
            redLightCameraViolations: {
              maxStreak: 7,
              streakEnd: '2024-05-06T14:59:00.000-04:00',
              streakStart: '2023-06-27T12:43:00.000-04:00',
              total: 9,
            },
            schoolZoneSpeedCameraViolations: {
              maxStreak: 20,
              streakEnd: '2024-10-07T10:02:00.000-04:00',
              streakStart: '2023-12-31T15:34:00.000-05:00',
              total: 27,
            },
          },
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
            <DangerousVehicleAbatementActNotice vehicle={vehicle} />
          </CookiesProvider>,
        )

        // red light eligibility string
        //
        // amount
        expect(
          screen.getByText(
            vehicle.cameraStreakData.redLightCameraViolations.maxStreak,
            { selector: 'span' },
          ),
        ).toBeInTheDocument()
        // type
        expect(
          screen.getByText('red light camera violations'),
        ).toBeInTheDocument()
        // threshold
        expect(
          screen.getByText('(>= 5/year)', { exact: false }),
        ).toBeInTheDocument()
        // date range
        expect(
          screen.getByText('06/27/2023 to 05/06/2024', { exact: false }),
        ).toBeInTheDocument()

        // speed camera eligibility string
        //
        // amount
        expect(
          screen.getByText(
            vehicle.cameraStreakData.schoolZoneSpeedCameraViolations.maxStreak,
            { selector: 'span' },
          ),
        ).toBeInTheDocument()
        // type
        expect(
          screen.getByText('school zone speed camera violations'),
        ).toBeInTheDocument()
        // threshold
        expect(
          screen.getByText('(>= 15/year)', { exact: false }),
        ).toBeInTheDocument()
        // date range
        expect(
          screen.getByText('12/31/2023 to 10/07/2024', { exact: false }),
        ).toBeInTheDocument()
      })

      it('should render the correct language when a vehicle is eligible by its red light camera violations', () => {
        const vehicle = VehicleFactory.build({
          cameraStreakData: {
            redLightCameraViolations: {
              maxStreak: 7,
              streakEnd: '2024-05-06T14:59:00.000-04:00',
              streakStart: '2023-06-27T12:43:00.000-04:00',
              total: 9,
            },
          },
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
            <DangerousVehicleAbatementActNotice vehicle={vehicle} />
          </CookiesProvider>,
        )

        // red light eligibility string
        //
        // amount
        expect(
          screen.getByText(
            vehicle.cameraStreakData.redLightCameraViolations.maxStreak,
            { selector: 'span' },
          ),
        ).toBeInTheDocument()
        // type
        expect(
          screen.getByText('red light camera violations'),
        ).toBeInTheDocument()
        // threshold
        expect(
          screen.getByText('(>= 5/year)', { exact: false }),
        ).toBeInTheDocument()
        // date range
        expect(
          screen.getByText('06/27/2023 to 05/06/2024', { exact: false }),
        ).toBeInTheDocument()

        // expect speed camera notice not in results
        expect(
          screen.queryByText('school zone speed camera violations'),
        ).not.toBeInTheDocument()
        expect(
          screen.queryByText('(>= 15/year)', { exact: false }),
        ).not.toBeInTheDocument()
      })

      it('should render the correct language when a vehicle is eligible by its speed camera violations', () => {
        const vehicle = VehicleFactory.build({
          cameraStreakData: {
            schoolZoneSpeedCameraViolations: {
              maxStreak: 20,
              streakEnd: '2024-10-07T10:02:00.000-04:00',
              streakStart: '2023-12-31T15:34:00.000-05:00',
              total: 27,
            },
          },
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
            <DangerousVehicleAbatementActNotice vehicle={vehicle} />
          </CookiesProvider>,
        )

        // speed camera eligibility string
        //
        // amount
        expect(
          screen.getByText(
            vehicle.cameraStreakData.schoolZoneSpeedCameraViolations.maxStreak,
            { selector: 'span' },
          ),
        ).toBeInTheDocument()
        // type
        expect(
          screen.getByText('school zone speed camera violations'),
        ).toBeInTheDocument()
        // threshold
        expect(
          screen.getByText('(>= 15/year)', { exact: false }),
        ).toBeInTheDocument()
        // speed camera date range
        expect(
          screen.getByText('12/31/2023 to 10/07/2024', { exact: false }),
        ).toBeInTheDocument()

        // expect red light camera notice not in results
        expect(
          screen.queryByText('red light camera violations'),
        ).not.toBeInTheDocument()
        expect(
          screen.queryByText('(>= 5/year)', { exact: false }),
        ).not.toBeInTheDocument()
      })
    })

    describe('old-style display', () => {
      it('should render the correct language when a vehicle is eligible by its red light camera and speed camera violations', () => {
        const vehicle = VehicleFactory.build({
          cameraStreakData: {
            redLightCameraViolations: {
              maxStreak: 7,
              streakEnd: '2024-05-06T14:59:00.000-04:00',
              streakStart: '2023-06-27T12:43:00.000-04:00',
              total: 9,
            },
            schoolZoneSpeedCameraViolations: {
              maxStreak: 20,
              streakEnd: '2024-10-07T10:02:00.000-04:00',
              streakStart: '2023-12-31T15:34:00.000-05:00',
              total: 27,
            },
          },
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
            <DangerousVehicleAbatementActNotice vehicle={vehicle} />
          </CookiesProvider>,
        )

        // red light eligibility string
        //
        // amount
        expect(
          screen.getByText(
            vehicle.cameraStreakData.redLightCameraViolations.maxStreak,
            { selector: 'span' },
          ),
        ).toBeInTheDocument()
        // type
        expect(
          screen.getByText('red light camera violations'),
        ).toBeInTheDocument()
        // threshold
        expect(
          screen.getByText('(>= 5/year)', { exact: false }),
        ).toBeInTheDocument()
        // date range
        expect(
          screen.getByText('06/27/2023 to 05/06/2024', { exact: false }),
        ).toBeInTheDocument()

        // speed camera eligibility string
        //
        // amount
        expect(
          screen.getByText(
            vehicle.cameraStreakData.schoolZoneSpeedCameraViolations.maxStreak,
            { selector: 'span' },
          ),
        ).toBeInTheDocument()
        // type
        expect(
          screen.getByText('school zone speed camera violations'),
        ).toBeInTheDocument()
        // threshold
        expect(
          screen.getByText('(>= 15/year)', { exact: false }),
        ).toBeInTheDocument()
        // date range
        expect(
          screen.getByText('12/31/2023 to 10/07/2024', { exact: false }),
        ).toBeInTheDocument()
      })

      it('should render the correct language when a vehicle is eligible by its red light camera violations', () => {
        const vehicle = VehicleFactory.build({
          cameraStreakData: {
            redLightCameraViolations: {
              maxStreak: 7,
              streakEnd: '2024-05-06T14:59:00.000-04:00',
              streakStart: '2023-06-27T12:43:00.000-04:00',
              total: 9,
            },
          },
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
            <DangerousVehicleAbatementActNotice vehicle={vehicle} />
          </CookiesProvider>,
        )

        // red light eligibility string
        //
        // amount
        expect(
          screen.getByText(
            vehicle.cameraStreakData.redLightCameraViolations.maxStreak,
            { selector: 'span' },
          ),
        ).toBeInTheDocument()
        // type
        expect(
          screen.getByText('red light camera violations'),
        ).toBeInTheDocument()
        // threshold
        expect(
          screen.getByText('(>= 5/year)', { exact: false }),
        ).toBeInTheDocument()
        // date range
        expect(
          screen.getByText('06/27/2023 to 05/06/2024', { exact: false }),
        ).toBeInTheDocument()

        // expect speed camera notice not in results
        expect(
          screen.queryByText('school zone speed camera violations'),
        ).not.toBeInTheDocument()
        expect(
          screen.queryByText('(>= 15/year)', { exact: false }),
        ).not.toBeInTheDocument()
      })

      it('should render the correct language when a vehicle is eligible by its speed camera violations', () => {
        const vehicle = VehicleFactory.build({
          cameraStreakData: {
            schoolZoneSpeedCameraViolations: {
              maxStreak: 20,
              streakEnd: '2024-10-07T10:02:00.000-04:00',
              streakStart: '2023-12-31T15:34:00.000-05:00',
              total: 27,
            },
          },
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
            <DangerousVehicleAbatementActNotice vehicle={vehicle} />
          </CookiesProvider>,
        )

        // speed camera eligibility string
        //
        // amount
        expect(
          screen.getByText(
            vehicle.cameraStreakData.schoolZoneSpeedCameraViolations.maxStreak,
            { selector: 'span' },
          ),
        ).toBeInTheDocument()
        // type
        expect(
          screen.getByText('school zone speed camera violations'),
        ).toBeInTheDocument()
        // threshold
        expect(
          screen.getByText('(>= 15/year)', { exact: false }),
        ).toBeInTheDocument()
        // speed camera date range
        expect(
          screen.getByText('12/31/2023 to 10/07/2024', { exact: false }),
        ).toBeInTheDocument()

        // expect red light camera notice not in results
        expect(
          screen.queryByText('red light camera violations'),
        ).not.toBeInTheDocument()
        expect(
          screen.queryByText('(>= 5/year)', { exact: false }),
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('handling unexpected data states', () => {
    describe('new-style display', () => {
      it('should throw an error when a vehicle is eligible by neither red light camera or speed camera data', () => {
        const consoleError = jest
          .spyOn(console, 'error')
          .mockImplementation(jest.fn())

        const vehicle = VehicleFactory.build({
          cameraStreakData: {
            redLightCameraViolations: {
              maxStreak: 0,
              streakEnd: null,
              streakStart: null,
              total: 0,
            },
            schoolZoneSpeedCameraViolations: {
              maxStreak: 0,
              streakEnd: null,
              streakStart: null,
              total: 0,
            },
          },
        })

        expect(() =>
          render(
            <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
              <DangerousVehicleAbatementActNotice vehicle={vehicle} />
            </CookiesProvider>,
          ),
        ).toThrow('Camera data does not conform to any known configuration.')
        expect(consoleError).toHaveBeenCalled()
      })
    })

    describe('old-style display', () => {
      it('should throw an error when a vehicle is eligible by neither red light camera or speed camera data', () => {
        const consoleError = jest
          .spyOn(console, 'error')
          .mockImplementation(jest.fn())

        const vehicle = VehicleFactory.build({
          cameraStreakData: {
            redLightCameraViolations: {
              maxStreak: 0,
              streakEnd: null,
              streakStart: null,
              total: 0,
            },
            schoolZoneSpeedCameraViolations: {
              maxStreak: 0,
              streakEnd: null,
              streakStart: null,
              total: 0,
            },
          },
        })

        expect(() =>
          render(
            <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
              <DangerousVehicleAbatementActNotice vehicle={vehicle} />
            </CookiesProvider>,
          ),
        ).toThrow('Camera data does not conform to any known configuration.')
        expect(consoleError).toHaveBeenCalled()
      })
    })
  })
})
