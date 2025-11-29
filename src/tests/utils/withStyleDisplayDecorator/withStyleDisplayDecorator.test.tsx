import React, { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'

import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from './withStyleDisplayDecorator'

describe('withStyleDisplayDecorator', () => {
  test.each([
    {
      decoratorFunction: newStyleDisplayDecorator,
    },
    {
      decoratorFunction: oldStyleDisplayDecorator,
    },
  ])(
    '$decoratorFunction should accept a parent html component and generate a decorator function',
    ({ decoratorFunction }) => {
      const parentText = 'This is a parent'
      const storyText = 'This is the story'

      const ParentHtml = ({ children }: { children: ReactNode }) => (
        <div>
          {parentText}
          {children}
        </div>
      )

      const decorator = decoratorFunction(ParentHtml)
      expect(typeof decorator).toBe('function')

      const StoryFunction = () => <div>{storyText}</div>

      const StoryComponent = () => StoryFunction()

      const jsx = decorator(StoryComponent, { args: {} } as any)

      render(jsx)

      expect(screen.getByText(parentText)).toBeInTheDocument()
      expect(screen.getByText(storyText)).toBeInTheDocument()
    },
  )
})
