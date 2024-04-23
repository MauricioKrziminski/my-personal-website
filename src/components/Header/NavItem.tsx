import { Link } from 'react-scroll'

interface NavItemProps {
  section: string
  isActive: boolean
  onClick: () => void
}

export const NavItem: React.FC<NavItemProps> = ({
  section,
  isActive,
  onClick,
}) => {
  return (
    <Link
      to={section}
      smooth={true}
      duration={700}
      onClick={onClick}
      className={`nav-link mr-10 py-2 text-lg font-medium transition-colors duration-300 ${
        isActive ? 'active-section text-blue-700' : 'text-white'
      } hover:text-blue-700`}
    >
      {section.charAt(0).toUpperCase() + section.slice(1)}
    </Link>
  )
}
