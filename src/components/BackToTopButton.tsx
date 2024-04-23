'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 200) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <motion.div
      className="fixed bottom-5 right-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={scrollToTop}
        className="rounded-full bg-blue-700 px-4 py-2 font-bold text-white hover:bg-blue-900"
      >
        ↑
      </button>
    </motion.div>
  )
}
