export type QueuedCall = {
  args: [string, Record<string, unknown>]
  method: 'identify' | 'trackEvent'
}

export interface Tracker {
  getDistinctId: () => string
  identify?: (userId: string, traits: Record<string, unknown>) => void
  name: string
  track?: (eventName: string, eventProperties: Record<string, unknown>) => void
}
