/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { NavItem } from './NavItem'
import { ToggleButton } from './ToggleButton'
import { useScrollListener } from '../../hooks/useScrollListener'
import {
  slideInTopVariants,
  menuVariants,
} from '../Animations/animationVariants'
import { useLanguage } from '../../contexts/LanguageContext'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { isShrink, activeSection } = useScrollListener()
  const navItems = useMemo(() => ['home', 'about', 'projects'], [])
  const navRefs = useRef<(HTMLDivElement | null)[]>([])
  const [indicatorProps, setIndicatorProps] = useState({ left: 0, width: 0 })
  const { language, toggleLanguage } = useLanguage()

  const closeMenu = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const activeNavItem = navRefs.current[navItems.indexOf(activeSection)]
    if (activeNavItem) {
      setIndicatorProps({
        left: activeNavItem.offsetLeft - 2,
        width: activeNavItem.offsetWidth - 35,
      })
    }
  }, [activeSection, navItems])

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-zinc-800 bg-zinc-950/70 px-6 shadow-xl backdrop-blur-sm transition-all duration-300 lg:px-24 ${isShrink ? 'py-4 lg:py-4' : 'py-6 lg:py-8'}`}
      >
        <div className="flex items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInTopVariants}
          >
            <h2 className="hidden cursor-default text-xl font-semibold text-white lg:block lg:text-3xl">
              <span className="text-blue-700">Mauricio</span> Krziminski
            </h2>
            <h2 className="cursor-default pr-4 text-2xl font-semibold text-white lg:hidden lg:text-3xl">
              <span className="text-blue-700">M</span>K
            </h2>
          </motion.div>
        </div>
        <div className="flex w-full justify-end lg:hidden">
          <ToggleButton isOpen={isOpen} toggleOpen={() => setIsOpen(!isOpen)} />
        </div>
        <motion.nav
          initial="hidden"
          animate="visible"
          variants={slideInTopVariants}
          className="hidden lg:flex lg:flex-row"
        >
          <nav className="relative hidden cursor-pointer lg:ml-20 lg:flex lg:flex-row">
            {navItems.map((section, index) => (
              <div ref={(el) => (navRefs.current[index] = el)} key={section}>
                <NavItem
                  section={section}
                  isActive={activeSection === section}
                  onClick={() => setIsOpen(false)}
                />
              </div>
            ))}
            <motion.div
              className="absolute bottom-0 h-1 rounded-full bg-blue-700"
              initial={false}
              animate={{
                left: `${indicatorProps.left}px`,
                width: `${indicatorProps.width}px`,
                bottom: '-1px',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </nav>
        </motion.nav>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideInTopVariants}
          className="lg:flex lg:w-auto lg:flex-row lg:justify-between"
        >
          <div className="hidden items-center justify-end space-x-3 lg:mb-0 lg:mr-6 lg:flex">
            <img
              src="https://i.imgur.com/shOBDB8.jpg"
              alt="United States Flag"
              className={`w-8 ${language === 'pt' ? 'opacity-50' : 'opacity-100'}`}
            />
            <label className="switch">
              <input
                type="checkbox"
                checked={language === 'pt'}
                onChange={toggleLanguage}
              />
              <span className="slider round"></span>
            </label>
            <img
              src="https://i.imgur.com/3BXGUoY.jpg"
              alt="Brazil Flag"
              className={`w-8 ${language === 'en' ? 'opacity-50' : 'opacity-100'}`}
            />
          </div>
          <a
            href="/CV-MauricioKrziminski.pdf"
            download="CV - Mauricio Krziminski.pdf"
            className="hidden rounded-3xl border-2 border-blue-700 px-6 py-2 font-medium text-blue-700 transition-all duration-300 hover:scale-110 hover:bg-blue-700 hover:text-white lg:inline-block"
          >
            Download CV
          </a>
        </motion.div>
      </header>

      <motion.div
        className="fixed right-0 top-0 z-40 h-full w-3/4 max-w-md bg-zinc-950/70 shadow-xl backdrop-blur-md lg:hidden"
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={menuVariants}
      >
        <nav className="ml-10 mt-52 flex flex-col items-center justify-start space-y-2 p-4">
          {navItems.map((section) => (
            <NavItem
              key={section}
              section={section}
              isActive={false}
              onClick={closeMenu}
            />
          ))}
          <a
            href="/CV-MauricioKrziminski.pdf"
            download="MauricioKrziminski-CV.pdf"
            className="mr-10 w-full rounded-3xl border-2 border-blue-700 bg-blue-700 py-2 text-center text-sm font-medium text-white transition-all duration-300"
          >
            Download CV
          </a>
          <div className="mr-6 flex items-center space-x-3 lg:mb-0">
            <img
              src="https://i.imgur.com/jrx6VDs.jpg"
              alt="United States Flag"
              className={`w-8 ${language === 'pt' ? 'opacity-50' : 'opacity-100'}`}
            />
            <label className="switch">
              <input
                type="checkbox"
                checked={language === 'pt'}
                onChange={toggleLanguage}
              />
              <span className="slider round"></span>
            </label>
            <img
              src="https://i.imgur.com/X30TFyJ.jpg"
              alt="Brazil Flag"
              className={`w-8 ${language === 'en' ? 'opacity-50' : 'opacity-100'}`}
            />
          </div>
        </nav>
      </motion.div>
    </>
  )
}
