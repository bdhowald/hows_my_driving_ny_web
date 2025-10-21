import { QueuedCall, Tracker } from 'types/tracking'

class AnalyticsTracker {
  private analyticsCallQueue: QueuedCall[] = []
  private isTrackerReady: boolean = false
  private trackers: Map<string, Tracker> = new Map()

  addTracker(trackerName: string, tracker: Tracker) {
    this.trackers.set(trackerName, tracker)
  }

  beginTracking() {
    if(!this.isTrackerReady) {
      this.isTrackerReady = true
      this.flushQueuedEvents()
    }
  }

  flushQueuedEvents() {
    while (this.analyticsCallQueue.length > 0) {
      const { args, method } = this.analyticsCallQueue.pop()!
      if (this[method] && typeof this[method] === 'function') {
        this[method](...args)
      }
    }
  }

  getDistinctId(trackerName :string): string | undefined {
    const tracker = this.trackers.get(trackerName)
    if (!tracker) {
      return
    }
    return tracker.getDistinctId()
  }

  identify(userId: string, traits: Record<string, any> = {}) {
    this.trackers.forEach(tracker => {
      if (tracker.identify) {
        tracker.identify(userId, traits)
      }
    })
  }

  trackEvent(eventName: string, eventProperties: Record<string, any> = {}) {
    this.trackers.forEach(tracker => {
      if (tracker.track) {
        tracker.track(eventName, eventProperties)
      }
    })
  }
}

export default AnalyticsTracker