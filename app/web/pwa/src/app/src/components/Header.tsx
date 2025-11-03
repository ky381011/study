import React from 'react';

interface HeaderProps {
  isDark: boolean;
}

const Header: React.FC<HeaderProps> = ({ isDark }) => {
  return (
    <header
      style={{
        padding: '1rem',
        borderBottom: `1px solid ${isDark ? '#ffffff33' : '#00000033'}`,
        width: '100%',
      }}
    >
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>背景テーマ切り替え</h1>
        <div>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', marginLeft: '1rem' }}>ホーム</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', marginLeft: '1rem' }}>テーマ一覧</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', marginLeft: '1rem' }}>設定</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;