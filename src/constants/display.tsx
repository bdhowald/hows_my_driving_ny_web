import * as React from 'react'

const EASTERN_TIME_ZONE = 'America/New_York'

const EASTERN_TIME_ZONE_DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

const EASTERN_TIME_ZONE_TIME_FORMAT = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  timeZone: EASTERN_TIME_ZONE,
})

const NYC_OPEN_DATA_VIOLATION_DATA_SEARCH_RESULTS =
  'https://data.cityofnewyork.us/browse?q=parking%20violations&sortBy=relevance'

export default {
  dates: {
    aprilFoolsDay: {
      month: 4,
      day: 1,
    },
  },
  legislation: {
    dangerousVehicleAbatementAct: {
      legislationName: 'Dangerous Vehicle Abatement Act',
      legislationUrl:
        'https://legistar.council.nyc.gov/LegislationDetail.aspx?ID=3521908&GUID=A4FD4CFC-8AD8-4130-AA92-11BC56936F6D#:~:text=The%20bill%20will%20create%20a,Department%20of%20Transportation%20(DOT).',
    },
    speedLimitersForTheMostRecklessDrivers: {
      legislationLinks: {
        assembly:
          'https://www.nysenate.gov/legislation/bills/2025/A2299/amendment/B',
        senate:
          'https://www.nysenate.gov/legislation/bills/2025/S4045/amendment/A',
      },
      learnMore: {
        link: 'https://static1.squarespace.com/static/66e9f5934be5cb497f7cfd6c/t/68bf36bee4ed1a6d76a6f552/1757361854806/Super+Speeders+One+Pager+9.25+updated.pdf',
        text: 'intelligent speed assistance technology',
      },
      legislationName: 'Speed Limiters for the Most Reckless Drivers',
      sponsors: [
        {
          link: 'https://nyassembly.gov/mem/Emily-Gallagher',
          name: 'Assembly Member Gallagher',
        },
        {
          link: 'https://www.nysenate.gov/senators/andrew-gounardes',
          name: 'State Senator Gounardes',
        },
      ],
      support: {
        link: 'https://act.transalt.org/a/intelligent-speed-assistance',
        text: 'here',
      },
    },
  },
  lookups: {
    share: {
      copyPhotoExcludeClass: 'exclude-from-photo',
    },
    toggleFullLocationView: {
      hide: 'show location summary',
      show: 'show full location',
    },
    toggleFullFinesView: {
      hide: 'show fines summary',
      show: 'show fines details',
    },
    toggleFullViolationText: {
      hide: 'show violation summary',
      show: 'show full violation',
    },
    toggleViolationsView: {
      hide: 'hide violations',
      noViolations: 'no violations',
    },
  },
  pages: {
    faqs: {
      header: {
        description: [
          "Since 2018, you've asked us many questions about HowsMyDrivingNY.",
          'Here are the things people ask us a lot, so we finally wrote them down.',
        ],
      },
      pathname: '/faqs',
    },
    search: {
      pathname: '/',
    },
    updates: {
      header: {
        description: [
          'Below is a running list of site updates.',
          `Most are changes you can see or use, e.g. features, visual adjustments, or new content,
            but some are technical updates that help the site run more smoothly.`,
          'The goal is to let you know how the site improves over time.',
        ],
      },
      pathname: '/updates',
    },
  },
  query: {
    jumbotronHeaderText: (
      <>
        <p className="lead">
          Search New York City{' '}
          <a
            className="open-data-link"
            href={NYC_OPEN_DATA_VIOLATION_DATA_SEARCH_RESULTS}
            target="_blank"
            rel="noopener noreferrer"
          >
            parking & camera violations
          </a>
        </p>
      </>
    ),
    jumbotronHeaderTextAprilFools: (
      <>
        <p className="lead">
          Search New York City{' '}
          <a
            className="open-data-link"
            href={NYC_OPEN_DATA_VIOLATION_DATA_SEARCH_RESULTS}
            target="_blank"
            rel="noopener noreferrer"
          >
            pedestrian kvetching data
          </a>
        </p>
      </>
    ),
    plateSearchInput: {
      placeholderText: 'Enter a plate...',
      placeholderTextAprilFools: 'Pedestrian plate...',
    },
  },
  sitewide: {
    currency: {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    dateFormat: EASTERN_TIME_ZONE_DATE_FORMAT,
    openDataViolationDataSearchResults:
      NYC_OPEN_DATA_VIOLATION_DATA_SEARCH_RESULTS,
    timeFormat: EASTERN_TIME_ZONE_TIME_FORMAT,
    timeZone: EASTERN_TIME_ZONE,
    title: "How's My Driving NY",
    url: 'https://howsmydrivingny.nyc',
  },
}
