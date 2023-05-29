import regions from 'constants/regions'

export default (abbreviation: string): string | undefined => {
  const region = regions.find((regionCodeObject) =>
    regionCodeObject.code === abbreviation
  )
  return region?.name
}