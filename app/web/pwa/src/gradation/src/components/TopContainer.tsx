import React from 'react'
import HamburgerMenu from './HamburgerMenu'

interface TopContainerProps {
  isMenuOpen: boolean
  onMenuToggle: () => void
}

const TopContainer: React.FC<TopContainerProps> = ({ 
  isMenuOpen, 
  onMenuToggle
}) => {
  return (
    <div className="top-container">
      <HamburgerMenu 
        isMenuOpen={isMenuOpen} 
        onToggle={onMenuToggle} 
      />
      
      {/* 中央の空きスペース */}
      <div style={{ flex: 1 }}></div>
      
      {/* 右側の空きスペース */}
      <div style={{ width: '30px' }}></div>
    </div>
  )
}

export default TopContainer