import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import plateTypes from 'constants/plateTypes'
import regions from 'constants/regions'

import SearchSelect from './SearchSelect'

const meta: Meta<typeof SearchSelect> = {
  title: 'Components/Search/SearchSelect',
  component: SearchSelect,
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron">
              <div className="row">
                <form className="form">
                  <div className="form-row">
                    <div className="col-md">
                      <div className="form-group">
                        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                        <Story />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof SearchSelect>

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

export const FormSelectComponent: Story = {
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
}

export const PlateTypes: Story = {
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
}

export const Regions: Story = {
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
}

export default meta
