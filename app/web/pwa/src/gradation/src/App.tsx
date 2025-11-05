import { useState } from 'react'
import './App.css'

function App() {
  const [backgroundColor, setBackgroundColor] = useState('#f0f0f0')

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

  return (
    <div className="app" style={{ backgroundColor }}>
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
    </div>
  )
}

export default App
