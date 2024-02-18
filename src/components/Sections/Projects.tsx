/* eslint-disable react/no-unescaped-entities */
'use client'
import { CardsComponent } from '../CardsComponent'

export function Projects() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <section className="flex h-full w-full flex-1 items-center justify-center bg-customOrange px-6 pb-24 pt-24 lg:px-24 lg:pt-32">
        <div>
          <CardsComponent />
        </div>
      </section>
    </div>
  )
}
