import TextLintTester from 'textlint-tester'
import rule from '../src/index'

const tester = new TextLintTester()
// ruleName, rule, { valid, invalid }

tester.run('ban-links', rule, {
  valid: ['plain text', '[text](https://example.com)'],
  invalid: [
    {
      text: '[text](http://example.com)',
      errors: [
        {
          message: 'Found link node.',
          range: [0, 26],
        },
      ],
    },
    {
      text: '[text](http://example.com/)',
      errors: [
        {
          message: 'Found link node.',
          range: [0, 27],
        },
      ],
    },
    {
      text: '[text](http://example.com/path/to/resource)',
      errors: [
        {
          message: 'Found link node.',
          range: [0, 43],
        },
      ],
    },
  ],
})

tester.run('rule', rule, {
  valid: [
    // no problem
    'text',
    {
      text: 'It is bugs, but it should be ignored',
      options: {
        allows: ['it should be ignored'],
      },
    },
  ],
  invalid: [
    // single match
    {
      text: 'It is bugs.',
      errors: [
        {
          message: 'Found bugs.',
          range: [6, 10],
        },
      ],
    },
    // multiple match
    {
      text: `It has many bugs.

One more bugs`,
      errors: [
        {
          message: 'Found bugs.',
          range: [12, 16],
        },
        {
          message: 'Found bugs.',
          range: [28, 32],
        },
      ],
    },
  ],
})
