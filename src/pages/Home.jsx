import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { format, isToday, isPast, isThisWeek } from 'date-fns';
import ApperIcon from '../components/ApperIcon';
import MainFeature from '../components/MainFeature';
import taskService from '../services/api/taskService';
import categoryService from '../services/api/categoryService';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message || 'Failed to load data');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks.filter(task => {
    // Search filter
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !task.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (selectedCategory && task.categoryId !== selectedCategory) {
      return false;
    }
    
    // Priority filter
    if (priorityFilter && task.priority !== priorityFilter) {
      return false;
    }
    
    // Status filter
    if (statusFilter === 'active' && task.completed) {
      return false;
    }
    if (statusFilter === 'completed' && !task.completed) {
      return false;
    }
    
    return true;
  });

  const todaysTasks = tasks.filter(task => 
    task.dueDate && isToday(new Date(task.dueDate)) && !task.completed
  );

  const overdueTasks = tasks.filter(task => 
    task.dueDate && isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate)) && !task.completed
  );

  const handleTaskToggle = async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      const updatedTask = await taskService.update(taskId, {
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      });
      
      setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
      
      if (updatedTask.completed) {
        toast.success('Task completed! 🎉');
      } else {
        toast.success('Task marked as active');
      }
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      setShowCreateForm(false);
      toast.success('Task created successfully!');
    } catch (err) {
      toast.error('Failed to create task');
    }
  };

  const handleCreateCategory = async (categoryData) => {
    try {
      const newCategory = await categoryService.create(categoryData);
      setCategories(prev => [...prev, newCategory]);
      toast.success('Category created successfully!');
    } catch (err) {
      toast.error('Failed to create category');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(t => t.id !== taskId));
      toast.success('Task deleted');
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex overflow-hidden bg-app">
        {/* Sidebar skeleton */}
        <div className="w-80 bg-white border-r border-surface-200 p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-surface-200 rounded w-3/4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-6 bg-surface-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main content skeleton */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-surface-200 rounded w-1/2"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-20 bg-surface-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-app">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-surface-900 mb-2">Something went wrong</h2>
          <p className="text-surface-600 mb-4">{error}</p>
          <button
            onClick={loadData}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-app">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-surface-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-surface-200">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-display font-bold text-surface-900">TaskFlow</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateForm(true)}
              className="p-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
            >
              <ApperIcon name="Plus" size={20} />
            </motion.button>
          </div>
          
          {/* Daily Overview */}
          <div className="space-y-4">
            <div className="bg-app p-4 rounded-lg">
              <h3 className="font-semibold text-surface-900 mb-2">Today</h3>
              <div className="text-2xl font-bold text-primary mb-1">{todaysTasks.length}</div>
              <div className="text-sm text-surface-600">tasks due today</div>
            </div>
            
            {overdueTasks.length > 0 && (
              <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-accent mb-2">Overdue</h3>
                <div className="text-2xl font-bold text-accent mb-1">{overdueTasks.length}</div>
                <div className="text-sm text-accent/80">tasks past due</div>
              </div>
            )}
          </div>
        </div>
        
        {/* Categories */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h3 className="font-semibold text-surface-900 mb-3">Categories</h3>
            <div className="space-y-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedCategory(null)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                  selectedCategory === null ? 'bg-primary text-white' : 'bg-surface-50 hover:bg-surface-100'
                }`}
              >
                <span>All Tasks</span>
                <span className="text-sm">{tasks.length}</span>
              </motion.button>
              
              {categories.map(category => {
                const taskCount = tasks.filter(t => t.categoryId === category.id).length;
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id ? 'bg-primary text-white' : 'bg-surface-50 hover:bg-surface-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span>{category.name}</span>
                    </div>
                    <span className="text-sm">{taskCount}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <MainFeature
          tasks={filteredTasks}
          categories={categories}
          onTaskToggle={handleTaskToggle}
          onCreateTask={handleCreateTask}
          onCreateCategory={handleCreateCategory}
          onDeleteTask={handleDeleteTask}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showCreateForm={showCreateForm}
          setShowCreateForm={setShowCreateForm}
        />
      </div>
    </div>
  );
}

export default Home;