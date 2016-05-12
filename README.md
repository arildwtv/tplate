# tplate

<blockquote>The tiny, pure-function template engine.</blockquote>

## What ...?

_tplate_ is basically a set of pure Javascript functions easing your process of creating templates.

Template engines largely rely on some sort of custom markup (which may be good enough in many cases), but there are
certain issues related to templating, such as consistent indentation and conditional joins on arrays with variable
lengths.

_tplate_ remedies this by providing a small set of pure functions aimed at fixing these problems.

## Installation

```
npm install tplate --save
```

## Usage

See the [examples](https://github.com/arildwtv/tplate/tree/master/src/examples) folder for  examples.

Also, please see the [unit tests](https://github.com/arildwtv/tplate/tree/master/test/tplateTest.js) for
the expected behavior of this library.

### The Basics

```javascript
import { createTemplate } from 'tplate';
// ES5: var createTemplate = require('tplate').createTemplate;

const { t } = createTemplate();
const output = t('Hello', 'World!');
// =>
// Hello
// World!
```

### Indentation

```javascript
const { t, indent } = createTemplate();

const output = t(
  'Please',
  indent(
    'Can',
    'You',
    'Indent',
    indent('Me?'))
);

// =>
// Please
//   Can
//   You
//   Indent
//     Me?
```

### Arrays

Arguments are flattened, making it easier for you to accommodate for variable number of lines (i.e. arrays).

```js
const { t } = createTemplate();

const output = t(
  'My list of items',
  ['foo', 'bar'],
  'Done!'
);

// Same as:
const output2 = t(
  'My list of items',
  'foo',
  'bar',
  'Done!'
);

// =>
// My list of items
// foo
// bar
// Done!
```

### Arrays and Indentation

Arrays may of course be provided in `indent` functions as well. This time, for the sake of (a trite) example, we create
a template for a dumb logging function:

```js
const { t, indent } = createTemplate();

const args = ['foo', 'bar'];

const output = t(
  `function myLogFunc(${args.join(', ')}) {`,
  indent(
    args.map(a => `console.log('${a}', ${a});`)
  ),
  '}'
);

// =>
// function myLogFunc(foo, bar) {
//   console.log('foo', foo);
//   console.log('bar', bar);
// }
```

### Componentization

Everyone likes componentization. _tplate_ likes it, too. In the context of _tplate_, a component is called a _segment_.
A segment should be a pure function, receiving a template instance, like this:

```js
function helloSegment({ t }) {
  return t('Hello!');
}
```

Optionally, to make your segment more reusable, you may curry it with your desired parameters, like this recipe for a
Hello World segment example, parameterized by name:

```js
function helloNameSegment(name) {
  return ({ t }) => t('Hello', name);
}
```

You may use your segments like this:

```js
// function helloSegment() {}
// function helloNameSegment() {}

const { t, indent } = createTemplate();

const output = t(
  'First example:',
  helloSegment,
  'Second example (indented):',
  indent(helloNameSegment('Vikram'))
);

// =>
// First example:
// Hello!
// Second example indented:
//   Hello
//   Vikram
```

A thorough example with segments is the Java POJO template example -
[go check it out](https://github.com/arildwtv/tplate/tree/master/src/examples/05-java-pojo)!

## API

### `createTemplate(indentation = '  ')`

Creates a template instance with the following properties: `t` and `indent`.

When creating the instance, you may override the sequence of characters that represents an indentation (defaults to
2 spaces).

### `t(...args): String`

Concatenates the values of the arguments to actual lines.

`args` is a variable number of arguments, and the `t` component will concatenate the values of these arguments to
actual lines.

For convenience, the function flattens all arguments into a one-dimensional-array (see example under Usage).

An argument in the `args` list can be either of:

* `String`: In this case, `t` will simply register the string as a line. However, if the `String` contains any line
breaks, `t` generates the corresponding number of lines.
* `Function`: In this case, `t` considers this argument a _segment_ and will call it, giving it a new template instance
as its first and only argument. This is how componentization works in _tplate_ (see Componentization).
* `Array`: `t`will in this case just flatten it with the rest of the arguments. This means that the array may contain
both `String`s and `Function`s (segments).

### `indent(...args): String`

Works exactly like the `t` function, but also indents each line that `args` produces, one level.

## License

[MIT](http://opensource.org/licenses/MIT) © Arild Tvergrov
