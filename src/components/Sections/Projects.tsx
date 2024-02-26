/* eslint-disable react/no-unescaped-entities */
'use client'
import { CardsComponent } from '../CardsComponent'

export function Projects() {
  return (
    <div className="h-screen w-full bg-zinc-800">
      <div className="relative mx-auto flex max-w-7xl flex-col bg-zinc-800">
        <section className="mx-3 mt-12 px-5 py-5 text-left text-white md:px-12 md:py-10">
          <header>
            <div className="mb-10 flex flex-col items-center justify-center text-2xl font-bold text-white">
              <h4>Past Project Experience</h4>
              <h4 className="bg-gradient-to-r from-white to-blue-700 bg-clip-text text-base font-normal text-transparent">
                {' '}
                Explore the projects I've worked on so far
              </h4>
            </div>
          </header>
          <div>
            <CardsComponent />
          </div>
        </section>
      </div>
    </div>
  )
}
