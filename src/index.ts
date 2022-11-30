import { TextlintRuleModule } from '@textlint/types'

export interface Options {
  // If node's text includes allowed text, does not report.
  allows?: string[]
}

const report: TextlintRuleModule<Options> = (context, options = {}) => {
  const { Syntax, RuleError, report, getSource, locator } = context
  const allows = options.allows ?? []
  return {
    [Syntax.Str](node) {
      // "Str" node
      const text = getSource(node) // Get text
      if (allows.some((allow) => text.includes(allow))) {
        return
      }
      const matches = text.matchAll(/bugs/g)
      for (const match of matches) {
        const index = match.index ?? 0
        const matchRange = [index, index + match[0].length] as const
        const ruleError = new RuleError('Found bugs.', {
          padding: locator.range(matchRange),
        })
        report(node, ruleError)
      }
    },

    [Syntax.Link](node) {
      // http://example.com が来たらエラーとする
      if (new RegExp('^http://example.com').test(node.url)) {
        const ruleError = new RuleError('Found link node.', {
          padding: locator.range(node.range),
        })
        report(node, ruleError)
      }
      // TODO もし許可されていないリンクが来たら
    },
  }
}

export default report
