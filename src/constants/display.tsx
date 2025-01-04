import * as React from 'react'

type SiteDateFormat = {
  day: '2-digit'
  month: '2-digit'
  year: 'numeric'
}

const siteDateFormat: SiteDateFormat = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}

export default {
  dangerousVehicleAbatementAct: {
    legislationName: 'Dangerous Vehicle Abatement Act',
    legislationUrl:
      'https://legistar.council.nyc.gov/LegislationDetail.aspx?ID=3521908&GUID=A4FD4CFC-8AD8-4130-AA92-11BC56936F6D#:~:text=The%20bill%20will%20create%20a,Department%20of%20Transportation%20(DOT).',
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
    title: "How's My Driving NY",
    url: 'https://howsmydrivingny.nyc',
  },
}
