import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

const initialNewTaskState = {
  title: '',
  description: '',
  categoryId: '',
  priority: 'medium',
  dueDate: ''
};

function TaskCreateForm({ isOpen, onClose, onSubmit, categories }) {
  const [newTask, setNewTask] = useState(initialNewTaskState);

  useEffect(() => {
    if (!isOpen) {
      setNewTask(initialNewTaskState); // Reset form when closed
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    onSubmit({
      ...newTask,
      dueDate: newTask.dueDate ? new Date(newTask.dueDate).toISOString() : null
    });
    onClose(); // Close modal after submission
  };

  return (
    &lt;AnimatePresence&gt;
      {isOpen && (
        &lt;&gt;
          &lt;motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          /&gt;
          &lt;motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          &gt;
            &lt;div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"&gt;
              &lt;Text as="h3" className="text-lg font-semibold text-surface-900 mb-4"&gt;Create New Task&lt;/Text&gt;
              
              &lt;form onSubmit={handleSubmit} className="space-y-4"&gt;
                &lt;FormField
                  label="Title"
                  id="task-title"
                  name="title"
                  type="text"
                  value={newTask.title}
                  onChange={handleInputChange}
                  placeholder="Task title"
                  required
                /&gt;
                
                &lt;FormField
                  label="Description"
                  id="task-description"
                  name="description"
                  type="textarea"
                  value={newTask.description}
                  onChange={handleInputChange}
                  placeholder="Task description"
                  rows={3}
                /&gt;
                
                &lt;div className="grid grid-cols-2 gap-4"&gt;
                  &lt;FormField
                    label="Category"
                    id="task-category"
                    name="categoryId"
                    type="select"
                    value={newTask.categoryId}
                    onChange={handleInputChange}
                    options={[
                      { value: '', label: 'No category' },
                      ...categories.map(cat => ({ value: cat.id, label: cat.name }))
                    ]}
                  /&gt;
                  
                  &lt;FormField
                    label="Priority"
                    id="task-priority"
                    name="priority"
                    type="select"
                    value={newTask.priority}
                    onChange={handleInputChange}
                    options={[
                      { value: 'low', label: 'Low' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'high', label: 'High' }
                    ]}
                  /&gt;
                &lt;/div&gt;
                
                &lt;FormField
                  label="Due Date"
                  id="task-dueDate"
                  name="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={handleInputChange}
                /&gt;
                
                &lt;div className="flex justify-end space-x-3 pt-4"&gt;
                  &lt;Button
                    type="button"
                    onClick={onClose}
                    className="text-surface-600 hover:text-surface-800 bg-transparent shadow-none border-none"
                  &gt;
                    Cancel
                  &lt;/Button&gt;
                  &lt;Button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary text-white hover:bg-secondary"
                  &gt;
                    Create Task
                  &lt;/Button&gt;
                &lt;/div&gt;
              &lt;/form&gt;
            &lt;/div&gt;
          &lt;/motion.div&gt;
        &lt;/&gt;
      )}
    &lt;/AnimatePresence&gt>
  );
}

TaskCreateForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  })).isRequired,
};

export default TaskCreateForm;