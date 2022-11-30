import { TextlintRuleModule } from '@textlint/types'

export interface Options {
  patterns?: (string | RegExp)[]
}

const report: TextlintRuleModule<Options> = (context, options = {}) => {
  const { Syntax, RuleError, report, locator } = context
  const patterns = options.patterns ?? []
  const regexps = patterns.map((p) => new RegExp(p))

  return {
    [Syntax.Link](node) {
      // When node's URLs match the patterns specified in the options, reports an Error.
      if (regexps.some((r) => r.test(node.url))) {
        const ruleError = new RuleError('Match an pattern banned URLs.', {
          padding: locator.range(node.range),
        })
        report(node, ruleError)
      }
    },
  }
}

export default report
