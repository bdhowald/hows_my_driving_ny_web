/** @type { import('@storybook/react').Preview } */

import React from 'react'

import SettingsProvider from 'context/SettingsContext/SettingsContext'

import 'bootstrap/dist/css/bootstrap.min.css'

import 'App.css'
import 'index.css'
import 'view/Pages/FAQs/FAQs.css'
import 'view/Pages/Updates/Updates.css'
import 'view/Pages/VehicleLookup/Search/Search.css'
import 'view/Pages/VehicleLookup/VehicleLookup.css'
import 'view/Pages/VehicleLookup/VehicleResults/FiltersControl/FilterMenu/FilterMenu.css'
import 'view/Pages/VehicleLookup/VehicleResults/FiltersControl/FiltersControl.css'
import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/Body/Body.css'
import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/FinesBreakdown/CombinedViolationsFinesBreakdown/CombinedViolationsFinesBreakdown.css'
import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/FinesBreakdown/SingleViolationFinesBreakdown/SingleViolationFinesBreakdown.css'
import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/Header/Header.css'
import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/Header/RefreshLookupButton/RefreshLookupButton.css'
import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/LookupInfo/LookupInfo.css'
import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/LookupInfo/PlateInfo/PlateInfo.css'
import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/LookupInfo/ViolationSummary/ViolationSummary.css'
import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/Notices/Notices.css'
import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/VehicleResult.css'
import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationCardList/ViolationCard/ViolationCard.css'
import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationCardList/ViolationCardGroup/ViolationCardGroup.css'
import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationCardList/ViolationCardList.css'
import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationCardList/ViolationCardListControls/ViolationCardListControls.css'
import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationCardList/ViolationCardListSortControls/ViolationCardListSortControls.css'
import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationCardList/ViolationDetail/ViolationDetail.css'
import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationsInspector.css'
import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationsList/ViolationsList.css'
import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationsList/ViolationsTableBody/ViolationsTableBody.css'
import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationsList/ViolationsTableHeader/ViolationsTableHeader.css'
import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationsListControls/ViolationsListControls.css'
import 'view/Pages/VehicleLookup/VehicleResults/VehicleResults.css'
import 'view/components/Footer/Footer.css'
import 'view/components/Navigation/Navigation.css'
import 'view/components/SiteContainer/SiteContainer.css'


const preview = {
  decorators: [
    (Story) => (
      <SettingsProvider>
        <Story />
      </SettingsProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
