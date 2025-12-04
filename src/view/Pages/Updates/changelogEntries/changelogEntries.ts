const CHANGELOG_ENTRIES = [
  {
    year: '2025',
    yearEntries: [
      {
        date: '2025-12-03',
        dateEntries: [
          {
            description: 'Add FAQ entries for result quirks',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '3fa463c0660878be30aa5c2840899e7d08edfef2',
              },
            ],
          },
          {
            description: 'Add clear button to plate input in search.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '6095ecebbfdec6092549f8b0c749b16acdddb678',
              },
            ],
          },
        ],
      },
      {
        date: '2025-12-01',
        dateEntries: [
          {
            description: 'Add visual feedback for lookups when removed.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'f09d9bc34cdc69168c1a69b9e711d0e7fbcfba74',
              },
            ],
          },
          {
            description: 'Update speed limiters one-pager link',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'f09d9bc34cdc69168c1a69b9e711d0e7fbcfba74',
              },
            ],
          },
          {
            description: 'Add user settings page.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '6c61eb2910b07d8d35183262c77be491026ecfcb',
              },
              {
                project: 'hows_my_driving_ny_web',
                sha: 'e307eddbf46a00b991ec5c93781e7ac5c0193223',
              },
              {
                project: 'hows_my_driving_ny_web',
                sha: '9c2d7472070c719e53603de124301646cc2604a4',
              },
            ],
          },
        ],
      },
      {
        date: '2025-11-24',
        dateEntries: [
          {
            description:
              'Use local storage for previous query storage, falling back to cookies, if necessary',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '7dabc3a7651df8a36044459f414fdd398ed32d71',
              },
            ],
          },
          {
            description:
              'Break main component out into its own page, reorganize site to have consistent structure, add FAQ and Updates pages.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '3bf79fe535d44868cf8f743861bc4fd7e804662c',
              },
            ],
          },
        ],
      },
      {
        date: '2025-11-18',
        dateEntries: [
          {
            description: 'Restrict plates to alphanumeric characters.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'e0b1273e53bde1f3f5e70624c58344c735784baa',
              },
              {
                project: 'hows_my_driving_ny_web',
                sha: '52a10ae299040c297613222ffbf1280b7867aab4',
              },
            ],
          },
          {
            description:
              'Break main component out into its own page, reorganize site to have consistent structure, add FAQ and Updates pages.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '3bf79fe535d44868cf8f743861bc4fd7e804662c',
              },
            ],
          },
        ],
      },
      {
        date: '2025-11-14',
        dateEntries: [
          {
            description:
              'Further define vehicle lookup content to ensure correct margins.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '43716122ce59d02fd1ca8b8f56b9bdd1ca0df2f7',
              },
            ],
          },
        ],
      },
      {
        date: '2025-11-13',
        dateEntries: [
          {
            description:
              'Improve new-style styles to avoid wide, empty display results. Also replacing full region display on wide screens with tooltips.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '1648222945a382ea54fa86f1843533213f3936a7',
              },
            ],
          },
          {
            description:
              "Add subheader to distinguish shared lookups from user's own.",
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '00661639040cd93c98670c20f74e9c209a916cbb',
              },
            ],
          },
        ],
      },
      {
        date: '2025-11-12',
        dateEntries: [
          {
            description: 'Compress js and css assets for production.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '1d8f5e11683af27793df8e68cef48b7495032ca7',
              },
            ],
          },
          {
            description: 'Add filter for search/query/lookup reults.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'e2d5864515824f76d029801ead237aeacf652975',
              },
            ],
          },
        ],
      },
      {
        date: '2025-11-08',
        dateEntries: [
          {
            description:
              'Only sync lookup identifier cookie when cookie would be updated and not be blanked out by temporarily empty state.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '2625be2fa7762a0059a8cd25b5e679e58e5c4877',
              },
            ],
          },
        ],
      },
      {
        date: '2025-11-07',
        dateEntries: [
          {
            description:
              'End style display experiment: new-style display performs ~27% better.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '45a43b5d96b812b68594debf5bcccf6d2adfe0cb',
              },
            ],
          },
          {
            description:
              'Retain previous lookups even during network failures. Allow new lookups even when previous lookups still loading.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '82ddf30faa3374f9216f30b6168da3ede0fdf1c7',
              },
            ],
          },
          {
            description:
              'Implement priority queue to prioritize new lookup API requests when also processing existing lookups simultaneously.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '9e0b59c7859d0d420ad8c621609c74fbede3b90e',
              },
            ],
          },
        ],
      },
      {
        date: '2025-10-31',
        dateEntries: [
          {
            description:
              'Only look for plate types if three plate parts in query.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '36bc1d29a8d45c14df2feaaf2489d9ae88101f9f',
              },
            ],
          },
          {
            description:
              'Add temporary plate type (TMP) and test for plate types.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'f05210f899412b9e075efa2597ce3a3148982273',
              },
            ],
          },
          {
            description: 'Improve plate type detection logic.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'b502022fd005fa1c39da7284b775ddd1293c6358',
              },
            ],
          },
        ],
      },
      {
        date: '2025-10-26',
        dateEntries: [
          {
            description: 'Add Nunavut abbreviation (NU) to state code regex.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'a1c1251fabab0bc634b8fb78224af91e8e2547d4',
              },
            ],
          },
        ],
      },
      {
        date: '2025-10-24',
        dateEntries: [
          {
            description:
              'Fix error where plate type input could not be changed.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '6302300c762df31cd808735f37626be0fa3e5462',
              },
            ],
          },
          {
            description:
              'Adding missing humanized description for obscured VIN violation (violation code 76).',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '67e18d9299238188fab52e2918cb2acdefb05767',
              },
            ],
          },
        ],
      },
      {
        date: '2025-10-23',
        dateEntries: [
          {
            description:
              'Display any error message received from the server if applicable.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'ce1ee0af03566daed2907b93d10b916f87edf845',
              },
            ],
          },
          {
            description: 'Convert entered plate input to uppercase.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'a1a0916f43aebf28c611c2cc2cde4cba228962e7',
              },
            ],
          },
          {
            description:
              'Update list of violation descriptions and keys to include missing violations.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'cf0ea94278fbcc8b5a449c98c27ebdb7bfcdc29d',
              },
              {
                project: 'hows_my_driving_ny_api',
                sha: '4d177afa2b91ca7b3247c594bfef072cb23ea591',
              },
              {
                project: 'hows_my_driving_ny_api',
                sha: 'eb99b08a0e272d9a4aef17ad784649e5e44db72f',
              },
              {
                project: 'hows_my_driving_ny_api',
                sha: '867406c9754ca98fb5912819c3959a86f6ff499d',
              },
            ],
          },
          {
            description:
              'Handle rare stray periods in some violation time fields.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'd3abe570ac3c2c6e1bb38aa4a6d01a6c849f0402',
              },
            ],
          },
          {
            description:
              'Do not accept plates with two parts where one is a state and the other could be a plate type.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'a47495946bbe6edcb09b00f114e7a65ab802b870',
              },
            ],
          },
          {
            description: 'Return 201 (created) when processing a new lookup.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '8ec3992d8afbcaf19a14f0363a333bf4ed020a83',
              },
            ],
          },
        ],
      },
      {
        date: '2025-10-22',
        dateEntries: [
          {
            description: 'Update production build script to use rsync.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'a6d6265851fff8f52ecaf677b163d114b870260e',
              },
            ],
          },
          {
            description:
              'Build production assets to temporary directory, then copy over when done.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '4a9eea6abf9021feb8acd05993fa84c632f713cb',
              },
            ],
          },
          {
            description:
              'Do not take down site when building new production assets.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '4a9eea6abf9021feb8acd05993fa84c632f713cb',
              },
            ],
          },
          {
            description: 'Retry failed queries for previous lookups.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '26755553b73d0ed1400ac76a97bbc4c6903ec182',
              },
            ],
          },
          {
            description: 'Retry failed lookup requests.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'ca8115d75fee8f44b8729f069ee5210294594901',
              },
            ],
          },
          {
            description:
              'Retry functions to retrieve lookups from cookies as test for wider retry functionality.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '3b5260768b46be91e10ce540f572699c95cf12bd',
              },
            ],
          },
        ],
      },
      {
        date: '2025-10-21',
        dateEntries: [
          {
            description:
              'Add more detail to tracking events for users seeing search errors.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '87121290b676e193b0d08421e19621a7428b6181',
              },
            ],
          },
        ],
      },
      {
        date: '2025-09-20',
        dateEntries: [
          {
            description: 'Use snake case for borough in API response.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'b9f9f0bfb44eed7608d76db014758ed893a24ac8',
              },
              {
                project: 'hows_my_driving_ny_api',
                sha: '2b86237ebfea1d2543c0755ab3154470ee8d9be7',
              },
            ],
          },
        ],
      },
      {
        date: '2025-09-12',
        dateEntries: [
          {
            description:
              'Replace `geocodes.geocoding_service` with `geocodes.geocoder_id` (fk `geocodes` table)',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '1a21b99c3eda78be2a2490cd6472c9d7e1527096',
              },
              {
                project: 'hows_my_driving_ny_api',
                sha: '62b77fa62ca68f2d2c4b18003c8c66722f444d67',
              },
              {
                project: 'hows_my_driving',
                sha: 'b13510072a1266b05b67e11354b25e8209b630f5',
              },
              {
                project: 'hows_my_driving',
                sha: '76be59b60097a35458dd616864ea03ab3c98d655',
              },
              {
                project: 'hows_my_driving',
                sha: '19cef0c2d41460104a23d02713235bc5a6729b96',
              },
            ],
          },
          {
            description:
              'Do not return body, etag, or 200 in the case of a 304 from matching etag.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '80125654ef166b0755f2b716ce8ce579a7f05e1d',
              },
            ],
          },
          {
            description: 'Improve cardinal direction regex-ing.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'ad38403229ed0311c65b3f3d873c7379bf86e3a6',
              },
            ],
          },
          {
            description:
              "Temporary workaround for Google APIs returning 'The Bronx' instead of 'Bronx'.",
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'b053ed03aafb10a405384949bebfd60df2440218',
              },
            ],
          },
          {
            description: "Accept geocode if its borough is 'The Bronx'.",
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '7f87c2e71354c98680b588b4fb43187ae7fe2e50',
              },
            ],
          },
        ],
      },
      {
        date: '2025-09-11',
        dateEntries: [
          {
            description:
              'Add Eastern and UTC times for all camera streak data.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '99143f8a9237d9edd9d0950b5b6390c006e20ab1',
              },
            ],
          },
          {
            description:
              'Re-order camera data json response to be alphabetical.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '1064609c0b8b9feaf1faa7ac7535cf1a0d351078',
              },
            ],
          },
          {
            description:
              'Return previous lookup date created at and lookup date created at times in UTC and Eastern.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '7ad5139b8b0b8bf1823277253bced7f7fed8f25c',
              },
            ],
          },
        ],
      },
      {
        date: '2025-09-10',
        dateEntries: [
          {
            description: "If issuer precinct is '0' convert to undefined.",
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '508a12f0d7a86b489011fbbadbe6890ce4cdb510',
              },
            ],
          },
          {
            description:
              "Don't infer violation code from description if it exists on raw violation.",
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'e57c4133baef227d13c5ed5f58109515d6b64393',
              },
            ],
          },
        ],
      },
      {
        date: '2025-09-09',
        dateEntries: [
          {
            description:
              'Wrap decamelization of statistics in safer object operations.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'd78c2d041436f41d5ee9f399a5ee66c9f6448a3d',
              },
            ],
          },
        ],
      },
      {
        date: '2025-09-01',
        dateEntries: [
          {
            description: 'Only compare current lookup date for recency.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '442e1d0f93c6b86ffc07274be343f968cd865da6',
              },
            ],
          },
          {
            description: "Update 'Last Queried' to 'Prev. Queried'.",
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '8e45386a61087ddfddc7cad6adf4e87265400447',
              },
            ],
          },
          {
            description: "Add 'Lookup Date' field to lookup results.",
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'bfae4b97008341c889cb8f2753bf0964e771612c',
              },
            ],
          },
          {
            description:
              "Add 'lookup_date' of just-created lookup to vehicle query responses.",
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '9bc3a47bb8e954a544d01a882a1641108534e6f3',
              },
            ],
          },
          {
            description:
              'Add concurrency limit to open data service to avoid thundering herd problems.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '0d74fc3508b55ba96202f232e4769fba6b45a0ba',
              },
            ],
          },
        ],
      },
      {
        date: '2025-08-24',
        dateEntries: [
          {
            description: 'Cache database metadata responses for one hour.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'ad5a82c0c802af87f00c34c9e82f38b77de47ee6',
              },
            ],
          },
          {
            description:
              'Add retry with backoff to open data requests since they fail so often due to being slammed by many requests at once.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '944feb8bb814e58abda051563296b8d174634bdc',
              },
            ],
          },
        ],
      },
      {
        date: '2025-05-04',
        dateEntries: [
          {
            description: 'Compress responses manually.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '7bcb97a7c6715fe4200acfa8254233fa49d5c332',
              },
            ],
          },
          {
            description:
              'Add etag header to previous lookup responses to enable client-side caching.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '5085007c570fc6d3233ea8085f2eb3531630766e',
              },
            ],
          },
        ],
      },
      {
        date: '2025-04-29',
        dateEntries: [
          {
            description:
              "Replace 'Previous' with 'Last Queried' for lookups beyond the first for a vehicle.",
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '128f8f44d14c28269f6777203abdd26a136f9fc0',
              },
            ],
          },
          {
            description: 'Improve full location flex values.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '3f77286f7a2463f339f72f3791f3a26a0411aca6',
              },
              {
                project: 'hows_my_driving_ny_web',
                sha: 'ed263f14802f5327ca257b03c85fbc9f5659a5d7',
              },
            ],
          },
          {
            description:
              'Only search for previous queries if the cookies indicate we have some.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'f947157ed421b17ec5d851d981eaeaf33b6e4095',
              },
            ],
          },
          {
            description:
              'When search fails, ensure subsequent search for plate first queries for previous lookups from cookies.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '9caedc6aacc0d2579682a67a4cdfb6d48f477467',
              },
            ],
          },
          {
            description:
              'Allow new-style display to show more fine and location details.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '3e17afe79d6ed015e5665aa42f1755c6e6bed529',
              },
            ],
          },
        ],
      },
      {
        date: '2025-04-19',
        dateEntries: [
          {
            description:
              'Add collapsible-expandable violation groups in the violation card list.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '5c018fc3218c8c3d1c613c198fc8274fa45def01',
              },
              {
                project: 'hows_my_driving_ny_web',
                sha: '8f7dbcb8d6e420e17f1e55549c61bbd941110b79',
              },
            ],
          },
        ],
      },
      {
        date: '2025-04-17',
        dateEntries: [
          {
            description:
              'Improve address standardization for missing spaces between periods and directional prefixes.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'caa335e8c1f8687fe46f9105b8313b22d53e73f4',
              },
            ],
          },
        ],
      },
      {
        date: '2025-04-15',
        dateEntries: [
          {
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '60eab0ecc2f5f14d8313eeb0d24c6a90f3621a0e',
              },
            ],
            description: 'Add utilities to standardize addresses.',
          },
          {
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'baf07ad42dd3d70dc4320142216d3ab08687ef4d',
              },
            ],
            description:
              'Implement mutex to prevent concurrent requests to Google for same geocode.',
          },
        ],
      },
      {
        date: '2025-04-14',
        dateEntries: [
          {
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '5f2edc2ee0b5f208481613e27975c3d0b084c66e',
              },
            ],
            description:
              'Standardize detection of location across server.js and app files. Also fix typo in violation code and humanized description detection.',
          },
        ],
      },
      {
        date: '2025-04-13',
        dateEntries: [
          {
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'ab29e615d78b1c44289c5807393b48ee3c88f74c',
              },
            ],
            description:
              "Don't show violations summary details when no violations exist for wide display.",
          },
          {
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '516197e3f061978bb16d097bd215aea37f1c407d',
              },
            ],
            description:
              'Add quotation marks to better identify original strings for geocodes.',
          },
        ],
      },
      {
        date: '2025-04-12',
        dateEntries: [
          {
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '01cf50535bf16dc7fc8afac16a9e3f5a25ad8346',
              },
            ],
            description:
              'Improve address standardization: remove cruft, re-order abbreviation stripping, and add more location-specific handling.',
          },
          {
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'a13588bccbd7a95f0b061832eb6b5b00235c7f7d',
              },
            ],
            description:
              "Show 'Unavailable' in the ViolationSummary list instead of 'No Borough Available.'",
          },
          {
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '678a464fc536abe8960351e387c475dfc3c3922c',
              },
            ],
            description:
              'Apply more location-specific fixes and apply them before other location regexes.',
          },
        ],
      },
      {
        date: '2025-04-10',
        dateEntries: [
          {
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '2619ffe446be4bc9d1adca070bdfa13c445b6105',
              },
            ],
            description:
              "Replace 'toLocaleString' with Intl.DateTimeFormat objects as it is more efficient.",
          },
          {
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '88f77b582d75a022e264519397f801a9d0d8e4d3',
              },
            ],
            description:
              'Adapt vehicle results page to new and old-style displays.',
          },
          {
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '0afe1609a47a13682a4716a2f7f9dc9f2f405908',
              },
            ],
            description:
              "Always display times in Eastern Time ('America/New_York').",
          },
          {
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '81ad2333803f8faa948eb22171d197dfaf653b44',
              },
            ],
            description:
              "Fix another specific location ('S/P' as abbreviation for state police).",
          },
        ],
      },
      {
        date: '2025-04-01',
        dateEntries: [
          {
            description: 'Increase new-style display to 50% of users.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '9e558b1af06fa9a07409e999ce54ae721ce61c2c',
              },
            ],
          },
          {
            description: 'Add more address standardizations.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'c04b0642786ae2ab397f534944246ef75202a753',
              },
            ],
          },
        ],
      },
      {
        date: '2025-03-31',
        dateEntries: [
          {
            description: 'April Fools Day Bad Joke.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'c3f312b058f396e651e1ff5d01d4635d1a328708',
              },
            ],
          },
          {
            description: 'Role out ISA notice to 25% of sessions.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '2c0b30424f64822607f05d764e24c22f18bc15e4',
              },
            ],
          },
          {
            description:
              'Refactor Dangerous Vehicle Abatement Act and Intelligent Speed Assistance components to make them more customizable.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'd064233ce38acbd1ea269270c8a6c08353aee1a7',
              },
            ],
          },
        ],
      },
      {
        date: '2025-03-30',
        dateEntries: [
          {
            description:
              'Add violation status to ViolationDetail component, but only if present.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '873d8be0e96e832d8776cd700c0888742c483bd4',
              },
            ],
          },
          {
            description: 'Use new sanitized API format.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'd3fd0387e635c1968bf4d67bad63345b97333d75',
              },
            ],
          },
          {
            description: "Standardize 'highway' abbreviation handling.",
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '9edc72dcd044f840eb9768b6ff94aaaead68d8b6',
              },
            ],
          },
          {
            description:
              'Improve display of intelligent speed assistance notice and Dangerous Vehicle Abatement Act.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '5e58ec90abaa33c376a0f3db057a16c96244ed92',
              },
            ],
          },
          {
            description: 'Add issuing agency data.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'a77a9b9bdf33b17406f551730c7a4413f47a6e69',
              },
              {
                project: 'hows_my_driving_ny_web',
                sha: '905ee9d0278451894577664db42ed96239edfb3a',
              },
            ],
          },
          {
            description:
              'Add violation status to response, including sanitized violation status.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'b84429ed9f56731ff2fc65f753a0d7d1c1fd610e',
              },
            ],
          },
          {
            description: "Use 'sanitized' fields to return sanitized content.",
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'f9e4351ec22cd9e84e38c80177beed374a2ed67e',
              },
              {
                project: 'hows_my_driving_ny_api',
                sha: '2999e664508e2ad7e0c2fcc473c339dcb4bcd0b1',
              },
              {
                project: 'hows_my_driving_ny_api',
                sha: '35665c04d36c5c90af0ce3e703cc74744b96f2ff',
              },
            ],
          },
          {
            description: 'Add sanitized vehicle body type to API.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'eb9b2c28f4541328ea046db578c6c21fcf69f316',
              },
            ],
          },
          {
            description:
              'Filter out violations that happened after the query date.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '1d34802159b59c2c0b0d8d890ed890c5e7aec78f',
              },
            ],
          },
        ],
      },
      {
        date: '2025-03-29',
        dateEntries: [
          {
            description:
              'Add database last updated at to ViolationDetail component.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '3eab9123a0434cb83b02eeea94ca103de3daff0a',
              },
            ],
          },
          {
            description:
              'Refactored Issuing Agency code to better detect issuing agency: often ignore listed agencies',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'e4a9ccb273e54bc349a81acc18584527248c335d',
              },
            ],
          },
          {
            description:
              'Return database dataUpdatedAt fields as ISO datetime strings.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '30671d53b3df692db871021c55cdeb7979976c84',
              },
            ],
          },
          {
            description:
              'Add database last updated at string to response for each violation.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '0ab09073f847977c9b2429f7737e4101ea5a5e01',
              },
            ],
          },
        ],
      },
      {
        date: '2025-03-27',
        dateEntries: [
          {
            description:
              'Add Intelligent Speed Assistance Notice behind cookie/query param feature flag.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '4f25be85496e12d4139e8df5654c63d2da749c10',
              },
            ],
          },
          {
            description: 'Add more address display and linking corrections.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'aab056eeeeb459d8ae78d1b24e8493758f3caf16',
              },
            ],
          },
          {
            description:
              'Fix bug where streaks were being calculated with an extra day.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'd7d16cca45e0627480596b23a1923c08b2e9b6d0',
              },
            ],
          },
        ],
      },
      {
        date: '2025-03-26',
        dateEntries: [
          {
            description:
              'Increase progressive rollout of new display style to 25% of all users.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '82b4799639d9f07a1693639a28a2e6747aed3471',
              },
            ],
          },
          {
            description: 'Add fines sort headers.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'd7763a9bca968d75851761785754401e4c2cdefe',
              },
              {
                project: 'hows_my_driving_ny_web',
                sha: 'bdc5dfe769ea8faa4eca2280b5c747078fc6a284',
              },
              {
                project: 'hows_my_driving_ny_web',
                sha: 'b3fd771e8d179d2fa82d36cc84466eda87d31276',
              },
            ],
          },
          {
            description:
              'Show violation summary breakdown by default if page at least 576px wide.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '095895a90ef349ae7e55ab50e910c89a02b2aefa',
              },
            ],
          },
          {
            description:
              'Also allow for toggling off of new-style display via cookies.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'cccb91abba4d21af8c328568d68fa98a14d9aaa9',
              },
            ],
          },
          {
            description:
              'Add new style display to desktops and fix LookupInfo display to be more space-efficient.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '849b6a807d706626eab709663cab7c71814a6d7f',
              },
            ],
          },
        ],
      },
      {
        date: '2025-03-25',
        dateEntries: [
          {
            description:
              'Only show address/location data in parentheses in showFullText view if it is present.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '0600c5768a69a455e824dd6c8ed643a8414f3874',
              },
            ],
          },
        ],
      },
      {
        date: '2025-03-24',
        dateEntries: [
          {
            description: 'Do not link to ViolationCard missing datetime.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '32d79767aa2dce287cd1c381fa96b4474a280042',
              },
            ],
          },
          {
            description:
              'Increase form input font size to 1rem (16px) to prevent auto-zoom in iOS.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'c0f5092eb2047622eb0308cf56b96b5b55b491e9',
              },
            ],
          },
          {
            description:
              'Increase progressive rollout of new display style to 10% of all users.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '775af8817b8115c14e703175a85ea09b1b7176e7',
              },
            ],
          },
          {
            description:
              'Improve logic for displayed and linked locations to make more readable.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '25a8fbe48cfcdd364e1fcc03c4232666e089b758',
              },
            ],
          },
          {
            description:
              'Ensure caption agrees with number of violations for vehicle.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '2c86414861923a1a9c6ea309234bf93f527dfc66',
              },
            ],
          },
          {
            description:
              "Fallback to borough in the ViolationDetail component when it's the only location data available.",
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '327beb25fe7370aaeb5a3aba88b5c86b9a46cf36',
              },
            ],
          },
        ],
      },
      {
        date: '2025-03-23',
        dateEntries: [
          {
            description:
              'Infer correct Open Parking And Camera Violation descriptions from archaic descriptions and issue dates.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'd2769f174732f4097af6e2eeb3bf8cb624034ac9',
              },
            ],
          },
          {
            description:
              "Add missing values to the 'counties' mapping from abbreviations to boroughs.",
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '7252b0557a6fc46774f318479e7b422cfcb8eef3',
              },
            ],
          },
        ],
      },
      {
        date: '2025-03-22',
        dateEntries: [
          {
            description:
              'Implement temporary fix for sorting Bronx violation cards.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'c22ae47fa76d943e4f91ac46cfddcf20ce69b62c',
              },
            ],
          },
          {
            description:
              "Fix linked addresses with slightly different cardinal direction 'of' strings.",
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '9d3b46a3309cdf69dd9b5181b34577ce5ea182d1',
              },
            ],
          },
          {
            description:
              'Tweak feature flag rules: 5% sessions in experimental group, 50% in control, 45% in reserve.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'ea0dceb1c00357f18e0bad4ef5259a226ec309cd',
              },
            ],
          },
          {
            description:
              'Standardize more address data and tweak summons not available language for camera violations.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'd1adef6a70770c53363512cd8629384d0c6c99fa',
              },
              {
                project: 'hows_my_driving_ny_web',
                sha: '1038f49a61eb6c6631e1e2a9b234916fb9451843',
              },
              {
                project: 'hows_my_driving_ny_web',
                sha: '8261710a1aac5562fd313d68d82baadef97ef30e',
              },
            ],
          },
          {
            description:
              'Return violation.state if violation.registration_state is nullish and only return detected boroughs if they are in New York City.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'f9ce16519f3c39b69cb963050a3967e29fd753cc',
              },
            ],
          },
        ],
      },
      {
        date: '2025-03-21',
        dateEntries: [
          {
            description:
              'Implement feature flag to roll out new style display to 5% of mobile users.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'b67817fd2dce0f342dc54b6998d2cfdfd7537ddc',
              },
            ],
          },
        ],
      },
      {
        date: '2025-02-22',
        dateEntries: [
          {
            description: 'Add violation types count breakdown.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '343c36d0d602b1ff1308364aa96b9077ff7190fc',
              },
            ],
          },
        ],
      },
      {
        date: '2025-02-12',
        dateEntries: [
          {
            description: 'Add Bluesky share functionality.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'a1fc98d02ec2a1344a59a933aeb14b8c87cd4985',
              },
              {
                project: 'hows_my_driving_ny_web',
                sha: 'a4f2d8f4c8b22509abe066c8e970e467b563395c',
              },
            ],
          },
        ],
      },
      {
        date: '2025-02-08',
        dateEntries: [
          {
            description:
              'Convert database query callbacks to async/await and change package from mysql -> mysql2.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'b836b367a97b2fa7148a5dfc4b9b2299edfaf085',
              },
            ],
          },
        ],
      },
      {
        date: '2025-02-04',
        dateEntries: [
          {
            description: 'Display if region is state, territory, or province.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'cde8354b209ab6c9e6721f64cc84200d1250eed2',
              },
            ],
          },
        ],
      },
      {
        date: '2025-01-28',
        dateEntries: [
          {
            description:
              'If query for previous lookup value exists in cookie, only search once.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'a425a38cf9730da58579b8334343e7ee9dd4b20c',
              },
            ],
          },
        ],
      },
      {
        date: '2025-01-13',
        dateEntries: [
          {
            description: 'from @jehiah (Jehiah Czebotar): update favicon image',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'dc824c47ae935c78bf1dc357e3932cc62add9b57',
              },
            ],
          },
        ],
      },
      {
        date: '2025-01-04',
        dateEntries: [
          {
            description:
              'Rewrite of project using up-to-date packages, added storybook, reworked directory + file structure, added unit tests, and many other refactors.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '9cfb721de0981ce535b8227da533bec5ddd7a3f0',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    year: '2024',
    yearEntries: [
      {
        date: '2024-12-18',
        dateEntries: [
          {
            description:
              'Determine violation humanized description by start date of description equal or lesser datetime.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'a7efdc957298e05e12595f64fa03877b531d62ab',
              },
            ],
          },
          {
            description:
              'Add Mobile MTA bus stop and double parking violation codes and start dates.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '8745f5ed3234e3f3a3330cbf670c14799a2f6eeb',
              },
            ],
          },
        ],
      },
      {
        date: '2024-03-22',
        dateEntries: [
          {
            description: 'Fix frequency query and logic.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'c1560466741449112148b0ad6019c83a7bad5177',
              },
            ],
          },
        ],
      },
      {
        date: '2024-02-11',
        dateEntries: [
          {
            description: 'Add weigh-in-motion violations.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '08ab2b4c247a3c554482f21774cb9b257ad2bf8f',
              },
            ],
          },
        ],
      },
      {
        date: '2024-01-16',
        dateEntries: [
          {
            description: 'Fix frequency lookup for refactored code.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '480459337579a79c72ba115c125e2eb733b38acf',
              },
            ],
          },
        ],
      },
      {
        date: '2024-01-13',
        dateEntries: [
          {
            description:
              'In condensed view show sum of fine, interest, penalties, and reduction.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '1fcf51fe89efdfca6c22bb7f82aee554d38774d1',
              },
            ],
          },
          {
            description:
              'When no plate types, only query for previous lookups without plate types.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '81e269941986d9028639a7011ea9b973dabc0627',
              },
            ],
          },
        ],
      },
      {
        date: '2024-01-06',
        dateEntries: [
          {
            description: 'Fix decamelization of existing lookup query.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '22cbfdea311691077bd842741d5c50bb38c69b17',
              },
            ],
          },
          {
            description: 'Return violation codes without leading zero, if any.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '3147bc9aa180d656d5df6e8337779deb8f6b815f',
              },
            ],
          },
          {
            description:
              'Fix human readable descriptions for violation codes that have changed over time.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '5f30166fc8e9d40a7ac5e6b14cb4c79f1f4daea1',
              },
            ],
          },
          {
            description:
              'Fix lookup source for api lookup and fix unique identifier query.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '47542a444509fe203edd45323b9e33e481fba771',
              },
            ],
          },
          {
            description: 'Convert undefined values to null for response.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '5ed563ad9995e809b619b8ebed973851ebdf65cc',
              },
            ],
          },
        ],
      },
      {
        date: '2024-01-05',
        dateEntries: [
          {
            description: 'Convert repo to typescript.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '5d846b335fb97172990e03c878f412f031c1198f',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    year: '2023',
    yearEntries: [
      {
        date: '2023-12-23',
        dateEntries: [
          {
            description: 'Add fiscal year 2024 endpoint.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '0600621a14bec7e48c0afb90a2cf0573441f7eda',
              },
            ],
          },
        ],
      },
      {
        date: '2023-07-28',
        dateEntries: [
          {
            description: 'Fix display of lookups with no violations.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '4feb3ff43225a6ead2a14f8f5a9f575513e6ee2f',
              },
            ],
          },
        ],
      },
      {
        date: '2023-07-23',
        dateEntries: [
          {
            description:
              'Increase event check interval to 30 seconds to prevent duplicates',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '7979d66b01e5e0531885543eadf8c27f62f399f9',
              },
            ],
          },
        ],
      },
      {
        date: '2023-07-21',
        dateEntries: [
          {
            description: 'Add array of tweet text to API response.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'bff05d0c5585dbfb5c58db925b514fc612f1e5ab',
              },
            ],
          },
        ],
      },
      {
        date: '2023-07-16',
        dateEntries: [
          {
            description:
              'Ensure Twitter events processed in chronological order.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'a0d4b461e74b3fabb4346918e06685b1d60fab91',
              },
            ],
          },
        ],
      },
      {
        date: '2023-06-21',
        dateEntries: [
          {
            description:
              'Add data about from which databases violation data comes from to API responses.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'c1ec9cba426c37ee61dd262a57a0837719a53121',
              },
            ],
          },
        ],
      },
      {
        date: '2023-06-20',
        dateEntries: [
          {
            description: 'Add error handling for open data failures.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '49508731900fb31f02d2d7ab921e6bf93f6373ca',
              },
            ],
          },
          {
            description: 'Convert judgment entry date to date object.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '4a1e74fd24e2f3a00b5430c42e40f17997549c8f',
              },
            ],
          },
          {
            description: 'Clarify time zones of violations.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '3aef233f48b2e42703a3e38df19f8c726f849fa3',
              },
            ],
          },
        ],
      },
      {
        date: '2023-06-12',
        dateEntries: [
          {
            description: 'Refactor Twitter endpoints.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '38cb4f47ab2adf4b80e9c37d5f087e21abdafda1',
              },
            ],
          },
          {
            description:
              'Refactor plate lookup code to use new URL and URLSearchParams.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'c73c7678d98b1b8406de90e5d30ed0e5da63e7a0',
              },
            ],
          },
        ],
      },
      {
        date: '2023-06-11',
        dateEntries: [
          {
            description:
              "Add `rectified_plate` to API response (e.g. medallion returns a different 'rectified' plate.).",
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '65c483ea4229c45e2e9eae17faf8e4c4a8cf713c',
              },
            ],
          },
        ],
      },
      {
        date: '2023-06-09',
        dateEntries: [
          {
            description:
              'Fix search for medallion plates, replace q with native Promises and request-promise with axios.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'ebaf2f445174019d43344fb5c6bf0da3cc5d647f',
              },
            ],
          },
        ],
      },
      {
        date: '2023-06-07',
        dateEntries: [
          {
            description:
              "Swap paid and reduced on combined violations and don't show reduced if amount is 0.",
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '03ab5311ee0b9a162aea5228cc00985c69097682',
              },
            ],
          },
          {
            description:
              'Only return violations before query date for previous lookups.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '4411545156787b763e4007a78b141250d47dbd5f',
              },
            ],
          },
        ],
      },
      {
        date: '2023-06-04',
        dateEntries: [
          {
            description: 'Improve toggle buttons text to be more intuitive.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'aedf46cc6bb4c194440557efd04b9d085ed57650',
              },
            ],
          },
        ],
      },
      {
        date: '2023-06-03',
        dateEntries: [
          {
            description:
              "Don't show in-judgment fines if the fines are paid off.",
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'ba6faa82eb05aa0b2f65382f728afe7d2908c466',
              },
            ],
          },
        ],
      },
      {
        date: '2023-06-02',
        dateEntries: [
          {
            description:
              "Change 'Outstanding' to 'Owed' to avoid confusing 'Oustanding' as in addition to 'In judgment'.",
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '79447c6832bcbfa578d93b5c795efe5886a6d41f',
              },
            ],
          },
          {
            description:
              'Add number of violations to main summary, fix new violations calculation, add total amount in judgment.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '04d6e8f9284f702e34709818b9744c151c85f2e4',
              },
            ],
          },
          {
            description: 'Make in-judgment fines more prominent.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'd0a9b314dd5b8cc34b95dff2cb12011a148b5992',
              },
            ],
          },
          {
            description: 'Only transform plate input to uppercase.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'fd265bff81316cd5c6e2d6e6939c9388e1908d70',
              },
            ],
          },
          {
            description: 'Specify whether outstanding amount is in judgment.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '448fe624404e23a93fee902c2f2f54254a9e1c90',
              },
            ],
          },
          {
            description:
              'Fix bug where fines not shown in non-detailed fines view.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '3e4140968a710b8a268e67f4a95482e95074f43a',
              },
            ],
          },
          {
            description: 'Add fine breakdown per violation.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '4d27ba2bc0b67626dc9d6ebb1dd5be93975ae025',
              },
            ],
          },
          {
            description:
              'Correct previous lookup query to return prior results at time of previous lookup.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'c5b7c58f672ba0b1473ae6e37d5da42b1c78ff48',
              },
            ],
          },
        ],
      },
      {
        date: '2023-06-01',
        dateEntries: [
          {
            description: 'Show number of violations in table header.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'bd6762fb730a1080aaced35abe52e7dc588509d9',
              },
            ],
          },
          {
            description: 'Do not show previous result if one does not exist.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '567b3f1a5e14a4f5ed0178f4a8a1be96e21c4f54',
              },
            ],
          },
          {
            description: 'Count previous lookup in frequency count now.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '8613060479c4c2ff7e536921e1c2e628058aa420',
              },
            ],
          },
          {
            description: 'Correct calculation of previous lookup frequency.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '57197e07fc19f6a49f3a5ce508d5d520f4073b17',
              },
            ],
          },
        ],
      },
      {
        date: '2023-05-31',
        dateEntries: [
          {
            description: 'Add total amount in judgment to fines.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'c6194df658b9bbcfe04b8baca4ec25a7d4776a8f',
              },
            ],
          },
        ],
      },
      {
        date: '2023-05-30',
        dateEntries: [
          {
            description: 'Respond to feedback from @jehiah.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'e7f6aa298919e48f33eab0ba84aa81a14d247c2d',
              },
            ],
          },
          {
            description: 'Add footer to website.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'ad55a7e192191febbbd97e8666422d4590b5011f',
              },
            ],
          },
          {
            description: 'Add feedback for copying results.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'a0167ea02e9ab05e9e8e4343327a7f3b184c82c5',
              },
            ],
          },
          {
            description:
              'Only use :active and :hover states for devices that support hover.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '9af34d70fc2fb96a5a1dd2c2422883b2f9fab642',
              },
            ],
          },
          {
            description: 'Add judgment_entry_date to data returned by api.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '7f86be2ce01aa679767217c2fd49ec9bb55577e2',
              },
            ],
          },
        ],
      },
      {
        date: '2023-05-29',
        dateEntries: [
          {
            description:
              'Redesign vehicle card and ensure lookups shared with an identifier (unique link) show first.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'aab269221a6de9f52d3e20c88e6a7c07d915c632',
              },
            ],
          },
          {
            description:
              "Fix callback issue where handle input function wasn't changed when user input changed.",
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'b1afb27cab57866a3e1f42fb012ad9b1fbd69b7b',
              },
            ],
          },
        ],
      },
      {
        date: '2023-05-27',
        dateEntries: [
          {
            description: "Fix setting of cookies when lookups don't change.",
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '93666e6847032a07e6fbf9c14ea554cd19a810f7',
              },
            ],
          },
          {
            description: 'Set cookie expiration to one year from search.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '9e3730c4f593d82091e43c49e81c7fbc71d28175',
              },
            ],
          },
          {
            description: 'Implement component memoization.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'e623c8f1cc904aca706b21ba0156aa18c9e12dcf',
              },
            ],
          },
          {
            description:
              'Display previous lookups in correct order (reverse-chronological).',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'd2bb6f68834a8d3254d13b9b819ffe6509acc3cf',
              },
            ],
          },
        ],
      },
      {
        date: '2023-03-01',
        dateEntries: [
          {
            description: 'Improve accessibility and SEO.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '498ee5f7c69d5d0c2ca028057fc9f621114680d1',
              },
              {
                project: 'hows_my_driving_ny_web',
                sha: '89d98ba6a9ab065864f3b544ff325b69e9898a02',
              },
            ],
          },
        ],
      },
      {
        date: '2023-02-25',
        dateEntries: [
          {
            description: 'Avoid invisible text on page load.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'db88afdf8bcea4ad1503fe562fc364baf620d841',
              },
            ],
          },
        ],
      },
      {
        date: '2023-02-20',
        dateEntries: [
          {
            description:
              'Fix accessibility of table sort and added table caption.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'bdc55ad5c011169b594ee0194b6428a264a06a56',
              },
            ],
          },
          {
            description: 'Fix missing aria labels for buttons.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '70eb24b90947f2121da6e7189610494b4f9f32c5',
              },
            ],
          },
        ],
      },
      {
        date: '2023-01-27',
        dateEntries: [
          {
            description:
              'Open Parking and Camera Violations violation codes sometimes have leading zeros. Parse to int and then back to string.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '3d066c679d58af519126e29ecbb2b25a852073d4',
              },
            ],
          },
        ],
      },
      {
        date: '2023-01-10',
        dateEntries: [
          {
            description:
              'Update typescript version and remove tslint in favor of eslint.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'c67a7a01145d5fd34b61e4f06c4a5880fd88da0a',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    year: '2022',
    yearEntries: [
      {
        date: '2022-12-26',
        dateEntries: [
          {
            description: "Don't set cookie for shared lookup with identifier.",
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '08e36ce3fb8d24ff7ce84dccbf8a846af7f1475e',
              },
            ],
          },
          {
            description:
              'Replace composed component with inline to fix issue with defocusing of input.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '7e916a441a9b689b6016164a76e4e68c2d198fdc',
              },
            ],
          },
          {
            description: 'Store previous lookups in cookie.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '91050ed8318f7b4af469df3046c790145ef4b6be',
              },
            ],
          },
        ],
      },
      {
        date: '2022-12-24',
        dateEntries: [
          {
            description:
              'Return an empty response when no successful lookup of old identifier.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'd44b6561c24319001d72fa2b3104b62bde642354',
              },
            ],
          },
        ],
      },
      {
        date: '2022-12-18',
        dateEntries: [
          {
            description:
              'Remove individual summons toggle ability and add fine data to summaries.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '0f3cd7f5d0c38b632c89b9e8ff764f1e00bc3ceb',
              },
            ],
          },
          {
            description:
              'Add ability to toggle full text on and off and by row.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'b2f5af0e6e19e4063a6841f457ac1fe2d2aadb1a',
              },
            ],
          },
          {
            description: 'Added missing bus lane violation description.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '2af96dca241f9caff839a78b1fa594091d666af2',
              },
            ],
          },
        ],
      },
      {
        date: '2022-08-23',
        dateEntries: [
          {
            description:
              'Add new violation codes and adding camera violation fields to inserted plate_lookup records.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '12923c786eabbecdf7deba55540354678e9aad32',
              },
              {
                project: 'hows_my_driving',
                sha: '2d169663c2774d14d41558853b59650ba1adb4c3',
              },
            ],
          },
          {
            description: 'Fix bus lane violation calculation.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'ca78e2ae6a5b97f97732278cad09a39936dfffce',
              },
            ],
          },
        ],
      },
      {
        date: '2022-08-21',
        dateEntries: [
          {
            description:
              'Extend COVID-19 repeat offender job calculation to the present date',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '10f61c84b8c7b8aba04b5a19f18f3ec80f1fbaf3',
              },
            ],
          },
        ],
      },
      {
        date: '2022-08-20',
        dateEntries: [
          {
            description:
              "Add endpoint for 'Parking Violations Issued - Fiscal Year 2023' from NYC Open Data.",
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'a98b12bad466f04df32ba6342a6cb0eded8abd38',
              },
              {
                project: 'hows_my_driving',
                sha: '26f4b434dcf9e093a86cd0574643529ec3f64717',
              },
            ],
          },
        ],
      },
      {
        date: '2022-08-14',
        dateEntries: [
          {
            description: "Don't respond to shared lookups.",
            commits: [
              {
                project: 'hows_my_driving',
                sha: '889927e63db8a0a7cd34a29ef84bd6ed77ca16ff',
              },
            ],
          },
        ],
      },
      {
        date: '2022-08-13',
        dateEntries: [
          {
            description: 'Only retry failed Twitter event handling five times',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '01e231490ae0e737a526fb691dd5333387040108',
              },
            ],
          },
          {
            description:
              'If <plate>:<state>:<plate_type> match is found, do not match <state>:<plate_type>.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '18d24d84882b6ac975e30d0b07e6181d800f0eba',
              },
            ],
          },
        ],
      },
      {
        date: '2022-08-08',
        dateEntries: [
          {
            description:
              'Strip parentheses of directionals from location strings.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '5faa13ff8660c00999db0b839d13f1ea4ea87936',
              },
            ],
          },
        ],
      },
      {
        date: '2022-08-07',
        dateEntries: [
          {
            description: 'Add camera violations to descriptions.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '4baaf1f99dbb2739409526ef8d322c98c7a5d9ac',
              },
            ],
          },
        ],
      },
      {
        date: '2022-03-03',
        dateEntries: [
          {
            description: 'Display timezone in timestamp.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'b8e2a6269538b0bdb757abf5bca3ceb114d24599',
              },
              {
                project: 'hows_my_driving',
                sha: 'f60649665df0ceaca0aa58c2dc11b61dba3643e6',
              },
            ],
          },
        ],
      },
      {
        date: '2022-02-27',
        dateEntries: [
          {
            description:
              'Use Twitter id_str for mentioned user ids to avoid BIGINT parsing issues.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '21ee91e6a4b49905fdc9c7b38dee470a215a63aa',
              },
            ],
          },
        ],
      },
      {
        date: '2022-02-24',
        dateEntries: [
          {
            description: 'Improve response logic',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '91176cc14e80e74ccb53060f707c844537f96e92',
              },
              {
                project: 'hows_my_driving',
                sha: '06ceb4b223d795fc0805fd2c29cf6bc0088ddc26',
              },
              {
                project: 'hows_my_driving',
                sha: 'ba4c8d004f65fa93339cbe0f910b1ea687b3a9d9',
              },
              {
                project: 'hows_my_driving',
                sha: 'e27a9b5591c1db0d796d4bbbf580c85cca59223d',
              },
            ],
          },
        ],
      },
      {
        date: '2022-02-23',
        dateEntries: [
          {
            description:
              'Revert to python 3.8 until threading issues are sorted out.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '1ec4c2b2ec3fea8d8347e436cd1e1ad3c2f83606',
              },
            ],
          },
          {
            description: 'Update code to reflect Tweepy version bump.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '5a08db27ded3de23ccb9bac7084e1b975b5cdbf6',
              },
              {
                project: 'hows_my_driving',
                sha: '39c35ee9b526ea69ec15a663eb07d5817604e076',
              },
              {
                project: 'hows_my_driving',
                sha: '2bafd5e1a5df8cadca7e0fd454df8d86674e7f97',
              },
            ],
          },
          {
            description: 'Update query for COVID-19 Camera Offender job.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '195989209ff330e7cbf737cc2ae62d830665cbcc',
              },
            ],
          },
        ],
      },
      {
        date: '2022-01-05',
        dateEntries: [
          {
            description:
              "Update violation code 33 to be 'Misuse of Parking Permit' after 2019-06-11 rather than 'Feeding Meter'.",
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '5b3592ea62129d6d2b24c32a48e98e2bc891bfa9',
              },
              {
                project: 'hows_my_driving',
                sha: '62de5e27fa756f322a1d36f811d018e62d0e0936',
              },
            ],
          },
        ],
      },
      {
        date: '2022-01-02',
        dateEntries: [
          {
            description:
              'Update COVID-19 job to use data through November 26, 2021.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'ef16155d43748cfe9b1cfe141f6bfbebb2b40ba7',
              },
            ],
          },
          {
            description:
              'Add FY 2022 endpoint to data sources. Technically, the 2021 endpoint became the 2022 endpoint, so this is adding the renamed 2021 endpoint.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'c0121b82bfeaa523c0ccfe95be178f4eb15692b0',
              },
            ],
          },
          {
            description:
              'Add timestamp to status responses to prevent duplicate replies and pass user mention ids for exclusion when processing status replies.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '056e7970c7b233ecb8ddaf84cba814fd99f70ca1',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    year: '2021',
    yearEntries: [
      {
        date: '2021-12-31',
        dateEntries: [
          {
            description:
              'Only reply to only one user by explicitly @ing them rather than auto-populating reply data.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '573c1eb2ea87d28e437b38214cd8aea5f26e360e',
              },
            ],
          },
        ],
      },
      {
        date: '2021-12-30',
        dateEntries: [
          {
            description: 'Update to python 3.9.9',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '3cf21dff538d79c6ddcab6f9f931bf4f0de1f86c',
              },
            ],
          },
          {
            description: 'Update to python 3.8.12',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '235cd0c707bfa68edc2c0aac1cf455724df6f3e9',
              },
            ],
          },
        ],
      },
      {
        date: '2021-10-03',
        dateEntries: [
          {
            description: 'Fix typo for payment amount due.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '0b89fcbefee9924a030cca030d28d0f66c54dd6e',
              },
              {
                project: 'hows_my_driving_ny_api',
                sha: '1d9202ee653705ad876cd5765c4764aa2eed4269',
              },
            ],
          },
        ],
      },
      {
        date: '2021-09-10',
        dateEntries: [
          {
            description: 'Update Dangerous Vehicle Abatement Act url.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'd61aedca502eecc0755c31f85ef697355270627f',
              },
            ],
          },
        ],
      },
      {
        date: '2021-08-10',
        dateEntries: [
          {
            description: 'Add FY 2022 database and renamed FY 2021 database.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '270462977ad55ceb01d7bf4c53b9201b415a98be',
              },
              {
                project: 'hows_my_driving_ny_api',
                sha: 'b375dd0c1fdde195b3f7661c325d9d9f536d6862',
              },
            ],
          },
        ],
      },
      {
        date: '2021-02-04',
        dateEntries: [
          {
            description: 'Add copy button to share lookup without Twitter.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'f666d116b9eecca269f97b07b80e54df8b25d271',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    year: '2020',
    yearEntries: [
      {
        date: '2020-08-31',
        dateEntries: [
          {
            description:
              'Add user mention ids to ensure we only reply to the calling user in a thread with multiple users, and ensure streak data is always returned.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '50d70ddee4b0221cc31cf26892b1252b7c1f9146',
              },
            ],
          },
        ],
      },
      {
        date: '2020-08-12',
        dateEntries: [
          {
            description:
              'Default to no plate type rather than passenger plates.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '4f5afafd85c4de1d2dbc7b3496c586d73a99b07c',
              },
            ],
          },
          {
            description:
              'Update replies to exclude all users who were not the calling user.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'ce809f63caf13c8cdd08ca1ec6ff2c44a73d0ce1',
              },
            ],
          },
        ],
      },
      {
        date: '2020-08-10',
        dateEntries: [
          {
            description:
              'Fix fines calculation and change camera violation booting warning to reflect Dangerous Vehicle Abatement Act thresholds.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'a9552791de58059a355f564bce2f721040b1e911',
              },
            ],
          },
        ],
      },
      {
        date: '2020-08-08',
        dateEntries: [
          {
            description: 'Fix lookups using legacy lookup format.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'b8070f883f6b9379b4a878015dcc9b96f8774a04',
              },
            ],
          },
        ],
      },
      {
        date: '2020-08-07',
        dateEntries: [
          {
            description:
              "Add FY 2021 endpoint (which again happens to be the previous fiscal year's endpoint...)",
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'b97dfc192beba71cd899c300d7033351d5e97eca',
              },
              {
                project: 'hows_my_driving',
                sha: '4b6b71c24a814f708039edc6994d2f300d446071',
              },
            ],
          },
        ],
      },
      {
        date: '2020-08-05',
        dateEntries: [
          {
            description:
              'Fixing error for Dangerous Vehicle Abatement Act eligibility (typo in which threshold applied).',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'cbd277b2d9813299481ed960fc37a31ee293a58d',
              },
            ],
          },
        ],
      },
      {
        date: '2020-07-30',
        dateEntries: [
          {
            description:
              'Add backoff strategy to failed twitter event retries.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'dd213c7dfb9d6647d1dba5ca3bdb164b351d4dcc',
              },
            ],
          },
        ],
      },
      {
        date: '2020-07-16',
        dateEntries: [
          {
            description: 'Update COVID-19 job to have June 2020 data.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'e4d4d2aa0e735a65e7f33c44caebff60f12e81a3',
              },
            ],
          },
          {
            description: 'Do not attempt to respond to deleted tweets.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '1e667db3d336e9caae3516c4453af42e5f5bdd12',
              },
            ],
          },
        ],
      },
      {
        date: '2020-06-12',
        dateEntries: [
          {
            description:
              'Add violation data through June 1, 2020 for COVID violation job.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'c93164df8587407b2ae6e8026e799b3c43cbf5da',
              },
            ],
          },
        ],
      },
      {
        date: '2020-06-04',
        dateEntries: [
          {
            description: 'Remove open streets content from lookup responses.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'c1c23d9530851492675c61259cc2027380f4e9e4',
              },
            ],
          },
        ],
      },
      {
        date: '2020-05-19',
        dateEntries: [
          {
            description:
              'Update COVID-19 job to have violation data through May 11, 2020.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '5de4f713e02eb4d3893c12b4075c8148289399b8',
              },
            ],
          },
        ],
      },
      {
        date: '2020-05-04',
        dateEntries: [
          {
            description:
              'Only include camera streak data if there is a streak.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '10128883a5408ee39125b529c77ff80065ff6868',
              },
            ],
          },
          {
            description: 'Fix missing streak data for response.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '3097ab614d0cb9d1f3caf2374f6bbe20f45ee230',
              },
            ],
          },
          {
            description:
              'Add Dangerous Vehicle Abatement Act thresholds to lookups.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '5f3f8cd4965d6e1a60783b892fa78d289ef7c1e7',
              },
            ],
          },
          {
            description: 'Correct number of tickets for multi-plate queries.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '538d9402ffb51de1e634a122f37341c6096f43e7',
              },
            ],
          },
          {
            description:
              "Remove 'thanks to @bradlander.' He deserves it, but it probably results in excessive notifications for him.",
            commits: [
              {
                project: 'hows_my_driving',
                sha: '8c50ab6d2f9e7722c13a420c05c23544299e2dee',
              },
            ],
          },
          {
            description:
              'Ensure dangerous driver retrospective jobs to be run only on publicy-accessible tweets and only using the higher DVAA (versus RDAA) thresholds.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '2a20bb760e242a575776b83b8ae08d4ddb1776a0',
              },
            ],
          },
          {
            description:
              'Fix direct message search for missed events by fixing message attribute error.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'a73e28101980841118b3ff170baaaba037e8eda3',
              },
            ],
          },
          {
            description: 'Update COVID-19 camera data to the latest available.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '3436dd1020e3b871c55093ac8d294a6a53b13c31',
              },
            ],
          },
          {
            description:
              'Update various processes from Reckless Driver Accountability Act thresholds to Dangerous Vehicle Abatement Act thresholds.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '9f8df0583e7bf1e1058b596a37c576cd6ec0f8b1',
              },
            ],
          },
        ],
      },
      {
        date: '2020-05-01',
        dateEntries: [
          {
            description:
              "Refactor violations table and displaying 'N/A' for time when not available, not UNIX epoch timestamp.",
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'bf37ac9eed2ab208f179d393c5922d2de9098e96',
              },
            ],
          },
        ],
      },
      {
        date: '2020-04-30',
        dateEntries: [
          {
            description: 'Fix invalid dates between midnight and 1AM.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '0630b7074281303fc10c7d0e90d7210472e2cccb',
              },
            ],
          },
        ],
      },
      {
        date: '2020-04-29',
        dateEntries: [
          {
            description: 'Fix camera streak start and end dates.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'bc3b65767051fe7e652dc3acfeb89504702ac6d9',
              },
            ],
          },
          {
            description: 'Reminder: 0 is truthy in javascript.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '62271b2b27d6482e512c7bd578b14cbeca4e97fd',
              },
            ],
          },
          {
            description:
              "Don't add TwitterEvents for @HowsMyDrivingNY's own messages.",
            commits: [
              {
                project: 'hows_my_driving',
                sha: '9b43b1509be1325235bfb6b948c768c12d9736e2',
              },
            ],
          },
          {
            description:
              'Updating COVID-19 job to include data through 2020-04-20.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '1e0624032694ea357b4dc62624593256e08621a3',
              },
            ],
          },
        ],
      },
      {
        date: '2020-04-28',
        dateEntries: [
          {
            description:
              'Require non-followers to favorite or follow to receive replies.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '71ded73f2db6fc4ccf321a352ee3ce9be7e49608',
              },
              {
                project: 'hows_my_driving',
                sha: 'b258374d495c732dcbae9c6d3f2065fc5dd31714',
              },
              {
                project: 'hows_my_driving',
                sha: '94c4d1c70f6414e4bd2723e542958f9c3b8a9eea',
              },
              {
                project: 'hows_my_driving',
                sha: '83ad6cd7b70f2c5430f2f6e9d3e03602451a5f79',
              },
            ],
          },
        ],
      },
      {
        date: '2020-04-26',
        dateEntries: [
          {
            description:
              'Add stub methods to record all account activity api events.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '656f689a17c122ea52a03534c2e94af1564c303f',
              },
            ],
          },
          {
            description:
              'Adding auto_populate_reply_metadata to statuses to avoid having to add the username to every response status.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '5937db18fdb0cdbe81e7c2c89b313a7cbf21aaa1',
              },
            ],
          },
        ],
      },
      {
        date: '2020-04-21',
        dateEntries: [
          {
            description: 'Fix issue with plate searches without plate types.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '5411084ca69e1c5fd09f95ee89da1a614a439c1a',
              },
            ],
          },
          {
            description:
              'Update COVID-19 job with Open Parking and Camera Violation data though April 13, 2020.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '1d99a8e600a287704b300c56e8f64e582750d86f',
              },
            ],
          },
        ],
      },
      {
        date: '2020-04-13',
        dateEntries: [
          {
            description:
              'Updating COVID-19 job to have data up to April 6, 2020.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'f7eeedeae4d50c21b3105e8b84a8a62620567a17',
              },
            ],
          },
        ],
      },
      {
        date: '2020-04-10',
        dateEntries: [
          {
            description:
              'Adding random open streets tweets to covid-19 responses.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '265c24ca47b77ef84a549ea7e00c0841d54f9c7e',
              },
            ],
          },
          {
            description:
              'Updating COVID-19 job to include speed camera data from March 31.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'eddff0c9606445c226cb7a1c0964848a0ca2a2f0',
              },
            ],
          },
        ],
      },
      {
        date: '2020-04-07',
        dateEntries: [
          {
            description: 'Fix frequency error on existing lookups.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '44cc7e33c31294e9f081b1613b3c0845efd88043',
              },
            ],
          },
        ],
      },
      {
        date: '2020-04-06',
        dateEntries: [
          {
            description: 'Change share links to be lookup specific.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '8485f52b3b13cd10a31de8ea55dc76807f1b31f3',
              },
            ],
          },
          {
            description: 'Add smooth scroll to focus new results.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'f8c08a3f11a37f7fb7b6f23d3c8f8d4c86fa6c52',
              },
              {
                project: 'hows_my_driving_ny_web',
                sha: 'bb413858cf053f12f61c7c549e4ba2868b9d291a',
              },
            ],
          },
          {
            description:
              'Add unique identifier to API response to help share lookups.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '788ed348d50f51b4ce2359b7db8e61d5a238da29',
              },
            ],
          },
          {
            description:
              'Thank @bradlander for the Dangerous Vehicle Abatement Act.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'd9521e7b8fc179afd84f5182c05be51ea2b4b978',
              },
            ],
          },
          {
            description:
              'Updating COVID-19 lookup to include data through March 30, 2020.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '412d60e645699e63f5321edc0338cf24c8a0040b',
              },
            ],
          },
        ],
      },
      {
        date: '2020-04-05',
        dateEntries: [
          {
            description: 'Add Twitter cards to vehicle lookup cards.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'cb0cf92045cfb5cc0b17b04924960551a073250c',
              },
              {
                project: 'hows_my_driving_ny_web',
                sha: '619f6a897c91252fff60cea31092f86db42fd117',
              },
              {
                project: 'hows_my_driving_ny_web',
                sha: 'fa50dc1304024b27e3796bc3d986cc1b6e4db864',
              },
              {
                project: 'hows_my_driving_ny_web',
                sha: 'bdf8718e17e040499aa1a74982d87958426f3aa1',
              },
            ],
          },
          {
            description: 'Add ability to query previous lookups.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '93eef08db9f8bf679a84d7766106b04e426ad00d',
              },
              {
                project: 'hows_my_driving_ny_api',
                sha: '40a909942ec243da4a8e82fbc0141f401398a897',
              },
            ],
          },
          {
            description: 'Adding website links to all lookups.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '983d39aa2da7b8a37a3ff723e515526e981073de',
              },
            ],
          },
        ],
      },
      {
        date: '2020-04-03',
        dateEntries: [
          {
            description:
              'Adding COVID-19 camera offender job to highlight repeat offenders in past month.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '745fde7d53b8f35afe6db270aba0fc2c5ec38f9e',
              },
              {
                project: 'hows_my_driving',
                sha: '09b21324beb5219eef8919b010261be96b5ff107',
              },
              {
                project: 'hows_my_driving',
                sha: 'b57ff1500ef9254ab9496fc3a4ab27afd4403542',
              },
            ],
          },
        ],
      },
      {
        date: '2020-03-29',
        dateEntries: [
          {
            description: 'Record failed twitter responses for retry.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '00ebfc825ac6e8bf7639f5df98dec5b412b25d1e',
              },
            ],
          },
        ],
      },
      {
        date: '2020-03-28',
        dateEntries: [
          {
            description:
              'Use strings instead of integers because Twitter ids exceed MAX_SAFE_INTEGER.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '401bdcdc89732f8ff2f9b209cd22e450dab0c594',
              },
            ],
          },
          {
            description: 'Fixing status search due to faulty tweepy response.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '5033257c2954a2049a72fd0d9fc0e81bd32222f5',
              },
            ],
          },
          {
            description: 'Changing charset to utf8mb4 to support emoji.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '5c0a10b32e3fe2a3e9cade4ff6eba87ed6f52e98',
              },
            ],
          },
          {
            description:
              'Upping thresholds for message and tweet search to not hit rate limits.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '0161fd5c646de6057f3009509ad45604c07e6ef5',
              },
            ],
          },
          {
            description:
              'Attempting to solve issue of dropped events from Twitter Account Activity API by using search and direct message apis to detect events that were missed.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '793149b45246248b1d1a8085e8389de882b4d5cf',
              },
            ],
          },
        ],
      },
      {
        date: '2020-03-27',
        dateEntries: [
          {
            description: 'Fix reckless driver retrospective job query.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '2019ef8b3c8188bcd7a9652662527dfc58ff9c55',
              },
            ],
          },
        ],
      },
      {
        date: '2020-02-29',
        dateEntries: [
          {
            description:
              'Fixing retrospective job to handle leap years, like 2020.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'fe4f12348e6d5737ddf11e33d8537b468a9649f7',
              },
            ],
          },
        ],
      },
      {
        date: '2020-02-26',
        dateEntries: [
          {
            description: 'Add unique identifier for web lookups.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '91180ead7370cf964e50d5af0f72d04b22612d94',
              },
              {
                project: 'hows_my_driving',
                sha: '166bd868a3e42df72a6a4ae8af2654a56f54896a',
              },
            ],
          },
        ],
      },
      {
        date: '2020-02-24',
        dateEntries: [
          {
            description:
              'Only sum lookups that should count towards frequency in frequency count.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '431323029b0bc179aa42786c000173d4ee44987f',
              },
            ],
          },
        ],
      },
      {
        date: '2020-02-23',
        dateEntries: [
          {
            description:
              'Fix campaign hashtag lookup: tuple had not yet been replaced with queried class instance.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '60b2ba4b26947b2013640042af6f58ae5d026607',
              },
            ],
          },
        ],
      },
      {
        date: '2020-02-11',
        dateEntries: [
          {
            description:
              'Fix issue where vehicle queried repeatedly was not identified as a prior lookup.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '5feb2cb5a17d866a932ef90d767535675a315872',
              },
            ],
          },
        ],
      },
      {
        date: '2020-02-08',
        dateEntries: [
          {
            description:
              'Decamelizing keys in request until api supports POST requests.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'b418586722e7e32ec01a2411b7498f950e8f2bca',
              },
            ],
          },
        ],
      },
      {
        date: '2020-02-04',
        dateEntries: [
          {
            description: 'Remove plate types from vehicle hashtag.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '904e94b7ab48c38dcbd6c4e51f64534d819ca5c5',
              },
            ],
          },
          {
            description: "Fix 'tickets since last lookup' label.",
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'e9b30cb86ea8bd214e9dd3845e45d494435a2e04',
              },
            ],
          },
        ],
      },
      {
        date: '2020-01-20',
        dateEntries: [
          {
            description: 'Fixing violation code mismatches.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'cc5249189e87423b9964daf460ce5a80f576913b',
              },
            ],
          },
        ],
      },
      {
        date: '2020-01-19',
        dateEntries: [
          {
            description: 'Updating api endpoints for fiscal year databases.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '4f84f9bede89c08fa615bc67fbe1fb18af3dcfb3',
              },
            ],
          },
        ],
      },
      {
        date: '2020-01-17',
        dateEntries: [
          {
            description: 'Refactor to Typescript.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'ff7be3b3045efb8700e7363ca85063d46fb30703',
              },
            ],
          },
        ],
      },
      {
        date: '2020-01-16',
        dateEntries: [
          {
            description:
              "Remove underscores in 'Staten_Island' and update retrospective job to use max camera streak instead of max camera streak *prior to lookup*.",
            commits: [
              {
                project: 'hows_my_driving',
                sha: '8c70948f60596a1895403663b708d64efdcbfd94',
              },
            ],
          },
        ],
      },
      {
        date: '2020-01-15',
        dateEntries: [
          {
            description:
              "Fixing lookup frequency to exclude queries that shouldn't count towards the total.",
            commits: [
              {
                project: 'hows_my_driving',
                sha: '1a94d7fd0796bba23dceb697de5f534d11368b88',
              },
            ],
          },
        ],
      },
      {
        date: '2020-01-11',
        dateEntries: [
          {
            description: 'Update reckless driver retrospective copy.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'abd064937aecd9ff58af651bcd8833eb9c99061f',
              },
              {
                project: 'hows_my_driving',
                sha: '5e472067cf86cc1328fef80381bc574bbd273f1f',
              },
            ],
          },
        ],
      },
      {
        date: '2020-01-05',
        dateEntries: [
          {
            description: 'Update reckless driver retrospective job.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '8469e546ea307d52dbdd2e52f091c35c99d80730',
              },
              {
                project: 'hows_my_driving',
                sha: 'e3e005cc739195f8c1638ed62a974a0c7049b9cc',
              },
              {
                project: 'hows_my_driving',
                sha: 'db5018486f4834de57917e65bfae150a2c941f75',
              },
              {
                project: 'hows_my_driving',
                sha: '090446f9f3563bca007cb498dc6fb0a3e9d9d0b6',
              },
              {
                project: 'hows_my_driving',
                sha: 'd36eaef9b427535aead6aafc6a5758afd0fa4286',
              },
            ],
          },
          {
            description: 'Fix camera streak data formatting.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '295d34544aafb61b3afcd44f98716d16fabf2fcb',
              },
            ],
          },
          {
            description:
              'Fixing previous lookup. New lookups were stepping on themselves.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '3dc50bd7c91d69134db3d1fe8883ff4109064a06',
              },
            ],
          },
        ],
      },
      {
        date: '2020-01-04',
        dateEntries: [
          {
            description: 'Adding script to backfill camera violations.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '07ce9329e472b0d75ce3f3b1a22b55e3753d1653',
              },
            ],
          },
          {
            description:
              'Marking unsigned integers as such in model definition.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'b0f2c5fc2fab78a1e2c8e33a0b246ba6035c1b40',
              },
            ],
          },
          {
            description:
              'Adding script to calculate camera violations for previous lookups.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '6efcb05d0a2a2f155b6a52b90e026dfe752c3453',
              },
            ],
          },
        ],
      },
      {
        date: '2020-01-02',
        dateEntries: [
          {
            description:
              'Fixing previous lookup query to return most recent query for the vehicle.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'f5c8911cc5125dd3bab3dc378987aae845902530',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    year: '2019',
    yearEntries: [
      {
        date: '2019-12-28',
        dateEntries: [
          {
            description: 'Ensure vehicle is looked up once per request.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '8a39f1f77b8546157d72a00e35ddf8f629f5f44e',
              },
            ],
          },
          {
            description:
              'Fix frequency for plate lookups: was double incrementing.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'eb5c297d3d391a72be26b184f9b243838240e57f',
              },
            ],
          },
          {
            description: 'Prevent more than one error response per event.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'd5be0ba0c2e724edce45016c25e024500c682bc2',
              },
            ],
          },
          {
            description:
              'Add job to check up on previously queried reckless drivers',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'd5be0ba0c2e724edce45016c25e024500c682bc2',
              },
            ],
          },
          {
            description:
              'Update failed events to successful on successful retry.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '81ea0043c21d369eb82bebb230d9f25a26edbf80',
              },
            ],
          },
          {
            description:
              'Enable ability to retry failed events and to detect duplicate events.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'bc9235984ec8f28f66a7512e9c6e134aa39148c1',
              },
            ],
          },
          {
            description: 'Fixing lookup of yellow cabs.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'bc9235984ec8f28f66a7512e9c6e134aa39148c1',
              },
            ],
          },
        ],
      },
      {
        date: '2019-12-26',
        dateEntries: [
          {
            description: 'Upgrade tweepy version to 3.8.0',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '4c06a263c97facbbe14e88fea94e98a0a4c11f69',
              },
            ],
          },
          {
            description:
              'Refining fine summary string to specify how many vehicles have received fines.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'b63a717e738b1d73b38f08088bb856e1979d2ef3',
              },
            ],
          },
          {
            description:
              'Fix error in counting violations in open data service due to case-sensitivity.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'e7e9f40eceb1201735e5f0968aa780ba6ca8d2c5',
              },
            ],
          },
        ],
      },
      {
        date: '2019-12-25',
        dateEntries: [
          {
            description:
              'Introduce sqlalchemy instead of manual query executions.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'cb5f797b8072ea90a781d6b45f13f1031638227f',
              },
            ],
          },
        ],
      },
      {
        date: '2019-08-26',
        dateEntries: [
          {
            description: 'Remove stale 2018 fiscal year endpoint.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '726c839227aa0eea60f2ab4fcf97d02a109b4bd0',
              },
            ],
          },
          {
            description:
              'Update fiscal year endpoints to include new endpoints for FYs 2017, 2018, and 2019. Adding 2020 endpoint as well.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '1bac00e2124367fee946ef56e8dd8f3e6fd52dc5',
              },
            ],
          },
          {
            description:
              'Add support for violation codes 1-9 missing leading zeros.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'c7135c21042f41f9090ae9d984fd6ce7052cbc3e',
              },
            ],
          },
        ],
      },
      {
        date: '2019-08-25',
        dateEntries: [
          {
            description:
              'Update fiscal year endpoints to include new endpoints for FYs 2017, 2018, and 2019. Adding FY 2020 endpoint as well.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '1bac00e2124367fee946ef56e8dd8f3e6fd52dc5',
              },
            ],
          },
        ],
      },
      {
        date: '2019-08-01',
        dateEntries: [
          {
            description:
              'Adding feature to link to previous tweet if one exists.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '40a4b5027be6c15eceda32c2e7d4c9dd0fec51bf',
              },
              {
                project: 'hows_my_driving',
                sha: '36d04a6d277e69cd1f8c1d056966e04a1ef3c4b9',
              },
            ],
          },
        ],
      },
      {
        date: '2019-07-24',
        dateEntries: [
          {
            description:
              'Fix incorrect number of tickets saved to database on plate lookup.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'a537bd7dae233860129c6471932f4889ab77c626',
              },
            ],
          },
        ],
      },
      {
        date: '2019-06-26',
        dateEntries: [
          {
            description: 'Fixing bug in state detection for legacy logic.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '880528f149f7ce647ab452bf7b77f25bf8dd3e08',
              },
            ],
          },
          {
            description: 'Fixing lookups with plate types.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'd7e4725140c1073e2780ad468d60bc6c930f3cf5',
              },
            ],
          },
        ],
      },
      {
        date: '2019-03-18',
        dateEntries: [
          {
            description: 'Only update events when we find some',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '63cd1c6f811b06fa9e95c99d08ae7924237bb34f',
              },
            ],
          },
          {
            description:
              'Update response_begun to be when events are retrieved from the database, not when iterated upon to prevent duplicate responses should full iteration take longer than the interval.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '6f85a023d1fe2b61475149e9e2c891954d0a0937',
              },
            ],
          },
        ],
      },
      {
        date: '2019-02-16',
        dateEntries: [
          {
            description:
              "NYC Open Data portal changed the 'Medallion Vehicles - Authorized' endpoint without notice... Updating.",
            commits: [
              {
                project: 'hows_my_driving',
                sha: '98da59985c3a059ab85c91704ca99bd0b71802b0',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    year: '2018',
    yearEntries: [
      {
        date: '2018-12-29',
        dateEntries: [
          {
            description:
              'Fixing some issues with overlapping regex matches. Adding Nunavit as a plate abbreviation.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '29d6517509cd0fb26961dc4b29e19655f98a376a',
              },
            ],
          },
        ],
      },
      {
        date: '2018-12-19',
        dateEntries: [
          {
            description: 'Add ability to look up with no plate type.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'e89aa8a27ef49a6a11a2705fcee897c09c4aa9be',
              },
            ],
          },
          {
            description:
              'Need to encode the plate to handle special characters in the URI.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '0cab5286156ee7424014421e77ce68fd95bd1881',
              },
            ],
          },
          {
            description:
              'Must url-encode plate to ensure hash does not prevent server response by terminating URI.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '8746136452a67793a95d5c97cb0b8afac15719e0',
              },
            ],
          },
        ],
      },
      {
        date: '2018-11-28',
        dateEntries: [
          {
            description: "Don't try to parse date when it's not available.",
            commits: [
              {
                project: 'hows_my_driving',
                sha: '405f6e126bf8ee412b1e19d3e1b6fd540ae4e28b',
              },
            ],
          },
        ],
      },
      {
        date: '2018-11-27',
        dateEntries: [
          {
            description: 'Fix undefined error for media tweets.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '38580ee4a6500bd6c70c8adc64f84dff047fd4a1',
              },
            ],
          },
        ],
      },
      {
        date: '2018-11-25',
        dateEntries: [
          {
            description: 'Add code to support OpenALPR.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '35df7fd967db89a8317c24ba1d8b7fa075258e2a',
              },
              {
                project: 'hows_my_driving_ny_api',
                sha: 'ec06a0d664c82c4c9e8c8799e54c6603ff9b7cf5',
              },
            ],
          },
          {
            description:
              'Implement function to reverse engineer the violation code from description.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '9a4274d9f36611d748024e86a88ddf7870bd59a0',
              },
            ],
          },
          {
            description: 'Fixed errant camelCase on json return value.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'a8f88cdf9877bf2a322dfc1222a7d5b9bafb79d7',
              },
            ],
          },
        ],
      },
      {
        date: '2018-11-20',
        dateEntries: [
          {
            description: 'Fix bug in json vehicle data response.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'e5f904f539863713074e6b36e4ade7452ab240d6',
              },
            ],
          },
          {
            description:
              "API now accepts filter fields, ex: 'api.howsmydrivingny.nyc/api/v1?plate=ABC1234:NY&fields=camera_streak_data(max_streak),fines(total_fined),plate,state,violations_count'",
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'aa0d9783fed7e62932c77f906593c7dc3bdc75bb',
              },
            ],
          },
        ],
      },
      {
        date: '2018-11-19',
        dateEntries: [
          {
            description:
              'Remove whitespace between plate types since it was causing different query results due to string mismatch.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '9099b3ba11a327de596bdb195e2f71da6e144a24',
              },
            ],
          },
          {
            description: 'Update website to handle new API format.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '19afabf6d973dfd60e8b4cfd57e61311f453763b',
              },
            ],
          },
          {
            description: 'Fix call to retrieve vehicle API requests.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'f08ae213bd9a83aed846a0bc2197a345cf5a51a0',
              },
            ],
          },
          {
            description: 'Add API support for multiple vehicles.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '0862fb204470a57ff1134077b85f43e497ed708f',
              },
            ],
          },
          {
            description: 'Fix bug where no plate types raises error.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'bc58d92139b1b70ab1dfc61a4190eb0aad705bc2',
              },
            ],
          },
          {
            description:
              'Now supports state, plate, and plate types all in one string <state>:<plate>:<plate_types> in any order.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '44605d364ec1b6309f156e2cf570335c77101b18',
              },
            ],
          },
        ],
      },
      {
        date: '2018-11-18',
        dateEntries: [
          {
            description: 'Update fines to use new API format.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '24aeb04a0fbf9bbbdfe53236ef7dcce3db579d4d',
              },
            ],
          },
          {
            description:
              'Add null check on plate_types for insert into db to avoid inserting empty string.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '2516d65fc41e985cac649b25b6e7f5b9ac5d9f17',
              },
            ],
          },
          {
            description:
              'Update API to handle plate_types instead of plate_type to make it clearer to clients. Queries now base frequency off of plate_types, too, if supplied.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'd716b6166cacd71a571f841bbd2d11f5399f5b4c',
              },
            ],
          },
          {
            description: 'Improve violation location data query.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'b929d67ea407e4608166b403d58e6e5d06438c0f',
              },
            ],
          },
          {
            description: 'Remove old api attributes.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '76a756b85b7aaa2df337af184b35121fd1bb1ef1',
              },
            ],
          },
        ],
      },
      {
        date: '2018-11-17',
        dateEntries: [
          {
            description: 'Rename returned json attributes.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '3cdca86fd5fa99f6c90161dd34dc392b6d642b95',
              },
              {
                project: 'hows_my_driving_ny_api',
                sha: 'b1bf4ef3454eb4740e7a67125fd8a5afa91851d7',
              },
            ],
          },
          {
            description:
              'Add ability to trigger lookups from external sources.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '5a8fb0a7068771fb7e11eaa66577c18d1dc7ab02',
              },
            ],
          },
        ],
      },
      {
        date: '2018-11-16',
        dateEntries: [
          {
            description:
              'Revert mistaken twitter events cycle interval from 3000s -> 3s.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '7ba1366a5ec6b906f193ccae142f8d8358cf00bc',
              },
            ],
          },
        ],
      },
      {
        date: '2018-10-23',
        dateEntries: [
          {
            description:
              'Fix database connection usage to prevent race condition with single connection where connection was closed as it was being used.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'e50f611628841382104bf5fe5b553576a2d10317',
              },
            ],
          },
        ],
      },
      {
        date: '2018-10-18',
        dateEntries: [
          {
            description: 'Adding averages and medians to daily summaries.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '3a4e131f7995173002b86aaa91f84f207fd88597',
              },
            ],
          },
        ],
      },
      {
        date: '2018-10-17',
        dateEntries: [
          {
            description:
              'Fix incorrect place (Nth) numbers for featured plates.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '50bebe1106605ae215067f45ceb53c4c888dc494',
              },
            ],
          },
        ],
      },
      {
        date: '2018-10-16',
        dateEntries: [
          {
            description: 'Do not show blank fine data.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '8943779ede8710b2e747b7b2799f02541ed0beb5',
              },
            ],
          },
          {
            description: 'Differentiate between fines and reductions.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '487d80b830a7e2ed95f0103dcbcde69eb8eab1d4',
              },
            ],
          },
        ],
      },
      {
        date: '2018-10-12',
        dateEntries: [
          {
            description:
              'Adding summary tweet to precede multiple vehicle lookups.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '246e7b5f2b9f3b88b5cdeb733554c9db7d435ebb',
              },
              {
                project: 'hows_my_driving',
                sha: '7792beb4c1421f580e47983dc8a1cb2938bf2d74',
              },
              {
                project: 'hows_my_driving',
                sha: 'fb454b17f15d82de1733c629cc17fa3f61142672',
              },
            ],
          },
        ],
      },
      {
        date: '2018-10-10',
        dateEntries: [
          {
            description:
              'Add FY 2018 endpoint. Looks like DoITT moved it out from under us to 2019 and gave 2018 a new url.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '668d02f18ba0befe70a2d7995866bd35383e3fdd',
              },
              {
                project: 'hows_my_driving',
                sha: '4e0af3e31bd42199a31fc505271d197ba79fd7e2',
              },
            ],
          },
        ],
      },
      {
        date: '2018-10-08',
        dateEntries: [
          {
            description:
              "Truncate user mentions to prevent error. It's not the most important thing anyway.",
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '5c78575ceb15da29b1cc61dc3992b4c0c3e6c30f',
              },
            ],
          },
          {
            description:
              'Only include user mentions that appear in the text in replies.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '2f36f13ecd10be5681cbfd055fbb168d5dbe77c0',
              },
            ],
          },
        ],
      },
      {
        date: '2018-10-06',
        dateEntries: [
          {
            description:
              'Set responded_to to true automatically for api and web lookups.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '15792f3241d5a2a265ab310b26f4178170638ea0',
              },
            ],
          },
          {
            description: 'Add daily featured plate tweets.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '90dde8b4f1e15f6d0eda6a2e19ef5a84eca28e47',
              },
              {
                project: 'hows_my_driving',
                sha: '071e4bf2656388c18dfbb5d0508a104565611baa',
              },
              {
                project: 'hows_my_driving',
                sha: 'e1a400b9ee6e84ae4734f8afb3145c230948d054',
              },
              {
                project: 'hows_my_driving',
                sha: '5ac40b3eec576132400e682ec6d9624692b4322f',
              },
              {
                project: 'hows_my_driving',
                sha: 'fe5cb9789007fa5babeed18384231946bef4834e',
              },
            ],
          },
        ],
      },
      {
        date: '2018-10-05',
        dateEntries: [
          {
            description:
              'Record plate types now to ensure more accurate comparisons with historical queries.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '16b6833b51d8c8ffb4f4097479e51cf7cf54a117',
              },
            ],
          },
          {
            description: 'Minor update to JSON fields for returned fine data.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '19b21157ed8cf28fc1b44f35fbd9f25e99c1811f',
              },
            ],
          },
          {
            description:
              'Prevent duplicate responses when response has begun but has not yet finished.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '98d38c774d546e932e84c4e25d999f2041f15639',
              },
            ],
          },
          {
            description: 'Do not add to frequency if plate_types differ.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '305e6496204b2ed5e38fcdf9c80231589fb2e0e1',
              },
            ],
          },
          {
            description: 'Add fine data to responses.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '09d0906c06eb0fbb8b02f531e392f7fd942b0858',
              },
              {
                project: 'hows_my_driving',
                sha: 'f137925e1cd471440d3d0e5a513a4e77ab8bd5dc',
              },
              {
                project: 'hows_my_driving',
                sha: 'c162f5d9ec245944e70e88330ec066f6fd1f5a59',
              },
              {
                project: 'hows_my_driving',
                sha: 'e02fa69659a0de2070e5a8f7d98a92a6a1ca5e81',
              },
            ],
          },
          {
            description: 'Make plate types uppercase.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'b1636f16af96d84af0e4fbf95898ece6093f43ff',
              },
            ],
          },
          {
            description:
              'Fix bug where I was incorrectly inserting foreign key rather than twitter message id into plate_lookups.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'e128465101342da5f9b7ea45d7a98698b0cf928e',
              },
            ],
          },
          {
            description: 'Response messages should be standardized.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'b1636f16af96d84af0e4fbf95898ece6093f43ff',
              },
              {
                project: 'hows_my_driving',
                sha: '56e94f8cbd38d0f393dbaae12c51892f4e41e0a2',
              },
              {
                project: 'hows_my_driving',
                sha: '82e3148b64575855924216127601f65fa35c1385',
              },
              {
                project: 'hows_my_driving',
                sha: '070334faa54a5d00e77b1d4d1b5b4967974acf52',
              },
              {
                project: 'hows_my_driving',
                sha: 'e550e533e733169af244e724471002ef07a73d57',
              },
              {
                project: 'hows_my_driving',
                sha: '58765b7bd7bfc3903bc694504f670edd65d5e5b7',
              },
              {
                project: 'hows_my_driving',
                sha: '96f761729200840b53a109ea89a9c436767e1e89',
              },
            ],
          },
          {
            description: 'Adding support for querying by plate type.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '844a7bab02982ded2e3485cccf9efc60d4d99198',
              },
              {
                project: 'hows_my_driving',
                sha: 'beedac65ea94912d947f51baccdfd22c23bf521c',
              },
            ],
          },
        ],
      },
      {
        date: '2018-09-25',
        dateEntries: [
          {
            description: "Don't break on missing user mentions.",
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'e5605439cd9f391327de2c54a61bdf6f12726901',
              },
            ],
          },
          {
            description:
              "Javascript automatically truncates '..._id' fields that are BIGINTs.",
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '25174b345d9f7680e25839a0651577fac56e8eaa',
              },
            ],
          },
          {
            description: 'Parse user mentions from Twitter events.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'bdca9171b4f01e730e11a2e702174336194937f9',
              },
            ],
          },
          {
            description:
              'Need to use extended tweet text when more than 140 characters.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'f7b18b1fac789427b1c37478e37285a2a8f998e3',
              },
            ],
          },
          {
            description: "Don't respond to retweets.",
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '5ce8c67bc626270784fea57ecf2d77d912a661fb',
              },
            ],
          },
          {
            description:
              'Only use Twitter webhook event if expected signature validates.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '70067caec8e446c3252beb51e0d886b271a0bfff',
              },
            ],
          },
          {
            description: 'Add account activity api material.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '6cc675e823348b9c3770508bbb8d74c8dd1c0fff',
              },
              {
                project: 'hows_my_driving_ny_api',
                sha: '8913980f20ca4e87a8ae354fa8a6d9384c4d1b7f',
              },
            ],
          },
          {
            description:
              'Fix bug where we were incorrectly ignoring Open Parking and Camera Violations results with no description when there was no matching FY violation.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '19108829f326a97d2f12d49f2241867c62f0f81a',
              },
            ],
          },
          {
            description:
              'Replace Twitter Search API and Direct Message API with Activity Events API. Keep former as backups in case Activity Events API fails.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'b4566ed370c82e8b0eb9dc1a7e58549313145113',
              },
              {
                project: 'hows_my_driving',
                sha: '5c2de93267f0d8c2b3ff37ad5e9eaff3c5939e6a',
              },
            ],
          },
        ],
      },
      {
        date: '2018-09-22',
        dateEntries: [
          {
            description: 'Update Twitter CRC response code',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'e7f6ca8b404a2c4974478e1cec66063070a1c944',
              },
            ],
          },
          {
            description: 'Add basic support for Twitter POST requests.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '20c3350150b5d0adf76cbdab08e7c8c2d6e52966',
              },
            ],
          },
        ],
      },
      {
        date: '2018-09-21',
        dateEntries: [
          {
            description:
              'Slight code refactoring for responding to tweets and DMs, including upping response interval to match new rate limits.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '621d2ee27aaf14232238e6d0a1dc598abea68589',
              },
              {
                project: 'hows_my_driving',
                sha: 'ea88a21614631a622acfb6b8e414dabf17c72809',
              },
            ],
          },
        ],
      },
      {
        date: '2018-09-20',
        dateEntries: [
          {
            description: 'Add support for more plate types.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '2732395afda66a32eae65c79c8ddb1274fe1cea4',
              },
            ],
          },
          {
            description: 'Add Twitter webhook response challenge code.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '66e4f9ccf23030f91f575cfe5552fdc849cc4080',
              },
            ],
          },
          {
            description:
              "It's `plate_type` for fiscal year databases, not `license_type`.",
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '8902ceaa9121b92a04e6532920c48912ccf3d58b',
              },
            ],
          },
          {
            description: 'Change license type logic for fiscal year databases.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '1c1a537632048a64505bc17243fa95e262ce0e71',
              },
            ],
          },
          {
            description: 'URL-encode quotes to prevent issues with Socrata.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '10b728aacc4a2a77d53f187f5021bd74ecf1ce6c',
              },
            ],
          },
          {
            description:
              'Update API to accept multiple license plate types for a query.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'b2a6c200ec7148e19c95162e54de07dbd74d9db2',
              },
            ],
          },
          {
            description:
              'Twitter now only returns most recent 50 messages, with no way to filter by time...',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '7c674b6172422a73c7deda029fa93b690790ad67',
              },
            ],
          },
          {
            description:
              'Update DM response code to not respond to own sent messages.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '9e1bab5b837afa92c1074f80d12e4d64f92bac33',
              },
            ],
          },
        ],
      },
      {
        date: '2018-09-19',
        dateEntries: [
          {
            description:
              'Direct message api changes required changes to tweepy and to HowsMyDrivingNY.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '15be66838d91546bfe75463f065f16f4f60cf7d0',
              },
              {
                project: 'hows_my_driving',
                sha: '4abf8ecd7160554196b11bb9554d14552abe6b55',
              },
              {
                project: 'hows_my_driving',
                sha: '1268b8ae05cd9e22a8ecbf4743d20a7d586b90d8',
              },
            ],
          },
        ],
      },
      {
        date: '2018-09-02',
        dateEntries: [
          {
            description:
              'Decreasing response time from every 90 seconds to every 40 seconds.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '98e6ee4af81bcf8455baaaa9e65e71b63f136a7f',
              },
            ],
          },
        ],
      },
      {
        date: '2018-08-27',
        dateEntries: [
          {
            description: 'Respond every 90 seconds, not every 9000 secnods.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '90638db1016d5f46ca2d0c0e2bdbd43a7327cc82',
              },
            ],
          },
        ],
      },
      {
        date: '2018-08-25',
        dateEntries: [
          {
            description:
              'Due to retirement of streaming API, script had to be modified to fetch from APIs every 90 seconds.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '1eda23f2955434e7beedb48db2f0bd4f548eb587',
              },
            ],
          },
        ],
      },
      {
        date: '2018-08-18',
        dateEntries: [
          {
            description:
              'Fix error where un-geocoded places would cause process to hang.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'c48a899cf7201fba9b4e54a6c46bb7947a574e00',
              },
            ],
          },
        ],
      },
      {
        date: '2018-08-08',
        dateEntries: [
          {
            description:
              'Add data if vehicles are boot eligible and make sorting violations easier.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'f5a2fff3cd49f23e723ea09ba5699cd99c68ee5e',
              },
            ],
          },
          {
            description:
              'Count current lookup towards frequency and add streak data to JSON response',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '9701b3585865d52ab8a96cd24a61a33c71a7aff5',
              },
            ],
          },
          {
            description:
              "Record lookups even if we haven't seen this vehicle before.",
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'c39d3d8aa9137b75ff90c23f8fa07ca91c86c64d',
              },
            ],
          },
        ],
      },
      {
        date: '2018-08-07',
        dateEntries: [
          {
            description:
              'Update logic for combining intersecting_street and street_name into a location.',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: '566c025b5dcbeb4518d19f75ad6676e3009e3d21',
              },
            ],
          },
        ],
      },
      {
        date: '2018-08-06',
        dateEntries: [
          {
            description: 'Make UI less table-y.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: 'cb8123408fd498d63a4125558b23191a7de12da5',
              },
            ],
          },
        ],
      },
      {
        date: '2018-08-04',
        dateEntries: [
          {
            description:
              'Fix error where dollar amounts were compared as strings and not floats.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '34abd0791d77b84365cc6e5f8223995388e764b0',
              },
            ],
          },
          {
            description: 'Change API requests to use api.howsmydrivingny.nyc',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '99aca29836d0b3f0df96b50ba996d217472f772f',
              },
            ],
          },
          {
            description: 'Initial commit of web project.',
            commits: [
              {
                project: 'hows_my_driving_ny_web',
                sha: '7e05b1778d10ff6bb72aa71a8f1d2bdad0f77b09',
              },
            ],
          },
          {
            description: 'Initial commit of API: v1',
            commits: [
              {
                project: 'hows_my_driving_ny_api',
                sha: 'e6b06e555da1f8d895df30c7fe4332e1e4f7e250',
              },
            ],
          },
        ],
      },
      {
        date: '2018-07-26',
        dateEntries: [
          {
            description:
              'Fix copy and add speed camera data to every response.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'a9f5a699b7c68a21190526f156a622e91ce04afa',
              },
            ],
          },
        ],
      },
      {
        date: '2018-07-25',
        dateEntries: [
          {
            description: 'Let everyone know about the speed camera bill.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '4a4e5517b0e95242a5c6f263883ea0c032a83eae',
              },
            ],
          },
        ],
      },
      {
        date: '2018-07-17',
        dateEntries: [
          {
            description: 'Fix campaign query SQL.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'aff3136682d3f409050db9b9c89d2e93dfaa7b76',
              },
            ],
          },
        ],
      },
      {
        date: '2018-06-24',
        dateEntries: [
          {
            description: 'Update camera shutoff date from June 30 to July 25.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '2d3fb9cc62bb3cca69b2874ae4051051bc447075',
              },
            ],
          },
        ],
      },
      {
        date: '2018-06-23',
        dateEntries: [
          {
            description: 'Fix error in daily summary job.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'cad7112e296270be763ec7410555f3ff5242b709',
              },
            ],
          },
        ],
      },
      {
        date: '2018-06-22',
        dateEntries: [
          {
            description: 'Update incorrect Quebec postal abbreviation.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '125c949baddc01029affcf521cae884988b444d0',
              },
            ],
          },
          {
            description:
              'Fix bug where we were reporting error for lookups with no tickets.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '8ee2bfd092d6672c8b8d2447690cc37bf2e88939',
              },
            ],
          },
          {
            description: 'Changed daily summary job to generate two tweets.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '59f98ef59a29a42a6937ff8a9ab132bcfc159dd8',
              },
            ],
          },
          {
            description:
              'On server error, do not throw generic error response, but ask user to retry.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'a32b91fe93a9ac345c280de0df70cdd9502ca7b4',
              },
            ],
          },
        ],
      },
      {
        date: '2018-06-19',
        dateEntries: [
          {
            description:
              'Fix error on camera data streak calculation for leap year.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'ca56882d6ea3efe8014577f93a3ca1083f336f53',
              },
            ],
          },
        ],
      },
      {
        date: '2018-06-17',
        dateEntries: [
          {
            description: 'Fix formatting of speed camera text.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '568ec61fa42a64df2a3e0a67747d37444618f189',
              },
            ],
          },
          {
            description: 'Let people know what the threshold for booting is.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '0ec1be4c2a0e0d9569a234695d7e8439da4dc0b0',
              },
            ],
          },
          {
            description: 'Fix error in NY Senate speed camerea bill number.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '7b0dcd59c1971e5a79447ca93eff6cd883cf7c1c',
              },
            ],
          },
        ],
      },
      {
        date: '2018-06-16',
        dateEntries: [
          {
            description:
              "Call Senator Felder's office to demand speed camera reauthorization.",
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'f19b896190e85a44364f5c6621f65261d8d04b35',
              },
            ],
          },
        ],
      },
      {
        date: '2018-06-14',
        dateEntries: [
          {
            description: 'Make Open Data API requests asynchronous.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '86938ba935150099559897081a8a1a564fc5b06a',
              },
            ],
          },
        ],
      },
      {
        date: '2018-06-12',
        dateEntries: [
          {
            description:
              "Add # of drivers who would be booted under CM Lander's bill to daily summary.",
            commits: [
              {
                project: 'hows_my_driving',
                sha: '2fcbf7c7a7799cedab5f1cdf7fe4391eccc3630e',
              },
            ],
          },
          {
            description: 'Add retry capability for Open Data API requests.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '2b1437b4dbc0a50bcc356222db4e40576b8b2c1e',
              },
            ],
          },
        ],
      },
      {
        date: '2018-06-06',
        dateEntries: [
          {
            description:
              'Strip non-alphanumeric and hashtag characters from string parts.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'df1fcf84795937b9afbc2fcdbd63d80783c1a74e',
              },
            ],
          },
          {
            description:
              'Only tweet camera violations if streak more than four.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '2bda74456df290776fadd27c3fcbdfaa6895458c',
              },
            ],
          },
          {
            description:
              'Format camera streak data to be U.S.-formatted date strings.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '9fc269863b417d4493ade747057d9cc8b038597a',
              },
            ],
          },
          {
            description:
              'Announce if vehicles could have been impounded due to camera violations.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'b1f12fc922ad43fa0f5ee83808b55ffa1fb47a5a',
              },
            ],
          },
        ],
      },
      {
        date: '2018-06-04',
        dateEntries: [
          {
            description:
              "Don't say it's a valid plate unless there is also a valid plate.",
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'aeb655dfaac00a0e15e9cfd180bb92367b2216c8',
              },
            ],
          },
        ],
      },
      {
        date: '2018-06-02',
        dateEntries: [
          {
            description:
              "Don't add in default 'No Info Available' for borough and violation type until violations from different databases are merged.",
            commits: [
              {
                project: 'hows_my_driving',
                sha: '9326351d522536ff6a0442b40492a0843a302fcc',
              },
            ],
          },
          {
            description:
              'Add ability to look up violation description by violation code.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'c024f31d5813c2b30d2c04b19bf789810b916ad7',
              },
            ],
          },
          {
            description:
              'Fixed error where fiscal year databases overwrite violation descriptions coming from the Open Parking and Camera Violations database.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'c024f31d5813c2b30d2c04b19bf789810b916ad7',
              },
            ],
          },
        ],
      },
      {
        date: '2018-06-01',
        dateEntries: [
          {
            description:
              'Add Google Places support for finding borough from addresses.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '8e6508aaf3421400f7cf6e7a420cb45d4cceb72a',
              },
            ],
          },
        ],
      },
      {
        date: '2018-05-29',
        dateEntries: [
          {
            description: 'Adding more support for finding borough.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '0f3927c595072d96b51e082319743b5a9300eec6',
              },
              {
                project: 'hows_my_driving',
                sha: '447fc99664ffa2a2e8461a1aca0443ee6751bb37',
              },
            ],
          },
        ],
      },
      {
        date: '2018-05-28',
        dateEntries: [
          {
            description:
              'Add summary of violations by borough to query result.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '5108bab23e7bcb79b2d4ba0a27d296ba7b134d48',
              },
            ],
          },
        ],
      },
      {
        date: '2018-05-27',
        dateEntries: [
          {
            description: 'Add summary of violations by year to query result.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '126b673959bdb4b9099072575b9c5c75033626e9',
              },
            ],
          },
        ],
      },
      {
        date: '2018-05-25',
        dateEntries: [
          {
            description:
              'Add error response when user fails to supply a state.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'afb741e3e742b68572ae3337a40fe08e6d55e801',
              },
            ],
          },
          {
            description: 'Improve legacy plate matching logic.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'c779d253959cbd90565f652f3ae5e3293c3420e9',
              },
            ],
          },
          {
            description: 'Prevent lookups on direct messages sent by us.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'ae071f917e967d9c490de48cb7244bc1927cf16b',
              },
              {
                project: 'hows_my_driving',
                sha: 'e7258bb5e88e5eda1e55f0765f3ba77fa768796a',
              },
            ],
          },
          {
            description:
              "Don't include 'state:' or 'plate:' as part of new format plate detection.",
            commits: [
              {
                project: 'hows_my_driving',
                sha: '36245a8be5dd566d01e3a152cc1cb31d5b76f9a9',
              },
              {
                project: 'hows_my_driving',
                sha: '9d3c943af2183d83d2c45b1c28493962593ca450',
              },
            ],
          },
        ],
      },
      {
        date: '2018-05-24',
        dateEntries: [
          {
            description: 'Handle multiple plates by improving lookup format.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: 'db5f5e771795826d34ef35962f59f27901211e69',
              },
              {
                project: 'hows_my_driving',
                sha: '273a9467100488ce1b19dbd2d8ee0c1631a752a2',
              },
              {
                project: 'hows_my_driving',
                sha: 'aeae81d6bf485d86a8ef8349b710b8db0314fb79',
              },
              {
                project: 'hows_my_driving',
                sha: '3fac35f7de68372798a42abde0e1ba829e369e21',
              },
            ],
          },
        ],
      },
      {
        date: '2018-05-16',
        dateEntries: [
          {
            description:
              'Adding ability to query non-US plates and fixed typo on repeat queries.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '131d701608068fd56ebe3d501f86170c292cb5a2',
              },
              {
                project: 'hows_my_driving',
                sha: 'a22cd713ecf6d27b2c052738f210a0f7b3780fb0',
              },
            ],
          },
        ],
      },
      {
        date: '2018-05-07',
        dateEntries: [
          {
            description: 'Committing code to repo.',
            commits: [
              {
                project: 'hows_my_driving',
                sha: '01e529490d2fb6161a9f889fe95651c7fddebd05',
              },
            ],
          },
        ],
      },
    ],
  },
]

export default CHANGELOG_ENTRIES
