import { useState, useEffect } from 'react'
import './App.css'
import SideMenu from './components/SideMenu'
import SafeAreaDisplay from './components/SafeAreaDisplay'
import MainContainer from './components/MainContainer'

// 二色グラデーションのオプション
const colorOptions = [
  { value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', label: 'パープル・ブルー' },
  { value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', label: 'ピンク・コーラル' },
  { value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', label: 'ブルー・シアン' },
  { value: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', label: 'グリーン・ターコイズ' },
  { value: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', label: 'ピンク・イエロー' },
  { value: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', label: 'ミント・ピンク' },
  { value: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', label: 'コーラル・ラベンダー' },
  { value: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', label: 'クリーム・オレンジ' },
  { value: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', label: 'パープル・ピンク' },
  { value: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)', label: 'ピーチ・ラベンダー' }
]

function App() {
  const [backgroundColor, setBackgroundColor] = useState('linear-gradient(135deg, #667eea 0%, #764ba2 100%)')
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
    const finalColor = backgroundColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
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
    <div className="app" style={{ background: backgroundColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <SideMenu 
        isMenuOpen={isMenuOpen} 
        backgroundColor={backgroundColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'} 
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
