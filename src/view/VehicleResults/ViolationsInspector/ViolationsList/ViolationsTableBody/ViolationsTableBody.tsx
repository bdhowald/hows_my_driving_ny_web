import * as React from 'react'

import Sort from 'constants/sortOptions'
import Violation from 'models/Violation/Violation'

import ViolationsTableRow from 'view/VehicleResults/ViolationsInspector/ViolationsList/ViolationsTableRow/ViolationsTableRow'

const NUM_COLUMNS = 4

type ViolationsTableBodyProps = {
  currentSortType: Sort
  showFullFineData: boolean
  showFullText: boolean
  sortAscending: boolean
  violations: Array<Violation>
}

const ViolationsTableBody = ({
  currentSortType,
  showFullFineData,
  showFullText,
  sortAscending,
  violations,
}: ViolationsTableBodyProps): JSX.Element => {
  /**
   *
   * @param {{
   *   currentSortType {Sort}
   *   showFullFineData {boolean}
   *   showFullText {boolean}
   *   sortAscending {boolean}
   *   violations {Violation[]}
   * }} props ViolationsTableBodyProps
   * @returns
   */
  const SortDivider = ({
    columnIndex,
    dividerText,
  }: {
    columnIndex: number
    dividerText: number | string
  }) => {
    const dividerTextTestIdPart = dividerText
      .toString()
      .toLowerCase()
      .replace(' ', '-')

    return (
      <tr
        className="sort-divider"
        data-testid={`sort-divider-${currentSortType}-${sortAscending ? 'ascending' : 'descending'}-${dividerTextTestIdPart}`}
      >
        {/* Filler columns before divider cell */}
        {[...Array(columnIndex)].map((_, i) => (
          <th key={i} colSpan={1} />
        ))}

        {/* // Divider cell */}
        <th colSpan={1}>{dividerText}</th>

        {/* // Filler columns after divider cell */}
        {[...Array(NUM_COLUMNS - columnIndex - 1)].map((_, i) => (
          <th key={i} colSpan={1} />
        ))}
      </tr>
    )
  }

  const getDividerIfNeeded = (
    currentLexicographicOrder: { value: string | number | null },
    violation: Violation,
  ) => {
    /**
     * returns sort dividers if the sort type and violation ordering call for it
     *
     * note: function expects violations to be sorted according to the sort type
     */
    let dividerValue = null
    let columnIndex = null

    switch (currentSortType) {
      case Sort.DATE:
        columnIndex = 0
        dividerValue = new Date(violation.formattedTime).getFullYear()
        break
      case Sort.LOCATION:
        columnIndex = 2
        dividerValue = violation.getBorough()
        break
    }

    // If this sort doesn't have dividers, ignore.
    if (columnIndex === null || !dividerValue) {
      return null
    }

    const needsDivider =
      !currentLexicographicOrder.value ||
      (sortAscending && dividerValue > currentLexicographicOrder.value) ||
      (!sortAscending && dividerValue < currentLexicographicOrder.value)

    if (needsDivider) {
      currentLexicographicOrder.value = dividerValue
      return (
        <SortDivider columnIndex={columnIndex} dividerText={dividerValue} />
      )
    }
    return null
  }

  const dividerCounter: { value: string | number | null } = { value: null }

  return (
    <tbody data-testid="violations-table-body">
      {violations.map((violation: Violation) => {
        return (
          <React.Fragment key={violation.summonsNumber}>
            {getDividerIfNeeded(dividerCounter, violation)}
            <ViolationsTableRow
              showFullFineData={showFullFineData}
              showFullText={showFullText}
              violation={violation}
            />
          </React.Fragment>
        )
      })}
    </tbody>
  )
}

export default ViolationsTableBody
