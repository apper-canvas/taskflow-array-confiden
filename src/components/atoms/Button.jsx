import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

function Button({ children, className = '', onClick, type = 'button', whileHover, whileTap, disabled, ...props }) {
  const Component = whileHover || whileTap ? motion.button : 'button';

  return (
    <Component
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${className}`}
      whileHover={whileHover}
      whileTap={whileTap}
      disabled={disabled}
      {...props}
    >
      {children}
    </Component>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  whileHover: PropTypes.object,
  whileTap: PropTypes.object,
  disabled: PropTypes.bool,
};

export default Button;