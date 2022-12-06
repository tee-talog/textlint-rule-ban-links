# textlint-rule-ban-links

This rule bans links with URLs of the specified patterns.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-ban-links

## Usage

Via `.textlintrc`(Recommended)

```js
{
    "rules": {
        "ban-links": {
            // configure as you like
            patterns: ["^https?://localhost", "^C:", "/$"]
        }
    }
}
```

Via CLI

```
textlint --rule ban-links README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).

    npm test

## License

MIT © tee-talog
