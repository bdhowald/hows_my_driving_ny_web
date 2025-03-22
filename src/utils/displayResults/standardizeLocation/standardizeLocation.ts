const PLACENAME_REGEX =
  /\s((?:st(?:\.|reet)?|dr(?:\.|ive)?|pl(?:\.|ace)?|(avenue (?![A-Za-z]))|(av (?![A-Za-z]))|(av. (?![A-Za-z]))|(ave (?![A-Za-z]))|(ave. (?![A-Za-z]))|rd|road|lane|drive|way|(court(?!\sSt(reet)?))|plaza|square|run|parkway|point|pike|square|driveway|trace|terrace|blvd|crescent))/i

const standardizeDisplayedLocation = (location: string): string => {
  let standardizedLocation = location

  // Replace Abbreviations: at
  standardizedLocation = standardizedLocation.replace(/@/g, 'and')

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
  standardizedLocation = standardizedLocation.replace(/\bAv\b/g, 'Avenue')
  standardizedLocation = standardizedLocation.replace(/\bAve\b\./g, 'Avenue')
  standardizedLocation = standardizedLocation.replace(/\bAve\b/g, 'Avenue')

  // Replace abbreviations: Boulevard
  standardizedLocation = standardizedLocation.replace(/\bBlv\b/g, 'Boulevard')
  standardizedLocation = standardizedLocation.replace(
    /\bBlvd\b\./g,
    'Boulevard',
  )
  standardizedLocation = standardizedLocation.replace(/\bBlvd\b/g, 'Boulevard')
  standardizedLocation = standardizedLocation.replace(/\bBv\b\./g, 'Boulevard')
  standardizedLocation = standardizedLocation.replace(/\bBv\b/g, 'Boulevard')

  // Replace abbreviations: Boulevard
  standardizedLocation = standardizedLocation.replace(/\bBrg\b/g, 'Bridge')

  // Replace abbreviations: Court
  standardizedLocation = standardizedLocation.replace(/\bCt\b/g, 'Court')
  standardizedLocation = standardizedLocation.replace(/\bCt\b\./g, 'Court')

  // Replace abbreviations: Expressway
  standardizedLocation = standardizedLocation.replace(
    /\bExpwy\b/g,
    'Expressway',
  )
  standardizedLocation = standardizedLocation.replace(
    /\bExpwy\b\./g,
    'Expressway',
  )

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
    /(?<!Avenue )\b(E)\b/g,
    'East',
  )
  standardizedLocation = standardizedLocation.replace(/\bE\b\./g, 'East ')

  // Replace Abbreviations: North
  standardizedLocation = standardizedLocation.replace(
    /(?<!Avenue )\b(N)\b/g,
    'North',
  )
  standardizedLocation = standardizedLocation.replace(/\bN\b\./g, 'North ')

  // Replace Abbreviations: South
  standardizedLocation = standardizedLocation.replace(
    /(?<!Avenue )\b(S)\b/g,
    'South',
  )
  standardizedLocation = standardizedLocation.replace(/\bS\b\./g, 'South ')

  // Replace Abbreviations: West
  standardizedLocation = standardizedLocation.replace(
    /(?<!Avenue )\b(W)\b/g,
    'West',
  )
  standardizedLocation = standardizedLocation.replace(/\bW\b\./g, 'West ')

  // Replace Abbreviations: feet
  standardizedLocation = standardizedLocation.replace(/(\d)ft/g, '$1 feet')

  // Fix lowercased letters part of house number
  standardizedLocation = standardizedLocation.replace(/(\d[a-z]) /g, (x) =>
    x.toUpperCase(),
  )

  // Fix specific bad location strings
  standardizedLocation = applyStreetSpecificLocationFixes(standardizedLocation)

  return standardizedLocation
}

const standardizeLinkedSearchLocation = (location: string): string => {
  let standardizedLocation = standardizeDisplayedLocation(location)

  standardizedLocation = standardizedLocation.replace(
    /\s(?:\d)*feet (east|north|south|west) of\s/,
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

  return standardizedLocation
}

export default { standardizeDisplayedLocation, standardizeLinkedSearchLocation }
