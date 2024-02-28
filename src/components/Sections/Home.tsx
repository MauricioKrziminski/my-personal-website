/* eslint-disable react/no-unescaped-entities */
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { BsWhatsapp, BsInstagram, BsLinkedin, BsGithub } from 'react-icons/bs'
import { useInView } from 'react-intersection-observer'
import SocialIcon from '../SocialIcon'
import {
  slideInTopVariants,
  slideInRightVariants,
} from '../Animations/animationVariants'
import AnimatedText from '../Animations/animatedText'

export function HomePage() {
  const words = ['Web Developer', 'Full Stack Developer', 'Informatics Student']

  const slideInLeftVariants = {
    hidden: { x: '-100%', opacity: 0, scale: 0.95 },
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
  const { ref: ref5, inView: inView5 } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <div className="flex h-screen w-full items-center justify-center overflow-x-hidden bg-zinc-800">
      <section className="flex w-full max-w-4xl flex-col items-center justify-center px-6 text-center lg:flex-row-reverse lg:px-24 lg:text-left">
        <div className="space-y-4 text-white">
          <div className="text-center lg:text-left">
            <motion.div
              ref={ref1}
              initial="hidden"
              animate={inView1 ? 'visible' : 'hidden'}
              variants={slideInTopVariants}
            >
              <p className="text-xl text-blue-700">Hello, I'm</p>
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
              <div className="App">
                <AnimatedText words={words} />
              </div>
            </motion.div>
            <motion.div
              ref={ref3}
              initial="hidden"
              animate={inView3 ? 'visible' : 'hidden'}
              variants={slideInLeftVariants}
            >
              <p className="fade-in-from-left mb-24 lg:mb-0">
                Welcome to My personal website.{' '}
                <span className="wave text-xl">👋🏼</span>
              </p>
            </motion.div>
            <motion.div
              ref={ref4}
              initial="hidden"
              animate={inView4 ? 'visible' : 'hidden'}
              variants={slideInLeftVariants}
            >
              <div className="mt-14 flex justify-center space-x-6 lg:justify-start">
                <SocialIcon Icon={BsWhatsapp} href="#" />
                <SocialIcon Icon={BsInstagram} href="#" />
                <SocialIcon Icon={BsLinkedin} href="#" />
                <SocialIcon Icon={BsGithub} href="#" />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="order-first mb-14 md:mt-0 lg:ml-20 lg:mt-10">
          <motion.div
            ref={ref5}
            initial="hidden"
            animate={inView5 ? 'visible' : 'hidden'}
            variants={slideInRightVariants}
          >
            <div className="flex h-80 w-80 scale-110 items-center justify-center overflow-hidden rounded-full border-3 border-blue-700 shadow-glow transition-transform duration-300 hover:scale-125 md:h-96 md:w-96">
              <Image
                src="https://i.imgur.com/j5S8kIn.png"
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
