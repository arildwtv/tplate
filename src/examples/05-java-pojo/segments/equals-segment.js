function equalsSegment(className, props) {
  return ({ t, indent, map }) => t(
    '@Override',
    'public boolean equals() {',
    indent(
      'if (this == o) return true;',
      'if (o == null || getClass() != o.getClass()) return false;',
      `final ${className} that = (${className}) o;`,
      'return',
      indent(
        map(
          props,
          (prop, { IS_LAST }) =>
            `Objects.equals(${prop.name}, that.${prop.name})${IS_LAST ? ';' : ' && '}`,
          () => 'false;'
        )
      )
    ),
    '}'
  );
}

export default equalsSegment;
