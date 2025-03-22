import Sort from 'constants/sortOptions'
import Violation from 'models/Violation/Violation'

export default (
  sortAscending: boolean,
  sortType: Sort,
  violations: Violation[],
): Violation[] =>
  violations.sort((a: Violation, b: Violation) => {
    const aDate = new Date(a.formattedTime).getTime()
    const bDate = new Date(b.formattedTime).getTime()

    if (sortType === Sort.DATE) {
      if (!aDate) {
        return 1
      }
      if (!bDate) {
        return -1
      }
      return sortAscending ? aDate - bDate : bDate - aDate
    }

    if (sortType === Sort.LOCATION) {
      let aLocation: string
      let bLocation: string

      // Temporary fix for discrepancy between Bronx/The Bronx
      if (a.violationCounty === 'The Bronx') {
        aLocation = `Bronx ${a.location ? '' : `(${a.location})`}`
      } else {
        aLocation = `${a.violationCounty} ${a.location ? '' : `(${a.location})`}`
      }
  
      // Temporary fix for discrepancy between Bronx/The Bronx
      if (b.violationCounty === 'The Bronx') {
        bLocation = `Bronx ${b.location ? '' : `(${b.location})`}`
      } else {
        bLocation = `${b.violationCounty} ${b.location ? '' : `(${b.location})`}`
      }

      if (sortAscending) {
        return aLocation === bLocation
          ? aDate - bDate
          : aLocation < bLocation
            ? -1
            : 1
      } else {
        return aLocation === bLocation
          ? bDate - aDate
          : aLocation < bLocation
            ? 1
            : -1
      }
    }

    if (sortType === Sort.FINED) {
      const aFine: number | null = a.getTotalFined()
      const bFine: number | null = b.getTotalFined()

      if (!aFine) {
        return 1
      }
      if (!bFine) {
        return -1
      }

      if (sortAscending) {
        return aFine === bFine ? aDate - bDate : aFine < bFine ? -1 : 1
      } else {
        return aFine === bFine ? bDate - aDate : aFine < bFine ? 1 : -1
      }
    }

    // humanizedDescription
    return sortAscending
      ? a.humanizedDescription === b.humanizedDescription
        ? aDate - bDate
        : a.humanizedDescription < b.humanizedDescription
          ? -1
          : 1
      : a.humanizedDescription === b.humanizedDescription
        ? bDate - aDate
        : a.humanizedDescription < b.humanizedDescription
          ? 1
          : -1
  })
