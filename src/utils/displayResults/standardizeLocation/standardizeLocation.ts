const PLACENAME_REGEX =
  /\s((?:st(?:\.|reet)?|dr(?:\.|ive)?|pl(?:\.|ace)?|(avenue (?![A-Za-z]))|(av (?![A-Za-z]))|(av. (?![A-Za-z]))|(ave (?![A-Za-z]))|(ave. (?![A-Za-z]))|av$|av\.$|ave$|ave\.$|avenue$|l(?:a)?n(?:e)?|rd|road|lane|drive|way|(court(?!\sSt(reet)?))|plaza|square|run|parkway|point|pike|square|driveway|trace|terrace|blvd|crescent))/i

const standardizeDisplayedLocation = (location: string): string => {
  let standardizedLocation = location

  const numberSuffixRegex = /(st|nd|rd|th)(st|rd|av(e)?)/gi
  standardizedLocation = standardizedLocation.replace(
    numberSuffixRegex,
    (_, x, y) => {
      return `${x} ${y.charAt(0).toUpperCase() + y.slice(1)}`
    },
  )

  // '1' -> '1st' regex
  const firstPrefixRegex = /(?<!1)(1)/g
  standardizedLocation = standardizedLocation.replace(
    new RegExp(firstPrefixRegex.source + PLACENAME_REGEX.source, 'ig'),
    '1st $2',
  )

  // '11' -> '11th' regex
  const eleventhPrefixRegex = /(11)\b/g
  standardizedLocation = standardizedLocation.replace(
    new RegExp(eleventhPrefixRegex.source + PLACENAME_REGEX.source, 'ig'),
    '11th $2',
  )

  // '2' -> '2nd' regex
  const secondPrefixRegex = /(?<!1)(2)/g
  standardizedLocation = standardizedLocation.replace(
    new RegExp(secondPrefixRegex.source + PLACENAME_REGEX.source, 'ig'),
    '2nd $2',
  )

  // '12' -> '12th' regex
  const twelfthPrefixRegex = /(12)\b/g
  standardizedLocation = standardizedLocation.replace(
    new RegExp(twelfthPrefixRegex.source + PLACENAME_REGEX.source, 'ig'),
    '12th $2',
  )

  // '3' -> '3rd' regex
  const thirdPrefixRegex = /(?<!1)(3)/g
  standardizedLocation = standardizedLocation.replace(
    new RegExp(thirdPrefixRegex.source + PLACENAME_REGEX.source, 'ig'),
    '3rd $2',
  )

  // '13' -> '13th' regex
  const thirteenthPrefixRegex = /(13)\b/g
  standardizedLocation = standardizedLocation.replace(
    new RegExp(thirteenthPrefixRegex.source + PLACENAME_REGEX.source, 'ig'),
    '13th $2',
  )

  // '4-9' -> '4th-9th' regex
  const remainderNumberPrefixRegex = /(\d)\b/g
  standardizedLocation = standardizedLocation.replace(
    new RegExp(
      remainderNumberPrefixRegex.source + PLACENAME_REGEX.source,
      'ig',
    ),
    '$1th $2',
  )

  // Remove (ENSW)-bound
  standardizedLocation = standardizedLocation.replace(/\(e\/b\)/g, '')
  standardizedLocation = standardizedLocation.replace(/\(n\/b\)/g, '')
  standardizedLocation = standardizedLocation.replace(/\(s\/b\)/g, '')
  standardizedLocation = standardizedLocation.replace(/\(w\/b\)/g, '')

  // Replace abbreviations: Avenue
  standardizedLocation = standardizedLocation.replace(/\bAv\./g, 'Avenue')
  standardizedLocation = standardizedLocation.replace(/\bAve\./g, 'Avenue')
  standardizedLocation = standardizedLocation.replace(/\bAv\b/g, 'Avenue')
  standardizedLocation = standardizedLocation.replace(/\bAve\b/g, 'Avenue')

  // Replace abbreviations: Boulevard
  standardizedLocation = standardizedLocation.replace(/\bBlv\b/g, 'Boulevard')
  standardizedLocation = standardizedLocation.replace(
    /\bBlvd\b\./g,
    'Boulevard',
  )
  standardizedLocation = standardizedLocation.replace(/\bBlvd\b/g, 'Boulevard')
  standardizedLocation = standardizedLocation.replace(/\bBv\./g, 'Boulevard')
  standardizedLocation = standardizedLocation.replace(/\bBv\b/g, 'Boulevard')

  // Replace abbreviations: Boulevard
  standardizedLocation = standardizedLocation.replace(/\bBrg\b/g, 'Bridge')

  // Replace abbreviations: Court
  standardizedLocation = standardizedLocation.replace(/\bCt\./g, 'Court')
  standardizedLocation = standardizedLocation.replace(/\bCt\b/g, 'Court')

  // Replace abbreviations: Drive
  standardizedLocation = standardizedLocation.replace(/\bDr\./g, 'Drive')
  standardizedLocation = standardizedLocation.replace(/\bDr\b/g, 'Drive')

  // Replace abbreviations: Expressway
  standardizedLocation = standardizedLocation.replace(
    /\bExpwy\b/g,
    'Expressway',
  )
  standardizedLocation = standardizedLocation.replace(
    /\bExpwy\b\./g,
    'Expressway',
  )

  // Replace abbreviations: Lane
  standardizedLocation = standardizedLocation.replace(/\bHwy\b/g, 'Highway')
  standardizedLocation = standardizedLocation.replace(/\bHwy\b\./g, 'Highway')

  // Replace abbreviations: Lane
  standardizedLocation = standardizedLocation.replace(/\bLn\b/g, 'Lane')
  standardizedLocation = standardizedLocation.replace(/\bLn\b\./g, 'Lane')

  // Replace abbreviations: Parkway
  standardizedLocation = standardizedLocation.replace(/\bPkwy\b/g, 'Parkway')
  standardizedLocation = standardizedLocation.replace(/\bPkwy\b\./g, 'Parkway')

  // Replace abbreviations: Place
  standardizedLocation = standardizedLocation.replace(/\bPl\b/g, 'Place')
  standardizedLocation = standardizedLocation.replace(/\bPl\b\./g, 'Place')

  // Replace abbreviations: Road
  standardizedLocation = standardizedLocation.replace(/\bRd\b/g, 'Road')
  standardizedLocation = standardizedLocation.replace(/\bRd\b\./g, 'Road')

  // Replace abbreviations: Street
  standardizedLocation = standardizedLocation.replace(/\bSt\b/g, 'Street')
  standardizedLocation = standardizedLocation.replace(/\bSt\b\./g, 'Street')

  // Replace abbreviations: Service
  standardizedLocation = standardizedLocation.replace(/\bSvc\b/g, 'Service')

  // Replace (front|rear)/of
  standardizedLocation = standardizedLocation.replace(
    /(F|f)\/O(f)?/gi,
    '$1ront of',
  )
  standardizedLocation = standardizedLocation.replace(
    /(R|r)\/O(f)?/gi,
    '$1ear of',
  )

  // Replace (ENSW)/of
  standardizedLocation = standardizedLocation.replace(
    /(W|w)\/O(f)?/gi,
    '$1est of',
  )
  standardizedLocation = standardizedLocation.replace(
    /(S|s)\/O(f)?/gi,
    '$1outh of',
  )
  standardizedLocation = standardizedLocation.replace(
    /(N|n)\/O(f)?/gi,
    '$1orth of',
  )
  standardizedLocation = standardizedLocation.replace(
    /(E|e)\/O(f)?/gi,
    '$1ast of',
  )

  // Replace Abbreviations: East
  standardizedLocation = standardizedLocation.replace(
    /(?<!Avenue )\b(E)\b(?!\/)/g,
    'East',
  )
  standardizedLocation = standardizedLocation.replace(
    /(?<!Avenue )\b(E)(\d+)/g,
    'East $2',
  )
  standardizedLocation = standardizedLocation.replace(/\bE\b\./g, 'East ')

  // Replace Abbreviations: North
  standardizedLocation = standardizedLocation.replace(
    /(?<!Avenue )\b(N)\b(?!\/)/g,
    'North',
  )
  standardizedLocation = standardizedLocation.replace(
    /(?<!Avenue )\b(N)(\d+)/g,
    'North $2',
  )
  standardizedLocation = standardizedLocation.replace(/\bN\b\./g, 'North ')

  // Replace Abbreviations: South
  standardizedLocation = standardizedLocation.replace(
    /(?<!Avenue )\b(S)\b(?!\/)/g,
    'South',
  )
  standardizedLocation = standardizedLocation.replace(
    /(?<!Avenue )\b(S)(\d+)/g,
    'South $2',
  )
  standardizedLocation = standardizedLocation.replace(/\bS\b\./g, 'South ')

  // Replace Abbreviations: West
  standardizedLocation = standardizedLocation.replace(
    /(?<!Avenue )\b(W)\b(?!\/)/g,
    'West',
  )
  standardizedLocation = standardizedLocation.replace(
    /(?<!Avenue )\b(W)(\d+)/g,
    'West $2',
  )
  standardizedLocation = standardizedLocation.replace(/\bW\b\./g, 'West ')

  // Replace Abbreviations: feet
  standardizedLocation = standardizedLocation.replace(/(\d)ft/g, '$1 feet')

  // Fix lowercased letters part of house number
  standardizedLocation = standardizedLocation.replace(/(\d[a-z]) /g, (x) =>
    x.toUpperCase(),
  )

  // Replace Abbreviations: at
  standardizedLocation = standardizedLocation.replace(/@/g, 'and')

  // Fix specific bad location strings
  standardizedLocation = applyStreetSpecificLocationFixes(standardizedLocation)

  return standardizedLocation
}

