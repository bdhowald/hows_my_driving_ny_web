import React, { ReactNode } from 'react'
import Accordion from 'react-bootstrap/Accordion'

import L10N from 'constants/display'
import useNewStyleDisplayCookie from 'hooks/useNewStyleDisplayCookie/useNewStyleDisplayCookie'

import faqsContent from './faqsContent'
import './FAQs.css'

const FAQs = () => {
  const { newStyleDisplayActive } = useNewStyleDisplayCookie()
  const useNewStyleDisplay = newStyleDisplayActive()

  const newStyleDisplayClassName = useNewStyleDisplay ? 'new-style' : ''

  // return (
  //   <div className={`col-md-12 faqs-content-container ${newStyleDisplayClassName}`}>
  //     <div className="frequently-asked-question-header">
  //       <h1>FAQs</h1>
  //     </div>
  //     <div className="frequently-asked-question-content">
  //       <p className="question-content">
  //         Q: <span className="question">What is HowsMyDrivingNY?</span>
  //       </p>
  //       <p className="answer-content">
  //         A:{' '}
  //         <span className="answer">
  //           If you're like us, <strong>every</strong> time you see a car on the
  //           sidewalk or speeding down your block, you wonder just how often they
  //           do that. HowsMyDrivingNY helps you answer that question, querying
  //           NYC's Open Data for traffic violation data by license plate.
  //         </span>
  //       </p>
  //       <div className="frequently-asked-question">
  //         HowsMyDrivingNY queries NYC Open Data for vehicle information.
  //       </div>
  //     </div>
  //     <div className="frequently-asked-question-content">
  //       <p className="question-content">
  //         Q: <span className="question">How does HowsMyDrivingNY work?</span>
  //       </p>
  //       <p className="answer-content">
  //         A:{' '}
  //         <span className="answer">
  //           Violation data is spread across{' '}
  //           <a
  //             href={L10N.sitewide.openDataViolationDataSearchResults}
  //             rel="noopener noreferrer"
  //             target="_blank"
  //           >
  //             various tables in NYC Open Data
  //           </a>
  //           . When you search for a license plate, HowsMyDrivingNY requests data
  //           matching the plate from those tables. Some tables have fine data,
  //           while others have more detailed location data. HowsMyDrivingNY
  //           aggregates the results, merges and deduplicates them, and combines
  //           some fields to make the results more readable.
  //         </span>
  //       </p>
  //     </div>
  //     <div className="frequently-asked-question-content">
  //       <p className="question-content">
  //         Q: <span className="question">What does "Prev. Queried" mean?</span>
  //       </p>
  //       <p className="answer-content">
  //         A:{' '}
  //         <span className="answer">
  //           This is the date on which any user (maybe you!) looked up the exact
  //           same plate. <em>Note</em>: looking up a plate with a plate type and
  //           without one produce slightly different plates and different results.
  //         </span>
  //       </p>
  //     </div>
  //     <div className="frequently-asked-question-content">
  //       <p className="question-content">
  //         Q:{' '}
  //         <span className="question">
  //           Some results show "new" violations. What does this mean?
  //         </span>
  //       </p>
  //       <p className="answer-content">
  //         A:{' '}
  //         <span className="answer">
  //           "New" violations are those found since the last time this exact plate
  //           was queried by any user, including you.
  //         </span>
  //       </p>
  //     </div>
  //     <div className="frequently-asked-question-content">
  //       <p className="question-content">
  //         Q: <span className="question">What happened to the Twitter bot?!?</span>
  //       </p>
  //       <p className="answer-content">
  //         A:{' '}
  //         <span className="answer">
  //           Twitter charges $200/month for the level of API access needed to for
  //           the bot to read and respond to tweets.
  //         </span>
  //       </p>
  //     </div>
  //   </div>
  // )

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
        {faqsContent.map(
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
