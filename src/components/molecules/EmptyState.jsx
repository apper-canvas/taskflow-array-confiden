import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

function EmptyState({ icon, title, description, buttonText, onButtonClick }) {
  return (
    &lt;div className="flex-1 flex items-center justify-center p-8"&gt;
      &lt;motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      &gt;
        &lt;motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        &gt;
          &lt;ApperIcon name={icon} className="w-16 h-16 text-surface-300 mx-auto" /&gt;
        &lt;/motion.div&gt;
        &lt;Text as="h3" className="mt-4 text-lg font-medium text-surface-900"&gt;{title}&lt;/Text&gt;
        &lt;Text className="mt-2 text-surface-500"&gt;{description}&lt;/Text&gt;
        {onButtonClick && (
          &lt;Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onButtonClick}
            className="mt-4 px-6 py-3 bg-primary text-white hover:bg-secondary"
          &gt;
            {buttonText}
          &lt;/Button&gt;
        )}
      &lt;/motion.div&gt;
    &lt;/div&gt;
  );
}

EmptyState.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
};

export default EmptyState;