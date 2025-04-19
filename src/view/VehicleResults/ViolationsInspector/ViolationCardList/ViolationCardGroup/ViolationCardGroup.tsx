import React, { useState } from 'react'

import L10N from 'constants/display'
import Sort from 'constants/sortOptions'
import Violation from 'models/Violation/Violation'

import ViolationCard from 'view/VehicleResults/ViolationsInspector/ViolationCardList/ViolationCard/ViolationCard'

const FINE_DIVIDER_INCREMENT = 25

const SortDivider = ({
  currentSortType,
  dividerText,
  groupIsVisible,
  numberOfElements,
  setGroupIsVisibleFunction,
  sortAscending,
}: {
  currentSortType: Sort
  dividerText: string
  groupIsVisible: boolean
  numberOfElements: number
  setGroupIsVisibleFunction: () => void
  sortAscending: boolean
}) => {
  const dividerTextTestIdPart = dividerText
    .toString()
    .toLowerCase()
    .replace(' ', '-')

  const numberOfViolationsString = `${numberOfElements} violation${numberOfElements === 1 ? '' : 's'}`
  const expandedState = groupIsVisible ? '[–]' : '[+]'

  return (
    <div
      className="violation-card-sort-divider bg-dark"
      data-testid={`sort-divider-${currentSortType}-${sortAscending ? 'ascending' : 'descending'}-${dividerTextTestIdPart}`}
    >
      <span className="divider-group-name">{dividerText}</span>
      <span className="collapsible-toggle" onClick={setGroupIsVisibleFunction}>
        {numberOfViolationsString} {expandedState}
      </span>
    </div>
  )
}

const ViolationCardGroup = ({
  bucket,
  bucketName,
  currentSortType,
  index,
  showOffCanvasFunction,
  sortAscending,
}: {
  bucketName: string | number
  bucket: Violation[]
  currentSortType: Sort
  index: string | number
  showOffCanvasFunction: (violation: Violation) => void
  sortAscending: boolean
}) => {
  const [groupIsVisible, setGroupIsVisible] = useState(true)

  const getFinesSortDividerText = (dividerValue: number) => {
    if (dividerValue === -1) {
      return 'No Fine Data Available'
    }
    const floor = dividerValue
    const ceiling = dividerValue + FINE_DIVIDER_INCREMENT - 0.01

    return `$${floor} – $${ceiling.toLocaleString('en-US', L10N.sitewide.currency)} `
  }

  return (
    <React.Fragment key={`${index}-group`}>
      <SortDivider
        currentSortType={currentSortType}
        dividerText={
          currentSortType === Sort.FINED
            ? getFinesSortDividerText(bucketName as number)
            : (bucketName as string)
        }
        groupIsVisible={groupIsVisible}
        numberOfElements={bucket.length}
        setGroupIsVisibleFunction={() => setGroupIsVisible(!groupIsVisible)}
        sortAscending={sortAscending}
      />
      {groupIsVisible &&
        bucket.map((violation: Violation, index: number) => (
          <ViolationCard
            key={`${index}-card`}
            index={index}
            inspectViolationFunction={showOffCanvasFunction}
            violation={violation}
          />
        ))}
    </React.Fragment>
  )
}

export default ViolationCardGroup
