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
      <label htmlFor="color-select">背景色を選択:</label>
      <select 
        id="color-select"
        value={backgroundColor} 
        onChange={(e) => onColorChange(e.target.value)}
      >
        {colorOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ColorControlPanel