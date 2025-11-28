import React, { createContext, useEffect, useState, ReactNode } from 'react'

import {
  MIXPANEL_IDLE_TIMEOUT_MILLISECONDS,
  MIXPANEL_RECORD_SESSIONS_PERCENT,
} from 'constants/tracking'
import mixpanel, { Mixpanel } from 'mixpanel-browser'
import MixpanelTracker from 'utils/analytics/trackers/mixpanel'
import AnalyticsTracker from 'utils/analytics/tracking'

interface ApplicationContextType {
  tracker: AnalyticsTracker | undefined
}

const initialState: ApplicationContextType = {
  tracker: undefined,
}

export const ApplicationContext =
  createContext<ApplicationContextType>(initialState)

const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [tracker] = useState<AnalyticsTracker | undefined>(
    new AnalyticsTracker(['mixpanel']),
  )

  const applicationContext = {
    tracker,
  }

  useEffect(() => {
    mixpanel.init('f8491ce35ed8262c61e16e6b6abb83b3', {
      loaded: (mixpanel: Mixpanel) => {
        const mixpanelTracker = new MixpanelTracker({
          mixpanelInstance: mixpanel,
        })

        tracker?.addTracker('mixpanel', mixpanelTracker)
      },
      record_idle_timeout_ms: MIXPANEL_IDLE_TIMEOUT_MILLISECONDS,
      record_mask_text_selector: '', // nothing here is secret or PII
      record_sessions_percent: MIXPANEL_RECORD_SESSIONS_PERCENT,
      track_pageview: 'url-with-path-and-query-string',
    })
  }, [])

  return (
    <ApplicationContext.Provider value={applicationContext}>
      {children}
    </ApplicationContext.Provider>
  )
}

export default ApplicationProvider
