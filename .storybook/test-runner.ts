import type { TestRunnerConfig } from '@storybook/test-runner'

declare const expect: typeof import ('@jest/globals').expect

const config: TestRunnerConfig = {
  async postVisit(page, _) {
    // the #storybook-root element wraps the story. In Storybook 6.x, the selector is #root
    const innerHTML = await page.locator('#storybook-root').innerHTML()
    expect(innerHTML).toMatchSnapshot()
  },
}

export default config
