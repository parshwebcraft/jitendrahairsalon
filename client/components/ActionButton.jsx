import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

function ActionButton({ children, className, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default ActionButton;
