import React from 'react';

interface BodyProps {
  selected: string;
  onThemeChange: (theme: string) => void;
}

const Body: React.FC<BodyProps> = ({ selected, onThemeChange }) => {
  return (
    <main style={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        width: '100%',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <select
          value={selected}
          onChange={(e) => onThemeChange(e.target.value)}
          style={{
            fontSize: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            cursor: 'pointer',
            width: '200px',
            textAlign: 'center'
          }}
        >
          <optgroup label="ライト系">
            <option value="default">デフォルト</option>
            <option value="blue">ブルー</option>
            <option value="pink">ピンク</option>
            <option value="green">グリーン</option>
            <option value="purple">パープル</option>
            <option value="red">レッド</option>
          </optgroup>
          <optgroup label="ダーク系">
            <option value="dark">ダーク</option>
            <option value="midnight">ミッドナイト</option>
            <option value="ocean">オーシャン</option>
          </optgroup>
        </select>
    </main>
  );
};

export default Body;