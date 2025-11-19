import React, { createContext, useState, ReactNode } from 'react'

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

  return (
    <ApplicationContext.Provider value={applicationContext}>
      {children}
    </ApplicationContext.Provider>
  )
}

export default ApplicationProvider
