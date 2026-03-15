type ApiErrorObject = {
  body: Record<string, unknown>
  ok: boolean
  status: number
  statusText: string
  url: string
}

export default ApiErrorObject
