import React from 'react'
import { render, screen } from '@testing-library/react'

import { ViolationFactory } from '__fixtures__/models/Violation'

import TableRow from './ViolationsTableRow'

const tableRow = document.createElement('tbody')

describe('ViolationsTableRow', () => {
  describe('renders without error', () => {
    it('renders successfully without showing full fine data or violation description', async () => {
      render(
        <TableRow
          showFullFineData={false}
          showFullText={false}
          violation={ViolationFactory.build()}
        />,
        { container: document.body.appendChild(tableRow) },
      )
    })

    it('renders successfully showing full fine data, but not the full violation description', async () => {
      render(
        <TableRow
          showFullFineData
          showFullText={false}
          violation={ViolationFactory.build()}
        />,
        { container: document.body.appendChild(tableRow) },
      )
    })

    it('renders successfully showing the full violation description, but not full fine data', async () => {
      render(
        <TableRow
          showFullFineData={false}
          showFullText
          violation={ViolationFactory.build()}
        />,
        { container: document.body.appendChild(tableRow) },
      )
    })

    it('renders successfully showing both the full fine data and the violation description', async () => {
      render(
        <TableRow
          showFullFineData
          showFullText
          violation={ViolationFactory.build()}
        />,
        { container: document.body.appendChild(tableRow) },
      )
    })
  })

  describe('rendering icons', () => {
    describe('renders the appropriate icon for the violation code when showFullText is false', () => {
      test.each([
        { iconName: 'bus', violationCode: '5' },
        { iconName: 'traffic-light', violationCode: '7' },
        { iconName: 'bus', violationCode: '12' },
        { iconName: 'tachometer-alt', violationCode: '36' },
      ])(
        'renders the $iconName icon for a violation with violation code $violationCode',
        ({ iconName, violationCode }) => {
          const violation = ViolationFactory.build({ violationCode })

          render(
            <TableRow
              showFullFineData={false}
              showFullText={false}
              violation={violation}
            />,
            { container: document.body.appendChild(tableRow) },
          )

          const icon = screen.getByTitle(`${iconName} icon`)
          expect(icon).toBeDefined()
        },
      )
    })

    it('renders no icon when showFullText is true', () => {
      const violation = ViolationFactory.build({ violationCode: '5' })

      render(
        <TableRow
          showFullFineData={false}
          showFullText
          violation={violation}
        />,
        { container: document.body.appendChild(tableRow) },
      )

      expect(() => screen.getByTitle('bus icon')).toThrow()
    })
  })

  describe('renders expected fields', () => {
    it('renders the date, borough, and fines when all are present', async () => {
      const borough = 'Staten Island'
      const violationDate = '04/17/2021'

      const amountDue = 30
      const fineAmount = 50
      const paymentAmount = 20

      const violation = ViolationFactory.build({
        amountDue,
        fineAmount,
        getBorough: () => borough,
        getViolationDate: () => violationDate,
        paymentAmount,
      })

      render(
        <TableRow
          showFullFineData
          showFullText={false}
          violation={violation}
        />,
        { container: document.body.appendChild(tableRow) },
      )

      const tableRowElement = screen.getByTestId(
        `summons ${violation.summonsNumber}`,
      )

      // date
      expect(tableRowElement.textContent).toContain(violationDate)

      // borough
      expect(tableRowElement.textContent).toContain(borough)

      // fines
      expect(tableRowElement.textContent).toContain(`$${fineAmount}.00`)
      expect(tableRowElement.textContent).toContain(`$${paymentAmount}.00`)
      expect(tableRowElement.textContent).toContain(`$${amountDue}.00`)
    })

    it('renders only the payment amount among fines when showFullFines is false', async () => {
      const amountDue = 30
      const fineAmount = 50
      const paymentAmount = 20

      const violation = ViolationFactory.build({
        amountDue,
        fineAmount,
        paymentAmount,
      })

      render(
        <TableRow
          showFullFineData={false}
          showFullText={false}
          violation={violation}
        />,
        { container: document.body.appendChild(tableRow) },
      )

      const tableRowElement = screen.getByTestId(
        `summons ${violation.summonsNumber}`,
      )

      expect(tableRowElement.textContent).toContain(`$${fineAmount}.00`)
      expect(tableRowElement.textContent).not.toContain(`$${paymentAmount}.00`)
      expect(tableRowElement.textContent).not.toContain(`$${amountDue}.00`)
    })
  })

  it('renders the violation description when showFullText is true', async () => {
    const humanizedDescription = 'Bus Lane Violation'

    const violation = ViolationFactory.build({
      humanizedDescription,
      violationCode: '5',
    })

    render(
      <TableRow showFullFineData={false} showFullText violation={violation} />,
      { container: document.body.appendChild(tableRow) },
    )

    const tableRowElement = screen.getByTestId(
      `summons ${violation.summonsNumber}`,
    )

    expect(tableRowElement.textContent).toContain(humanizedDescription)
  })

  it('renders the the borough and address/intersection when showFullText is true', async () => {
    const humanizedDescription = 'Bus Lane Violation'

    const violation = ViolationFactory.build({
      getBorough: () => 'Brooklyn',
      getLocationDescription: () => '178 Stuyvesant Avenue',
      humanizedDescription,
      violationCode: '5',
    })

    render(
      <TableRow showFullFineData={false} showFullText violation={violation} />,
      { container: document.body.appendChild(tableRow) },
    )

    const tableRowElement = screen.getByTestId(
      `summons ${violation.summonsNumber}`,
    )

    expect(tableRowElement.textContent).toContain(
      'Brooklyn(178 Stuyvesant Avenue)',
    )
  })

  it('renders the the borough only when showFullText is true but there is no address/location data', async () => {
    const humanizedDescription = 'Bus Lane Violation'

    const violation = ViolationFactory.build({
      getBorough: () => 'Brooklyn',
      getLocationDescription: () => '',
      humanizedDescription,
      violationCode: '5',
    })

    render(
      <TableRow showFullFineData={false} showFullText violation={violation} />,
      { container: document.body.appendChild(tableRow) },
    )

    const tableRowElement = screen.getByTestId(
      `summons ${violation.summonsNumber}`,
    )

    expect(tableRowElement.textContent).toContain('Brooklyn')
    expect(tableRowElement.textContent).not.toContain('()')
  })
})
