import plateTypes from 'constants/plateTypes'

const getPlateTypeName = (
  inputPlateTypes: string[] | undefined,
): keyof typeof plateTypes => {
  let plateCategory: string | undefined = undefined

  Object.entries(plateTypes).forEach(([name, type]) => {
    if (inputPlateTypes?.sort().toString() === type.codes?.sort().toString()) {
      plateCategory = name
    }
  })

  const plateTypesString = plateCategory ? plateCategory : 'none'

  return plateTypesString
}

export default getPlateTypeName
