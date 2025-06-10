import PropTypes from 'prop-types';

function Text({ as: Component = 'p', className = '', children, ...props }) {
  return (
    &lt;Component className={className} {...props}&gt;
      {children}
    &lt;/Component&gt;
  );
}

Text.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Text;