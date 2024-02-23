import React, { useState, useEffect } from 'react'

function AnimatedText({
  words = ['Web Developer', 'Full Stack Developer', 'Informatics Student'],
  placeholder = 'Placeholder',
  typingSpeed = 170,
  deletingSpeed = 150,
}) {
  const [animatedText, setAnimatedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const handleTyping = () => {
      const word = words[currentWordIndex]
      const updatedText = isDeleting
        ? word.substring(0, animatedText.length - 1)
        : word.substring(0, animatedText.length + 1)
      setAnimatedText(updatedText)

      if (!isDeleting && updatedText === word) {
        setTimeout(() => {
          setIsDeleting(true)
        }, 1000)
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false)
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
        setAnimatedText('')
      }
    }

    const timer = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timer)
  }, [
    animatedText,
    isDeleting,
    currentWordIndex,
    words,
    typingSpeed,
    deletingSpeed,
  ])

  return (
    <div
      className="typewriter py-2"
      style={{ visibility: animatedText ? 'visible' : 'hidden' }}
    >
      <h1 className="fadein-up bg-gradient-to-r from-white to-blue-700 bg-clip-text text-xl font-semibold text-transparent md:text-2xl">
        <span className="wrap">{animatedText || placeholder}</span>
      </h1>
    </div>
  )
}

export default AnimatedText
