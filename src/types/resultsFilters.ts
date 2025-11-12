export interface FilterFormElement extends HTMLFormElement {
  readonly elements: FilterFormHTMLElements
}

export interface FilterFormHTMLElements extends HTMLFormControlsCollection {
  'filter-results-end-date': HTMLInputElement
  'filter-results-number-violations': HTMLInputElement
  'filter-results-number-violations-control': HTMLInputElement
  'filter-results-plate-text': HTMLInputElement
  'filter-results-plate-type': HTMLSelectElement
  'filter-results-start-date': HTMLInputElement
  'filter-results-state': HTMLSelectElement
}

export enum FilterType {
  DateRange = 'DATE_RANGE',
  Text = 'TEXT',
  Threshold = 'THRESHOLD',
}

export type ResultsFilterSet = {
  numberOfViolations: number | undefined
  plateText: string | undefined
  plateType: string | undefined
  queryDateRange: {
    endDate: Date | undefined
    startDate: Date | undefined
  }
  state: string | undefined
}

type DateRangeFilter = {
  args: {
    end?: Date
    start?: Date
  }
  field: 'queryDateRange'
  type: FilterType.DateRange
}

type TextFilter = {
  args: {
    key: string
    value: string
  }
  field: keyof ResultsFilterSet
  type: FilterType.Text
}

type ThresholdFilter = {
  args: {
    key: string
    value: number
  }
  field: keyof ResultsFilterSet
  type: FilterType.Threshold
}

export type ResultFilter = DateRangeFilter | TextFilter | ThresholdFilter
