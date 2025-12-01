export const USER_SETTINGS_STORAGE_KEYS = {
  useNewStyleDisplay: 'useNewStyleDisplay',
}

const USER_SETTINGS = {
  display: {
    useCompactDisplay: {
      default: true,
      description: 'Show results in a mobile-friendly container',
      displayName: 'Use compact display',
      storageKey: USER_SETTINGS_STORAGE_KEYS.useNewStyleDisplay,
    },
  },
} as const

export default USER_SETTINGS
