const PLACENAME_REGEX =
  /\s((?:st(?:\.|reet)?|dr(?:\.|ive)?|pl(?:\.|ace)?|ave(?:\.|nue)?|rd|road|lane|drive|way|court|plaza|square|run|parkway|point|pike|square|driveway|trace|park|terrace|blvd|crescent))/i

const standardizeLocation = (location: string): string => {
  let standardizedLocation = location

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

  standardizedLocation = standardizedLocation.replace(/\(e\/b\)/g, '')
  standardizedLocation = standardizedLocation.replace(/\(n\/b\)/g, '')
  standardizedLocation = standardizedLocation.replace(/\(s\/b\)/g, '')
  standardizedLocation = standardizedLocation.replace(/\(w\/b\)/g, '')

  standardizedLocation = standardizedLocation.replace(/\bAv\b/g, 'Avenue')
  standardizedLocation = standardizedLocation.replace(/\bAve\b\./g, 'Avenue')
  standardizedLocation = standardizedLocation.replace(/\bAve\b/g, 'Avenue')

  standardizedLocation = standardizedLocation.replace(/\bBlv\b/g, 'Boulevard')
  standardizedLocation = standardizedLocation.replace(
    /\bBlvd\b\./g,
    'Boulevard',
  )
  standardizedLocation = standardizedLocation.replace(/\bBlvd\b/g, 'Boulevard')
  standardizedLocation = standardizedLocation.replace(/\bBv\b\./g, 'Boulevard')
  standardizedLocation = standardizedLocation.replace(/\bBv\b/g, 'Boulevard')

  standardizedLocation = standardizedLocation.replace(/\bCt\b/g, 'Court')
  standardizedLocation = standardizedLocation.replace(/\bCt\b\./g, 'Court')

  standardizedLocation = standardizedLocation.replace(
    /\bExpwy\b/g,
    'Expressway',
  )
  standardizedLocation = standardizedLocation.replace(
    /\bExpwy\b\./g,
    'Expressway',
  )

  standardizedLocation = standardizedLocation.replace(/\bPkwy\b/g, 'Parkway')
  standardizedLocation = standardizedLocation.replace(/\bPkwy\b\./g, 'Parkway')

  standardizedLocation = standardizedLocation.replace(/\bPl\b/g, 'Place')
  standardizedLocation = standardizedLocation.replace(/\bPl\b\./g, 'Place')

  standardizedLocation = standardizedLocation.replace(/\bRd\b/g, 'Road')
  standardizedLocation = standardizedLocation.replace(/\bRd\b\./g, 'Road')

  standardizedLocation = standardizedLocation.replace(/\bSt\b/g, 'Street')
  standardizedLocation = standardizedLocation.replace(/\bSt\b\./g, 'Street')

  standardizedLocation = standardizedLocation.replace(
    /(?<!Avenue )\b(E)\b/g,
    'East',
  )
  standardizedLocation = standardizedLocation.replace(/\bE\b\./g, 'East ')

  standardizedLocation = standardizedLocation.replace(
    /(?<!Avenue )\b(N)\b/g,
    'North',
  )
  standardizedLocation = standardizedLocation.replace(/\bN\b\./g, 'North ')

  standardizedLocation = standardizedLocation.replace(
    /(?<!Avenue )\b(S)\b/g,
    'South',
  )
  standardizedLocation = standardizedLocation.replace(/\bS\b\./g, 'South ')

  standardizedLocation = standardizedLocation.replace(
    /(?<!Avenue )\b(W)\b/g,
    'West',
  )
  standardizedLocation = standardizedLocation.replace(/\bW\b\./g, 'West ')

  standardizedLocation = applyStreetSpecificLocationFixes(standardizedLocation)

  return standardizedLocation
}

const applyStreetSpecificLocationFixes = (inputLocation: string): string => {
  let standardizedLocation = inputLocation

  standardizedLocation = standardizedLocation.replace(/Crossbay/, 'Cross Bay')
  standardizedLocation = standardizedLocation.replace(
    /193rd Street-/,
    'between 193rd Street and',
  )

  return standardizedLocation
}

export default standardizeLocation
