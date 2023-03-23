/*
  (
    propName; css property name camelCased
    alias: optional prop name alias (i.e. direction="row")
  ) => (props) => prop to css mapping (condiitonal on existence of prop)
*/
function mapCssProp(propName, alias) {
  const hyphenProp = propName.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
  return (props) => {
    if (!!alias ? props[alias] : props[propName]) {
      return `
        ${hyphenProp}: ${!!alias ? props[alias] : props[propName]};
      `;
    }
  };
}

export default mapCssProp;
