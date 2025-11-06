import React from 'react'

interface HamburgerMenuProps {
  isMenuOpen: boolean
  onToggle: () => void
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isMenuOpen, onToggle }) => {
  return (
    <div 
      className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
      onClick={onToggle}
      style={{ zIndex: isMenuOpen ? 5 : 16 }}
    >
      <div className="hamburger-line"></div>
      <div className="hamburger-line"></div>
      <div className="hamburger-line"></div>
    </div>
  )
}

export default HamburgerMenu