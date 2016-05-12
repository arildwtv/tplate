import assert from 'assert';
import { createTemplate } from '../src';

describe('tplate', () => {
  describe('t', () => {
    it('returns output plainly when only one argument', () => {
      const { t } = createTemplate();
      const actual = t('Hello World!');

      assert.equal(actual, 'Hello World!');
    });

    it('returns line-breaked output when more than one argument', () => {
      const { t } = createTemplate();
      const actual = t('foo', 'bar', 'baz');

      assert.equal(actual, 'foo\nbar\nbaz');
    });

    it('ignores undefined arguments', () => {
      const { t } = createTemplate();

      const actual = t('foo', undefined, 'bar');

      assert.equal(actual, 'foo\nbar');
    });

    it('joins items in an array', () => {
      const { t } = createTemplate();

      const actual = t(['foo', 'bar']);

      assert.equal(actual, 'foo\nbar');
    });

    it('treats functions as template segments, calling each function with a new ' +
      'tplate instance as argument', () => {
      const { t } = createTemplate();

      const worldSegment = ({ t }) => t('World!');

      const actual = t('Hello', worldSegment, 'Test');

      assert.equal(actual, 'Hello\nWorld!\nTest');
    });

    it('flattens arguments', () => {
      const { t } = createTemplate();

      const worldSegment = ({ t }) => t('World!');

      const actual = t('Hello', [worldSegment, 'Another line'], 'And another');

      assert.equal(actual, 'Hello\nWorld!\nAnother line\nAnd another');
    });

    it('treats functions in arrays as template segments, calling each function with a new ' +
      'tplate instance as argument', () => {
      const { t } = createTemplate();

      const vsSegment = ({ t }) => t('V.S.');
      const dcSegment = ({ t }) => t('DC');

      const actual = t(['Marvel', vsSegment, dcSegment, '!']);

      assert.equal(actual, 'Marvel\nV.S.\nDC\n!');
    });
  });

  describe('indent', () => {
    it('returns output with an indentation of 2 spaces by default', () => {
      const { indent } = createTemplate();

      const actual = indent('foo', 'bar');

      assert.equal(actual, '  foo\n  bar');
    });

    it('returns recursively indented output', () => {
      const { t, indent } = createTemplate();

      const actual = t('foo', indent('bar', indent('baz')));

      assert.equal(actual, 'foo\n  bar\n    baz');
    });

    it('accepts other types of indentation', () => {
      const { t, indent } = createTemplate('>>');

      const actual = t('foo', indent('bar', indent('baz')));

      assert.equal(actual, 'foo\n>>bar\n>>>>baz');
    });

    it('does not indent empty lines', () => {
      const { indent } = createTemplate();

      const actual = indent('foo', '', 'bar');

      assert.equal(actual, '  foo\n\n  bar');
    });
  });

  describe('map', () => {
    it('calls empty handler if array is empty', () => {
      const { t, map } = createTemplate();

      const actual = t(map(
        [],
        fruit => `Fruit: ${fruit}`,
        () => 'No fruits!'));

      assert.equal(actual, 'No fruits!');
    });

    it('calls map handler for each item in array', () => {
      const { t, map } = createTemplate();

      const actual = t(map(
        ['apple', 'orange'],
        fruit => `Fruit: ${fruit}`,
        () => 'No fruits!'));

      assert.deepEqual(actual, 'Fruit: apple\nFruit: orange');
    });

    it('map handler receives a line info argument', () => {
      const { t, map } = createTemplate();

      const actual = t(map(
        [1, 2, 3],
        (item, lineInfo) =>
          `${item}, ${lineInfo.INDEX}, ${lineInfo.IS_FIRST}, ` +
          `${lineInfo.IS_LAST}, ${lineInfo.IS_EVEN}`,
        () => 'No items!'));

      assert.deepEqual(
        actual,
        '1, 0, true, false, false\n' +
        '2, 1, false, false, true\n' +
        '3, 2, false, true, false');
    });
  })
});