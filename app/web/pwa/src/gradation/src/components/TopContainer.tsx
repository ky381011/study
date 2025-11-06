import React from 'react'
import HamburgerMenu from './HamburgerMenu'
import ColorControlPanel from './ColorControlPanel'

interface TopContainerProps {
  isMenuOpen: boolean
  backgroundColor: string
  onMenuToggle: () => void
  onColorChange: (color: string) => void
  colorOptions: { value: string; label: string }[]
}

const TopContainer: React.FC<TopContainerProps> = ({ 
  isMenuOpen, 
  backgroundColor, 
  onMenuToggle, 
  onColorChange,
  colorOptions
}) => {
  return (
    <div className="top-container">
      <HamburgerMenu 
        isMenuOpen={isMenuOpen} 
        onToggle={onMenuToggle} 
      />
      
      <ColorControlPanel 
        backgroundColor={backgroundColor} 
        onColorChange={onColorChange}
        colorOptions={colorOptions}
      />
      
      {/* 右側の空きスペース */}
      <div style={{ width: '30px' }}></div>
    </div>
  )
}

export default TopContainer