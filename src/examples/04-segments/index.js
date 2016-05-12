import { createTemplate } from '../../../dist';
import listSegment from './list-segment';

const { t, indent } = createTemplate();

const items = ['laptop', 'coffee', 'sleep'];

const output = t(
  'Hi!',
  'These are my absolute necessities (with segments):',
  indent(
    listSegment(items)
  ),
  'Done!'
);

console.log(output);
