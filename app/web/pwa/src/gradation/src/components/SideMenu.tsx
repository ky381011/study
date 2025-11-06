import React from 'react'

interface SideMenuProps {
  isMenuOpen: boolean
  backgroundColor: string
  onClose: () => void
}

const SideMenu: React.FC<SideMenuProps> = ({ isMenuOpen, backgroundColor, onClose }) => {
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
          background: `linear-gradient(to bottom, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(255, 255, 255, 0.8) 100%), ${backgroundColor}`
        }}
      >
        <div className="side-menu-content">
          <ul>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onClose(); }}>ホーム</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onClose(); }}>設定</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onClose(); }}>ヘルプ</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onClose(); }}>アバウト</a></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default SideMenu