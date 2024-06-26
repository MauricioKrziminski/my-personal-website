/* eslint-disable @next/next/no-img-element */
'use client'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useLanguage } from '../../contexts/LanguageContext'
import { useScrollListener } from '../../hooks/useScrollListener'
import {
  menuVariants,
  slideInRightVariants,
  slideInTopVariants,
} from '../Animations/animationVariants'
import { NavItem } from './NavItem'
import { ToggleButton } from './ToggleButton'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isShrink, activeSection } = useScrollListener()
  const navRefs = useRef<(HTMLDivElement | null)[]>([])
  const [indicatorProps, setIndicatorProps] = useState({ left: 0, width: 0 })
  const { language, toggleLanguage } = useLanguage()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navItems = useMemo(
    () => [
      { key: 'home', label: language === 'pt' ? 'Home' : 'Home' },
      { key: 'about', label: language === 'pt' ? 'Sobre' : 'About' },
      { key: 'projects', label: language === 'pt' ? 'Projetos' : 'Projects' },
    ],
    [language],
  )

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleNavItemClick = (key: string) => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }

    const sectionElement = document.getElementById(key)
    if (sectionElement) {
      window.scrollTo({
        top: sectionElement.offsetTop,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    const activeNavItemIndex = navItems.findIndex(
      (item) => item.key === activeSection,
    )
    const activeNavItem = navRefs.current[activeNavItemIndex]
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
        className={`fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-transparent px-6 shadow-xl backdrop-blur-sm transition-all duration-300 lg:px-10 ${isShrink ? 'py-4 lg:py-4' : 'py-6 lg:py-8'}`}
      >
        <div className="flex items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInTopVariants}
          >
            <h2 className="hidden cursor-default text-xl font-semibold text-white lg:block lg:text-3xl">
              <span className="text-blue-700">Mauricio</span>
              {` `}
              <span className="lg:block lg:w-full xl:hidden"></span>
              Krziminski
            </h2>
            <h2 className="cursor-default pr-4 text-2xl font-semibold text-white lg:hidden lg:text-3xl">
              <span className="text-blue-700">M</span>K
            </h2>
          </motion.div>
        </div>
        <div className="flex w-full items-center justify-end space-x-3 lg:hidden">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInRightVariants}
          >
            <div className="relative">
              <select
                value={language}
                onChange={toggleLanguage}
                onClick={toggleDropdown}
                onBlur={() => setIsDropdownOpen(false)}
                className={`block w-full cursor-pointer appearance-none rounded-md border border-black px-3 py-1.5 pr-8 leading-tight text-white focus:outline-none ${isDropdownOpen ? 'bg-zinc-950' : 'bg-blue-700'}`}
              >
                <option value="en">EN</option>
                <option value="pt">PT</option>
              </select>
              {isDropdownOpen ? (
                <IoIosArrowUp className="pointer-events-none absolute inset-y-2 right-0 mr-2 h-4 w-4 text-white" />
              ) : (
                <IoIosArrowDown className="pointer-events-none absolute inset-y-2 right-0 mr-2 h-4 w-4 text-white" />
              )}
            </div>
          </motion.div>
          <ToggleButton isOpen={isMenuOpen} toggleOpen={toggleMenu} />
        </div>
        <motion.nav
          initial="hidden"
          animate="visible"
          variants={slideInTopVariants}
          className="hidden lg:flex lg:flex-row"
        >
          <nav className="relative hidden cursor-pointer lg:ml-16 lg:flex lg:flex-row xl:ml-24">
            {navItems.map((item, index) => (
              <div ref={(el) => (navRefs.current[index] = el)} key={item.key}>
                <NavItem
                  section={item.label}
                  isActive={activeSection === item.key}
                  onClick={() => handleNavItemClick(item.key)}
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
          <div className="hidden items-center justify-end space-x-3 lg:mb-0 lg:mr-10 lg:flex">
            <div className="relative">
              <select
                value={language}
                onChange={toggleLanguage}
                onClick={toggleDropdown}
                onBlur={() => setIsDropdownOpen(false)}
                className={`block w-full cursor-pointer appearance-none rounded-md border border-black px-3 py-1.5 pr-8 leading-tight text-white focus:outline-none ${isDropdownOpen ? 'bg-zinc-950' : 'bg-blue-700'}`}
              >
                <option value="en">EN</option>
                <option value="pt">PT</option>
              </select>
              {isDropdownOpen ? (
                <IoIosArrowUp className="pointer-events-none absolute inset-y-2.5 right-0 mr-3 h-4 w-4 text-white" />
              ) : (
                <IoIosArrowDown className="pointer-events-none absolute inset-y-2.5 right-0 mr-3 h-4 w-4 text-white" />
              )}
            </div>
          </div>
          <a
            href="/Curriculo-MauricioKrziminski.pdf"
            download="Curriculo - Mauricio Krziminski.pdf"
            className="hidden whitespace-nowrap rounded-3xl border-2 border-black bg-blue-700 px-6 py-2 font-medium text-white transition-all duration-300 hover:scale-110 hover:border-blue-700 hover:bg-transparent hover:text-blue-700 lg:inline-block"
          >
            Download CV
          </a>
        </motion.div>
      </header>

      <motion.div
        className="fixed right-0 top-0 z-40 h-full w-3/4 max-w-md bg-zinc-950/70 shadow-xl backdrop-blur-md lg:hidden"
        initial="closed"
        animate={isMenuOpen ? 'open' : 'closed'}
        variants={menuVariants}
      >
        <nav className="ml-10 mt-52 flex flex-col items-center justify-start space-y-2 p-4">
          {navItems.map((item) => (
            <NavItem
              key={item.key}
              section={item.label}
              isActive={activeSection === item.key}
              onClick={() => handleNavItemClick(item.key)}
            />
          ))}
          <a
            href="/Curriculo-MauricioKrziminski.pdf"
            download="Curriculo - Mauricio Krziminski.pdf"
            className="mr-10 w-full rounded-3xl border-2 border-blue-700 bg-blue-700 py-2 text-center text-sm font-medium text-white transition-all duration-300"
          >
            Download CV
          </a>
        </nav>
      </motion.div>
    </>
  )
}
