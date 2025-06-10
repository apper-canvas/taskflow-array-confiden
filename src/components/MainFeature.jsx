import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isToday, isPast } from 'date-fns';
import ApperIcon from './ApperIcon';

function MainFeature({
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
  showCreateForm,
  setShowCreateForm
}) {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    categoryId: '',
    priority: 'medium',
    dueDate: ''
  });
  const [newCategory, setNewCategory] = useState({
    name: '',
    color: '#5B4CFF'
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    
    onCreateTask({
      ...newTask,
      dueDate: newTask.dueDate ? new Date(newTask.dueDate).toISOString() : null
    });
    
    setNewTask({
      title: '',
      description: '',
      categoryId: '',
      priority: 'medium',
      dueDate: ''
    });
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!newCategory.name.trim()) return;
    
    onCreateCategory(newCategory);
    setNewCategory({ name: '', color: '#5B4CFF' });
    setShowCategoryForm(false);
  };

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

  if (tasks.length === 0 && !searchQuery && !priorityFilter && statusFilter === 'all') {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <ApperIcon name="CheckSquare" className="w-16 h-16 text-surface-300 mx-auto" />
          </motion.div>
          <h3 className="mt-4 text-lg font-medium text-surface-900">No tasks yet</h3>
          <p className="mt-2 text-surface-500">Get started by creating your first task</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateForm(true)}
            className="mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
          >
            Create Task
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-surface-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-surface-900">Tasks</h2>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCategoryForm(true)}
              className="px-4 py-2 bg-surface-100 text-surface-700 rounded-lg hover:bg-surface-200 transition-colors text-sm"
            >
              <ApperIcon name="FolderPlus" size={16} className="inline mr-2" />
              New Category
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateForm(true)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
            >
              <ApperIcon name="Plus" size={16} className="inline mr-2" />
              New Task
            </motion.button>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-64">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={20} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
            />
          </div>
          
          {/* Status Filter */}
          <div className="flex bg-surface-100 rounded-lg p-1">
            {['all', 'active', 'completed'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-surface-600 hover:text-surface-900'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Priority Filter */}
          <div className="flex bg-surface-100 rounded-lg p-1">
            <button
              onClick={() => setPriorityFilter(null)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                priorityFilter === null
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-surface-600 hover:text-surface-900'
              }`}
            >
              All
            </button>
            {['high', 'medium', 'low'].map(priority => (
              <button
                key={priority}
                onClick={() => setPriorityFilter(priority)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  priorityFilter === priority
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-surface-600 hover:text-surface-900'
                }`}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Task List */}
      <div className="flex-1 overflow-y-auto p-6">
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <ApperIcon name="Search" className="w-12 h-12 text-surface-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-surface-900 mb-2">No tasks found</h3>
            <p className="text-surface-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-4 max-w-full">
            <AnimatePresence>
              {tasks.map((task, index) => {
                const category = categories.find(c => c.id === task.categoryId);
                const urgency = getTaskUrgency(task);
                
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`bg-white rounded-xl p-6 shadow-sm border border-surface-200 hover:shadow-md transition-all ${
                      task.completed ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Checkbox */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onTaskToggle(task.id)}
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                          task.completed
                            ? 'bg-primary border-primary text-white'
                            : 'border-surface-300 hover:border-primary'
                        }`}
                      >
                        {task.completed && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500 }}
                          >
                            <ApperIcon name="Check" size={16} />
                          </motion.div>
                        )}
                      </motion.button>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`text-lg font-medium break-words ${
                            task.completed ? 'line-through text-surface-500' : 'text-surface-900'
                          }`}>
                            {task.title}
                          </h3>
                          
                          <button
                            onClick={() => onDeleteTask(task.id)}
                            className="ml-2 p-1 text-surface-400 hover:text-error transition-colors flex-shrink-0"
                          >
                            <ApperIcon name="Trash2" size={16} />
                          </button>
                        </div>
                        
                        {task.description && (
                          <p className={`text-surface-600 mb-3 break-words ${
                            task.completed ? 'line-through' : ''
                          }`}>
                            {task.description}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {/* Category */}
                            {category && (
                              <div className="flex items-center space-x-2">
                                <div 
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: category.color }}
                                ></div>
                                <span className="text-sm text-surface-600">{category.name}</span>
                              </div>
                            )}
                            
                            {/* Priority */}
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>
                          
                          {/* Due Date */}
                          {task.dueDate && (
                            <div className={`text-sm flex items-center space-x-1 ${
                              urgency === 'overdue' ? 'text-accent font-medium' :
                              urgency === 'today' ? 'text-warning font-medium' :
                              'text-surface-500'
                            }`}>
                              <ApperIcon name="Calendar" size={14} />
                              <span>
                                {urgency === 'overdue' && 'Overdue: '}
                                {urgency === 'today' && 'Today: '}
                                {format(new Date(task.dueDate), 'MMM d, yyyy')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
      
      {/* Create Task Modal */}
      <AnimatePresence>
        {showCreateForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowCreateForm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                <h3 className="text-lg font-semibold text-surface-900 mb-4">Create New Task</h3>
                
                <form onSubmit={handleCreateTask} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={newTask.title}
                      onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      placeholder="Task title"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newTask.description}
                      onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      placeholder="Task description"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Category
                      </label>
                      <select
                        value={newTask.categoryId}
                        onChange={(e) => setNewTask(prev => ({ ...prev, categoryId: e.target.value }))}
                        className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      >
                        <option value="">No category</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Priority
                      </label>
                      <select
                        value={newTask.priority}
                        onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                        className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="px-4 py-2 text-surface-600 hover:text-surface-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
                    >
                      Create Task
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Create Category Modal */}
      <AnimatePresence>
        {showCategoryForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowCategoryForm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
                <h3 className="text-lg font-semibold text-surface-900 mb-4">Create New Category</h3>
                
                <form onSubmit={handleCreateCategory} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      placeholder="Category name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Color
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={newCategory.color}
                        onChange={(e) => setNewCategory(prev => ({ ...prev, color: e.target.value }))}
                        className="w-12 h-10 border border-surface-200 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={newCategory.color}
                        onChange={(e) => setNewCategory(prev => ({ ...prev, color: e.target.value }))}
                        className="flex-1 px-3 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        placeholder="#5B4CFF"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCategoryForm(false)}
                      className="px-4 py-2 text-surface-600 hover:text-surface-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
                    >
                      Create Category
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MainFeature;