import { ViolationFactory } from '__fixtures__/models/Violation'
import Sort from 'constants/sortOptions'

import sortViolations from './sortViolations'

describe('sortViolations', () => {
  describe('sort types', () => {
    describe('sort by date', () => {
      const earlierViolation = ViolationFactory.build({
        formattedTime: '2021-01-01T00:00:00.000Z',
      })
      const laterViolation = ViolationFactory.build({
        formattedTime: '2021-02-01T00:00:00.000Z',
      })

      it('should sort by date ascending if requested', () => {
        const sortedViolations = sortViolations(true, Sort.DATE, [
          earlierViolation,
          laterViolation,
        ])

        expect(sortedViolations).toEqual([earlierViolation, laterViolation])
      })

      it('should sort by date descending if requested', () => {
        const sortedViolations = sortViolations(false, Sort.DATE, [
          earlierViolation,
          laterViolation,
        ])

        expect(sortedViolations).toEqual([laterViolation, earlierViolation])
      })
    })

    describe('sort by total fined', () => {
      const lesserFinesViolation = ViolationFactory.build({
        getTotalFined: () => 50,
      })
      const higherFinesViolation = ViolationFactory.build({
        getTotalFined: () => 100,
      })

      it('should sort by total fined ascending if requested', () => {
        const sortedViolations = sortViolations(true, Sort.FINED, [
          lesserFinesViolation,
          higherFinesViolation,
        ])

        expect(sortedViolations).toEqual([
          lesserFinesViolation,
          higherFinesViolation,
        ])
      })

      it('should sort by total fined descending if requested', () => {
        const sortedViolations = sortViolations(false, Sort.FINED, [
          lesserFinesViolation,
          higherFinesViolation,
        ])

        expect(sortedViolations).toEqual([
          higherFinesViolation,
          lesserFinesViolation,
        ])
      })
    })

    describe('sort by violation humanized description', () => {
      const lexicographicallyEarlierViolation = ViolationFactory.build({
        humanizedDescription: 'Bus Lane Violation',
      })
      const lexicographicallyLaterViolation = ViolationFactory.build({
        humanizedDescription: 'Double Parking',
      })

      it('should sort by violation humanized description if requested', () => {
        const sortedViolations = sortViolations(true, Sort.KIND, [
          lexicographicallyEarlierViolation,
          lexicographicallyLaterViolation,
        ])

        expect(sortedViolations).toEqual([
          lexicographicallyEarlierViolation,
          lexicographicallyLaterViolation,
        ])
      })

      it('should sort violation humanized description descending if requested', () => {
        const sortedViolations = sortViolations(false, Sort.KIND, [
          lexicographicallyEarlierViolation,
          lexicographicallyLaterViolation,
        ])

        expect(sortedViolations).toEqual([
          lexicographicallyLaterViolation,
          lexicographicallyEarlierViolation,
        ])
      })
    })

    describe('sort by location (violation county and address)', () => {
      const lexicographicallyEarlierViolation = ViolationFactory.build({
        violationCounty: 'Brooklyn (123 Abermarle Street)',
      })
      const lexicographicallyLaterViolation = ViolationFactory.build({
        violationCounty: 'Brooklyn (456 Wythe Avenue)',
      })

      it('should sort by total fined ascending if requested', () => {
        const sortedViolations = sortViolations(true, Sort.LOCATION, [
          lexicographicallyEarlierViolation,
          lexicographicallyLaterViolation,
        ])

        expect(sortedViolations).toEqual([
          lexicographicallyEarlierViolation,
          lexicographicallyLaterViolation,
        ])
      })

      it('should sort by total fined descending if requested', () => {
        const sortedViolations = sortViolations(false, Sort.LOCATION, [
          lexicographicallyEarlierViolation,
          lexicographicallyLaterViolation,
        ])

        expect(sortedViolations).toEqual([
          lexicographicallyLaterViolation,
          lexicographicallyEarlierViolation,
        ])
      })
    })
  })
})
