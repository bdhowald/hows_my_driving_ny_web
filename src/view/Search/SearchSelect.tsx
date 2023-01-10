import React from 'react'

import Form from 'react-bootstrap/Form'

import { PlateType } from 'constants/plateTypes'

type OwnProps = {
  currentLookup: {
    plateId: string | undefined
    plateType: PlateType | undefined
    state: string
  },
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void
  label: string
  selectFn: JSX.Element[]
  valueKey: 'plateId' | 'plateType' | 'state'
}

const SearchSelect = ({
  currentLookup,
  handleChange,
  label,
  selectFn,
  valueKey
}: OwnProps) => {
  return (
    <Form.Control
      as="select"
      name={valueKey}
      onChange={handleChange}
      value={currentLookup[valueKey]}
    >
      <optgroup label={label}>
        {selectFn}
      </optgroup>
    </Form.Control>
  )
}

SearchSelect.displayName = 'SearchSelect'

export default SearchSelect