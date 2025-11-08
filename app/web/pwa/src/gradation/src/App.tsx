import { useState, useEffect } from 'react'
import './App.css'
import SideMenu from './components/SideMenu'
import SafeAreaDisplay from './components/SafeAreaDisplay'
import MainContainer from './components/MainContainer'

// グラデーションのオプション（上から下の縦方向、一部3色グラデーション）
const colorOptions = [
  { value: 'linear-gradient(to bottom, #667eea 0%, #764ba2 50%, #1a1a2e 100%)', label: 'ブルー・パープル・ダーク' },
  { value: 'linear-gradient(to bottom, #f093fb 0%, #8b0000 100%)', label: 'ピンク・ダークレッド' },
  { value: 'linear-gradient(to bottom, #4facfe 0%, #00d2ff 50%, #000080 100%)', label: 'スカイ・シアン・ネイビー' },
  { value: 'linear-gradient(to bottom, #43e97b 0%, #003d00 100%)', label: 'グリーン・ダークグリーン' },
  { value: 'linear-gradient(to bottom, #fa709a 0%, #ff9a56 50%, #ff6600 100%)', label: 'ピンク・コーラル・オレンジ' },
  { value: 'linear-gradient(to bottom, #00c9ff 0%, #92fe9d 50%, #ff006e 100%)', label: 'シアン・グリーン・マゼンタ' },
  { value: 'linear-gradient(to bottom, #ff6a88 0%, #4a0080 100%)', label: 'コーラル・パープル' },
  { value: 'linear-gradient(to bottom, #ffff00 0%, #ff4500 50%, #8b0000 100%)', label: 'イエロー・オレンジ・レッド' },
  { value: 'linear-gradient(to bottom, #8e2de2 0%, #4a00e0 50%, #000000 100%)', label: 'パープル・インディゴ・ブラック' },
  { value: 'linear-gradient(to bottom, #ff4081 0%, #1a237e 100%)', label: 'ピンク・インディゴ' }
]

function App() {
  const [backgroundColor, setBackgroundColor] = useState('linear-gradient(to bottom, #667eea 0%, #764ba2 50%, #1a1a2e 100%)')
  const [hasSafeArea, setHasSafeArea] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // メニューの開閉処理
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  const handleColorChange = (color: string) => {
    setBackgroundColor(color)
  }

  // 背景色が変更されたときにHTML要素の背景色も更新
  useEffect(() => {
    const finalColor = backgroundColor || 'linear-gradient(to bottom, #667eea 0%, #764ba2 50%, #1a1a2e 100%)'
    document.documentElement.style.setProperty('--app-background-color', finalColor)
    document.documentElement.style.background = finalColor
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
  }, [isMenuOpen])

  return (
    <div className="app" style={{ background: backgroundColor || 'linear-gradient(to bottom, #667eea 0%, #764ba2 50%, #1a1a2e 100%)' }}>
      <SideMenu 
        isMenuOpen={isMenuOpen} 
        backgroundColor={backgroundColor || 'linear-gradient(to bottom, #667eea 0%, #764ba2 50%, #1a1a2e 100%)'} 
        onClose={handleMenuClose}
        onColorChange={handleColorChange}
        colorOptions={colorOptions}
      />
      
      <SafeAreaDisplay hasSafeArea={hasSafeArea} />
      
      <MainContainer 
        isMenuOpen={isMenuOpen} 
        onMenuToggle={handleMenuToggle} 
      />
    </div>
  )
}

export default App
