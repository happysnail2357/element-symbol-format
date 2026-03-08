# Element Symbol Format

Capitalizes a string so the letters match the chemical element symbols found
on the [Periodic Table](https://wikipedia.org/wiki/Periodic_table). For example, the string "Case one" will be formatted
as "CaSe ONe":

- `Ca` > [Calcium](https://wikipedia.org/wiki/Calcium)
- `Se` > [Selenium](https://wikipedia.org/wiki/Selenium)
- `O`  > [Oxygen](https://wikipedia.org/wiki/Oxygen)
- `Ne` > [Neon](https://wikipedia.org/wiki/Neon)


## Installation

Install using npm:

`$ npm i element-symbol-format`

## Usage

### Import

Import the `element-symbol-format` package in your code.

```javascript
// ESM
import { elementSymbolFormat } from 'element-symbol-format';

// CJS
const { elementSymbolFormat } = require('element-symbol-format');
```

### Format Strings

Pass your strings to the `elementSymbolFormat` function.

```javascript
const result = elementSymbolFormat('I snack on chocolate');

// The result is an array of formatted words.

console.log(result.length) // 4

// You can get the entire result at once...

console.log(result.toString()); // I SnAcK ON CHoCoLaTe
console.log(result.toSymbols()); // [ 'I', ' ', 'Sn', 'Ac', 'K', ' ', 'O',  'N', ... ]

// ...or access each word individually

console.log(result[3].toString()); // CHoCoLaTe
console.log(result[3].toSymbols()); // [ 'C', 'Ho', 'Co', 'La', 'Te' ]
```

### Handling Formatting Failures

Unfortunately, many common words can't be represented completely with element symbols.
Make sure to check the `isFormatted` field before using the result.

```javascript
const result = elementSymbolFormat('Learn how to fail intelligently ~ Charles Kettering')

console.log(result.isFormatted) // false

console.log(result[2].isFormatted) // true
console.log(result[4].isFormatted) // false

console.log(result[4].formatted.toString()) // InTe
console.log(result[4].unformatted) // lligently
```

### Options

The behavior of the formatter can be customized by passing an object as
a parameter to `elementSymbolFormat`.

```javascript
const defaultOptions = {
  // The input string will be split on every occurrence of "split".
  // If "split" is an empty string, the input string will not be split.
  "split": ' ',
  
  // The input string will be split at every non-letter.
  // If set to true, this overrides "split".
  "strictSplit": false,
  
  // Prefer single-letter element symbols when possible.
  "preferSingleSymbols": false,
  
  // Remove non-letters from the input string.
  "stripNonLetters": true,
  
  // The string used to join the formatted words together into a string.
  // If not defined, then "split" will be used.
  "join": undefined,
}

const result = elementSymbolFormat('Pass options here ->', defaultOptions)
```
