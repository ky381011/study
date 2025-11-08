import React from 'react'

interface ColorControlPanelProps {
  backgroundColor: string
  onColorChange: (color: string) => void
  colorOptions: { value: string; label: string }[]
}

const ColorControlPanel: React.FC<ColorControlPanelProps> = ({ 
  backgroundColor, 
  onColorChange,
  colorOptions
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const currentColor = backgroundColor || '#f0f0f0'
  const currentColorLabel = colorOptions.find(option => option.value === backgroundColor)?.label || 'ライトグレー'

  // 背景色が変更されたときに展開状態をリセット
  React.useEffect(() => {
    setIsExpanded(false)
  }, [backgroundColor])

  const handleCurrentColorClick = () => {
    setIsExpanded(!isExpanded)
  }

  const handleColorSelect = (color: string) => {
    if (color !== backgroundColor) {
      onColorChange(color)
    }
    setIsExpanded(false)
  }

  // 外部クリックで閉じる処理
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isExpanded && !target.closest('.color-selector')) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isExpanded])

  return (
    <div className="control-panel">
      <div className="color-selector">
        {/* 現在選択されている色の円 */}
        <div className="current-color-container">
          <div
            className="color-circle current-color"
            style={{ backgroundColor: currentColor }}
            onClick={handleCurrentColorClick}
            title={`${currentColorLabel} - クリックで色を変更`}
          />
        </div>
        
        {/* 展開された色選択肢 */}
        {isExpanded && (
          <div className="color-options expanded">
            {colorOptions.map((option) => (
              <div
                key={option.value}
                className={`color-circle ${backgroundColor === option.value ? 'selected' : ''}`}
                style={{ backgroundColor: option.value }}
                onClick={() => handleColorSelect(option.value)}
                title={option.label}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ColorControlPanel