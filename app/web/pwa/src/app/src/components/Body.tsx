import React from 'react';

interface BodyProps {
  selected: string;
  onThemeChange: (theme: string) => void;
  gradients: Record<string, { bg: string; dark: boolean }>;
}

const Body: React.FC<BodyProps> = ({ selected, onThemeChange, gradients }) => {
  return (
    <main style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <h2>テーマを選択</h2>
        <select
          value={selected}
          onChange={(e) => onThemeChange(e.target.value)}
          style={{
            fontSize: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginTop: '1rem',
            cursor: 'pointer',
            width: '100%',
            maxWidth: '300px'
          }}
        >
          <optgroup label="ライト系">
            <option value="default">デフォルト（グレー）</option>
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

        <div style={{ marginTop: '2rem' }}>
          <h3>現在のテーマ情報</h3>
          <p>選択中: {selected}</p>
          <p>ダークモード: {gradients[selected].dark ? 'はい' : 'いいえ'}</p>
          <div
            style={{
              width: '100%',
              height: '100px',
              borderRadius: '8px',
              background: gradients[selected].bg,
              marginTop: '1rem'
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default Body;