import React, { useRef } from 'react'

import { CLEAR_CHARACTER } from 'constants/characterKeys'

const InputWithClearButton = ({
  innerLabel,
  innerRef,
  ...props
}: {
  innerLabel: string
  innerRef?: React.RefObject<HTMLInputElement>
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  const inputRef = innerRef ?? useRef<HTMLInputElement>(null)

  return (
    <>
      <input ref={inputRef} {...props} />
      <button
        aria-label={`clear ${innerLabel} filter`}
        className="btn btn-secondary"
        onClick={() => inputRef.current && (inputRef.current.value = '')}
        type="button"
      >
        {CLEAR_CHARACTER}
      </button>
    </>
  )
}

export default InputWithClearButton
