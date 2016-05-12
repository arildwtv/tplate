function hashCodeSegment(props) {
  return ({ t, indent, map }) => t(
    '@Override',
    'public int hashCode() {',
    indent(
      'return Objects.hash(',
      indent(
        map(props,
          (prop, { IS_LAST }) => `${prop.name}${IS_LAST ? ');' : ','}`,
          () => ');')
      )
    ),
    '}'
  );
}

export default hashCodeSegment;
