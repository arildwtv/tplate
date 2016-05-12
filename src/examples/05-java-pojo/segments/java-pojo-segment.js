import constructorSegment from './constructor-segment';
import getterSegment from './getter-segment';
import equalsSegment from './equals-segment';
import hashCodeSegment from './hash-code-segment';
import toStringSegment from './to-string-segment';

export default function javaPojoSegment(javaPackage, imports, className, props) {
  return ({ t, indent, map }) => t(
    `package ${javaPackage};`,
    '',
    imports.map(importedClass => `import ${importedClass};`),
    '',
    `public class ${className} {`,
    '',
    indent(
      props.map(p => `private final ${p.type} ${p.name};`),
      '',
      constructorSegment(props),
      '',
      map(props, getterSegment),
      '',
      equalsSegment(className, props),
      '',
      hashCodeSegment(props),
      '',
      toStringSegment(props)
    ),
    '}',
    ''
  );
}
