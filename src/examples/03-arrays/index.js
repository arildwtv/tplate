import { createTemplate } from '../../../dist';

const { t, indent } = createTemplate();

const items = ['laptop', 'coffee', 'sleep'];

const output = t(
  'Hi!',
  'These are my absolute necessities:',
  indent(
    items.map((item, index) => `${index + 1}) ${item}`)
  ),
  'Done!'
);

console.log(output);
