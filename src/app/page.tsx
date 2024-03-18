import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header/Header'
import { About } from '@/components/Sections/About'
import Home from '@/components/Sections/Home'
import { Projects } from '@/components/Sections/Projects'
import { LanguageProvider } from '../contexts/LanguageContext'

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
        </main>
      </div>
    </LanguageProvider>
  )
}
