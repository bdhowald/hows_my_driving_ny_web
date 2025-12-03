import React, { ReactNode } from 'react'
import Accordion from 'react-bootstrap/Accordion'

import L10N from 'constants/display'
import { USER_SETTINGS_STORAGE_KEYS } from 'constants/userSettings'
import useSettings from 'hooks/useSettings/useSettings'

import FAQS_CONTENT from './faqsContent'
import './FAQs.css'

const FAQs = () => {
  const { getSetting } = useSettings()
  const useNewStyleDisplay =
    getSetting(USER_SETTINGS_STORAGE_KEYS.useNewStyleDisplay) === true

  const newStyleDisplayClassName = useNewStyleDisplay ? 'new-style' : ''

  return (
    <div
      className={`col-md-12 frequently-asked-questions-content-container ${newStyleDisplayClassName}`}
    >
      <div className="frequently-asked-questions-header">
        <h1>FAQs</h1>
        <div className="frequently-asked-questions-header-description">
          {L10N.pages.faqs.header.description.map((descriptionSentence) => (
            <div
              className="frequently-asked-questions-header-description-sentence"
              key={descriptionSentence.substring(0, 10)}
            >
              {descriptionSentence}
            </div>
          ))}
        </div>
      </div>
      <Accordion className="frequently-asked-questions-content">
        {FAQS_CONTENT.map(
          (
            { answer, question }: { answer: ReactNode; question: ReactNode },
            index,
          ) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header className="question-content">
                <span className="question">{question}</span>
              </Accordion.Header>
              <Accordion.Body className="answer-content">
                <span className="answer">{answer}</span>
              </Accordion.Body>
            </Accordion.Item>
          ),
        )}
      </Accordion>
    </div>
  )
}

export default FAQs
