import regions from 'constants/regions'

const getRegionNameFromAbbreviation = (
  abbreviation: string,
): string | undefined => {
  const region = regions.find(
    (regionCodeObject) => regionCodeObject.code === abbreviation,
  )
  return region?.name
}

export default getRegionNameFromAbbreviation
