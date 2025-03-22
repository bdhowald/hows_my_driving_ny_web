const convertCamelCaseToTitleCase = (original: string) => {
  const converted = original.replace(/([A-Z])/g, ' $1')
  return converted.charAt(0).toUpperCase() + converted.slice(1)
}

export default convertCamelCaseToTitleCase
