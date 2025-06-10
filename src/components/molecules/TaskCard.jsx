import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { format, isToday, isPast } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';

function TaskCard({ task, category, onToggle, onDelete, index }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-accent text-white';
      case 'medium': return 'bg-warning text-white';
      case 'low': return 'bg-success text-white';
      default: return 'bg-surface-200 text-surface-700';
    }
  };

  const getTaskUrgency = (task) => {
    if (!task.dueDate) return null;
    const dueDate = new Date(task.dueDate);
    if (isPast(dueDate) && !isToday(dueDate)) return 'overdue';
    if (isToday(dueDate)) return 'today';
    return null;
  };

  const urgency = getTaskUrgency(task);

  return (
    &lt;motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`bg-white rounded-xl p-6 shadow-sm border border-surface-200 hover:shadow-md transition-all ${
        task.completed ? 'opacity-60' : ''
      }`}
    &gt;
      &lt;div className="flex items-start space-x-4"&gt;
        {/* Checkbox */}
        &lt;Button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(task.id)}
          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center p-0 transition-all ${
            task.completed
              ? 'bg-primary border-primary text-white'
              : 'border-surface-300 hover:border-primary'
          }`}
        &gt;
          {task.completed && (
            &lt;motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500 }}
            &gt;
              &lt;ApperIcon name="Check" size={16} /&gt;
            &lt;/motion.div&gt;
          )}
        &lt;/Button&gt;
        
        {/* Content */}
        &lt;div className="flex-1 min-w-0"&gt;
          &lt;div className="flex items-start justify-between mb-2"&gt;
            &lt;Text as="h3" className={`text-lg font-medium break-words ${
              task.completed ? 'line-through text-surface-500' : 'text-surface-900'
            }`} &gt;
              {task.title}
            &lt;/Text&gt;
            
            &lt;Button
              onClick={() => onDelete(task.id)}
              className="ml-2 p-1 text-surface-400 hover:text-error flex-shrink-0 bg-transparent shadow-none border-none"
            &gt;
              &lt;ApperIcon name="Trash2" size={16} /&gt;
            &lt;/Button&gt;
          &lt;/div&gt;
          
          {task.description && (
            &lt;Text as="p" className={`text-surface-600 mb-3 break-words ${
              task.completed ? 'line-through' : ''
            }`} &gt;
              {task.description}
            &lt;/Text&gt;
          )}
          
          &lt;div className="flex items-center justify-between"&gt;
            &lt;div className="flex items-center space-x-3"&gt;
              {/* Category */}
              {category && (
                &lt;div className="flex items-center space-x-2"&gt;
                  &lt;div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  &gt;&lt;/div&gt;
                  &lt;Text as="span" className="text-sm text-surface-600"&gt;{category.name}&lt;/Text&gt;
                &lt;/div&gt;
              )}
              
              {/* Priority */}
              &lt;Text as="span" className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`} &gt;
                {task.priority}
              &lt;/Text&gt;
            &lt;/div&gt;
            
            {/* Due Date */}
            {task.dueDate && (
              &lt;div className={`text-sm flex items-center space-x-1 ${
                urgency === 'overdue' ? 'text-accent font-medium' :
                urgency === 'today' ? 'text-warning font-medium' :
                'text-surface-500'
              }`} &gt;
                &lt;ApperIcon name="Calendar" size={14} /&gt;
                &lt;Text as="span"&gt;
                  {urgency === 'overdue' && 'Overdue: '}
                  {urgency === 'today' && 'Today: '}
                  {format(new Date(task.dueDate), 'MMM d, yyyy')}
                &lt;/Text&gt;
              &lt;/div&gt;
            )}
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/motion.div&gt;
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    categoryId: PropTypes.string,
    priority: PropTypes.string.isRequired,
    dueDate: PropTypes.string,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }),
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default TaskCard;