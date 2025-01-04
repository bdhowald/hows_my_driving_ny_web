import plateTypes from 'constants/plateTypes'

const getPlateTypeDisplayString = (
  inputPlateTypes: string[] | undefined,
): string => {
  let plateCategory: string | undefined = undefined

  Object.entries(plateTypes).forEach(([_, type]) => {
    if (inputPlateTypes?.sort().toString() === type.codes?.sort().toString()) {
      plateCategory = type.displayName
    }
  })

  const plateTypesString =
    !plateCategory || plateCategory === 'No Plate Type' ? 'All' : plateCategory

  return plateTypesString
}

export default getPlateTypeDisplayString
