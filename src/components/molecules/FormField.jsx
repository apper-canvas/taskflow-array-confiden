import PropTypes from 'prop-types';
import Input from '@/components/atoms/Input';
import Text from '@/components/atoms/Text';

function FormField({ label, id, required, ...inputProps }) {
  return (
    &lt;div&gt;
      &lt;Text as="label" htmlFor={id} className="block text-sm font-medium text-surface-700 mb-2"&gt;
        {label} {required && &lt;span&gt;*&lt;/span&gt;}
      &lt;/Text&gt;
      &lt;Input id={id} required={required} {...inputProps} /&gt;
    &lt;/div&gt;
  );
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  required: PropTypes.bool,
  // Inherit all props from Input component
  ...Input.propTypes,
};

export default FormField;