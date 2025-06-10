import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

const initialNewCategoryState = {
  name: '',
  color: '#5B4CFF'
};

function CategoryCreateForm({ isOpen, onClose, onSubmit }) {
  const [newCategory, setNewCategory] = useState(initialNewCategoryState);

  useEffect(() => {
    if (!isOpen) {
      setNewCategory(initialNewCategoryState); // Reset form when closed
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCategory.name.trim()) return;

    onSubmit(newCategory);
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
            &lt;div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6"&gt;
              &lt;Text as="h3" className="text-lg font-semibold text-surface-900 mb-4"&gt;Create New Category&lt;/Text&gt;
              
              &lt;form onSubmit={handleSubmit} className="space-y-4"&gt;
                &lt;FormField
                  label="Name"
                  id="category-name"
                  name="name"
                  type="text"
                  value={newCategory.name}
                  onChange={handleInputChange}
                  placeholder="Category name"
                  required
                /&gt;
                
                &lt;div&gt;
                  &lt;Text as="label" htmlFor="category-color" className="block text-sm font-medium text-surface-700 mb-2"&gt;
                    Color
                  &lt;/Text&gt;
                  &lt;div className="flex items-center space-x-3"&gt;
                    &lt;Input
                      id="category-color-picker"
                      name="color"
                      type="color"
                      value={newCategory.color}
                      onChange={handleInputChange}
                      className="w-12 h-10 border border-surface-200 rounded-lg cursor-pointer p-0"
                    /&gt;
                    &lt;Input
                      id="category-color-text"
                      name="color"
                      type="text"
                      value={newCategory.color}
                      onChange={handleInputChange}
                      className="flex-1"
                      placeholder="#5B4CFF"
                    /&gt;
                  &lt;/div&gt;
                &lt;/div&gt;
                
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
                    Create Category
                  &lt;/Button&gt;
                &lt;/div&gt;
              &lt;/form&gt;
            &lt;/div&gt;
          &lt;/motion.div&gt;
        &lt;/&gt;
      )}
    &lt;/AnimatePresence&gt;
  );
}

CategoryCreateForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CategoryCreateForm;