import { vi } from 'vitest'
import '@testing-library/jest-dom/vitest'

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/vitest'

Object.defineProperty(window, 'matchMedia', {
  get: function () {
    return vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  },
})

HTMLCanvasElement.prototype.getContext = function (
  this: HTMLCanvasElement,
  contextId: string
): unknown {
  // A base object that satisfies the minimum properties libraries check for (like .canvas)
  const baseContext = {
    canvas: this,
  }

  if (contextId === '2d') {
    const mockContext: Partial<CanvasRenderingContext2D> = {
      ...baseContext,
    }

    return mockContext as CanvasRenderingContext2D
  }

  if (contextId === 'webgl' || contextId === 'experimental-webgl') {
    const mockWebGL: Partial<WebGLRenderingContext> = {
      ...baseContext,
    }
    return mockWebGL as WebGLRenderingContext
  }

  return null
} as typeof HTMLCanvasElement.prototype.getContext
