import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [backgroundColor, setBackgroundColor] = useState('#f0f0f0')
  const [hasSafeArea, setHasSafeArea] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // メニューの開閉処理
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  const colorOptions = [
    { value: '#f0f0f0', label: 'ライトグレー' },
    { value: '#ff6b6b', label: 'レッド' },
    { value: '#4ecdc4', label: 'ティール' },
    { value: '#45b7d1', label: 'ブルー' },
    { value: '#96ceb4', label: 'グリーン' },
    { value: '#feca57', label: 'イエロー' },
    { value: '#ff9ff3', label: 'ピンク' },
    { value: '#54a0ff', label: 'スカイブルー' },
    { value: '#5f27cd', label: 'パープル' },
    { value: '#222f3e', label: 'ダークグレー' }
  ]

  // 背景色が変更されたときにHTML要素の背景色も更新
  useEffect(() => {
    document.documentElement.style.setProperty('--app-background-color', backgroundColor)
    document.documentElement.style.backgroundColor = backgroundColor
  }, [backgroundColor])

  // セーフエリアの存在をチェック
  useEffect(() => {
    const checkSafeArea = () => {
      // CSSで計算した値をチェック
      const testElement = document.createElement('div')
      testElement.style.position = 'fixed'
      testElement.style.top = 'env(safe-area-inset-top, 0px)'
      testElement.style.visibility = 'hidden'
      document.body.appendChild(testElement)
      
      const topOffset = testElement.offsetTop
      document.body.removeChild(testElement)
      
      setHasSafeArea(topOffset > 0)
    }

    checkSafeArea()
    // デバイス回転やサイズ変更時にも再チェック
    window.addEventListener('resize', checkSafeArea)
    window.addEventListener('orientationchange', checkSafeArea)
    
    return () => {
      window.removeEventListener('resize', checkSafeArea)
      window.removeEventListener('orientationchange', checkSafeArea)
    }
  }, [])

  // スクロールとタッチムーブを完全に防止
  useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault()
    }

    const preventTouchMove = (e: TouchEvent) => {
      // メニューが開いている場合はサイドメニュー内のみタッチ操作を許可
      const target = e.target as Element
      if (isMenuOpen) {
        if (!target.closest('.side-menu')) {
          e.preventDefault()
        }
      } else {
        // メニューが閉じている場合はmain-container内でのみタッチ操作を許可
        if (!target.closest('.main-container')) {
          e.preventDefault()
        }
      }
    }

    // 各種スクロールイベントを防止
    document.addEventListener('wheel', preventScroll, { passive: false })
    document.addEventListener('touchmove', preventTouchMove, { passive: false })
    document.addEventListener('keydown', (e) => {
      // 矢印キー、スペースキー、Page Up/Downキーによるスクロールを防止
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
        e.preventDefault()
      }
    })

    return () => {
      document.removeEventListener('wheel', preventScroll)
      document.removeEventListener('touchmove', preventTouchMove)
    }
  }, [])

  return (
    <div className="app" style={{ backgroundColor }}>
      {/* メニューオーバーレイ */}
      <div 
        className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={handleMenuClose}
        style={{ zIndex: isMenuOpen ? 14 : 5 }}
      ></div>
      
      {/* サイドメニュー */}
      <div 
        className={`side-menu ${isMenuOpen ? 'open' : ''}`}
        style={{ zIndex: isMenuOpen ? 15 : 10 }}
      >
        <div className="side-menu-header">
          <h3>メニュー</h3>
          <button 
            className="side-menu-close"
            onClick={handleMenuClose}
            aria-label="メニューを閉じる"
          ></button>
        </div>
        <div className="side-menu-content">
          <ul>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleMenuClose(); }}>ホーム</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleMenuClose(); }}>設定</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleMenuClose(); }}>ヘルプ</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleMenuClose(); }}>アバウト</a></li>
          </ul>
        </div>
      </div>
      
      {/* ノッチエリア - セーフエリアがある場合のみ表示 */}
      {hasSafeArea && (
        <div className="notch-area">
          NOTCH
        </div>
      )}
      
      {/* セーフエリアオーバーレイ */}
      <div className="main-container">
        <div className="top-container">
          {/* ハンバーガーメニュー */}
          <div 
            className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
            onClick={handleMenuToggle}
            style={{ zIndex: isMenuOpen ? 5 : 16 }}
          >
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </div>
          
          {/* プルダウンメニュー */}
          <div className="control-panel">
            <label htmlFor="color-select">背景色を選択:</label>
            <select 
              id="color-select"
              value={backgroundColor} 
              onChange={(e) => setBackgroundColor(e.target.value)}
            >
              {colorOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* 右側の空きスペース */}
          <div style={{ width: '30px' }}></div>
        </div>
        
        <div className="center-container">
          {/* 中央コンテナ - 80% */}
        </div>
        
        <div className="bottom-container">
          {/* 下部コンテナ - 10% */}
        </div>
      </div>      {/* インジケーターエリア - セーフエリアがある場合のみ表示 */}
      {hasSafeArea && (
        <div className="indicator-area">
          <div className="home-indicator"></div>
        </div>
      )}
    </div>
  )
}

export default App
