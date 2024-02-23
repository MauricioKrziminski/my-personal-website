import React from 'react'
import { IconType } from 'react-icons'

interface SocialIconProps {
  Icon: IconType
  href: string
}

const SocialIcon: React.FC<SocialIconProps> = ({ Icon, href }) => (
  <a href={href} className="group">
    <span className="inline-flex items-center justify-center rounded-full border-2 border-blue-700 p-2 transition-transform duration-300 hover:scale-125 hover:bg-blue-700">
      <Icon className="text-xl text-blue-700 group-hover:text-white" />
    </span>
  </a>
)

export default SocialIcon
