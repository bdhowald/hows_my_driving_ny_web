enum Sort {
  DATE = 'date',
  FINED = 'fined',
  KIND = 'kind',
  LOCATION = 'location',
}
export default Sort
export type SortType = keyof typeof Sort
