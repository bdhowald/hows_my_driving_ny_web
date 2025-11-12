import L10N from 'constants/display'

const endOfDay = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  // Create a Date object representing midnight Eastern for that day
  const midnightET = new Date(
    new Date(Date.UTC(year, month - 1, day)).toLocaleString('en-US', {
      timeZone: L10N.sitewide.timeZone,
    }),
  )

  // Add 24 hours minus 1 millisecond to get to 23:59:59.999 ET
  const endOfDayET = new Date(midnightET.getTime() + 24 * 60 * 60 * 1000 - 1)

  return endOfDayET
}

export default { endOfDay }
