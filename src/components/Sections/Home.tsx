/* eslint-disable react/no-unescaped-entities */
'use client'
import Image from 'next/image'
import { BsWhatsapp, BsInstagram, BsLinkedin } from 'react-icons/bs'

export function HomePage() {
  return (
    <div className="flex h-screen w-full flex-col items-center">
      <section className="flex h-full w-full flex-col px-6 pt-10 lg:flex-row lg:px-24 lg:pt-32">
        <div className="z-10 flex max-w-lg flex-1 flex-col justify-center text-customGray">
          <h2 className="text-4xl lg:text-6xl">
            Hi, I'm{' '}
            <span className="text-customOrange">Mauricio Krziminski</span>
          </h2>
          <h4 className="mt-4 text-2xl lg:text-4xl">Frontend Developer</h4>
          <p className="mb-10 mt-6 text-sm lg:text-lg">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae,
            saepe asperiores ipsa cumque facilis consequuntur distinctio
            numquam, delectus suscipit quia possimus nisi corporis laboriosam
            sapiente eum veniam provident, voluptatibus repudiandae.
          </p>
          <div className="mb-6 flex flex-col lg:flex-row">
            <a
              href="#"
              className="mb-4 rounded-extra border-2 border-customOrange bg-customOrange px-6 py-2 font-medium text-white transition-all duration-300 hover:bg-transparent hover:text-customOrange lg:mb-0 lg:mr-6"
            >
              Hire Me
            </a>
            <a
              href="#"
              className="rounded-extra border-2 border-customOrange bg-transparent px-6 py-2 font-medium text-customOrange transition-all duration-300 hover:bg-customOrange hover:text-white"
            >
              View Project
            </a>
          </div>
          <div className="flex justify-center pt-20 lg:justify-start">
            <a href="#" className="mr-6">
              <span className="inline-flex items-center justify-center rounded-full border-2 border-orange-500 p-2 transition-transform duration-300 hover:scale-125 hover:bg-customOrange">
                <BsWhatsapp className="h-4 w-4 text-xl text-green-600 lg:h-6 lg:w-6 lg:text-2xl" />
              </span>
            </a>
            <a href="#" className="mr-6">
              <span className="inline-flex items-center justify-center rounded-full border-2 border-orange-500 p-2 transition-transform duration-300 hover:scale-125 hover:bg-customOrange">
                <BsInstagram className="h-4 w-4 text-xl text-blue-700 lg:h-6 lg:w-6 lg:text-2xl" />
              </span>
            </a>
            <a href="#">
              <span className="inline-flex items-center justify-center rounded-full border-2 border-orange-500 p-2 transition-transform duration-300 hover:scale-125 hover:bg-customOrange">
                <BsLinkedin className="h-4 w-4 text-xl text-blue-900 lg:h-6 lg:w-6 lg:text-2xl" />
              </span>
            </a>
          </div>
        </div>
        <div className="mr-24 hidden flex-1 items-center justify-end pb-32 lg:flex">
          <div className="flex h-96 w-96 items-center justify-center overflow-hidden rounded-full border-4 border-customOrange shadow-2xl transition duration-300 ease-in-out hover:scale-110">
            <Image
              src="/fig.jpeg"
              alt="Descrição da Imagem"
              width={384}
              height={384}
              layout="responsive"
              objectFit="contain"
              objectPosition="center 60%"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
