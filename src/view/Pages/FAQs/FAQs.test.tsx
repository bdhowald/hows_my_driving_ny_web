import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SettingsContext } from 'context/SettingsContext/SettingsContext'

import FAQs from './FAQs'

describe('FAQs', () => {
  const mockedSettings = {
    getSetting: jest.fn(),
    removeSetting: jest.fn(),
    updateSetting: jest.fn(),
  }

  it('should render successfully', () => {
    render(
      <SettingsContext.Provider value={mockedSettings}>
        <FAQs />
      </SettingsContext.Provider>,
    )
  })

  describe('content', () => {
    it('should render the header', () => {
      render(
        <SettingsContext.Provider value={mockedSettings}>
          <FAQs />
        </SettingsContext.Provider>,
      )

      // title
      expect(screen.getByText('FAQs')).toBeInTheDocument()

      // sentences
      expect(
        screen.getByText(
          "Since 2018, you've asked us many questions about HowsMyDrivingNY.",
        ),
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          'Here are the things people ask us a lot, so we finally wrote them down.',
        ),
      ).toBeInTheDocument()
    })

    it('should display the FAQs question content upon page load', () => {
      render(
        <SettingsContext.Provider value={mockedSettings}>
          <FAQs />
        </SettingsContext.Provider>,
      )

      expect(screen.getByText('What is HowsMyDrivingNY?')).toBeVisible()
      expect(screen.getByText('How does HowsMyDrivingNY work?')).toBeVisible()
      expect(screen.getByText('What does "Prev. Queried" mean?')).toBeVisible()
      expect(
        screen.getByText(
          'Some results show "new" violations. What does this mean?',
        ),
      ).toBeVisible()
      expect(
        screen.getByText('What happened to the Twitter bot?!?'),
      ).toBeVisible()
    })

    it("should not display FAQ answers unless that answer's question has been toggled open", async () => {
      render(
        <SettingsContext.Provider value={mockedSettings}>
          <FAQs />
        </SettingsContext.Provider>,
      )

      const questionText =
        'Some results show "new" violations. What does this mean?'
      const questionElement = screen.getByText(questionText)

      const answerText =
        '"New" violations are those found since the last time this exact plate was queried by any user, including you.'
      const answerElement = screen.getByText(answerText)

      // question should be visible
      expect(questionElement).toBeVisible()

      // can't test CSS styles directly
      expect(answerElement.closest('.accordion-collapse')).not.toHaveClass(
        'show',
      )

      // toggle FAQ open
      userEvent.click(questionElement)

      // answer should now have open class
      await waitFor(() => {
        expect(answerElement.closest('.accordion-collapse')).toHaveClass('show')
      })

      // toggle FAQ back closed
      userEvent.click(questionElement)

      // answer should not have open class anymore
      await waitFor(() => {
        expect(answerElement.closest('.accordion-collapse')).not.toHaveClass(
          'show',
        )
      })
    })
  })
})
