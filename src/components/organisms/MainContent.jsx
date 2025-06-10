import { useState } from 'react';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import TaskFilters from '@/components/organisms/TaskFilters';
import TaskList from '@/components/organisms/TaskList';
import TaskCreateForm from '@/components/organisms/TaskCreateForm';
import CategoryCreateForm from '@/components/organisms/CategoryCreateForm';
import EmptyState from '@/components/molecules/EmptyState';

function MainContent({
  tasks,
  categories,
  onTaskToggle,
  onCreateTask,
  onCreateCategory,
  onDeleteTask,
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
  searchQuery,
  setSearchQuery,
}) {
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false);
  const [showCreateCategoryForm, setShowCreateCategoryForm] = useState(false);

  // Check if any filters are active
  const areFiltersActive = searchQuery || priorityFilter || statusFilter !== 'all';
  const hasTasks = tasks.length > 0;

  return (
    &lt;div className="flex-1 flex flex-col overflow-hidden"&gt;
      {/* Header */}
      &lt;div className="bg-white border-b border-surface-200 p-6"&gt;
        &lt;div className="flex items-center justify-between mb-6"&gt;
          &lt;Text as="h2" className="text-2xl font-display font-bold text-surface-900"&gt;Tasks&lt;/Text&gt;
          &lt;div className="flex items-center space-x-3"&gt;
            &lt;Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateCategoryForm(true)}
              className="px-4 py-2 bg-surface-100 text-surface-700 hover:bg-surface-200 text-sm"
            &gt;
              &lt;ApperIcon name="FolderPlus" size={16} className="inline mr-2" /&gt;
              New Category
            &lt;/Button&gt;
            &lt;Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateTaskForm(true)}
              className="px-4 py-2 bg-primary text-white hover:bg-secondary"
            &gt;
              &lt;ApperIcon name="Plus" size={16} className="inline mr-2" /&gt;
              New Task
            &lt;/Button&gt;
          &lt;/div&gt;
        &lt;/div&gt;
        
        {/* Search and Filters */}
        &lt;TaskFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        /&gt;
      &lt;/div&gt;
      
      {/* Task List or Empty State */}
      {hasTasks ? (
        &lt;TaskList
          tasks={tasks}
          categories={categories}
          onTaskToggle={onTaskToggle}
          onDeleteTask={onDeleteTask}
        /&gt;
      ) : (
        &lt;EmptyState
          icon={areFiltersActive ? "Search" : "CheckSquare"}
          title={areFiltersActive ? "No tasks found" : "No tasks yet"}
          description={areFiltersActive ? "Try adjusting your search or filters" : "Get started by creating your first task"}
          buttonText={!areFiltersActive ? "Create Task" : null}
          onButtonClick={!areFiltersActive ? () => setShowCreateTaskForm(true) : null}
        /&gt;
      )}
      
      {/* Modals */}
      &lt;TaskCreateForm
        isOpen={showCreateTaskForm}
        onClose={() => setShowCreateTaskForm(false)}
        onSubmit={onCreateTask}
        categories={categories}
      /&gt;
      
      &lt;CategoryCreateForm
        isOpen={showCreateCategoryForm}
        onClose={() => setShowCreateCategoryForm(false)}
        onSubmit={onCreateCategory}
      /&gt;
    &lt;/div&gt;
  );
}

MainContent.propTypes = {
  tasks: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  onTaskToggle: PropTypes.func.isRequired,
  onCreateTask: PropTypes.func.isRequired,
  onCreateCategory: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  priorityFilter: PropTypes.string,
  setPriorityFilter: PropTypes.func.isRequired,
  statusFilter: PropTypes.string.isRequired,
  setStatusFilter: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default MainContent;