import HttpStatusCode from 'constants/httpStatusCode'
import ApiErrorObject from 'types/apiErrorObject'

const isApiErrorObject = (mystery: unknown): mystery is ApiErrorObject => {
  if (!mystery) {
    return false
  }

  if (typeof mystery !== 'object') {
    return false
  }

  const mysteryAsApiErrorObject = mystery as ApiErrorObject

  if (!mysteryAsApiErrorObject.body) {
    return false
  }

  if (
    mysteryAsApiErrorObject.ok === undefined ||
    mysteryAsApiErrorObject === null
  ) {
    return false
  }

  if (mysteryAsApiErrorObject.ok) {
    return false
  }

  if (!mysteryAsApiErrorObject.status) {
    return false
  }

  if (mysteryAsApiErrorObject.status < HttpStatusCode.BadRequest) {
    return false
  }

  if (
    mysteryAsApiErrorObject.statusText === undefined ||
    mysteryAsApiErrorObject.statusText === null
  ) {
    return false
  }

  if (!mysteryAsApiErrorObject.url) {
    return false
  }

  return true
}

export default isApiErrorObject
