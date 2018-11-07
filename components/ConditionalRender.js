export const ConditionalRender = ({ show, children, ...props }) => {
  if (show === false) return null;
  return children;
}
