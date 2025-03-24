import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'

import { APPLE_SEARCH_PREFIX, GOOGLE_SEARCH_PREFIX } from 'constants/endpoints'
import Violation from 'models/Violation/Violation'
import getRegionFromAbbreviation from 'utils/displayResults/getRegionFromAbbreviation/getRegionFromAbbreviation'
import getVehicleBodyType from 'utils/displayResults/getVehicleBodyType/getVehicleBodyType'
import getVehicleColor from 'utils/displayResults/getVehicleColor/getVehicleColor'
import getVehicleMake from 'utils/displayResults/getVehicleMake/getVehicleMake'
import standardizeLocation from 'utils/displayResults/standardizeLocation/standardizeLocation'
import FinesBreakdown from 'view/VehicleResults/FinesBreakdown/FinesBreakdown'

const IOS_USER_AGENT_STRING = /iPad|iPhone|iPod/
const SMALL_BREAKPOINT = 576

type ToggleOffCanvasFunction = () => void

const ViolationDataSourceLink = ({
  fromDatabases,
  summonsNumber,
}: {
  fromDatabases: Violation['fromDatabases']
  summonsNumber: Violation['summonsNumber']
}) => (
  <ViolationDetailAspect header={'Data Sources'}>
    <ul>
      {fromDatabases.map((fromDatabase, index) => (
        <li key={index}>
          <a
            href={getOpenDataUrlForSummons(
              fromDatabase.endpoint,
              summonsNumber,
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            {fromDatabase.name}
          </a>
        </li>
      ))}
    </ul>
  </ViolationDetailAspect>
)

const ViolationLocationLink = ({ violation }: { violation: Violation }) => {
  const locationDescription = violation.getLocationDescription()
  const potentialBorough = violation.getBorough()
  const borough = potentialBorough === 'N/A' ? null : potentialBorough

  if (!locationDescription && borough) {
    return (
      <ViolationDetailAspect header={'Location'}>
        <>{violation.violationCounty}</>
      </ViolationDetailAspect>
    )
  }

  if (!locationDescription) {
    return (
      <ViolationDetailAspect header={'Location'}>
        <>Not available</>
      </ViolationDetailAspect>
    )
  }

  const isiOS = IOS_USER_AGENT_STRING.test(navigator.userAgent)

  const searchMapsQueryStringBase = isiOS
    ? APPLE_SEARCH_PREFIX
    : GOOGLE_SEARCH_PREFIX

  const searchMapsQueryString =
    `${searchMapsQueryStringBase}${standardizeLocation.standardizeLinkedSearchLocation(
      violation.getLocationDescription(),
    )} ${violation.getBorough()}`.replace(/ /g, '+')

  const fullLocation = `${standardizeLocation.standardizeDisplayedLocation(violation.getLocationDescription())} (${violation.getBorough()})`

  return (
    <ViolationDetailAspect header={'Location'}>
      <a href={searchMapsQueryString} target="_blank" rel="noopener noreferrer">
        {fullLocation}
      </a>
    </ViolationDetailAspect>
  )
}

const SummonsImage = ({ violation }: { violation: Violation }) => {
  if (violation.isCameraViolation()) {
    return (
      <ViolationDetailAspect header={'Summons Image'}>
        <>Not available for camera summons</>
      </ViolationDetailAspect>
    )
  }
  if (!violation.summonsImage?.url || violation.isCameraViolation()) {
    return (
      <ViolationDetailAspect header={'Summons Image'}>
        <>Not available</>
      </ViolationDetailAspect>
    )
  }
  const url = violation.summonsImage.url

  return (
    <ViolationDetailAspect header={'Summons Image'}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        See summons image
      </a>
    </ViolationDetailAspect>
  )
}

const ViolationDetailAspect = ({
  children,
  header,
}: {
  header: string
  children: JSX.Element
}) => (
  <div className="violation-info-aspect">
    <div className="violation-info-aspect-header">{header}</div>
    <div className="violation-info-aspect-body">{children}</div>
  </div>
)

const getOpenDataUrlForSummons = (url: string, summonsNumber: string) =>
  `${url}?$where=summons_number=${summonsNumber}`

const ViolationDetail = ({
  hideOffCanvas,
  showViolationDetail,
  violationToInspect,
}: {
  hideOffCanvas: ToggleOffCanvasFunction
  showViolationDetail: boolean
  violationToInspect: Violation | null
}) => {
  if (!violationToInspect) {
    return <></>
  }

  const getVehicleDescriptionString = (): string => {
    const allVehicleAspectFields = [
      violationToInspect.vehicleColor,
      violationToInspect.vehicleYear,
      violationToInspect.vehicleMake,
      violationToInspect.vehicleBodyType,
    ].filter((x) => !!x)

    if (allVehicleAspectFields.length === 0) {
      return 'Not available'
    }

    const vehicleColor = getVehicleColor(violationToInspect.vehicleColor)
    const vehicleBodyType = getVehicleBodyType(
      violationToInspect.vehicleBodyType,
    )
    const vehicleMake = getVehicleMake(violationToInspect.vehicleMake)
    const vehicleYear = parseInt(violationToInspect.vehicleYear ?? '')

    if (isNaN(vehicleYear) || vehicleYear === 0) {
      return [vehicleColor, vehicleMake, vehicleBodyType]
        .filter((x) => !!x)
        .join(' ')
    }

    return [vehicleColor, vehicleYear, vehicleMake, vehicleBodyType]
      .filter((x) => !!x)
      .join(' ')
  }

  const region = getRegionFromAbbreviation(violationToInspect.registrationState)
  const regionNameOrAbbreviation =
    region?.name ?? violationToInspect.registrationState

  const pageWidth = window.innerWidth
  const offCanvasPlacement = pageWidth >= SMALL_BREAKPOINT ? 'start' : 'bottom'

  return (
    <Offcanvas
      show={showViolationDetail}
      placement={offCanvasPlacement}
      onHide={hideOffCanvas}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          Summons #
          <span className="summons-number">
            {violationToInspect.summonsNumber}
          </span>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="violation-info">
          <ViolationDetailAspect header={'Time'}>
            <>{violationToInspect.getViolationDateTime()}</>
          </ViolationDetailAspect>
          <ViolationLocationLink violation={violationToInspect} />
          <ViolationDetailAspect header={'Violation'}>
            {violationToInspect.humanizedDescription ? (
              <>{violationToInspect.humanizedDescription}</>
            ) : (
              <>Not available</>
            )}
          </ViolationDetailAspect>
          <ViolationDetailAspect header={'Plate'}>
            <>
              {regionNameOrAbbreviation} {violationToInspect.plateId} (
              {violationToInspect.plateType})
            </>
          </ViolationDetailAspect>
          <ViolationDetailAspect header={'Vehicle'}>
            <>{getVehicleDescriptionString()}</>
          </ViolationDetailAspect>
          <ViolationDetailAspect header={'Fines'}>
            <div className="fines-breakdown-wrapper">
              <FinesBreakdown.SingleViolationFinesBreakdown
                dueAmount={violationToInspect.amountDue}
                fineAmount={violationToInspect.fineAmount}
                interestAmount={violationToInspect.interestAmount}
                isViolationInJudgment={!!violationToInspect.judgmentEntryDate}
                paymentAmount={violationToInspect.paymentAmount}
                penaltyAmount={violationToInspect.penaltyAmount}
                reductionAmount={violationToInspect.reductionAmount}
                showFullFineData={true}
              />
            </div>
          </ViolationDetailAspect>
          <SummonsImage violation={violationToInspect} />
          <ViolationDataSourceLink
            fromDatabases={violationToInspect.fromDatabases}
            summonsNumber={violationToInspect.summonsNumber}
          />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

ViolationDetail.displayname = 'ViolationDetail'

export default ViolationDetail
