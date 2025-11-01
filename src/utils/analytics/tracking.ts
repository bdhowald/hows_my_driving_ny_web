import { QueuedCall, Tracker } from 'types/tracking'

class AnalyticsTracker {
  private analyticsCallQueue: QueuedCall[] = []
  private isTrackerReady: boolean = false
  private expectedTrackers: Set<string>
  private trackers: Map<string, Tracker> = new Map()

  constructor(inputExpectedTrackers: string[]) {
    this.expectedTrackers = new Set(inputExpectedTrackers)
  }

  addTracker(trackerName: string, tracker: Tracker) {
    this.trackers.set(trackerName, tracker)

    if (
      [...this.expectedTrackers].every((trackerName) =>
        this.trackers.has(trackerName),
      )
    ) {
      this.beginTracking()
    }
  }

  beginTracking() {
    if (!this.isTrackerReady) {
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

  getDistinctId(trackerName: string): string | undefined {
    if (!this.isTrackerReady) {
      return
    }

    const tracker = this.trackers.get(trackerName)
    if (!tracker) {
      return
    }
    return tracker.getDistinctId()
  }

  identify(userId: string, traits: Record<string, any> = {}) {
    if (!this.isTrackerReady) {
      this.analyticsCallQueue.push({
        args: [userId, traits],
        method: 'identify',
      })
    }

    this.trackers.forEach((tracker) => {
      if (tracker.identify) {
        tracker.identify(userId, traits)
      }
    })
  }

  trackEvent(eventName: string, eventProperties: Record<string, any> = {}) {
    if (!this.isTrackerReady) {
      this.analyticsCallQueue.push({
        args: [eventName, eventProperties],
        method: 'trackEvent',
      })
    }

    this.trackers.forEach((tracker) => {
      if (tracker.track) {
        tracker.track(eventName, eventProperties)
      }
    })
  }
}

export default AnalyticsTracker
