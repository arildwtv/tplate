'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTemplate = createTemplate;

var _indentString = require('indent-string');

var _indentString2 = _interopRequireDefault(_indentString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function createTemplate() {
  var indentation = arguments.length <= 0 || arguments[0] === undefined ? '  ' : arguments[0];

  var lineBreak = '\n';

  /**
   *
   * @param args
   * @returns {*}
   */
  function t() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var definedArgs = flatMap(args).filter(function (arg) {
      return typeof arg !== 'undefined';
    });

    var output = definedArgs.map(function (arg) {
      if (typeof arg === 'function') {
        return arg(createTemplate(indentation));
      }

      return arg;
    }, '');

    return output.join(lineBreak);
  }

  function indent() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var output = t.apply(undefined, args);
    return (0, _indentString2.default)(output, indentation, 1);
  }

  function map(array, mapHandler, emptyHandler) {
    var count = array.length;

    if (count === 0) {
      return emptyHandler ? emptyHandler() : undefined;
    }

    return array.map(function (item, index) {
      return mapHandler(item, createLineInfo(count, index));
    });
  }

  return {
    t: t,
    indent: indent,
    map: map
  };
}
