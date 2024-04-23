'use client'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header/Header'
import { About } from '@/Sections/About'
import Home from '@/Sections/Home'
import { Projects } from '@/Sections/Projects'
import { LanguageProvider } from '../contexts/LanguageContext'
import BackToTopButton from '@/components/BackToTopButton'

export default function Page() {
  return (
    <LanguageProvider>
      <div>
        <Header />
        <main>
          <section id="home">
            <Home />
          </section>

          <section id="about">
            <About />
          </section>

          <section id="projects">
            <Projects />
          </section>

          <section id="footer">
            <Footer />
          </section>

          <BackToTopButton />
        </main>
      </div>
    </LanguageProvider>
  )
}
