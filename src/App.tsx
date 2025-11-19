import * as React from 'react'
import { CookiesProvider } from 'react-cookie'
import { Routes, Route } from 'react-router-dom'

import ApplicationProvider from 'context/ApplicationContext'
import FAQs from 'view/Pages/FAQs/FAQs'
import SiteContainer from 'view/components/SiteContainer/SiteContainer'
import Updates from 'view/Pages/Updates/Updates'
import VehicleLookup from 'view/Pages/VehicleLookup/VehicleLookup'

const App = () => {
  return (
    <CookiesProvider>
      <ApplicationProvider>
        <SiteContainer>
          <Routes>
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/:uniqueIdentifier" element={<VehicleLookup />} />
            <Route path="/" element={<VehicleLookup />} />
          </Routes>
        </SiteContainer>
      </ApplicationProvider>
    </CookiesProvider>
  )
}

export default App
