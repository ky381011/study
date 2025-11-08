import { useState, useEffect } from 'react'
import './App.css'
import SideMenu from './components/SideMenu'
import SafeAreaDisplay from './components/SafeAreaDisplay'
import MainContainer from './components/MainContainer'

// 色のオプション
const colorOptions = [
  { value: '#f0f0f0', label: 'ライトグレー' },
  { value: '#ff6b6b', label: 'レッド' },
  { value: '#4ecdc4', label: 'ティール' },
  { value: '#45b7d1', label: 'ブルー' },
  { value: '#f9ca24', label: 'イエロー' },
  { value: '#f0932b', label: 'オレンジ' },
  { value: '#eb4d4b', label: 'クリムゾン' },
  { value: '#6c5ce7', label: 'パープル' },
  { value: '#2d3436', label: 'ダークグレー' },
  { value: '#00b894', label: 'グリーン' }
]

function App() {
  const [backgroundColor, setBackgroundColor] = useState('')
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
    const finalColor = backgroundColor || '#f0f0f0'
    document.documentElement.style.setProperty('--app-background-color', finalColor)
    document.documentElement.style.backgroundColor = finalColor
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
    <div className="app" style={{ backgroundColor: backgroundColor || '#f0f0f0' }}>
      <SideMenu 
        isMenuOpen={isMenuOpen} 
        backgroundColor={backgroundColor || '#f0f0f0'} 
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
