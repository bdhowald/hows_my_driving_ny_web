/** @type { import('@storybook/react-vite').Preview } */

import SettingsProvider from '../src/context/SettingsContext/SettingsContext'

import 'bootstrap/dist/css/bootstrap.min.css'

import '../src/App.css'
import '../src/index.css'
import '../src/view/Pages/FAQs/FAQs.css'
import '../src/view/Pages/Updates/Updates.css'
import '../src/view/Pages/VehicleLookup/Search/Search.css'
import '../src/view/Pages/VehicleLookup/VehicleLookup.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/FiltersControl/FilterMenu/FilterMenu.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/FiltersControl/FiltersControl.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/VehicleResult/Body/Body.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/VehicleResult/FinesBreakdown/CombinedViolationsFinesBreakdown/CombinedViolationsFinesBreakdown.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/VehicleResult/FinesBreakdown/SingleViolationFinesBreakdown/SingleViolationFinesBreakdown.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/VehicleResult/Header/Header.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/VehicleResult/Header/RefreshLookupButton/RefreshLookupButton.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/VehicleResult/LookupInfo/LookupInfo.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/VehicleResult/LookupInfo/PlateInfo/PlateInfo.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/VehicleResult/LookupInfo/ViolationSummary/ViolationSummary.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/VehicleResult/Notices/Notices.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/VehicleResult/VehicleResult.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationCardList/ViolationCard/ViolationCard.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationCardList/ViolationCardGroup/ViolationCardGroup.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationCardList/ViolationCardList.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationCardList/ViolationCardListControls/ViolationCardListControls.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationCardList/ViolationCardListSortControls/ViolationCardListSortControls.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationCardList/ViolationDetail/ViolationDetail.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationsInspector.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationsList/ViolationsList.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationsList/ViolationsTableBody/ViolationsTableBody.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationsList/ViolationsTableHeader/ViolationsTableHeader.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationsListControls/ViolationsListControls.css'
import '../src/view/Pages/VehicleLookup/VehicleResults/VehicleResults.css'
import '../src/view/components/Footer/Footer.css'
import '../src/view/components/Navigation/Navigation.css'
import '../src/view/components/SiteContainer/SiteContainer.css'


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
