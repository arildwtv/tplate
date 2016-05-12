function constructorSegment(props) {
  return ({ t, indent, map }) => t(
    'public Person(',
    map(props,
      (p, line) =>
        indent(`final ${p.type} ${p.name}${line.IS_LAST ? ') {' : ','}`),
      () => ') {'
    ),
    indent(
      map(props, p => `this.${p.name} = ${p.name};`)
    ),
    '}'
  );
}

export default constructorSegment;
