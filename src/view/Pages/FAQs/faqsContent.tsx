import L10N from 'constants/display'

export default [
  {
    answer: (
      <>
        If you're like us, <strong>every</strong> time you see a car on the
        sidewalk or speeding down your block, you wonder just how often they do
        that. HowsMyDrivingNY helps you answer that question, querying NYC's
        Open Data for traffic violation data by license plate.
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
          various tables in NYC Open Data
        </a>
        . When you search for a license plate, HowsMyDrivingNY requests data
        matching the plate from those tables. Some tables have fine data or
        medallion info, while others have more detailed location data.
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
        "New" violations are those found since the last time this exact plate
        was queried by any user, including you.
      </>
    ),
    question: 'Some results show "new" violations. What does this mean?',
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
