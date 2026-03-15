import mixpanel, { Mixpanel } from 'mixpanel-browser'

import { Tracker } from 'types/tracking'

type MixpanelContext = {
  mixpanelInstance: Mixpanel
}

class MixpanelTracker implements Tracker {
  public name = 'mixpanel'
  private mixpanelInstance: MixpanelContext['mixpanelInstance']

  constructor(context: MixpanelContext) {
    this.mixpanelInstance = context.mixpanelInstance
  }

  getDistinctId() {
    return this.mixpanelInstance.get_distinct_id()
  }

  identify(userId: string) {
    mixpanel.identify(userId)
  }

  track(eventName: string, eventProperties?: Record<string, unknown>) {
    mixpanel.track(eventName, eventProperties)
  }
}

export default MixpanelTracker
