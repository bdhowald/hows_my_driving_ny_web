import Color from 'constants/colors'

const getVehicleColor = (colorish: string | undefined): Color => {
  switch (colorish) {
    case 'BK':
    case 'BK.':
    case 'BLACK':
    case 'BLK.':
      return Color.BLACK

    case 'BKGY':
      return Color.BLACK_GRAY

    case 'BL':
    case 'BL.':
    case 'BLU':
    case 'BLUE':
      return Color.BLUE

    case 'BN':
    case 'BR':
    case 'BRN':
    case 'BRO':
    case 'BROWN':
      return Color.BROWN

    case 'DKBL':
      return Color.DARK_BLUE

    case 'DKG':
      return Color.DARK_GREEN

    case 'DKGY':
      return Color.DARK_GRAY

    case 'GL':
    case 'GO':
    case 'GOLD':
      return Color.GOLD

    case 'GRAY':
    case 'GREY':
    case 'GRY':
    case 'GY':
    case 'GY.':
    case 'GYGY':
      return Color.GRAY

    case 'GR':
    case 'GREEN':
    case 'GRN':
      return Color.GREEN

    case 'LTG':
      return Color.LIGHT_GREEN

    case 'LTGY':
      return Color.LIGHT_GRAY

    case 'MAROON':
      return Color.MAROON

    case 'OR':
    case 'ORANG':
      return Color.ORANGE

    case 'PR':
    case 'PURPL':
      return Color.PURPLE

    case 'RD':
    case 'RD.':
    case 'RED':
    case 'RED.':
      return Color.RED

    case 'SIL':
    case 'SILVE':
    case 'SL':
    case 'SL.':
      return Color.SILVER

    case 'TAN':
    case 'TN':
      return Color.TAN

    case 'W':
    case 'WH':
    case 'WH.':
    case 'WHITE':
    case 'WHT':
    case 'WT':
    case 'WT.':
      return Color.WHITE

    case 'WHBL':
      return Color.WHITE_BLUE

    case 'WHGY':
      return Color.WHITE_GRAY

    case 'YELLO':
    case 'YW':
      return Color.YELLOW

    case 'DK/':
    case 'LT/':
    case 'OTHER':
    case 'UNKNO':
      return Color.UNKNOWN_COLOR

    default:
      return Color.UNKNOWN_COLOR
  }
}

export default getVehicleColor
