import { createTemplate } from '../../../dist';

const { t } = createTemplate();

const name = 'World';

const output = t(
  `Hello ${name}`,
  'Why, hello to you, too!'
);

console.log(output);
