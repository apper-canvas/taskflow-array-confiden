import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    &lt;div className="min-h-screen bg-app flex items-center justify-center"&gt;
      &lt;motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      &gt;
        &lt;motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        &gt;
          &lt;ApperIcon name="FileQuestion" className="w-24 h-24 text-surface-300 mx-auto mb-6" /&gt;
        &lt;/motion.div&gt;
        
        &lt;Text as="h1" className="text-4xl font-bold text-surface-900 mb-2"&gt;Page Not Found&lt;/Text&gt;
        &lt;Text as="p" className="text-surface-600 mb-8"&gt;The page you're looking for doesn't exist.&lt;/Text&gt;
        
        &lt;Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-primary text-white hover:bg-secondary"
        &gt;
          Back to Tasks
        &lt;/Button&gt;
      &lt;/motion.div&gt;
    &lt;/div&gt;
  );
}

export default NotFoundPage;