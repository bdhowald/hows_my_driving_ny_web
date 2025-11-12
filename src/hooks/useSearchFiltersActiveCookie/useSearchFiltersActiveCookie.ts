import { useCookies } from 'react-cookie'

import {
  DEFAULT_COOKIE_PATH,
  MAX_AGE,
  USE_SEARCH_FILTERS_COOKIE,
} from 'constants/cookies'

const useSearchFiltersActiveCookie = () => {
  const [cookies, setCookie, _] = useCookies([
    USE_SEARCH_FILTERS_COOKIE,
  ])

  const areSearchFiltersActive = () => {
    const useSearchFiltersActiveCookiePresent =
      cookies[USE_SEARCH_FILTERS_COOKIE] !== null &&
      cookies[USE_SEARCH_FILTERS_COOKIE] !== undefined

    if (!useSearchFiltersActiveCookiePresent) {
      setSearchFiltersAreActiveCookie()
    }

    const queryParameters = new URLSearchParams(document.location.search)
    const useSearchFilters = cookies[USE_SEARCH_FILTERS_COOKIE] === true

    const queryParamFeatureFlagEnabled =
      queryParameters.get(USE_SEARCH_FILTERS_COOKIE) === 'true'

    const queryParamFeatureFlagDisabled =
      queryParameters.get(USE_SEARCH_FILTERS_COOKIE) === 'false'

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

    const useSearchFilters = cookies[USE_SEARCH_FILTERS_COOKIE] === true

    const useSearchFiltersActiveCookiePresent =
      cookies[USE_SEARCH_FILTERS_COOKIE] !== null &&
      cookies[USE_SEARCH_FILTERS_COOKIE] !== undefined

    const queryParamFeatureFlagEnabled =
      queryParameters.get(USE_SEARCH_FILTERS_COOKIE) === 'true'

    const queryParamFeatureFlagDisabled =
      queryParameters.get(USE_SEARCH_FILTERS_COOKIE) === 'false'

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
        setCookie(USE_SEARCH_FILTERS_COOKIE, 'true', {
          maxAge: MAX_AGE,
          path: DEFAULT_COOKIE_PATH,
        })
      }

      if (inControlGroup) {
        setCookie(USE_SEARCH_FILTERS_COOKIE, 'false', {
          maxAge: MAX_AGE,
          path: DEFAULT_COOKIE_PATH,
        })
      }

      if (inReserveGroup) {
        setCookie(USE_SEARCH_FILTERS_COOKIE, 'none', {
          maxAge: MAX_AGE,
          path: DEFAULT_COOKIE_PATH,
        })
      }
    }
  }

  return {
    areSearchFiltersActive
  }
}

export default useSearchFiltersActiveCookie
