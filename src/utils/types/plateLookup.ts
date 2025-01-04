import { PlateType } from 'constants/plateTypes'

type PlateLookup = {
  plateId: string | undefined
  plateType: PlateType | undefined
  state: string
}

export default PlateLookup
