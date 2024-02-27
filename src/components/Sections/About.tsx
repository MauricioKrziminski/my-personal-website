/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import {
  slideInTopVariants,
  // slideInRightVariants,
} from '../Animations/animationVariants'
import { tech, tools } from '../TechToolsData'
import TechToolItem from '../TechToolItem'

export function About() {
  const [activeTab, setActiveTab] = useState(1)
  const [hoveredItemId, setHoveredItemId] = useState<string | number | null>(
    null,
  )

  const handleMouseEnter = (id: string | number) => {
    setHoveredItemId(id)
  }

  const handleMouseLeave = () => {
    setHoveredItemId(null)
  }

  const slideInBottomVariants = {
    hidden: { y: '100%', opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.7,
      },
    }),
  }

  const slideInRightVariants = {
    hidden: { x: 200, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.7,
      },
    }),
  }

  const { ref: ref1, inView: inView1 } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })
  const { ref: ref2, inView: inView2 } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })
  const { ref: ref3, inView: inView3 } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })
  const { ref: ref4, inView: inView4 } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <div className="relative mx-auto flex max-w-full flex-col overflow-x-hidden bg-zinc-950 px-2">
      <div className="mb-5 mt-14 flex max-w-7xl items-center justify-center rounded-3xl border border-[#383838] bg-[#1e1e1f] px-5 py-5 text-left text-white md:px-12 md:py-10 xl:mx-auto">
        <article data-page="about">
          <header>
            <motion.div
              ref={ref1}
              variants={slideInTopVariants}
              initial="hidden"
              animate={inView1 ? 'visible' : 'hidden'}
            >
              <div className="mb-5 flex items-center text-2xl font-bold text-white">
                About Me
                <div className="ml-4 h-[2px] w-32 bg-blue-700 md:w-96"></div>
              </div>
            </motion.div>
          </header>

          <section className="md:justify-left flex flex-col gap-4 text-justify text-sm md:flex-row md:items-center md:gap-8 md:text-lg">
            <motion.div
              ref={ref2}
              variants={slideInBottomVariants}
              initial="hidden"
              animate={inView2 ? 'visible' : 'hidden'}
            >
              <div className="ml-10 flex h-72 w-72 items-center justify-center overflow-hidden rounded-full transition-transform duration-300 md:h-80 md:w-80 lg:ml-0">
                <Image
                  src="/fig.jpeg"
                  alt=""
                  width={384}
                  height={384}
                  layout="responsive"
                  objectFit="contain"
                  objectPosition="center"
                  className="lg:scale-125"
                />
              </div>
            </motion.div>
            <div className="">
              <motion.div
                ref={ref3}
                variants={slideInRightVariants}
                initial="hidden"
                animate={inView3 ? 'visible' : 'hidden'}
              >
                <p className="mb-3 md:mb-7">
                  Hi everyone! My name is Mauricio Krziminski. I'm a web
                  developer from Bogor, West Java. I have 1 year of experience
                  in back-end web development. I really enjoy what I do right
                  now, in my opinion, creating programs is not just a job, but
                  also an art that has aesthetic value
                </p>
                <p className="mb-3">
                  My job is to build your website to be functional and
                  user-friendly yet still attractive...
                </p>
              </motion.div>
            </div>
          </section>
        </article>
      </div>

      <div className="custom-xl:mx-72 custom-lg:mx-44 mx-3 px-2 py-5 text-left text-white md:px-12 md:py-10">
        <article data-page="about">
          <header>
            <motion.div
              ref={ref4}
              variants={slideInTopVariants}
              initial="hidden"
              animate={inView4 ? 'visible' : 'hidden'}
            >
              <div className="mb-5 flex items-center text-2xl font-bold text-white">
                <div className="h-[2px] w-10 bg-blue-700 md:w-20"></div>
                &nbsp; Skills
              </div>
            </motion.div>
          </header>
          <section>
            <div className="mb-5 flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              <button
                className={`mr-2 inline-block rounded-lg px-4 py-3 hover:text-blue-700 ${activeTab === 1 ? 'bg-blue-700 bg-opacity-10 text-blue-700' : ''}`}
                onClick={() => setActiveTab(1)}
              >
                Tech Stack
              </button>
              <button
                className={`mr-2 inline-block rounded-lg px-4 py-3 hover:text-blue-700 ${activeTab === 2 ? 'bg-blue-700 bg-opacity-10 text-blue-700' : ''}`}
                onClick={() => setActiveTab(2)}
              >
                Tools
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-32 md:grid-cols-3 md:gap-8 xl:grid-cols-4 xl:gap-10 2xl:gap-12">
              {(activeTab === 1 ? tech : tools).map((item) => (
                <TechToolItem
                  key={item.id}
                  item={item}
                  hoveredItemId={hoveredItemId}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                />
              ))}
            </div>
          </section>
        </article>
      </div>
    </div>
  )
}
