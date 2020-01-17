import * as React from 'react'
import ReactDOM from 'react-dom';

import FetchViolations from 'view/FetchViolations'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

library.add(faAngleDown, faAngleUp);

ReactDOM.render(
  <FetchViolations />,
  document.getElementById('root')
);
