/* eslint-disable react/no-unescaped-entities */
'use client'
import { motion } from 'framer-motion'
import { CardsComponent } from '../CardsComponent'
import { containerVariants } from '../Animations/animationVariants'
import { useInView } from 'react-intersection-observer'

export function Projects() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <div className="relative mx-auto flex w-full flex-col overflow-hidden bg-zinc-800">
      <motion.section
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <section className="mx-3 my-20 px-5 py-5 text-left text-white md:px-12 md:py-10 lg:mt-12">
          <header>
            <div className="mb-16 flex flex-col items-center justify-center overflow-x-hidden text-2xl font-bold text-white">
              <h4>Past Project Experience</h4>
              <h4 className="bg-gradient-to-r from-white to-blue-700 bg-clip-text text-base font-normal text-transparent">
                {' '}
                Explore the projects I've worked on so far
              </h4>
            </div>
          </header>
          <div className="mb-10 flex justify-center lg:mb-0">
            <div className="max-w-7xl">
              <CardsComponent />
            </div>
          </div>
        </section>
      </motion.section>
    </div>
  )
}
