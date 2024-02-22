'use client'
import { useEffect, useState } from 'react'
import { Link } from 'react-scroll'
import { motion } from 'framer-motion'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isShrink, setIsShrink] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('home')
  const [indicatorProps, setIndicatorProps] = useState({ left: 0, width: 0 })
  const navItems = ['home', 'about', 'projects', 'blog', 'contact']

  const menuVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        x: { stiffness: 1000, velocity: 100 },
      },
    },
    closed: {
      x: '100%',
      opacity: 0,
      transition: {
        x: { stiffness: 1000 },
      },
    },
  }

  useEffect(() => {
    const updateIndicator = () => {
      const activeLink = document.querySelector(
        `.nav-link[data-section="${activeSection}"]`,
      ) as HTMLElement | null

      if (activeLink) {
        const { offsetLeft: left, offsetWidth: width } = activeLink
        setIndicatorProps({ left, width })
      }
    }

    updateIndicator()
  }, [activeSection])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'blog', 'contact']
      const scrollTop = window.pageYOffset + window.innerHeight / 3
      setIsShrink(window.pageYOffset > 100)

      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollTop >= offsetTop && scrollTop < offsetBottom) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => {
    setIsOpen(false)
  }

  const fadeInTopVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
  }

  const slideInRightVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.7,
      },
    }),
  }

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-zinc-800 bg-zinc-950/70 px-6 shadow-xl backdrop-blur-sm transition-all duration-300 lg:px-24 ${isShrink ? 'py-4 lg:py-4' : 'py-6 lg:py-8'}`}
      >
        <div className="flex items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInTopVariants}
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
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInRightVariants}
          >
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </motion.div>
        </div>

        <nav className="relative hidden cursor-pointer lg:flex lg:flex-row">
          <motion.div
            className="absolute bottom-0 h-1 rounded-full bg-blue-700 text-blue-700"
            initial={false}
            animate={{ left: indicatorProps.left, width: indicatorProps.width }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
          {navItems.map((section, index) => (
            <motion.div
              key={section}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={fadeInTopVariants}
            >
              <Link
                key={section}
                to={section}
                smooth={true}
                duration={300}
                spy={true}
                data-section={section}
                className={`nav-link mr-10 py-2 text-lg font-medium transition-colors duration-300 ${
                  activeSection === section
                    ? 'text-blue-700'
                    : 'text-white hover:text-blue-700'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            </motion.div>
          ))}
        </nav>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInTopVariants}
        >
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
        <nav className="mt-24 flex flex-col p-4">
          <Link
            to="home"
            smooth={true}
            duration={300}
            onClick={closeMenu}
            className="mx-auto px-4 py-4 text-lg font-medium text-white transition-colors duration-300 hover:text-blue-700"
          >
            Home
          </Link>
          <Link
            to="about"
            smooth={true}
            duration={300}
            onClick={closeMenu}
            className="mx-auto px-4 py-4 text-lg font-medium text-white transition-colors duration-300 hover:text-blue-700"
          >
            About
          </Link>
          <Link
            to="projects"
            smooth={true}
            duration={300}
            onClick={closeMenu}
            className="mx-auto px-4 py-4 text-lg font-medium text-white transition-colors duration-300 hover:text-blue-700"
          >
            Project
          </Link>
          <Link
            to="blog"
            smooth={true}
            duration={300}
            onClick={closeMenu}
            className="mx-auto px-4 py-4 text-lg font-medium text-white transition-colors duration-300 hover:text-blue-700"
          >
            Blog
          </Link>
          <Link
            to="contact"
            smooth={true}
            duration={300}
            onClick={closeMenu}
            className="mx-auto px-4 py-4 text-lg font-medium text-white transition-colors duration-300 hover:text-blue-700"
          >
            Contact
          </Link>
          <a
            href="/CV-MauricioKrziminski.pdf"
            download="MauricioKrziminski-CV.pdf"
            className="mt-4 rounded-3xl border-2 border-blue-700 bg-blue-700 py-2 text-center text-sm font-medium text-white transition-all duration-300"
          >
            Download CV
          </a>
        </nav>
      </motion.div>
    </>
  )
}
