import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

function TaskFilters({
  searchQuery,
  setSearchQuery,
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
}) {
  const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  const priorityOptions = [
    { value: null, label: 'All' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  return (
    &lt;div className="flex flex-wrap items-center gap-4"&gt;
      {/* Search */}
      &lt;div className="relative flex-1 min-w-64"&gt;
        &lt;ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={20} /&gt;
        &lt;Input
          id="task-search"
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-3"
        /&gt;
      &lt;/div&gt;
      
      {/* Status Filter */}
      &lt;div className="flex bg-surface-100 rounded-lg p-1"&gt;
        {statusOptions.map(status => (
          &lt;Button
            key={status.value}
            onClick={() => setStatusFilter(status.value)}
            className={`px-4 py-2 rounded-md text-sm font-medium p-0 bg-transparent shadow-none border-none ${
              statusFilter === status.value
                ? 'bg-white text-primary shadow-sm'
                : 'text-surface-600 hover:text-surface-900'
            }`}
          &gt;
            {status.label}
          &lt;/Button&gt;
        ))}
      &lt;/div&gt;
      
      {/* Priority Filter */}
      &lt;div className="flex bg-surface-100 rounded-lg p-1"&gt;
        {priorityOptions.map(priority => (
          &lt;Button
            key={priority.value}
            onClick={() => setPriorityFilter(priority.value)}
            className={`px-3 py-2 rounded-md text-sm font-medium p-0 bg-transparent shadow-none border-none ${
              priorityFilter === priority.value
                ? 'bg-white text-primary shadow-sm'
                : 'text-surface-600 hover:text-surface-900'
            }`}
          &gt;
            {priority.label}
          &lt;/Button&gt;
        ))}
      &lt;/div&gt;
    &lt;/div&gt;
  );
}

TaskFilters.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  priorityFilter: PropTypes.string,
  setPriorityFilter: PropTypes.func.isRequired,
  statusFilter: PropTypes.string.isRequired,
  setStatusFilter: PropTypes.func.isRequired,
};

export default TaskFilters;