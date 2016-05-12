function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getterSegment(prop, { IS_LAST }) {
  return ({ t, indent }) => t(
    `public ${prop.type} get${capitalize(prop.name)}() {`,
    indent(
      `return this.${prop.name};`
    ),
    `} ${IS_LAST ? '' : '\n'}`
  );
}

export default getterSegment;
