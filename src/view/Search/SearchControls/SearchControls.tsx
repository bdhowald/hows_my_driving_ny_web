import * as React from 'react'

import L10N from 'constants/display'
import plateTypes from 'constants/plateTypes'
import regions from 'constants/regions'
import SearchSelect from 'view/Search/SearchSelect/SearchSelect'
import SearchButton from 'view/Search/SearchButton/SearchButton'
import PlateLookup from 'types/plateLookup'

type SearchControlsProps = {
  currentLookup: PlateLookup
  handleInputChange: (changeEvent: InputChangeType) => void
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  lookupInFlight: boolean
}

type InputChangeType =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>

type InputHandlerType = {
  currentLookup: PlateLookup
  handleInputChange: (changeEvent: InputChangeType) => void
}

const inputHandlerPropsEqual = (
  prevProps: InputHandlerType,
  nextProps: InputHandlerType,
) =>
  prevProps.currentLookup === nextProps.currentLookup &&
  prevProps.handleInputChange === nextProps.handleInputChange

const PlateTypeSelect = React.memo(
  ({ currentLookup, handleInputChange }: InputHandlerType) => (
    <div className="col-md">
      <div className="form-group">
        <SearchSelect
          currentLookup={currentLookup}
          handleChange={handleInputChange}
          label="License Plate Type"
          selectOptions={Object.entries(plateTypes)
            .map(
              ([name, info]) =>
                [name, info.displayName, info.codes] as [
                  string,
                  string,
                  string[],
                ],
            )
            .map((type) => (
              <option key={type[0]} value={type[0]}>
                {type[1]}
              </option>
            ))}
          valueKey="plateType"
        />
      </div>
    </div>
  ),
  inputHandlerPropsEqual,
)
PlateTypeSelect.displayName = 'PlateTypeSelect'

const RegionSelect = React.memo(
  ({ currentLookup, handleInputChange }: InputHandlerType) => (
    <div className="col-md">
      <div className="form-group">
        <SearchSelect
          currentLookup={currentLookup}
          handleChange={handleInputChange}
          label={'Region'}
          selectOptions={regions.map(
            (region: { code: string; name: string }) => (
              <option key={region.code} value={region.code}>
                {`${region.name} (${region.code})`}
              </option>
            ),
          )}
          valueKey="state"
        />
      </div>
    </div>
  ),
)
RegionSelect.displayName = 'RegionSelect'

const SearchControls = ({
  currentLookup,
  handleInputChange,
  handleSubmit,
  lookupInFlight,
}: SearchControlsProps) => {
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
    <form className="form" onSubmit={handleSubmit}>
      <div className="row form-row">
        <div className="col-md">
          <div className="form-group">
            <input
              autoComplete="off"
              className="form-control"
              id="plate-input"
              name="plateId"
              onChange={handleInputChange}
              placeholder={placeholderText}
              type="text"
              value={currentLookup.plateId ?? ''}
            />
          </div>
        </div>
        <RegionSelect
          currentLookup={currentLookup}
          handleInputChange={handleInputChange}
        />
      </div>
      <div className="row form-row">
        <PlateTypeSelect
          currentLookup={currentLookup}
          handleInputChange={handleInputChange}
        />
        <SearchButton
          lookupInFlight={lookupInFlight}
          plateIdPresent={!!currentLookup.plateId}
        />
      </div>
    </form>
  )
}

export default SearchControls
