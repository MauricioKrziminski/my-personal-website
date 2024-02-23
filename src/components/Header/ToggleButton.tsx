import { motion } from 'framer-motion'
import { slideInRightVariants } from '../Animations/animationVariants'

interface ToggleButtonProps {
  isOpen: boolean
  toggleOpen: () => void
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  isOpen,
  toggleOpen,
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideInRightVariants}
    >
      <button onClick={toggleOpen}>
        {isOpen ? (
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>
    </motion.div>
  )
}
