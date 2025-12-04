import * as React from 'react'

import InputWithClearButton from 'view/components/FormControls/InputWithClearButton/InputWithClearButton'
import L10N from 'constants/display'
import regexps from 'constants/regexps'
import PlateLookup from 'types/plateLookup'

type PlateSearchInputProps = {
  currentLookup: PlateLookup
  onChangeFunction: (changeEvent: React.ChangeEvent<HTMLInputElement>) => void
}

const PlateSearchInput = ({
  onChangeFunction,
  currentLookup,
}: PlateSearchInputProps) => {
  const now = new Date()
  const day = now.getDate()
  const month = now.getMonth() + 1

  const isAprilFoolsDay =
    month === L10N.dates.aprilFoolsDay.month &&
    day === L10N.dates.aprilFoolsDay.day

  const placeholderText = isAprilFoolsDay
    ? L10N.query.plateSearchInput.placeholderTextAprilFools
    : L10N.query.plateSearchInput.placeholderText

  return (
    <div className="input-group">
      <InputWithClearButton
        autoComplete="off"
        className="form-control"
        id="plate-input"
        innerLabel="Plate"
        name="plateId"
        onChange={onChangeFunction}
        onInvalid={(e) => {
          const target = e.target as HTMLInputElement
          target.setCustomValidity('Only letters and numbers allowed')
        }}
        pattern={regexps.search.plate.text.source + '+'}
        placeholder={placeholderText}
        type="text"
        value={currentLookup.plateId ?? ''}
      />
    </div>
  )
}

export default PlateSearchInput
