/* eslint-disable react/no-unescaped-entities */
'use client'
import { motion } from 'framer-motion'
import { CardsComponent } from '../CardsComponent'
import { useInView } from 'react-intersection-observer'

export function Projects() {
  const containerVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 50 },
    visible: {
      scale: 1.05,
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
        duration: 0.8,
      },
    },
  }

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <div className="h-screen w-full overflow-hidden bg-zinc-800">
      <div className="relative mx-auto flex max-w-7xl flex-col bg-zinc-800">
        <motion.section
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <section className="mx-3 mt-14 px-5 py-5 text-left text-white md:px-12 md:py-10">
            <header>
              <div className="mb-10 flex flex-col items-center justify-center text-2xl font-bold text-white">
                <h4>Past Project Experience</h4>
                <h4 className="bg-gradient-to-r from-white to-blue-700 bg-clip-text text-base font-normal text-transparent">
                  {' '}
                  Explore the projects I've worked on so far
                </h4>
              </div>
            </header>
            <div>
              <CardsComponent />
            </div>
          </section>
        </motion.section>
      </div>
    </div>
  )
}
