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
  return (
    <div className="control-panel">
      <div className="color-selector">
        {!backgroundColor && (
          <div className="color-placeholder">色を選択</div>
        )}
        <div className="color-options">
          {colorOptions.map((option) => (
            <div
              key={option.value}
              className={`color-circle ${backgroundColor === option.value ? 'selected' : ''}`}
              style={{ backgroundColor: option.value }}
              onClick={() => onColorChange(option.value)}
              title={option.label}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ColorControlPanel