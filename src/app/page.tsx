import { Header } from '@/components/Header'
import Home from '@/components/Sections/Home'
import { Projects } from '@/components/Sections/Projects'

export default function Page() {
  return (
    <div className="font-poppins">
      <Header />
      <main>
        <section id="home">
          <Home />
        </section>

        {/* <section id="about">
          <About />
        </section> */}

        <section id="projects">
          <Projects />
        </section>

        {/* <section id="contact">
          <ContactSection />
        </section> */}
      </main>
    </div>
  )
}
