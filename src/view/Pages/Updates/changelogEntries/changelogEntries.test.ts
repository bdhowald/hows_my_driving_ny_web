import CHANGELOG_ENTRIES from './changelogEntries'

describe('changelogEntries', () => {
  describe('changelog entry integrity', () => {
    it('should be the case that every entry for a year took place during that year and is earlier than the entry before it', () => {
      let dateOfLastEntry: Date | undefined
      CHANGELOG_ENTRIES.forEach(({ year, yearEntries }) => {
        yearEntries.forEach(({ date }) => {
          const dateOfEntry = new Date(date)

          expect(dateOfEntry.getUTCFullYear()).toBe(Number(year))
          if (dateOfLastEntry) {
            expect(dateOfLastEntry.getTime()).toBeGreaterThan(
              dateOfEntry.getTime(),
            )
          }

          dateOfLastEntry = dateOfEntry
        })
      })
    })

    it('should be the case that every entry is in one of three known projects', () => {
      const projects = [
        'hows_my_driving',
        'hows_my_driving_ny_api',
        'hows_my_driving_ny_web',
      ]

      CHANGELOG_ENTRIES.forEach(({ yearEntries }) => {
        yearEntries.forEach((date) => {
          date.dateEntries.forEach(({ commits }) => {
            commits.forEach(({ project }) => {
              expect(projects.includes(project)).toBeTruthy()
            })
          })
        })
      })
    })
  })
})
