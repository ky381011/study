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
      <select 
        id="color-select"
        value={backgroundColor} 
        onChange={(e) => onColorChange(e.target.value)}
      >
        <option value="" disabled>背景色を選択</option>
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