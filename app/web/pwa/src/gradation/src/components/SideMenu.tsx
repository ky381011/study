import React from 'react'
import ColorControlPanel from './ColorControlPanel'

interface SideMenuProps {
  isMenuOpen: boolean
  backgroundColor: string
  onClose: () => void
  onColorChange: (color: string) => void
  colorOptions: { value: string; label: string }[]
}

const SideMenu: React.FC<SideMenuProps> = ({ 
  isMenuOpen, 
  backgroundColor, 
  onClose,
  onColorChange,
  colorOptions
}) => {
  return (
    <>
      {/* メニューオーバーレイ */}
      <div 
        className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={onClose}
        style={{ zIndex: isMenuOpen ? 14 : 5 }}
      ></div>
      
      {/* サイドメニュー */}
      <div 
        className={`side-menu ${isMenuOpen ? 'open' : ''}`}
        style={{ 
          zIndex: isMenuOpen ? 15 : 10,
          background: backgroundColor
        }}
      >
        <div className="side-menu-content">
          <ul>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onClose(); }}>ホーム</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onClose(); }}>設定</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onClose(); }}>ヘルプ</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onClose(); }}>アバウト</a></li>
          </ul>
          
          <div className="side-menu-color-control">
            <ColorControlPanel 
              backgroundColor={backgroundColor}
              onColorChange={onColorChange}
              colorOptions={colorOptions}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default SideMenu