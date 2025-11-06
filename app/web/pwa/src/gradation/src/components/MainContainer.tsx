import React from 'react'
import TopContainer from './TopContainer'

interface MainContainerProps {
  isMenuOpen: boolean
  backgroundColor: string
  onMenuToggle: () => void
  onColorChange: (color: string) => void
  colorOptions: { value: string; label: string }[]
}

const MainContainer: React.FC<MainContainerProps> = ({ 
  isMenuOpen, 
  backgroundColor, 
  onMenuToggle, 
  onColorChange,
  colorOptions
}) => {
  return (
    <div className="main-container">
      <TopContainer 
        isMenuOpen={isMenuOpen}
        onMenuToggle={onMenuToggle}
        backgroundColor={backgroundColor}
        onColorChange={onColorChange}
        colorOptions={colorOptions}
      />
      
      <div className="center-container">
        {/* 中央コンテナ - 80% */}
      </div>
      
      <div className="bottom-container">
        {/* 下部コンテナ - 10% */}
      </div>
    </div>
  )
}

export default MainContainer