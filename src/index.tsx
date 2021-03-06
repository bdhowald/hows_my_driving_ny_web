import * as React from 'react'
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import FetchViolations from 'view/FetchViolations'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faAngleUp, faCircle, faCopy } from '@fortawesome/free-solid-svg-icons';

// Add Font Awesome icons
library.add(faAngleDown, faAngleUp, faCircle, faCopy);

const App = () => {
  return (
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
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
