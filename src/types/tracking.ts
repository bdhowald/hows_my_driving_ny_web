export type QueuedCall = {
  args: [string, Record<string, any>]
  method: 'identify' | 'trackEvent'
}

export interface Tracker {
  getDistinctId: () => string
  identify?: (userId: string, traits: Record<string, any>) => void
  name: string
  track?: (eventName: string, eventProperties: Record<string, any>) => void
}
