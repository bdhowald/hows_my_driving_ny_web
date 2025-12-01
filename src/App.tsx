import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { Routes, Route } from 'react-router-dom'

import ApplicationProvider from 'context/ApplicationContext/ApplicationContext'
import SettingsProvider from 'context/SettingsContext/SettingsContext'
import FAQs from 'view/Pages/FAQs/FAQs'
import SiteContainer from 'view/components/SiteContainer/SiteContainer'
import Updates from 'view/Pages/Updates/Updates'
import UserSettings from 'view/Pages/UserSettings/UserSettings'
import VehicleLookup from 'view/Pages/VehicleLookup/VehicleLookup'

const App = () => (
  <CookiesProvider>
    <ApplicationProvider>
      <SettingsProvider>
        <SiteContainer>
          <Routes>
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/settings" element={<UserSettings />} />
            <Route path="/:uniqueIdentifier" element={<VehicleLookup />} />
            <Route path="/" element={<VehicleLookup />} />
          </Routes>
        </SiteContainer>
      </SettingsProvider>
    </ApplicationProvider>
  </CookiesProvider>
)

export default App
