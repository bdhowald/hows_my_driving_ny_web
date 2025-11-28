import React, { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import plateTypes from 'constants/plateTypes'
import regions from 'constants/regions'
import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator'

import SearchSelect from './SearchSelect'

const meta: Meta<typeof SearchSelect> = {
  title: 'Components/Search/SearchControls/SearchSelect',
  component: SearchSelect,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof SearchSelect>

const ParentHtml = ({
  children,
  useNewStyleDisplay,
}: {
  children: ReactNode
  useNewStyleDisplay: boolean
}) => {
  const newStyleDisplayClassName = useNewStyleDisplay ? 'new-style' : ''

  return (
    <div className="site-container-wrapper">
      <div className="site-container container-fluid">
        <main>
          <div className="row">
            <div
              className={`col-md-12 vehicle-lookup-content-container ${newStyleDisplayClassName}`}
            >
              <div className={`jumbotron ${newStyleDisplayClassName}`}>
                <div className="row">
                  <form className="form">
                    <div className="form-row">
                      <div className="col-md">
                        <div className="form-group">{children}</div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

const baseballSelectChoices: [string, string][] = [
  ['CHC', 'Chicago Cubs'],
  ['LAD', 'Los Angeles Dodgers'],
  ['NYM', 'New York Mets'],
]

const baseballSelectOptions = baseballSelectChoices.map(
  (choice: [string, string]) => (
    <option key={choice[0]} value={choice[0]}>
      {choice[1]}
    </option>
  ),
)

const plateTypeSelectOptions = Object.entries(plateTypes).map(
  ([name, info]) => (
    <option key={name} value={name}>
      {info.displayName}
    </option>
  ),
)

const regionSelectOptions = regions.map(
  (region: { code: string; name: string }) => (
    <option key={region.code} value={region.code}>
      {`${region.name} (${region.code})`}
    </option>
  ),
)

export const FormSelectComponentNewStyleDisplay: Story = {
  args: {
    currentLookup: {
      plateId: undefined,
      plateType: 'none',
      state: 'NY',
    },
    handleChange: () =>
      alert('this function would handle a change to the select'),
    label: 'Baseball Team',
    selectOptions: baseballSelectOptions,
    valueKey: 'plateType',
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const FormSelectComponentOldStyleDisplay: Story = {
  args: {
    currentLookup: {
      plateId: undefined,
      plateType: 'none',
      state: 'NY',
    },
    handleChange: () =>
      alert('this function would handle a change to the select'),
    label: 'Baseball Team',
    selectOptions: baseballSelectOptions,
    valueKey: 'plateType',
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const PlateTypesNewStyleDisplay: Story = {
  args: {
    currentLookup: {
      plateId: undefined,
      plateType: 'none',
      state: 'NY',
    },
    handleChange: () =>
      alert('this function would handle a change to the select'),
    label: 'Plate Types',
    selectOptions: plateTypeSelectOptions,
    valueKey: undefined,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const PlateTypesOldStyleDisplay: Story = {
  args: {
    currentLookup: {
      plateId: undefined,
      plateType: 'none',
      state: 'NY',
    },
    handleChange: () =>
      alert('this function would handle a change to the select'),
    label: 'Plate Types',
    selectOptions: plateTypeSelectOptions,
    valueKey: undefined,
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const RegionsNewStyleDisplay: Story = {
  args: {
    currentLookup: {
      plateId: undefined,
      plateType: 'none',
      state: 'NY',
    },
    handleChange: () =>
      alert('this function would handle a change to the select'),
    label: 'Plate Types',
    selectOptions: regionSelectOptions,
    valueKey: 'state',
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const RegionsOldStyleDisplay: Story = {
  args: {
    currentLookup: {
      plateId: undefined,
      plateType: 'none',
      state: 'NY',
    },
    handleChange: () =>
      alert('this function would handle a change to the select'),
    label: 'Plate Types',
    selectOptions: regionSelectOptions,
    valueKey: 'state',
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export default meta
