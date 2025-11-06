import React from 'react'

interface SafeAreaDisplayProps {
  hasSafeArea: boolean
}

const SafeAreaDisplay: React.FC<SafeAreaDisplayProps> = ({ hasSafeArea }) => {
  return (
    <>
      {/* ノッチエリア - セーフエリアがある場合のみ表示 */}
      {hasSafeArea && (
        <div className="notch-area">
          NOTCH
        </div>
      )}
      
      {/* インジケーターエリア - セーフエリアがある場合のみ表示 */}
      {hasSafeArea && (
        <div className="indicator-area">
          <div className="home-indicator"></div>
        </div>
      )}
    </>
  )
}

export default SafeAreaDisplay