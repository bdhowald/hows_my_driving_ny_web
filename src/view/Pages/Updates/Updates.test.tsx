import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Updates from './Updates'

describe('Updates', () => {
  it('should render successfully', () => {
    render(<Updates />)
  })

  describe('content', () => {
    it('should render the header content', () => {
      render(<Updates />)

      // title
      expect(screen.getByText('Site Updates')).toBeInTheDocument()

      // sentences
      expect(
        screen.getByText('Below is a running list of site updates.'),
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          'Most are changes you can see or use, e.g. features, visual adjustments, or new content, but some are technical updates that help the site run more smoothly.',
        ),
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          'The goal is to let you know how the site improves over time.',
        ),
      ).toBeInTheDocument()
    })

    it('should render each year for which there are updates: 2018-2025', () => {
      render(<Updates />)

      const years = Array.from(new Array(8), (_, i) => i + 2018)

      // expect all years to be present
      years.forEach((year) =>
        expect(screen.getByText(year, { selector: 'summary' })),
      )
    })

    it('should not display individual updates unless that year has been toggled open', () => {
      render(<Updates />)

      const individualUpdateText =
        'Further define vehicle lookup content to ensure correct margins.'
      const individualUpdate = screen.queryByText(individualUpdateText)

      expect(individualUpdate).not.toBeVisible()
      const detailsElementFor2025 = screen.getByText('2025')

      // toggle '2025' section open
      userEvent.click(detailsElementFor2025)

      // element should be visible after toggling year section
      expect(individualUpdate).toBeVisible()

      // toggle '2025' section back closed
      userEvent.click(detailsElementFor2025)

      // element should no longer be visible after again toggling year section
      expect(individualUpdate).not.toBeVisible()

      // check for project pills
      expect(screen.queryAllByText('api').length).toBeGreaterThan(0)
      expect(screen.queryAllByText('web').length).toBeGreaterThan(0)
      expect(screen.queryAllByText('social media').length).toBeGreaterThan(0)
    })
  })
})
