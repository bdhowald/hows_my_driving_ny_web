import React, { useRef, useState } from 'react'

import { CLEAR_CHARACTER } from 'constants/characterKeys'
import InputWithClearButton from 'view/components/FormControls/InputWithClearButton/InputWithClearButton'

type RangeWithCheckboxControlProps = {
  enabled: boolean
  id: string
  initialValue?: number
  labelText: string
  minValue?: number
  maxValue: number
}

const RangeWithCheckboxControl = ({
  enabled,
  id,
  initialValue,
  labelText,
  minValue,
  maxValue,
}: RangeWithCheckboxControlProps) => {
  const halfway = Math.ceil((maxValue + (minValue ?? 0)) / 2)

  const [rangeIsEnabled, setRangeIsEnabled] = useState(enabled)
  const [rangeValue, setRangeValue] = useState<number | undefined>(
    initialValue ?? halfway,
  )

  const rangeInputDisplayClass = rangeIsEnabled ? '' : 'd-none'
  const rangeValueDisplayClass = rangeIsEnabled ? 'fw-bold' : ''

  return (
    <>
      <div className="form-check">
        <input
          aria-labelledby={`${id}-label`}
          className="form-check-input"
          defaultChecked={enabled}
          id={`${id}-control`}
          onChange={(e) => setRangeIsEnabled(e.target.checked)}
          type="checkbox"
        />
        <label
          className="form-label"
          htmlFor={`${id}-control`}
          id={`${id}-label`}
        >
          {labelText}
          <span className={`${rangeValueDisplayClass} ps-1`}>
            {rangeIsEnabled ? rangeValue : '...'}
          </span>
        </label>
      </div>
      <input
        aria-labelledby={`${id}-label`}
        className={`form-range ${rangeInputDisplayClass}`}
        defaultValue={rangeValue}
        id={id}
        min={minValue ?? 0}
        max={maxValue}
        onChange={(e) => setRangeValue(Number(e.target.value))}
        type="range"
      />
    </>
  )
}

const SelectWithClearButton = ({
  innerLabel,
  innerRef,
  ...props
}: {
  innerLabel: string
  innerRef?: React.RefObject<HTMLSelectElement>
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>) => {
  const selectRef = innerRef ?? useRef<HTMLSelectElement>(null)

  return (
    <>
      <select ref={selectRef} {...props} />
      <button
        aria-label={`clear ${innerLabel} filter`}
        className="btn btn-secondary"
        onClick={() => selectRef.current && (selectRef.current.value = '')}
        type="button"
      >
        {CLEAR_CHARACTER}
      </button>
    </>
  )
}

export default {
  InputWithClearButton,
  RangeWithCheckboxControl,
  SelectWithClearButton,
}
