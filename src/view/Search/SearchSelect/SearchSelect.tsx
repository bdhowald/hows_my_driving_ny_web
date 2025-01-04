import React from 'react'

import Form from 'react-bootstrap/Form'

import { PlateType } from 'constants/plateTypes'

type SearchSelectProps = {
  currentLookup: {
    plateId: string | undefined
    plateType: PlateType | undefined
    state: string
  }
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  label: string
  selectOptions: JSX.Element[]
  valueKey: 'plateType' | 'state'
}

const SearchSelect = ({
  currentLookup,
  handleChange,
  label,
  selectOptions,
  valueKey,
}: SearchSelectProps) => {
  return (
    <Form.Select
      aria-label={`Select ${label}`}
      name={valueKey}
      onChange={handleChange}
      value={currentLookup[valueKey]}
    >
      <optgroup label={label}>{selectOptions}</optgroup>
    </Form.Select>
  )
}

SearchSelect.displayName = 'SearchSelect'

export default SearchSelect
