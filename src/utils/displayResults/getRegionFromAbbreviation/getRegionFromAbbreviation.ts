import regions, { Region } from 'constants/regions'

const getRegionFromAbbreviation = (
  abbreviation: string,
): Region | undefined => {
  const region = regions.find(
    (regionCodeObject) => regionCodeObject.code === abbreviation,
  )
  return region
}

export default getRegionFromAbbreviation
