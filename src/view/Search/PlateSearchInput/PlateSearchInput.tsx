import * as React from 'react'

import L10N from 'constants/display'
import PlateLookup from 'utils/types/plateLookup'

type PlateSearchInputProps = {
  currentLookup: PlateLookup
  onChangeFunction: (changeEvent: React.ChangeEvent<HTMLInputElement>) => void
}

const PlateSearchInput = ({
  onChangeFunction,
  currentLookup,
}: PlateSearchInputProps) => (
  <input
    autoComplete="off"
    className="form-control"
    id="plate-input"
    name="plateId"
    onChange={onChangeFunction}
    placeholder={L10N.query.plateSearchInput.placeholderText}
    type="text"
    value={currentLookup.plateId ?? ''}
  />
)

export default PlateSearchInput
