/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

export function About() {
  const [activeTab, setActiveTab] = useState(1)
  const [hoveredItemId, setHoveredItemId] = useState<string | number | null>(
    null,
  )

  const tech = [
    {
      id: 1,
      name: 'HTML',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/1051/1051277.png',
      status: 'Advanced',
    },
    {
      id: 2,
      name: 'CSS',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/732/732190.png',
      status: 'Advanced',
    },
    {
      id: 3,
      name: 'JavaScript',
      imageUrl:
        'https://cdn.icon-icons.com/icons2/2415/PNG/512/javascript_original_logo_icon_146455.png',
      status: 'Advanced',
    },
    {
      id: 4,
      name: 'TypeScript',
      imageUrl:
        'https://cdn.icon-icons.com/icons2/2415/PNG/512/typescript_original_logo_icon_146317.png',
      status: 'Advanced',
    },
    {
      id: 5,
      name: 'ReactJS',
      imageUrl:
        'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png',
      status: 'Intermediate',
    },
    {
      id: 6,
      name: 'NextJS',
      imageUrl:
        'https://cdn.icon-icons.com/icons2/2148/PNG/512/nextjs_icon_132160.png',
      status: 'Advanced',
    },
    {
      id: 7,
      name: 'React Native',
      imageUrl:
        'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png',
      status: 'Intermediate',
    },
    {
      id: 8,
      name: 'TailwindCSS',
      imageUrl:
        'https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_tailwind_icon_130128.png',
      status: 'Intermediate',
    },
    {
      id: 9,
      name: 'NodeJS',
      imageUrl:
        'https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_node_icon_130301.png',
      status: 'Beginner',
    },
  ]

  const tools = [
    {
      id: 1,
      name: 'Git',
      imageUrl: 'https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png',
      status: 'Version Control',
    },
    {
      id: 2,
      name: 'GitHub',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
      status: 'Git Hosting',
    },
    {
      id: 3,
      name: 'VSCode',
      imageUrl:
        'https://cdn.icon-icons.com/icons2/1381/PNG/512/visualstudiocode_93981.png',
      status: 'Code Editor',
    },
    {
      id: 4,
      name: 'Figma',
      imageUrl:
        'https://cdn.icon-icons.com/icons2/2699/PNG/512/figma_logo_icon_170157.png',
      status: 'Design Tool',
    },
    {
      id: 5,
      name: 'Postman',
      imageUrl:
        'https://cdn.icon-icons.com/icons2/3053/PNG/512/postman_macos_bigsur_icon_189815.png',
      status: 'API Testing',
    },
    {
      id: 7,
      name: 'Docker',
      imageUrl:
        'https://cdn.icon-icons.com/icons2/2415/PNG/512/docker_original_wordmark_logo_icon_146557.png',
      status: 'Containerization',
    },
    {
      id: 8,
      name: 'NPM',
      imageUrl:
        'https://cdn.icon-icons.com/icons2/2415/PNG/512/npm_original_wordmark_logo_icon_146402.png',
      status: 'Package Manager',
    },
  ]

  const handleMouseEnter = (id: string | number) => {
    setHoveredItemId(id)
  }

  const handleMouseLeave = () => {
    setHoveredItemId(null)
  }

  const fadeInBottomVariants = {
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

  const fadeInTopVariants = {
    hidden: { y: '-200%', opacity: 0, scale: 0.95 },
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
    hidden: { x: '90%', opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      scale: 1,
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
    <div className="relative mx-auto flex max-w-full flex-col overflow-x-hidden bg-zinc-950">
      <div className="mb-5 mt-14 flex max-w-7xl items-center justify-center rounded-3xl border border-[#383838] bg-[#1e1e1f] px-5 py-5 text-left text-white md:px-12 md:py-10 lg:mx-96">
        <article data-page="about">
          <header>
            <motion.div
              ref={ref1}
              variants={fadeInTopVariants}
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
              variants={fadeInBottomVariants}
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
            <div className="md:w-7/12">
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

      <div className="mx-3 px-5 py-5 text-left text-white md:px-12 md:py-10 lg:mx-96">
        <article data-page="about">
          <header>
            <motion.div
              ref={ref4}
              variants={fadeInTopVariants}
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
            <div>
              <ul className="mb-5 flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                <li className="mr-2">
                  <button
                    className={`inline-block rounded-lg px-4 py-3 hover:text-blue-700 ${activeTab === 1 ? 'bg-blue-700 bg-opacity-10 text-blue-700' : ''}`}
                    onClick={() => setActiveTab(1)}
                  >
                    Tech Stack
                  </button>
                </li>
                <li className="mr-2">
                  <button
                    className={`inline-block rounded-lg px-4 py-3 hover:text-blue-700 ${activeTab === 2 ? 'bg-blue-700 bg-opacity-10 text-blue-700' : ''}`}
                    onClick={() => setActiveTab(2)}
                  >
                    Tools
                  </button>
                </li>
              </ul>
            </div>
            {activeTab === 1 && (
              <div className="grid grid-cols-2 gap-4 pb-32 md:grid-cols-3 md:gap-8 xl:grid-cols-4 xl:gap-10 2xl:gap-12">
                {tech.map((item) => (
                  <div
                    key={item.id}
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                    className="item-tech flex cursor-pointer items-center gap-2 rounded border border-blue-700 px-2 py-2 hover:bg-blue-700 hover:bg-opacity-10 md:gap-3 lg:px-3"
                  >
                    <div className="flex h-12 w-12 items-center justify-center p-0 lg:h-16 lg:w-16 lg:p-2">
                      <img
                        alt={item.name}
                        className="img-tech h-[65%] w-[65%] drop-shadow-xl transition-all duration-300 lg:h-[85%] lg:w-[85%]"
                        style={{
                          transform:
                            hoveredItemId === item.id
                              ? 'scale(1)'
                              : 'scale(0.7)',
                        }}
                        src={item.imageUrl}
                        loading="lazy"
                        width={32}
                        height={32}
                        decoding="async"
                      />
                    </div>
                    <div className="relative flex items-center text-sm md:text-base lg:text-lg">
                      <div
                        className="tech translate-y-0 font-medium transition-all duration-300"
                        style={{
                          transform:
                            hoveredItemId === item.id
                              ? 'translateY(-12px)'
                              : 'translateY(0)',
                        }}
                      >
                        {item.name}
                      </div>
                      <div className="status mt-5 text-[10px] text-blue-700 opacity-0 transition-all duration-300 md:text-xs lg:text-sm">
                        {item.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 2 && (
              <div className="grid grid-cols-2 gap-4 pb-32 md:grid-cols-3 md:gap-8 xl:grid-cols-4 xl:gap-10 2xl:gap-12">
                {tools.map((item) => (
                  <div
                    key={item.id}
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                    className="item-tech flex cursor-pointer items-center gap-2 rounded border border-blue-700 px-2 py-2 hover:bg-blue-700 hover:bg-opacity-10 md:gap-3 lg:px-3"
                  >
                    <div className="flex h-12 w-12 items-center justify-center p-0 lg:h-16 lg:w-16 lg:p-2">
                      <img
                        alt={item.name}
                        className="img-tech h-[65%] w-[65%] drop-shadow-xl transition-all duration-300 lg:h-[85%] lg:w-[85%]"
                        style={{
                          transform:
                            hoveredItemId === item.id
                              ? 'scale(1)'
                              : 'scale(0.7)',
                        }}
                        src={item.imageUrl}
                        loading="lazy"
                        width={32}
                        height={32}
                        decoding="async"
                      />
                    </div>
                    <div className="relative flex items-center text-sm md:text-base lg:text-lg">
                      <div
                        className="tech translate-y-0 font-medium transition-all duration-300"
                        style={{
                          transform:
                            hoveredItemId === item.id
                              ? 'translateY(-12px)'
                              : 'translateY(0)',
                        }}
                      >
                        {item.name}
                      </div>
                      <div className="status mt-5 text-[10px] text-blue-700 opacity-0 transition-all duration-300 md:text-xs lg:text-sm">
                        {item.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </article>
      </div>
    </div>
  )
}
