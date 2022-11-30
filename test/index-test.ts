import TextLintTester from 'textlint-tester'
import rule from '../src/index'

const tester = new TextLintTester()

tester.run('ban-links', rule, {
  valid: [
    'plain text',
    '[no patterns](http://example.com)',
    {
      text: '[no match patterns](https://example.com)',
      options: {
        patterns: ['^http://', '^file:', '^C:'],
      },
    },
  ],
  invalid: [
    {
      text: '[match patterns](http://example.com)',
      options: {
        patterns: ['^http://'],
      },
      errors: [
        {
          message: 'Match an pattern banned URLs.',
          range: [0, 36],
        },
      ],
    },
    {
      text: `multiline
[match](http://example.com/)`,
      options: {
        patterns: ['^http://'],
      },
      errors: [
        {
          message: 'Match an pattern banned URLs.',
          range: [20, 48],
        },
      ],
    },
    {
      text: '[windows like file path](C:\\\\Users)',
      options: {
        patterns: ['^http://', '^file:', '^C:'],
      },
      errors: [
        {
          message: 'Match an pattern banned URLs.',
          range: [0, 35],
        },
      ],
    },
  ],
})
