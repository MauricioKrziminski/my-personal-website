import { useEffect, useState } from 'react'

export const useScrollListener = () => {
  const [isShrink, setIsShrink] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('home')

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

  return { isShrink, activeSection }
}
