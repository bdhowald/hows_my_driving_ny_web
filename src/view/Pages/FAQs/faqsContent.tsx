import React from 'react'
import L10N from 'constants/display'

const FAQS_CONTENT = [
  {
    answer: (
      <>
        If you&apos;re like us, <strong>every</strong> time you see a car on the
        sidewalk or speeding down your block, you wonder just how often they do
        that. HowsMyDrivingNY helps you answer that question, querying
        NYC&apos;s Open Data for traffic violation data by license plate.
      </>
    ),
    question: 'What is HowsMyDrivingNY?',
  },
  {
    answer: (
      <>
        New York City ticket/violation data is spread across{' '}
        <a
          href={L10N.sitewide.openDataViolationDataSearchResults}
          rel="noopener noreferrer"
          target="_blank"
        >
          various databases in NYC Open Data
        </a>
        . When you search for a license plate, HowsMyDrivingNY requests data
        matching the plate from those databases. Some databases have fine data
        or medallion info, while others have more detailed location data.
        HowsMyDrivingNY aggregates the results, merges and deduplicates them,
        and combines some fields to make the results more readable.
      </>
    ),
    question: 'How does HowsMyDrivingNY work?',
  },
  {
    answer: (
      <>
        This is the date on which any user (maybe you!) looked up the exact same
        plate. <em>Note</em>: looking up a plate with a plate type and without
        one produce slightly different plates and different results.
      </>
    ),
    question: 'What does "Prev. Queried" mean?',
  },
  {
    answer: (
      <>
        &quot;New&quot; violations are those found since the last time this
        exact plate was queried by any user, including you.
      </>
    ),
    question: 'Some results show "new" violations. What does this mean?',
  },
  {
    answer: (
      <>
        Most NYC Open Data traffic violation databases are updated once per
        month, but others are updated more frequently. Address data is found in
        databases that are updated less frequently, while fine data is on a
        database that is updated about once per week.
      </>
    ),
    question: 'Why are some results missing an address or intersection?',
  },
  {
    answer: (
      <>
        NYC Open Data for red light, speed, and bus cameras violations do not
        contain image URLs.
      </>
    ),
    question: 'Why are some results missing an image of the violation?',
  },
  {
    answer: (
      <>
        Twitter charges $200/month for the level of API access needed to for the
        bot to read and respond to tweets.
      </>
    ),
    question: 'What happened to the Twitter bot?!?',
  },
]

export default FAQS_CONTENT
