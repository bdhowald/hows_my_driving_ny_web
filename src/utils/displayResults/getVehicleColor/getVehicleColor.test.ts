import getVehicleColor from './getVehicleColor'

describe('getVehicleColor', () => {
  test.each([
    // Blank
    {
      colorish: '',
      outputColor: 'Unknown Color',
    },

    // Not a color
    {
      colorish: 'Not a color',
      outputColor: 'Unknown Color',
    },

    // Black
    {
      colorish: 'BK',
      outputColor: 'Black',
    },
    {
      colorish: 'BK.',
      outputColor: 'Black',
    },
    {
      colorish: 'BLACK',
      outputColor: 'Black',
    },
    {
      colorish: 'BLK.',
      outputColor: 'Black',
    },

    // Black Gray
    {
      colorish: 'BKGY',
      outputColor: 'Black Gray',
    },

    // Blue
    {
      colorish: 'BL',
      outputColor: 'Blue',
    },
    {
      colorish: 'BL.',
      outputColor: 'Blue',
    },
    {
      colorish: 'BLU',
      outputColor: 'Blue',
    },
    {
      colorish: 'BLUE',
      outputColor: 'Blue',
    },

    // Brown
    {
      colorish: 'BN',
      outputColor: 'Brown',
    },
    {
      colorish: 'BR',
      outputColor: 'Brown',
    },
    {
      colorish: 'BRN',
      outputColor: 'Brown',
    },
    {
      colorish: 'BRO',
      outputColor: 'Brown',
    },
    {
      colorish: 'BROWN',
      outputColor: 'Brown',
    },

    // Dark Blue
    {
      colorish: 'DKBL',
      outputColor: 'Dark Blue',
    },

    // Dark Green
    {
      colorish: 'DKG',
      outputColor: 'Dark Green',
    },

    // Dark Green
    {
      colorish: 'DKGY',
      outputColor: 'Dark Gray',
    },

    // Gold
    {
      colorish: 'GL',
      outputColor: 'Gold',
    },
    {
      colorish: 'GO',
      outputColor: 'Gold',
    },
    {
      colorish: 'GOLD',
      outputColor: 'Gold',
    },

    // Gray
    {
      colorish: 'GRAY',
      outputColor: 'Gray',
    },
    {
      colorish: 'GREY',
      outputColor: 'Gray',
    },
    {
      colorish: 'GRY',
      outputColor: 'Gray',
    },
    {
      colorish: 'GY',
      outputColor: 'Gray',
    },
    {
      colorish: 'GY.',
      outputColor: 'Gray',
    },
    {
      colorish: 'GYGY',
      outputColor: 'Gray',
    },

    // Green
    {
      colorish: 'GR',
      outputColor: 'Green',
    },
    {
      colorish: 'GREEN',
      outputColor: 'Green',
    },
    {
      colorish: 'GRN',
      outputColor: 'Green',
    },

    // Light Gray
    {
      colorish: 'LTGY',
      outputColor: 'Light Gray',
    },

    // Light Green
    {
      colorish: 'LTG',
      outputColor: 'Light Green',
    },

    // Maroon
    {
      colorish: 'MAROON',
      outputColor: 'Maroon',
    },

    // Orange
    {
      colorish: 'OR',
      outputColor: 'Orange',
    },
    {
      colorish: 'ORANG',
      outputColor: 'Orange',
    },

    // Purple
    {
      colorish: 'PR',
      outputColor: 'Purple',
    },
    {
      colorish: 'PURPL',
      outputColor: 'Purple',
    },

    // Red
    {
      colorish: 'RD',
      outputColor: 'Red',
    },
    {
      colorish: 'RD.',
      outputColor: 'Red',
    },
    {
      colorish: 'RED',
      outputColor: 'Red',
    },
    {
      colorish: 'RED.',
      outputColor: 'Red',
    },

    // Silver
    {
      colorish: 'SIL',
      outputColor: 'Silver',
    },
    {
      colorish: 'SILVE',
      outputColor: 'Silver',
    },
    {
      colorish: 'SL',
      outputColor: 'Silver',
    },
    {
      colorish: 'SL.',
      outputColor: 'Silver',
    },

    // Tan
    {
      colorish: 'TAN',
      outputColor: 'Tan',
    },
    {
      colorish: 'TN',
      outputColor: 'Tan',
    },

    // White
    {
      colorish: 'W',
      outputColor: 'White',
    },
    {
      colorish: 'WH',
      outputColor: 'White',
    },
    {
      colorish: 'WH.',
      outputColor: 'White',
    },
    {
      colorish: 'WHITE',
      outputColor: 'White',
    },
    {
      colorish: 'WHT',
      outputColor: 'White',
    },
    {
      colorish: 'WT',
      outputColor: 'White',
    },
    {
      colorish: 'WT.',
      outputColor: 'White',
    },

    // White Blue
    {
      colorish: 'WHBL',
      outputColor: 'White Blue',
    },

    // White Gray
    {
      colorish: 'WHGY',
      outputColor: 'White Gray',
    },

    // Yellow
    {
      colorish: 'YELLO',
      outputColor: 'Yellow',
    },
    {
      colorish: 'YW',
      outputColor: 'Yellow',
    },

    // Unknown/Other
    {
      colorish: 'DK/',
      outputColor: 'Unknown Color',
    },
    {
      colorish: 'LT/',
      outputColor: 'Unknown Color',
    },
    {
      colorish: 'OTHER',
      outputColor: 'Unknown Color',
    },
    {
      colorish: 'UNKNO',
      outputColor: 'Unknown Color',
    },
  ])(
    'successfully detects $outputColor from $colorish',
    ({ colorish, outputColor }) => {
      const color = getVehicleColor(colorish)

      if (!color) {
        fail('color is not defined')
      }

      expect(color).toBe(outputColor)
    },
  )
})
