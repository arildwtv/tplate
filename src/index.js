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
   *
   * @param args
   * @returns {*}
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

  function indent(...args) {
    const output = t.apply(undefined, args);
    return indentString(output, indentation, 1);
  }

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

