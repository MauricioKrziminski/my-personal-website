'use client'
import { useEffect, useState } from 'react'
import { Link } from 'react-scroll'
import { motion } from 'framer-motion'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isShrink, setIsShrink] = useState(false)

  const menuVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        x: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      x: '-100%',
      opacity: 0,
      transition: {
        x: { stiffness: 1000 },
      },
    },
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsShrink(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-gray-200 bg-white/70 px-6 shadow-xl backdrop-blur-sm transition-all duration-300 lg:px-24 ${isShrink ? 'py-4 lg:py-4' : 'py-6 lg:py-8'}`}
      >
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        <div className="flex items-center">
          <h2 className="hidden cursor-default text-xl font-semibold text-customGray lg:block lg:text-3xl">
            <span className="text-customGray">Mauricio</span> Krziminski
          </h2>
          <h2 className="cursor-default pr-4 text-2xl font-semibold text-customGray lg:hidden lg:text-3xl">
            <span className="text-customGray">M</span>K
          </h2>
        </div>

        <nav className="hidden cursor-pointer lg:flex lg:flex-row">
          <Link
            to="home"
            smooth={true}
            duration={200}
            className="mr-10 py-2 text-lg font-medium text-customGray transition-colors duration-300 hover:text-white"
          >
            Home
          </Link>
          <Link
            to="about"
            smooth={true}
            duration={200}
            className="mr-10 py-2 text-lg font-medium text-customGray transition-colors duration-300 hover:text-white"
          >
            About
          </Link>
          <Link
            to="projects"
            smooth={true}
            duration={200}
            className="mr-10 py-2 text-lg font-medium text-customGray transition-colors duration-300 hover:text-white"
          >
            Project
          </Link>
          <Link
            to="blog"
            smooth={true}
            duration={200}
            className="mr-10 py-2 text-lg font-medium text-customGray transition-colors duration-300 hover:text-white"
          >
            Blog
          </Link>
          <Link
            to="contact"
            smooth={true}
            duration={200}
            className="py-2 text-lg font-medium text-customGray transition-colors duration-300 hover:text-white"
          >
            Contact
          </Link>
        </nav>
        <a
          href="/CV-MauricioKrziminski.pdf"
          download="MauricioKrziminski-CV.pdf"
          className="hidden rounded-extra border-2 border-customGray bg-customGray px-6 py-2 font-medium text-white transition-all duration-300 hover:bg-transparent hover:text-customGray lg:inline-block"
        >
          Download CV
        </a>
      </header>

      <motion.div
        className="fixed left-0 top-0 z-40 h-full w-2/4 max-w-md bg-white/70 shadow-xl backdrop-blur-sm lg:hidden"
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={menuVariants}
      >
        <nav className="mt-24 flex flex-col p-4">
          <Link
            to="home"
            smooth={true}
            duration={100}
            onClick={closeMenu}
            className="mx-auto px-4 py-4 text-lg font-medium text-customGray transition-colors duration-300 hover:text-white"
          >
            Home
          </Link>
          <Link
            to="about"
            smooth={true}
            duration={100}
            onClick={closeMenu}
            className="mx-auto px-4 py-4 text-lg font-medium text-customGray transition-colors duration-300 hover:text-white"
          >
            About
          </Link>
          <Link
            to="projects"
            smooth={true}
            duration={100}
            onClick={closeMenu}
            className="mx-auto px-4 py-4 text-lg font-medium text-customGray transition-colors duration-300 hover:text-white"
          >
            Project
          </Link>
          <Link
            to="blog"
            smooth={true}
            duration={100}
            onClick={closeMenu}
            className="mx-auto px-4 py-4 text-lg font-medium text-customGray transition-colors duration-300 hover:text-white"
          >
            Blog
          </Link>
          <Link
            to="contact"
            smooth={true}
            duration={100}
            onClick={closeMenu}
            className="mx-auto px-4 py-4 text-lg font-medium text-customGray transition-colors duration-300 hover:text-white"
          >
            Contact
          </Link>
          <a
            href="/CV-MauricioKrziminski.pdf"
            download="MauricioKrziminski-CV.pdf"
            className="mt-4 rounded-extra border-2 border-customOrange bg-customGray py-2 text-center text-sm font-medium text-white transition-all duration-300 hover:bg-transparent hover:text-white"
          >
            Download CV
          </a>
        </nav>
      </motion.div>
    </>
  )
}
