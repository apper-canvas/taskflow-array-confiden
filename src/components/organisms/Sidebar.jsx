import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { format, isToday, isPast } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import CategoryButton from '@/components/molecules/CategoryButton';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

function Sidebar({ tasks, categories, onAddTask, selectedCategory, onSelectCategory }) {
  const todaysTasks = tasks.filter(task =>
    task.dueDate && isToday(new Date(task.dueDate)) && !task.completed
  );

  const overdueTasks = tasks.filter(task =>
    task.dueDate && isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate)) && !task.completed
  );

  return (
    &lt;div className="w-80 bg-white border-r border-surface-200 flex flex-col"&gt;
      {/* Header */}
      &lt;div className="p-6 border-b border-surface-200"&gt;
        &lt;div className="flex items-center justify-between mb-6"&gt;
          &lt;Text as="h1" className="text-2xl font-display font-bold text-surface-900"&gt;TaskFlow&lt;/Text&gt;
          &lt;Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddTask}
            className="p-2 bg-primary text-white hover:bg-secondary"
          &gt;
            &lt;ApperIcon name="Plus" size={20} /&gt;
          &lt;/Button&gt;
        &lt;/div&gt;
        
        {/* Daily Overview */}
        &lt;div className="space-y-4"&gt;
          &lt;div className="bg-app p-4 rounded-lg"&gt;
            &lt;Text as="h3" className="font-semibold text-surface-900 mb-2"&gt;Today&lt;/Text&gt;
            &lt;Text className="text-2xl font-bold text-primary mb-1"&gt;{todaysTasks.length}&lt;/Text&gt;
            &lt;Text className="text-sm text-surface-600"&gt;tasks due today&lt;/Text&gt;
          &lt;/div&gt;
          
          {overdueTasks.length > 0 && (
            &lt;div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent"&gt;
              &lt;Text as="h3" className="font-semibold text-accent mb-2"&gt;Overdue&lt;/Text&gt;
              &lt;Text className="text-2xl font-bold text-accent mb-1"&gt;{overdueTasks.length}&lt;/Text&gt;
              &lt;Text className="text-sm text-accent/80"&gt;tasks past due&lt;/Text&gt;
            &lt;/div&gt;
          )}
        &lt;/div&gt;
      &lt;/div&gt;
      
      {/* Categories */}
      &lt;div className="flex-1 overflow-y-auto p-6"&gt;
        &lt;div className="mb-6"&gt;
          &lt;Text as="h3" className="font-semibold text-surface-900 mb-3"&gt;Categories&lt;/Text&gt;
          &lt;div className="space-y-2"&gt;
            &lt;CategoryButton
              isSelected={selectedCategory === null}
              onClick={onSelectCategory}
              taskCount={tasks.length}
            /&gt;
            
            {categories.map(category => {
              const taskCount = tasks.filter(t => t.categoryId === category.id).length;
              return (
                &lt;CategoryButton
                  key={category.id}
                  category={category}
                  isSelected={selectedCategory === category.id}
                  onClick={onSelectCategory}
                  taskCount={taskCount}
                /&gt;
              );
            })}
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
}

Sidebar.propTypes = {
  tasks: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  onAddTask: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string,
  onSelectCategory: PropTypes.func.isRequired,
};

export default Sidebar;