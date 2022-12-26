import * as React from 'react'
import ReactDOM from 'react-dom'

import { CookiesProvider } from "react-cookie"

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import FetchViolations from 'view/FetchViolations'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAngleDown,
  faAngleUp,
  faBus,
  faCamera,
  faCircle,
  faCopy,
  faParking,
  faTachometerAlt,
  faTimesCircle,
  faTrafficLight
} from '@fortawesome/free-solid-svg-icons'

// Add Font Awesome icons
library.add(
  faAngleDown,
  faAngleUp,
  faBus,
  faCamera,
  faCircle,
  faCopy,
  faParking,
  faTachometerAlt,
  faTimesCircle,
  faTrafficLight
)

const App = () => {
  return (
    <CookiesProvider>
      <Router>
        <Switch>
          <Route path='/:uniqueIdentifier'>
            <FetchViolations />
          </Route>
          <Route path='/'>
            <FetchViolations />
          </Route>
        </Switch>
      </Router>
    </CookiesProvider>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
