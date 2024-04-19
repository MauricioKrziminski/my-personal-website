import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
})

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'Mauricio Krziminski',
  description: 'My Personal Website',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" translate="no" className="antialiased">
      <body className={poppins.className}>
        <link rel="icon" href="https://i.imgur.com/V61JFZJ.png" sizes="any" />
        <div>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
