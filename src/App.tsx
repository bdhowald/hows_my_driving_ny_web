import * as React from 'react'

import { CookiesProvider } from 'react-cookie'

import { Routes, Route } from 'react-router-dom'

import FetchViolations from 'view/FetchViolations/FetchViolations'

const App = () => {
  return (
    <CookiesProvider>
      <Routes>
        <Route path="/:uniqueIdentifier" element={<FetchViolations />} />
        <Route path="/" element={<FetchViolations />} />
      </Routes>
    </CookiesProvider>
  )
}

export default App
