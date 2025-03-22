import convertCamelCaseToTitleCase from './convertCamelCaseToTitleCase'

describe('convertCamelCaseToTitleCase', () => {
  it('should handle the empty string', () => {
    expect(convertCamelCaseToTitleCase('')).toBe('')
  })

  it('should handle a single word', () => {
    expect(convertCamelCaseToTitleCase('word')).toBe('Word')
  })

  it('should convert a camel-cased word to a title-cased word', () => {
    expect(convertCamelCaseToTitleCase('titleCaseMe')).toBe('Title Case Me')
  })
})
