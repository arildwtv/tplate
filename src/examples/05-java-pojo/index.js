import { createTemplate } from '../../../dist';

import javaPojoSegment from './segments/java-pojo-segment';

const { t } = createTemplate();

// First we define package, class name, imports and properties.
const javaPackage = 'com.example.domain';
const className = 'Person';
const imports = [
  'java.util.Objects',
  'org.apache.commons.lang3.builder.ToStringBuilder'
];
const props = [
  { type: 'int', name: 'personId' },
  { type: 'String', name: 'firstName' },
  { type: 'String', name: 'lastName' }
];

// Use Java POJO segment.
const javaPojo = t(
  javaPojoSegment(javaPackage, imports, className, props)
);

console.log(javaPojo);
