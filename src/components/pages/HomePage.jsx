import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { isToday, isPast } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Sidebar from '@/components/organisms/Sidebar';
import MainContent from '@/components/organisms/MainContent';
import taskService from '@/services/api/taskService';
import categoryService from '@/services/api/categoryService';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false);

  const loadData = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
      &lt;div className="h-screen flex overflow-hidden bg-app"&gt;
        {/* Sidebar skeleton */}
        &lt;div className="w-80 bg-white border-r border-surface-200 p-6"&gt;
          &lt;div className="animate-pulse space-y-4"&gt;
            &lt;div className="h-8 bg-surface-200 rounded w-3/4"&gt;&lt;/div&gt;
            &lt;div className="space-y-3"&gt;
              {[...Array(5)].map((_, i) => (
                &lt;div key={i} className="h-6 bg-surface-200 rounded"&gt;&lt;/div&gt;
              ))}
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
        
        {/* Main content skeleton */}
        &lt;div className="flex-1 overflow-y-auto p-8"&gt;
          &lt;div className="animate-pulse space-y-6"&gt;
            &lt;div className="h-12 bg-surface-200 rounded w-1/2"&gt;&lt;/div&gt;
            &lt;div className="space-y-4"&gt;
              {[...Array(6)].map((_, i) => (
                &lt;div key={i} className="h-20 bg-surface-200 rounded-lg"&gt;&lt;/div&gt;
              ))}
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    );
  }

  if (error) {
    return (
      &lt;div className="h-screen flex items-center justify-center bg-app"&gt;
        &lt;div className="text-center"&gt;
          &lt;ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" /&gt;
          &lt;Text as="h2" className="text-xl font-semibold text-surface-900 mb-2"&gt;Something went wrong&lt;/Text&gt;
          &lt;Text as="p" className="text-surface-600 mb-4"&gt;{error}&lt;/Text&gt;
          &lt;Button
            onClick={loadData}
            className="px-4 py-2 bg-primary text-white hover:bg-secondary"
          &gt;
            Try Again
          &lt;/Button&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    );
  }

  return (
    &lt;div className="h-screen flex overflow-hidden bg-app"&gt;
      &lt;Sidebar
        tasks={tasks}
        categories={categories}
        onAddTask={() => setShowCreateTaskForm(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      /&gt;
      
      &lt;MainContent
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
        showCreateTaskForm={showCreateTaskForm} // Pass down visibility state
        setShowCreateTaskForm={setShowCreateTaskForm} // Pass down setter for modals
      /&gt;
    &lt;/div&gt;
  );
}

export default HomePage;