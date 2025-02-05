export type Region = {
  code: string
  name: string
  type: string
}

const regions: Region[] = [
  {
    code: '99',
    name: '99',
    type: 'other',
  },
  {
    code: 'AB',
    name: 'Alberta',
    type: 'province',
  },
  {
    code: 'AK',
    name: 'Alaska',
    type: 'state',
  },
  {
    code: 'AL',
    name: 'Alabama',
    type: 'state',
  },
  {
    code: 'AR',
    name: 'Arkansas',
    type: 'state',
  },
  {
    code: 'AZ',
    name: 'Arizona',
    type: 'state',
  },
  {
    code: 'BC',
    name: 'British Columbia',
    type: 'province',
  },
  {
    code: 'CA',
    name: 'California',
    type: 'state',
  },
  {
    code: 'CO',
    name: 'Colorado',
    type: 'state',
  },
  {
    code: 'CT',
    name: 'Connecticut',
    type: 'state',
  },
  {
    code: 'DC',
    name: 'District of Columbia',
    type: 'other',
  },
  {
    code: 'DE',
    name: 'Delaware',
    type: 'state',
  },
  {
    code: 'DP',
    name: 'U.S. State Department',
    type: 'other',
  },
  {
    code: 'FL',
    name: 'Florida',
    type: 'state',
  },
  {
    code: 'FM',
    name: 'Federated States of Micronesia',
    type: 'country',
  },
  {
    code: 'FO',
    name: 'Foreign',
    type: 'other',
  },
  {
    code: 'GA',
    name: 'Georgia',
    type: 'state',
  },
  {
    code: 'GU',
    name: 'Guam',
    type: 'territory',
  },
  {
    code: 'GV',
    name: 'Government',
    type: 'other',
  },
  {
    code: 'HI',
    name: 'Hawaii',
    type: 'state',
  },
  {
    code: 'IA',
    name: 'Iowa',
    type: 'state',
  },
  {
    code: 'ID',
    name: 'Idaho',
    type: 'state',
  },
  {
    code: 'IL',
    name: 'Illinois',
    type: 'state',
  },
  {
    code: 'IN',
    name: 'Indiana',
    type: 'state',
  },
  {
    code: 'KS',
    name: 'Kansas',
    type: 'state',
  },
  {
    code: 'KY',
    name: 'Kentucky',
    type: 'state',
  },
  {
    code: 'LA',
    name: 'Louisiana',
    type: 'state',
  },
  {
    code: 'MA',
    name: 'Massachusetts',
    type: 'state',
  },
  {
    code: 'MB',
    name: 'Manitoba',
    type: 'province',
  },
  {
    code: 'MD',
    name: 'Maryland',
    type: 'state',
  },
  {
    code: 'ME',
    name: 'Maine',
    type: 'state',
  },
  {
    code: 'MI',
    name: 'Michigan',
    type: 'state',
  },
  {
    code: 'MN',
    name: 'Minnesota',
    type: 'state',
  },
  {
    code: 'MO',
    name: 'Missouri',
    type: 'state',
  },
  {
    code: 'MP',
    name: 'Northern Mariana Islands',
    type: 'commonwealth',
  },
  {
    code: 'MS',
    name: 'Mississippi',
    type: 'state',
  },
  {
    code: 'MT',
    name: 'Montana',
    type: 'state',
  },
  {
    code: 'MX',
    name: 'Mexico',
    type: 'country',
  },
  {
    code: 'NB',
    name: 'New Brunswick',
    type: 'province',
  },
  {
    code: 'NC',
    name: 'North Carolina',
    type: 'state',
  },
  {
    code: 'ND',
    name: 'North Dakota',
    type: 'state',
  },
  {
    code: 'NE',
    name: 'Nebraska',
    type: 'state',
  },
  {
    code: 'NF',
    name: 'Newfoundland',
    type: 'province',
  },
  {
    code: 'NH',
    name: 'New Hampshire',
    type: 'state',
  },
  {
    code: 'NJ',
    name: 'New Jersey',
    type: 'state',
  },
  {
    code: 'NM',
    name: 'New Mexico',
    type: 'state',
  },
  {
    code: 'NS',
    name: 'Nova Scotia',
    type: 'province',
  },
  {
    code: 'NT',
    name: 'Northwest Territories',
    type: 'territory',
  },
  {
    code: 'NU',
    name: 'Nunavut',
    type: 'territory',
  },
  {
    code: 'NV',
    name: 'Nevada',
    type: 'state',
  },
  {
    code: 'NY',
    name: 'New York',
    type: 'state',
  },
  {
    code: 'OH',
    name: 'Ohio',
    type: 'state',
  },
  {
    code: 'OK',
    name: 'Oklahoma',
    type: 'state',
  },
  {
    code: 'ON',
    name: 'Ontario',
    type: 'province',
  },
  {
    code: 'OR',
    name: 'Oregon',
    type: 'state',
  },
  {
    code: 'PA',
    name: 'Pennsylvania',
    type: 'state',
  },
  {
    code: 'PE',
    name: 'Prince Edward Island',
    type: 'province',
  },
  {
    code: 'PR',
    name: 'Puerto Rico',
    type: 'commonwealth',
  },
  {
    code: 'PW',
    name: 'Palau',
    type: 'country',
  },
  {
    code: 'QC',
    name: 'Quebec',
    type: 'province',
  },
  {
    code: 'RI',
    name: 'Rhode Island',
    type: 'state',
  },
  {
    code: 'SC',
    name: 'South Carolina',
    type: 'state',
  },
  {
    code: 'SD',
    name: 'South Dakota',
    type: 'state',
  },
  {
    code: 'SK',
    name: 'Saskatchewan',
    type: 'province',
  },
  {
    code: 'TN',
    name: 'Tennessee',
    type: 'state',
  },
  {
    code: 'TX',
    name: 'Texas',
    type: 'state',
  },
  {
    code: 'UT',
    name: 'Utah',
    type: 'state',
  },
  {
    code: 'VA',
    name: 'Virginia',
    type: 'state',
  },
  {
    code: 'VI',
    name: 'U.S. Virgin Islands',
    type: 'territory',
  },
  {
    code: 'VT',
    name: 'Vermont',
    type: 'state',
  },
  {
    code: 'WA',
    name: 'Washington',
    type: 'state',
  },
  {
    code: 'WI',
    name: 'Wisconsin',
    type: 'state',
  },
  {
    code: 'WV',
    name: 'West Virginia',
    type: 'state',
  },
  {
    code: 'WY',
    name: 'Wyoming',
    type: 'state',
  },
  {
    code: 'YT',
    name: 'Yukon Territories',
    type: 'territory',
  },
]

export default regions
