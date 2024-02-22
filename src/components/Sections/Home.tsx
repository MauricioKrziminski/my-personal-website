/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BsWhatsapp, BsInstagram, BsLinkedin, BsGithub } from 'react-icons/bs'
import { useInView } from 'react-intersection-observer'

export function HomePage() {
  const [animatedText, setAnimatedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const words = ['Web Developer', 'Full Stack Developer', 'Informatics Student']
  const typingSpeed = 150
  const deletingSpeed = 150

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
  }, [animatedText, isDeleting, currentWordIndex])

  const slideInRightVariants = {
    hidden: { x: 400, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.7,
      },
    }),
  }

  const slideInTopVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.7,
      },
    }),
  }

  const slideInLeftVariants = {
    hidden: { x: -150, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.7,
      },
    }),
  }

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-800">
      <section className="flex w-full max-w-4xl flex-col items-center justify-center px-6 text-center lg:flex-row-reverse lg:px-24 lg:text-left">
        <div className="space-y-4 text-white">
          <div className="text-center lg:text-left">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={slideInTopVariants}
            >
              <p className="text-xl text-blue-700">Hello, I'm</p>
              <h1 className="fadein-up whitespace-nowrap text-3xl font-bold md:text-5xl">
                Mauricio Krziminski
              </h1>
            </motion.div>
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={slideInTopVariants}
            >
              <div
                className="typewriter py-2"
                style={{ visibility: animatedText ? 'visible' : 'hidden' }}
              >
                <h1 className="fadein-up bg-gradient-to-r from-white to-blue-700 bg-clip-text text-xl font-semibold text-transparent md:text-2xl">
                  <span className="wrap">{animatedText || 'Placeholder'}</span>
                </h1>
              </div>
            </motion.div>
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={slideInLeftVariants}
            >
              <p className="fade-in-from-left mb-24 lg:mb-0">
                Welcome to My personal website.{' '}
                <span className="wave text-xl">👋🏼</span>
              </p>
            </motion.div>
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={slideInLeftVariants}
            >
              <div className="mt-14 flex justify-center space-x-6 lg:justify-start">
                <a href="#" className="group">
                  <span className="inline-flex items-center justify-center rounded-full border-2 border-blue-700 p-2 transition-transform duration-300 hover:scale-125 hover:bg-blue-700">
                    <BsWhatsapp className="text-xl text-blue-700 group-hover:text-white" />
                  </span>
                </a>
                <a href="#" className="group">
                  <span className="inline-flex items-center justify-center rounded-full border-2 border-blue-700 p-2 transition-transform duration-300 hover:scale-125 hover:bg-blue-700">
                    <BsInstagram className="text-xl text-blue-700 group-hover:text-white" />
                  </span>
                </a>
                <a href="#" className="group">
                  <span className="inline-flex items-center justify-center rounded-full border-2 border-blue-700 p-2 transition-transform duration-300 hover:scale-125 hover:bg-blue-700">
                    <BsLinkedin className="text-xl text-blue-700 group-hover:text-white" />
                  </span>
                </a>
                <a href="#" className="group">
                  <span className="inline-flex items-center justify-center rounded-full border-2 border-blue-700 p-2 transition-transform duration-300 hover:scale-125 hover:bg-blue-700">
                    <BsGithub className="text-xl text-blue-700 group-hover:text-white" />
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="order-first mb-14 md:mt-0 lg:ml-20 lg:mt-10">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={slideInRightVariants}
          >
            <div className="flex h-80 w-80 scale-110 items-center justify-center overflow-hidden rounded-full border-3 border-blue-700 shadow-glow transition-transform duration-300 hover:scale-125 md:h-96 md:w-96">
              <Image
                src="/teste.png"
                alt=""
                width={384}
                height={384}
                layout="responsive"
                objectFit="contain"
                objectPosition="center center"
                className="lg:scale-125"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
