import * as React from 'react'

export default {
  queryPage: {
    jumbotronHeaderText: (
      <React.Fragment>
        <p className="lead">
          Search New York City <a className='open-data-link' href='https://data.cityofnewyork.us/browse?q=parking%20violations&sortBy=relevance'>parking & camera violations</a>
        </p>
      </React.Fragment>
    )
  },
  recklessDriverAccountabilityAct: {
    landerTwitterLink: '@bradlander',
    prefix: 'Under'
  },
  sitewide: {
    title: "How's My Driving NY",
    url: 'https://howsmydrivingny.nyc',
  }
}