import { useCookies } from 'react-cookie'

import {
  COOKIE_DEFAULT_PATH,
  COOKIE_MAX_AGE,
  USE_SEARCH_FILTERS_STORAGE_KEY,
} from 'constants/storage'

const useSearchFiltersActiveCookie = () => {
  const [cookies, setCookie, _] = useCookies([USE_SEARCH_FILTERS_STORAGE_KEY])

  const areSearchFiltersActive = () => {
    const useSearchFiltersActiveCookiePresent =
      cookies[USE_SEARCH_FILTERS_STORAGE_KEY] !== null &&
      cookies[USE_SEARCH_FILTERS_STORAGE_KEY] !== undefined

    if (!useSearchFiltersActiveCookiePresent) {
      setSearchFiltersAreActiveCookie()
    }

    const queryParameters = new URLSearchParams(document.location.search)
    const useSearchFilters = cookies[USE_SEARCH_FILTERS_STORAGE_KEY] === true

    const queryParamFeatureFlagEnabled =
      queryParameters.get(USE_SEARCH_FILTERS_STORAGE_KEY) === 'true'

    const queryParamFeatureFlagDisabled =
      queryParameters.get(USE_SEARCH_FILTERS_STORAGE_KEY) === 'false'

    if (queryParamFeatureFlagDisabled) {
      return false
    }
    if (queryParamFeatureFlagEnabled || useSearchFilters) {
      return true
    }
    return false
  }

  const setSearchFiltersAreActiveCookie = () => {
    const queryParameters = new URLSearchParams(document.location.search)

    const useSearchFilters = cookies[USE_SEARCH_FILTERS_STORAGE_KEY] === true

    const useSearchFiltersActiveCookiePresent =
      cookies[USE_SEARCH_FILTERS_STORAGE_KEY] !== null &&
      cookies[USE_SEARCH_FILTERS_STORAGE_KEY] !== undefined

    const queryParamFeatureFlagEnabled =
      queryParameters.get(USE_SEARCH_FILTERS_STORAGE_KEY) === 'true'

    const queryParamFeatureFlagDisabled =
      queryParameters.get(USE_SEARCH_FILTERS_STORAGE_KEY) === 'false'

    if (
      !useSearchFiltersActiveCookiePresent ||
      !useSearchFilters ||
      queryParamFeatureFlagEnabled ||
      queryParamFeatureFlagDisabled
    ) {
      // 25% of sessions are in experimental group
      // 25% of sessions are in control group
      // 50% of sessions are available for progressive rollout
      const randomVariable = Math.random()

      const inExperimentalGroup =
        randomVariable * 10 > 7.5 || queryParamFeatureFlagEnabled
      const inControlGroup =
        (randomVariable * 10 <= 2.5 && !queryParamFeatureFlagEnabled) ||
        queryParamFeatureFlagDisabled

      const inReserveGroup = !inControlGroup && !inExperimentalGroup

      if (inExperimentalGroup) {
        setCookie(USE_SEARCH_FILTERS_STORAGE_KEY, 'true', {
          maxAge: COOKIE_MAX_AGE,
          path: COOKIE_DEFAULT_PATH,
        })
      }

      if (inControlGroup) {
        setCookie(USE_SEARCH_FILTERS_STORAGE_KEY, 'false', {
          maxAge: COOKIE_MAX_AGE,
          path: COOKIE_DEFAULT_PATH,
        })
      }

      if (inReserveGroup) {
        setCookie(USE_SEARCH_FILTERS_STORAGE_KEY, 'none', {
          maxAge: COOKIE_MAX_AGE,
          path: COOKIE_DEFAULT_PATH,
        })
      }
    }
  }

  return {
    areSearchFiltersActive,
  }
}

export default useSearchFiltersActiveCookie
