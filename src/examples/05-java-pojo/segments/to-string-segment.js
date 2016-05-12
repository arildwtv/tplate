function toStringSegment(props) {
  return ({ t, indent, map }) => t(
    '@Override',
    'public String toString() {',
    indent(
      'return new ToStringBuilder(this)',
      indent(
        map(props, (prop, { IS_LAST }) =>
          `.append("${prop.name}", ${prop.name})${IS_LAST ? ';' : ''}`)
      )
    ),
    '}'
  );
}

export default toStringSegment;
