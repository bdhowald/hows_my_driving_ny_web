import sorts from 'constants/sortOptions'
import { Violation } from 'models/Violation'

export default (sortAscending: boolean, sortType: sorts, violations: Violation[]): Violation[] =>
  violations.sort((a: Violation, b: Violation) => {
    const aDate = new Date(a.formattedTime).getTime()
    const bDate = new Date(b.formattedTime).getTime()

    if (sortType === sorts.DATE) {
      if (!aDate) {
        return 1
      }
      if (!bDate) {
        return -1
      }
      return sortAscending
        ? aDate - bDate
        : bDate - aDate
    }

    if (sortType === sorts.LOCATION) {
      const aLocation = `${a.violationCounty} ${(a.location ? '' : `(${a.location})`)}`
      const bLocation = `${b.violationCounty} ${(b.location ? '' : `(${b.location})`)}`

      if (sortAscending) {
        return aLocation === bLocation ?
          aDate - bDate :
          aLocation < bLocation ? -1: 1
      } else {
        return aLocation === bLocation ?
          bDate - aDate :
          aLocation < bLocation ? 1: -1
      }
    }

    if (sortType === sorts.FINED) {
      const aFine: Number | null = (a.getTotalFined())
      const bFine: Number | null = (b.getTotalFined())

      if (!aFine) {
        return 1
      }
      if (!bFine) {
        return -1
      }

      if (sortAscending) {
        return aFine === bFine ?
          aDate - bDate :
          aFine < bFine ? -1 : 1
      } else {
        return aFine === bFine ?
          bDate - aDate :
          aFine < bFine ? 1 : -1
      }
    }

    // humanizedDescription
    return sortAscending ?
      ((a.humanizedDescription === b.humanizedDescription) ?
        aDate - bDate :
        a.humanizedDescription < b.humanizedDescription ? -1 : 1) :
      ((a.humanizedDescription === b.humanizedDescription) ?
        bDate - aDate :
        a.humanizedDescription < b.humanizedDescription ? 1 : -1)
  })
