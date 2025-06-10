import PropTypes from 'prop-types';

function Input({ label, id, type = 'text', className = '', ...props }) {
  const commonProps = {
    id,
    className: `w-full px-3 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors ${className}`,
    ...props,
  };

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return &lt;textarea {...commonProps} /&gt;;
      case 'select':
        return (
          &lt;select {...commonProps}&gt;
            {props.options.map(option => (
              &lt;option key={option.value} value={option.value}&gt;
                {option.label}
              &lt;/option&gt;
            ))}
          &lt;/select&gt;
        );
      default:
        return &lt;input type={type} {...commonProps} /&gt;;
    }
  };

  return renderInput();
}

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.number, // For textarea
  options: PropTypes.arrayOf(PropTypes.shape({ // For select
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
};

export default Input;