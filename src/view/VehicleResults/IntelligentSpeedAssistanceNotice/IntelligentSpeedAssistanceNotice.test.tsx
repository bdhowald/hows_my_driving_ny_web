import React from 'react'
import { Cookies, CookiesProvider } from 'react-cookie'
import { render, screen } from '@testing-library/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'

import IntelligentSpeedAssistanceNotice from './IntelligentSpeedAssistanceNotice'

describe('IntelligentSpeedAssistanceNotice', () => {
  describe('renders without error', () => {
    describe('new-style display', () => {
      test.each([
        {
          cameraStreakData: {
            cameraViolations: {
              maxStreak: 20,
              streakEnd: '2024-10-07T10:02:00.000-04:00',
              streakStart: '2023-12-31T15:34:00.000-05:00',
              total: 27,
            },
          },
        },
      ])(
        'renders the correct language when a vehicle is eligible',
        ({ cameraStreakData }) => {
          const vehicle = VehicleFactory.build({
            cameraStreakData,
          })

          render(
            <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
              <IntelligentSpeedAssistanceNotice vehicle={vehicle} />
            </CookiesProvider>,
          )

          // Expect sponsors' names to be visible
          expect(
            screen.getByText('Assembly Member Gallagher'),
          ).toBeInTheDocument()
          expect(
            screen.getByText('State Senator Gounardes'),
          ).toBeInTheDocument()
          // Expect bill name to be visible
          expect(
            screen.getByText('Speed Limiters for the Most Reckless Drivers'),
          ).toBeInTheDocument()
          // expect description language to be visible
          expect(
            screen.getByText('intelligent speed assistance technology'),
          ).toBeInTheDocument()
          // Expect number of violations to be visible
          expect(
            screen.getByText('20'),
          ).toBeInTheDocument()
          // Expect camera violations language to be visible
          expect(
            screen.getByText('red light and speed camera violations'),
          ).toBeInTheDocument()
          // Expect threshold to be visible
          expect(
            screen.getByText('(>= 6/year)', { exact: false }),
          ).toBeInTheDocument()
          // Expect streak dates to be visible
          expect(
            screen.getByText('12/31/2023 to 10/07/2024', { exact: false }),
          ).toBeInTheDocument()
        },
      )
    })

    describe('old-style display', () => {
      test.each([
        {
          cameraStreakData: {
            cameraViolations: {
              maxStreak: 20,
              streakEnd: '2024-10-07T10:02:00.000-04:00',
              streakStart: '2023-12-31T15:34:00.000-05:00',
              total: 27,
            },
          },
        },
      ])(
        'renders successfully when a vehicle is eligible',
        ({ cameraStreakData }) => {
          const vehicle = VehicleFactory.build({
            cameraStreakData,
          })

          render(
            <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
              <IntelligentSpeedAssistanceNotice vehicle={vehicle} />
            </CookiesProvider>,
          )

          // Expect sponsors' names to be visible
          expect(
            screen.getByText('Assembly Member Gallagher'),
          ).toBeInTheDocument()
          expect(
            screen.getByText('State Senator Gounardes'),
          ).toBeInTheDocument()
          // Expect bill name to be visible
          expect(
            screen.getByText('Speed Limiters for the Most Reckless Drivers'),
          ).toBeInTheDocument()
          // expect description language to be visible
          expect(
            screen.getByText('intelligent speed assistance technology'),
          ).toBeInTheDocument()
          // Expect number of violations to be visible
          expect(
            screen.getByText('20'),
          ).toBeInTheDocument()
          // Expect camera violations language to be visible
          expect(
            screen.getByText('red light and speed camera violations'),
          ).toBeInTheDocument()
          // Expect threshold to be visible
          expect(
            screen.getByText('(>= 6/year)', { exact: false }),
          ).toBeInTheDocument()
          // Expect streak dates to be visible
          expect(
            screen.getByText('12/31/2023 to 10/07/2024', { exact: false }),
          ).toBeInTheDocument()
        },
      )
    })
  })

  describe('handling unexpected data states', () => {
    describe('new-style display', () => {
      it('should throw an error when a vehicle is not eligible', () => {
        const consoleError = jest
          .spyOn(console, 'error')
          .mockImplementation(jest.fn())

        const vehicle = VehicleFactory.build({
          cameraStreakData: {
            cameraViolations: {
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
              <IntelligentSpeedAssistanceNotice vehicle={vehicle} />
            </CookiesProvider>,
          ),
        ).toThrow('Camera data does not conform to any known configuration.')
        expect(consoleError).toHaveBeenCalled()
      })
    })

    describe('old-style display', () => {
      it('should throw an error when a vehicle is not eligible', () => {
        const consoleError = jest
          .spyOn(console, 'error')
          .mockImplementation(jest.fn())

        const vehicle = VehicleFactory.build({
          cameraStreakData: {
            cameraViolations: {
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
              <IntelligentSpeedAssistanceNotice vehicle={vehicle} />
            </CookiesProvider>,
          ),
        ).toThrow('Camera data does not conform to any known configuration.')
        expect(consoleError).toHaveBeenCalled()
      })
    })
  })
})
