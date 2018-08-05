import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import Geocode from "react-geocode";

import { ListGroup, ListGroupItem } from 'reactstrap';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

import {
  TwitterShareButton,
  TwitterIcon
} from 'react-share';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

library.add(faAngleRight)

const fp2      = require('fingerprintjs2');
const http     = require('http');
const https    = require('https');
const mixpanel = require('mixpanel-browser');
const q        = require('q');
const rp       = require('request-promise');
const url      = require('url');

Geocode.enableDebug();


class FetchViolations extends React.Component {

  componentDidMount(){
    document.title = "How's My Driving NY"
  }

  constructor(props) {
    super(props);

    let that = this;

    this.state = {
      fingerprintID: null,
      lookupPlateID: '',
      lookupPlateType: 'PAS',
      lookupState: 'NY',
      mixpanelID: null,
      queriedVehicles: [],
      violations: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    mixpanel.init('f8491ce35ed8262c61e16e6b6abb83b3', {
      loaded: (mixpanel) => {
        that.state.mixpanelID = mixpanel.get_distinct_id();
      }
    });
  }


  handleChange(event) {
    this.setState({[event.target.name]: event.target.value.toUpperCase()});
  }

  handleSubmit(event) {
    let that = this;

    if (this.state.lookupPlateID && this.state.lookupState) {

      mixpanel.track('plate_lookup', {
        lookup_plate_id : this.state.lookupPlateType,
        plate           : this.state.lookupPlateID,
        state           : this.state.lookupState,
      })

      if (this.state.fingerprintID) {
        this.performLookup();
      } else {
        new fp2().get((result, components) => {
          console.log(result) // a hash, representing your device fingerprint
          console.log(components) // an array of FP components

          that.state.fingerprintID = result

          that.performLookup();
        })
      }

    }

    event.preventDefault();
  }


  organizeViolationsByDescription(violations) {
    let thing = violations.reduce(function(memo, x) {
      let violationsObj = memo['violations']
      if (!violationsObj[x['humanized_description']]) {
        violationsObj[x['humanized_description']] = {
          violationCount: 1,
          violationData: [x]
        }
      } else {
        let type = violationsObj[x['humanized_description']]
        if (type) {
          type['violationCount'] += 1
          type['violationData'].push(x)
        }
      }

      memo['total'] += 1;
      return memo;
    }, {
      total: 0,
      violations: {}
    });

    return thing;
  }


  performLookup() {
    let that = this;

    let violations = [];
    let promises = [];

    let queryString = 'https://api.howsmydrivingny.nyc/api/v1/' + '?plate_id=' + this.state.lookupPlateID + '&state=' + this.state.lookupState + '&fingerprint_id=' + this.state.fingerprintID + '&mixpanel_id=' + this.state.mixpanelID + '&lookup_source=' + 'web_client'

    if (this.state.lookupPlateType) {
      queryString += '&plate_type=' + this.state.lookupPlateType;
    }

    promises.push(
      rp(queryString)
    )

    q.all(promises).then(function(jsonResponse){


      let queryObj = JSON.parse(jsonResponse);
      let returnedViolations = queryObj.violations;

      returnedViolations.sort((a,b) => new Date(a.formatted_time) - new Date(b.formatted_time))

      const newVehicle = {
        plateID: that.state.lookupPlateID,
        plateType: that.state.lookupPlateType,
        state: that.state.lookupState,
        violations: returnedViolations,
        violations_count: queryObj.count,
      }


      let existingList = that.state.queriedVehicles;

      const existingVehicle = existingList.find(obj => {
        return obj.state === newVehicle.state && obj.plateID === newVehicle.plateID && obj.plateType === newVehicle.plateType
      })

      const index = existingList.indexOf(existingVehicle);
      if (index > -1) {
        existingList = existingList.slice(0, index).concat(existingList.slice(index + 1));
      }

      existingList.unshift(newVehicle);

      that.setState({queriedVehicles: existingList})

      // res.setHeader('Content-Type', 'application/json');
      // res.writeHead(200, {'Content-Type': 'application/javascript'});
      // res.end(JSON.stringify({violations: output}));
    })
  }


  render() {
    return (
      <div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='jumbotron'>
                <h1 className='display-4'>How's My Driving NY</h1>
                <p className="lead">
                  Search New York City <a className='open-data-link' href='https://data.cityofnewyork.us/browse?q=parking%20violations&sortBy=relevance'>parking & camera violations</a>
                </p>
                <hr className="my-1"></hr>
                <div className='row'>
                  <form className='form' onSubmit={this.handleSubmit}>
                    <div className='form-row'>
                      <div className='col-md'>
                        <div className='form-group'>
                          <input className='form-control' type="text" name='lookupPlateID' value={this.state.lookupPlateID} onChange={this.handleChange} placeholder='Enter a plate...' />
                        </div>
                      </div>
                      <div className='col-md'>
                        <div className='form-group'>
                          <select className='form-control' name='lookupState' value={this.state.lookupState} onChange={this.handleChange}>
                            {[['99', '99'], ['Alberta (AB)', 'AB'], ['Alaska (AK)', 'AK'], ['Alabama (AL)', 'AL'], ['Arkansas (AR)', 'AR'], ['Arizona (AZ)', 'AZ'], ['British Columbia (BC)', 'BC'], ['California (CA)', 'CA'], ['Colorado (CO)', 'CO'], ['Connecticut (CT)', 'CT'], ['District of Columbia (DC)', 'DC'], ['Delaware (DE)', 'DE'], ['U.S. State Department (DP)', 'DP'], ['Florida (FL)', 'FL'], ['Federated States of Micronesia (FM)', 'FM'], ['Foreign (FO)', 'FO'], ['Georgia (GA)', 'GA'], ['Guam (GU)', 'GU'], ['Government (GV)', 'GV'], ['Hawaii (HI)', 'HI'], ['Iowa (IA)', 'IA'], ['Idaho (ID)', 'ID'], ['Illinois (IL)', 'IL'], ['Indiana (IN)', 'IN'], ['Kansas (KS)', 'KS'], ['Kentucky (KY)', 'KY'], ['Louisiana (LA)', 'LA'], ['Massachusetts (MA)', 'MA'], ['Manitoba (MB)', 'MB'], ['Maryland (MD)', 'MD'], ['Maine (ME)', 'ME'], ['Michigan (MI)', 'MI'], ['Minnesota (MN)', 'MN'], ['Missouri (MO)', 'MO'], ['Northern Mariana Islands (MP)', 'MP'], ['Mississippi (MS)', 'MS'], ['Montana (MT)', 'MT'], ['Mexico (MX)', 'MX'], ['New Brunswick (NB)', 'NB'], ['North Carolina (NC)', 'NC'], ['North Dakota (ND)', 'ND'], ['Nebraska (NE)', 'NE'], ['Newfoundland (NF)', 'NF'], ['New Hampshire (NH)', 'NH'], ['New Jersey (NJ)', 'NJ'], ['New Mexico (NM)', 'NM'], ['Nova Scotia (NS)', 'NS'], ['Northwest Territories (NT)', 'NT'], ['Nevada (NV)', 'NV'], ['New York (NY)', 'NY'], ['Ohio (OH)', 'OH'], ['Oklahoma (OK)', 'OK'], ['Ontario (ON)', 'ON'], ['Oregon (OR)', 'OR'], ['Pennsylvania (PA)', 'PA'], ['Prince Edward Island (PE)', 'PE'], ['Puerto Rico (PR)', 'PR'], ['Palau (PW)', 'PW'], ['Quebec (QC)', 'QC'], ['Rhode Island (RI)', 'RI'], ['South Carolina (SC)', 'SC'], ['South Dakota (SD)', 'SD'], ['Saskatchewan (SK)', 'SK'], ['Tennessee (TN)', 'TN'], ['Texas (TX)', 'TX'], ['Utah (UT)', 'UT'], ['Virginia (VA)', 'VA'], ['U.S. Virgin Islands (VI)', 'VI'], ['Vermont (VT)', 'VT'], ['Washington (WA)', 'WA'], ['Wisconsin (WI)', 'WI'], ['West Virginia (WV)', 'WV'], ['Wyoming (WY)', 'WY'], ['Yukon Territories (YT)', 'YT']].map((region) =>
                              <option key={region[1]} value={region[1]}>{region[0]}</option>
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className='form-row'>
                      <div className='col-md'>
                        <div className='form-group'>
                          <select className='form-control' name='lookupPlateType' value={this.state.lookupPlateType} onChange={this.handleChange}>
                            {[['Commercial (COM)', 'COM'], ['Motorcycles (MOT)', 'MOT'], ['Special Omnibus Rentals (OMS)', 'OMS'], ['For-hire Vehicle (OMT)', 'OMT'], ['Passenger (PAS)', 'PAS'], ['Emergency Services & Veterans (SRF)', 'SRF'], ['Tractor (TRC)', 'TRC']].map((type) =>
                              <option key={type} value={type[1]}>{type[0]}</option>
                            )}
                          </select>
                        </div>
                      </div>
                      <div className='col-md'>
                        <div className='form-group'>
                          <input className='form-control btn btn-primary' type="submit" value="Search" disabled={!this.state.lookupPlateID} />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className='vehicles'>
                {this.state.queriedVehicles.map((vehicle) =>
                  <div key={vehicle.state + ':' + vehicle.plateID + ':' + vehicle.plateType} className='card vehicle'>
                    <div className='card-body' style={{width: '100%'}} id={'x' + vehicle.violations.length}>
                      <div className="card-title">
                        <p className='card-text'>
                          {vehicle.violations_count} violations for {vehicle.state}:{vehicle.plateID}:{vehicle.plateType}
                        </p>
                        <TwitterShareButton
                          url={'https://howsmydrivingny.nyc'}
                          title={"I just looked up #" + vehicle.state + "_" + vehicle.plateID + "_" + vehicle.plateType + "'s " + vehicle.violations_count + " violations using @HowsMyDrivingNY: "}
                          className="Demo__some-network__share-button">
                          <TwitterIcon
                            size={32}
                            round />
                        </TwitterShareButton>
                      </div>
                      {vehicle.violations_count > 0 &&
                        <ViolationsList vehicle={vehicle}/>
                      }
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ViolationsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sortAscending: true,
      sortType: 'formatted_time',
      vehicle: props.vehicle,
      violations: props.vehicle.violations,
      visible: false
    }
  }


  render() {
    let that = this;
    return (
      <table className='table table-striped table-sm violations-table'>
        <thead>
          <tr>
            <th onClick={() => (this.state.sortType == 'formatted_time' ? this.setState({sortAscending: !this.state.sortAscending}) : this.setState({sortType: 'formatted_time'}))}>Date</th>
            <th onClick={() => (this.state.sortType == 'humanized_description' ? this.setState({sortAscending: !this.state.sortAscending}) : this.setState({sortType: 'humanized_description'}))}>Type</th>
            <th onClick={() => (this.state.sortType == 'location' ? this.setState({sortAscending: !this.state.sortAscending}) : this.setState({sortType: 'location'}))}>Location</th>
            <th className='d-none d-sm-block' onClick={() => (this.state.sortType == 'total_fine_amount' ? this.setState({sortAscending: !this.state.sortAscending}) : this.setState({sortType: 'total_fine_amount'}))}>Fines</th>
          </tr>
        </thead>
        <tbody>
          {that.state.violations.sort((a,b) => {
            if (that.state.sortType == 'formatted_time') {
              if (that.state.sortAscending) {
                return new Date(a.formatted_time) - new Date(b.formatted_time)
              } else {
                return new Date(b.formatted_time) - new Date(a.formatted_time)
              }
            } else if (that.state.sortType == 'location') {
              let aLocation = a.location + ' ' + (a.location == null ? a.violation_county : ('(' + a.violation_county + ')'))
              let bLocation = b.location + ' ' + (b.location == null ? b.violation_county : ('(' + b.violation_county + ')'))

              if (that.state.sortAscending) {
                if(aLocation < bLocation) return -1;
                if(aLocation > bLocation) return 1;
                return (new Date(a.formatted_time) - new Date(b.formatted_time))
              } else {
                if(aLocation < bLocation) return 1;
                if(aLocation > bLocation) return -1;
                return (new Date(b.formatted_time) - new Date(a.formatted_time))
              }
            } else if (that.state.sortType == 'total_fine_amount') {
              let aFine = a.total_fine_amount ? parseFloat(a.total_fine_amount) : 0
              let bFine = b.total_fine_amount ? parseFloat(b.total_fine_amount) : 0

              if (that.state.sortAscending) {
                if(aFine < bFine) return -1;
                if(aFine > bFine) return 1;
                return (new Date(a.formatted_time) - new Date(b.formatted_time))
              } else {
                if(aFine < bFine) return 1;
                if(aFine > bFine) return -1;
                return (new Date(b.formatted_time) - new Date(a.formatted_time))
              }
            } else {
              if (that.state.sortAscending) {
                if(a[that.state.sortType] < b[that.state.sortType]) return -1;
                if(a[that.state.sortType] > b[that.state.sortType]) return 1;
                return (new Date(a.formatted_time) - new Date(b.formatted_time))
              } else {
                if(a[that.state.sortType] < b[that.state.sortType]) return 1;
                if(a[that.state.sortType] > b[that.state.sortType]) return -1;
                return (new Date(b.formatted_time) - new Date(a.formatted_time))
              }
            }
          }).map((violation) =>
            that.renderListPart(violation)
          )}
        </tbody>
      </table>
    )
  }

  renderListPart(violation) {
    return (
      <tr key={violation.summons_number} className={violation.humanized_description == 'School Zone Speed Camera Violation' ? 'violation-row table-warning' : (violation.humanized_description == 'Failure to Stop at Red Light' ? 'violation-row table-danger' : 'violation-row') }>
        <td>
          {(new Date(violation.formatted_time).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}))}
        </td>
        <td>
          {violation.humanized_description}
        </td>
        <td>
          {violation.location} {violation.location == null ? violation.violation_county : ('(' + violation.violation_county + ')')}
        </td>
        <td className='d-none d-sm-block'>
          {violation.total_fine_amount ? ('$' + violation.total_fine_amount) : 'N/A'}
        </td>
      </tr>
    )
  }
}


ReactDOM.render(
  <FetchViolations />,
  document.getElementById('root')
);

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
