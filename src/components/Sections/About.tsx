/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import {
  slideInTopVariants,
  slideInRightVariants,
  slideInBottomVariants,
} from '../Animations/animationVariants'
import { tech, tools } from '../TechTools/TechToolsData'
import TechToolItem from '../TechTools/TechToolItem'
import { useLanguage } from '../../contexts/LanguageContext'

export function About() {
  const [activeTab, setActiveTab] = useState(1)
  const [hoveredItemId, setHoveredItemId] = useState<string | number | null>(
    null,
  )

  const { language } = useLanguage()

  const textos =
    {
      en: {
        aboutMe: 'About Me',
        paragraph1:
          "Hi everyone! My name is Mauricio Krziminski. I'm a web developer from Porto Alegre, RS Brazil. I have 1 year of experience in front-end development. I really enjoy what I do right now, in my opinion, creating programs is not just a job, but also an art that has aesthetic value.",
        paragraph2:
          'My job is to build your website to be functional and user-friendly yet still attractive. In addition, I provide a personal touch to your product and ensure that the website catches attention and is easy to use. My goal is to communicate your message and identity in the most creative way. If you are interested in hiring me, please contact the listed contact.',
        skillsTitle: 'Skills',
        techStack: 'Tech Stack',
        tools: 'Tools',
      },
      pt: {
        aboutMe: 'Sobre Mim',
        paragraph1:
          'Olá a todos! Meu nome é Mauricio Krziminski. Sou um desenvolvedor web de Porto Alegre, RS Brasil. Tenho 1 ano de experiência em desenvolvimento front-end. Eu realmente gosto do que faço agora, na minha opinião, criar programas não é apenas um trabalho, mas também uma arte que tem valor estético.',
        paragraph2:
          'Meu trabalho é construir seu site para ser funcional e amigável, mas ainda atraente. Além disso, dou um toque pessoal ao seu produto e garanto que o site chame a atenção e seja fácil de usar. Meu objetivo é comunicar sua mensagem e identidade da maneira mais criativa. Se você estiver interessado em me contratar, entre em contato com os contatos listados.',
        skillsTitle: 'Habilidades',
        techStack: 'Tecnologias',
        tools: 'Ferramentas',
      },
    }[language] || {}

  const handleMouseEnter = (id: string | number) => {
    setHoveredItemId(id)
  }

  const handleMouseLeave = () => {
    setHoveredItemId(null)
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
    <div className="relative mx-auto flex max-w-full flex-col overflow-hidden bg-zinc-950 px-2">
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
                {textos.aboutMe}
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
              <div className="flex justify-center">
                <div className="flex h-72 w-72 items-center justify-center overflow-hidden rounded-full transition-transform duration-300 md:h-80 md:w-80 lg:ml-0">
                  <Image
                    src="https://i.imgur.com/Z0FZsHU.jpg"
                    alt=""
                    width={384}
                    height={384}
                    layout="responsive"
                    objectFit="contain"
                    objectPosition="center"
                    className="lg:scale-125"
                  />
                </div>
              </div>
            </motion.div>
            <div className="">
              <motion.div
                ref={ref3}
                variants={slideInRightVariants}
                initial="hidden"
                animate={inView3 ? 'visible' : 'hidden'}
              >
                <p className="mb-3 md:mb-7">{textos.paragraph1}</p>
                <p className="mb-3">{textos.paragraph2}</p>
              </motion.div>
            </div>
          </section>
        </article>
      </div>

      <div className="mx-3 px-2 py-5 text-left text-white md:px-12 md:py-10 custom-lg:mx-44 custom-xl:mx-72">
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
                &nbsp; {textos.skillsTitle}
              </div>
            </motion.div>
          </header>
          <section>
            <div className="mb-5 flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              <button
                className={`mr-2 inline-block rounded-lg px-4 py-3 hover:text-blue-700 ${activeTab === 1 ? 'bg-blue-700 bg-opacity-10 text-blue-700' : ''}`}
                onClick={() => setActiveTab(1)}
              >
                {textos.techStack}
              </button>
              <button
                className={`mr-2 inline-block rounded-lg px-4 py-3 hover:text-blue-700 ${activeTab === 2 ? 'bg-blue-700 bg-opacity-10 text-blue-700' : ''}`}
                onClick={() => setActiveTab(2)}
              >
                {textos.tools}
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
