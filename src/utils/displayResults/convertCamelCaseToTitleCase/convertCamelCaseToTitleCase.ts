const convertCamelCaseToTitleCase = (original: string) => {
  const converted = original.replace(/([a-z])([A-Z])/g, '$1 $2')
  return converted.charAt(0).toUpperCase() + converted.slice(1)
}

export default convertCamelCaseToTitleCase
