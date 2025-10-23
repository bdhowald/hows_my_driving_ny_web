import HttpStatusCode from 'constants/httpStatusCode'
import { ErrorQueryResponse } from 'types/responses'

const isErrorQueryResponse = (
  mystery: unknown,
): mystery is ErrorQueryResponse => {
  if (!mystery) {
    return false
  }

  if (typeof mystery !== 'object') {
    return false
  }

  const mysteryAsErrorQueryResponse = mystery as ErrorQueryResponse

  if (!mysteryAsErrorQueryResponse.data) {
    return false
  }
  const errorResponseData = mysteryAsErrorQueryResponse.data

  if (!Array.isArray(errorResponseData)) {
    return false
  }

  if (!errorResponseData?.[0]) {
    return false
  }

  const firstLookup = errorResponseData[0]

  if (firstLookup.successfulLookup) {
    return false
  }

  if (!firstLookup.error) {
    return false
  }

  if (!firstLookup.statusCode) {
    return false
  }

  if (firstLookup.statusCode < HttpStatusCode.BadRequest) {
    return false
  }

  return true
}

export default isErrorQueryResponse
