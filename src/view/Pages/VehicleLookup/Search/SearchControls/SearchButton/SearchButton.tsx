import React from 'react'

type SearchButtonProps = {
  lookupInFlight: boolean
  plateIdPresent: boolean
}

const SearchButton = React.memo(
  ({ plateIdPresent, lookupInFlight }: SearchButtonProps) => (
    <div className="col-md">
      <div className="form-group">
        <button
          className="form-control btn btn-primary"
          disabled={!plateIdPresent || lookupInFlight}
          role="button"
          type="submit"
          value="Search"
        >
          {lookupInFlight ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
              &nbsp;&nbsp;Searching...
            </>
          ) : (
            'Search'
          )}
        </button>
      </div>
    </div>
  ),
)

SearchButton.displayName = 'SearchButton'

export default SearchButton
