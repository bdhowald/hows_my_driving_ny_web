type ApiErrorObject = {
  body: Record<string, any>
  ok: boolean
  status: number
  statusText: string
  url: string
}

export default ApiErrorObject
