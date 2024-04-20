/* eslint-disable react/no-unescaped-entities */
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { BsWhatsapp, BsInstagram, BsLinkedin, BsGithub } from 'react-icons/bs'
import { useInView } from 'react-intersection-observer'
import SocialIcon from '../components/SocialIcon'
import {
  slideInTopVariants,
  slideInRightVariants,
  slideInLeftVariants,
} from '../components/Animations/animationVariants'
import AnimatedText from '../components/Animations/animatedText'
import { useLanguage } from '../contexts/LanguageContext'

export function HomePage() {
  const { language } = useLanguage()
  const words =
    language === 'en'
      ? ['Web Developer', 'Full Stack Developer', 'Informatics Student']
      : [
          'Desenvolvedor Web',
          'Desenvolvedor Full Stack',
          'Estudante de Informática',
        ]
  const greeting = language === 'en' ? "Hello, I'm" : 'Olá, eu sou'
  const welcome =
    language === 'en'
      ? 'Welcome to My personal website'
      : 'Bem-vindo ao meu site pessoal'

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
  const { ref: ref5, inView: inView5 } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <div className="flex h-[800px] w-full items-center justify-center overflow-hidden bg-zinc-800 lg:h-screen">
      <section className="flex w-full max-w-4xl flex-col items-center justify-center px-6 text-center lg:flex-row-reverse lg:px-24 lg:text-left">
        <div className="mb-16 space-y-4 text-white lg:mb-0">
          <div className="text-center lg:text-left">
            <motion.div
              ref={ref1}
              initial="hidden"
              animate={inView1 ? 'visible' : 'hidden'}
              variants={slideInTopVariants}
            >
              <p className="text-xl text-blue-700 lg:ml-[2px]">{greeting}</p>
              <h1 className="whitespace-nowrap text-3xl font-bold md:text-5xl">
                Mauricio Krziminski
              </h1>
            </motion.div>
            <motion.div
              ref={ref2}
              initial="hidden"
              animate={inView2 ? 'visible' : 'hidden'}
              variants={slideInTopVariants}
            >
              <div className="App lg:ml-[2px]">
                <AnimatedText words={words} />
              </div>
            </motion.div>
            <motion.div
              ref={ref3}
              initial="hidden"
              animate={inView3 ? 'visible' : 'hidden'}
              variants={slideInLeftVariants}
            >
              <p className="fade-in-from-left lg:mb-0 lg:ml-[2px]">
                {welcome}
                <span className="wave text-xl">👋🏼</span>
              </p>
            </motion.div>
            <motion.div
              ref={ref4}
              initial="hidden"
              animate={inView4 ? 'visible' : 'hidden'}
              variants={slideInLeftVariants}
            >
              <div className="mb-14 mt-10 flex justify-center space-x-6 lg:mt-10 lg:justify-start">
                <SocialIcon
                  Icon={BsWhatsapp}
                  href="https://wa.me/5551992553295"
                />
                <SocialIcon
                  Icon={BsInstagram}
                  href="https://www.instagram.com/krziminskii/"
                />
                <SocialIcon
                  Icon={BsLinkedin}
                  href="https://www.linkedin.com/in/mauricio-krziminski/"
                />
                <SocialIcon
                  Icon={BsGithub}
                  href="https://github.com/MauricioKrziminski"
                />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="order-first mb-14 mt-40 md:mt-0 lg:ml-20 lg:mt-10">
          <motion.div
            ref={ref5}
            initial="hidden"
            animate={inView5 ? 'visible' : 'hidden'}
            variants={slideInRightVariants}
          >
            <div className="flex h-80 w-80 scale-110 items-center justify-center overflow-hidden rounded-full border-3 border-blue-700 shadow-glow transition-transform duration-300 md:mt-56 md:h-96 md:w-96 lg:hover:scale-125">
              <Image
                src="https://i.imgur.com/odiT0Cu.png"
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
