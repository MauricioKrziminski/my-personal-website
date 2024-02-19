/* eslint-disable react/no-unescaped-entities */
'use client'
import Image from 'next/image'
import { BsWhatsapp, BsInstagram, BsLinkedin } from 'react-icons/bs'

export function HomePage() {
  return (
    <div className="flex h-screen w-full flex-col items-center bg-zinc-800">
      <section className="flex h-full w-full flex-col-reverse px-6 pt-10 lg:flex-row lg:items-center lg:px-24 lg:pt-32">
        <div className="z-10 flex flex-1 flex-col justify-center text-white">
          <h2 className="text-4xl lg:text-6xl">
            Hello, I'm <br />
            <span className="text-white">Mauricio Krziminski</span>
          </h2>
          <div className="flex items-center gap-3">
            <h4 className="mt-4 text-2xl lg:text-4xl">And I'm a</h4>
            <div className="typewriter">
              <h4 className="mt-7 text-2xl text-blue-700 lg:text-4xl">
                Frontend Developer
              </h4>
            </div>
          </div>
          <p className="mb-10 mt-6 max-w-lg text-sm lg:text-lg">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae,
            saepe asperiores ipsa cumque facilis consequuntur distinctio
            numquam, delectus suscipit quia possimus nisi corporis laboriosam
            sapiente eum veniam provident, voluptatibus repudiandae.
          </p>
          <div className="mb-6 flex flex-col lg:flex-row">
            <a
              href="#"
              className="mb-4 rounded-extra border-2 border-blue-700 bg-blue-700 px-6 py-2 font-medium text-white transition-all duration-300 hover:bg-transparent hover:text-blue-700 lg:mb-0 lg:mr-6"
            >
              Hire Me
            </a>
            <a
              href="#"
              className="rounded-extra border-2 border-blue-700 bg-transparent px-6 py-2 font-medium text-blue-700 transition-all duration-300 hover:bg-blue-700 hover:text-white"
            >
              View Project
            </a>
          </div>
          <div className="flex justify-center pt-20 lg:justify-start">
            <a href="#" className="mr-6">
              <span className="group inline-flex items-center justify-center rounded-full border-2 border-blue-700 p-2 transition-transform duration-300 hover:scale-125 hover:bg-blue-700">
                <BsWhatsapp className="h-4 w-4 text-xl text-blue-700 group-hover:text-white lg:h-6 lg:w-6 lg:text-2xl" />
              </span>
            </a>
            <a href="#" className="mr-6">
              <span className="group inline-flex items-center justify-center rounded-full border-2 border-blue-700 p-2 transition-transform duration-300 hover:scale-125 hover:bg-blue-700">
                <BsInstagram className="h-4 w-4 text-xl text-blue-700 group-hover:text-white lg:h-6 lg:w-6 lg:text-2xl" />
              </span>
            </a>
            <a href="#">
              <span className="group inline-flex items-center justify-center rounded-full border-2 border-blue-700 p-2 transition-transform duration-300 hover:scale-125 hover:bg-blue-700">
                <BsLinkedin className="h-4 w-4 text-xl text-blue-900 group-hover:text-white lg:h-6 lg:w-6 lg:text-2xl" />
              </span>
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center md:flex-row md:justify-end">
          <div className="mb-5 mt-16 md:mb-36 md:mr-36">
            <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-full border-3 border-blue-700 shadow-glow transition-transform duration-300 hover:scale-110 md:h-96 md:w-96">
              <Image
                src="/teste.png"
                alt=""
                width={384}
                height={384}
                layout="responsive"
                objectFit="cover"
                objectPosition="center"
                className="scale-150"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
