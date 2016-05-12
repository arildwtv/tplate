import indentString from 'indent-string';

function flatMap(array, mapHandler) {
  return Array.prototype.concat.apply([], mapHandler ? array.map(mapHandler) : array);
}

function createLineInfo(count, index) {
  return {
    INDEX: index,
    IS_LAST: index === count - 1,
    IS_FIRST: index === 0,
    IS_EVEN: (index + 1) % 2 === 0
  };
}

/**
 * Creates a template instance.
 * @param indentation {String} The character sequence representing an indentation.
 * @returns {{t: t, indent: indent, map: map}}
 */
export function createTemplate(indentation = '  ') {
  const lineBreak = '\n';

  /**
   * Concatenates the values of the arguments to actual lines.
   * @param args The arguments.
   * @returns {String} The concatenated values.
   */
  function t(...args) {
    const definedArgs = flatMap(args)
      .filter(arg => typeof arg !== 'undefined');

    const output = definedArgs
      .map(arg => {
        if (typeof arg === 'function') {
          return arg(createTemplate(indentation));
        }

        return arg;
      },
      ''
    );

    return output.join(lineBreak);
  }

  /**
   * Works exactly like the t function, but also indents each line that args produces, one level
   * @param args The arguments.
   * @returns {String} The indented, concatenated values.
   */
  function indent(...args) {
    const output = t.apply(undefined, args);
    return indentString(output, indentation, 1);
  }

  /**
   * Utility mapping function. Works just like map, but wraps the map handler, giving it a utility
   * object for determining the position of the current line (first, last, even, etc). If the array
   * is empty, an optional handler may be executed.
   * @param array {Array} The array to map.
   * @param mapHandler {Function} The map handler, receiving each item and a line info object.
   * @param emptyHandler {Function} Optional. The handler that is called if the array is empty.
   * @returns {Array} The mapped array.
   */
  function map(array, mapHandler, emptyHandler) {
    const count = array.length;

    if (count === 0) {
      return emptyHandler ? emptyHandler() : undefined;
    }

    return array.map((item, index) =>
      mapHandler(item, createLineInfo(count, index)));
  }

  return {
    t,
    indent,
    map
  };
}

