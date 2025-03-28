import * as React from 'react'

type SiteDateFormat = {
  day: '2-digit'
  month: '2-digit'
  year: 'numeric'
}

type SiteTimeFormat = {
  hour: 'numeric'
  minute: 'numeric'
}

const siteDateFormat: SiteDateFormat = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}

const siteTimeFormat: SiteTimeFormat = {
  hour: 'numeric',
  minute: 'numeric',
}

export default {
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
        link: 'https://static1.squarespace.com/static/66e9f5934be5cb497f7cfd6c/t/67c6592adbaebd41d44ddcd0/1741052205833/2.25-isa_one-pager__3_.pdf',
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
  query: {
    jumbotronHeaderText: (
      <>
        <p className="lead">
          Search New York City{' '}
          <a
            className="open-data-link"
            href="https://data.cityofnewyork.us/browse?q=parking%20violations&sortBy=relevance"
            target="_blank"
            rel="noopener noreferrer"
          >
            parking & camera violations
          </a>
        </p>
      </>
    ),
    plateSearchInput: {
      placeholderText: 'Enter a plate...',
    },
  },
  sitewide: {
    currency: {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    dateFormat: siteDateFormat,
    timeFormat: siteTimeFormat,
    title: "How's My Driving NY",
    url: 'https://howsmydrivingny.nyc',
  },
}
