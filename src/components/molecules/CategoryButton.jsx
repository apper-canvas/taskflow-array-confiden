import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';

function CategoryButton({ category, isSelected, taskCount, onClick }) {
  return (
    &lt;motion.button
      whileHover={{ scale: 1.02 }}
      onClick={() => onClick(category ? category.id : null)}
      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
        isSelected ? 'bg-primary text-white' : 'bg-surface-50 hover:bg-surface-100'
      }`}
    &gt;
      &lt;div className="flex items-center space-x-3"&gt;
        {category && (
          &lt;div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: category.color }}
          &gt;&lt;/div&gt;
        )}
        &lt;Text as="span"&gt;{category ? category.name : 'All Tasks'}&lt;/Text&gt;
      &lt;/div&gt;
      &lt;Text as="span" className="text-sm"&gt;{taskCount}&lt;/Text&gt;
    &lt;/motion.button&gt;
  );
}

CategoryButton.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }),
  isSelected: PropTypes.bool.isRequired,
  taskCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CategoryButton;