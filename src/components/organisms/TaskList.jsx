import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import TaskCard from '@/components/molecules/TaskCard';
import Text from '@/components/atoms/Text';
import ApperIcon from '@/components/ApperIcon';

function TaskList({ tasks, categories, onTaskToggle, onDeleteTask }) {
  if (tasks.length === 0) {
    return (
      &lt;div className="text-center py-12"&gt;
        &lt;ApperIcon name="Search" className="w-12 h-12 text-surface-300 mx-auto mb-4" /&gt;
        &lt;Text as="h3" className="text-lg font-medium text-surface-900 mb-2"&gt;No tasks found&lt;/Text&gt;
        &lt;Text as="p" className="text-surface-500"&gt;Try adjusting your search or filters&lt;/Text&gt;
      &lt;/div&gt;
    );
  }

  return (
    &lt;div className="flex-1 overflow-y-auto p-6"&gt;
      &lt;div className="space-y-4 max-w-full"&gt;
        &lt;AnimatePresence&gt;
          {tasks.map((task, index) => {
            const category = categories.find(c => c.id === task.categoryId);
            return (
              &lt;TaskCard
                key={task.id}
                task={task}
                category={category}
                onToggle={onTaskToggle}
                onDelete={onDeleteTask}
                index={index}
              /&gt;
            );
          })}
        &lt;/AnimatePresence&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  onTaskToggle: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default TaskList;