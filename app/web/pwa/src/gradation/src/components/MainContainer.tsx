import React from 'react'
import TopContainer from './TopContainer'

interface MainContainerProps {
  isMenuOpen: boolean
  onMenuToggle: () => void
}

const MainContainer: React.FC<MainContainerProps> = ({ 
  isMenuOpen, 
  onMenuToggle
}) => {
  return (
    <div className="main-container">
      <TopContainer 
        isMenuOpen={isMenuOpen}
        onMenuToggle={onMenuToggle}
      />
      
      <div className="center-container">
        {/* 中央コンテナ - 90% */}
      </div>
      
      <div className="bottom-container">
        {/* 下部コンテナ - 5% */}
      </div>
    </div>
  )
}

export default MainContainer