const standardizeLinkedSearchLocation = (location: string): string => {
  let standardizedLocation = standardizeDisplayedLocation(location)

  standardizedLocation = standardizedLocation.replace(
    /\s(?:\d)*\s*feet (east|north|south|west) of\s/gi,
    ' and ',
  )
  standardizedLocation = standardizedLocation.replace(
    /(east|north|south|west) side of\s/gi,
    '',
  )
  standardizedLocation = standardizedLocation.replace(
    /\s(east|north|south|west) of\s/gi,
    ' and ',
  )

  return standardizedLocation
}

const applyStreetSpecificLocationFixes = (inputLocation: string): string => {
  let standardizedLocation = inputLocation

  standardizedLocation = standardizedLocation.replace(/Crossbay/, 'Cross Bay')
  standardizedLocation = standardizedLocation.replace(
    /193rd Street-/,
    'between 193rd Street and',
  )
  standardizedLocation = standardizedLocation.replace(
    /Fultonmall/,
    'Fulton Mall',
  )
  standardizedLocation = standardizedLocation.replace(/Mcdonald/, 'McDonald')
  standardizedLocation = standardizedLocation.replace(
    /Selfridge Street Ns Nansen Street 75' Wo/,
    'North side of Nansen Street 75 feet west of Selfridge Street',
  )
  standardizedLocation = standardizedLocation.replace(
    /West of South 3rd Hewes Street/,
    'Hewes Street west of South 3rd Street',
  )
  standardizedLocation = standardizedLocation.replace(/Fdr\s/, 'FDR ')
  standardizedLocation = standardizedLocation.replace(
    /Riverband S\/p Police Parking/,
    'Riverbank State Park',
  )

  return standardizedLocation
}

export default { standardizeDisplayedLocation, standardizeLinkedSearchLocation }
