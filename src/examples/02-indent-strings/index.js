import { createTemplate } from '../../../dist';

const { t, indent } = createTemplate();

const output = t(
  'This is me',
  indent(
    'indented',
    'and this one, too'
  ),
  'Easy, huh?',
  indent(
    'this',
    indent(
      'is',
      indent(
        'recursive',
        indent(
          'by the way'
        )
      )
    )
  ),
  'Still pretty easy!'
);

console.log(output);
