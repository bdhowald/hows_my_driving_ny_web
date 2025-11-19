const PLACENAME_REGEX =
  /\s((?:st(?:\.|reet)?|dr(?:\.|ive)?|pl(?:\.|ace)?|(avenue (?![A-Za-z]))|(av (?![A-Za-z]))|(av. (?![A-Za-z]))|(ave (?![A-Za-z]))|(ave. (?![A-Za-z]))|av$|av\.$|ave$|ave\.$|avenue$|l(?:a)?n(?:e)?|rd|road|lane|drive|way|(court(?!\sSt(reet)?))|plaza|square|run|parkway|point|pike|square|driveway|trace|terrace|blvd|crescent))/i

export default {
  location: {
    numbers: {
      suffixes: {
        all: /(st|nd|rd|th)(st|rd|av(e)?)/gi,
        eleventh: /(11)\b/g,
        first: /(?<!1)(1)/g,
        fourthThroughNinth: /(\d)\b/g,
        second: /(?<!1)(2)/g,
        third: /(?<!1)(3)/g,
        thirteenth: /(13)\b/g,
        twelfth: /(12)\b/g,
      },
    },
    placename: PLACENAME_REGEX,
  },
  lookups: {
    uniqueIdentifier: /[a-z0-9]{8}/,
  },
}
