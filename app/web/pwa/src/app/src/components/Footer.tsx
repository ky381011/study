import React from 'react';

interface FooterProps {
  isDark: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDark }) => {
  return (
    <footer
      style={{
        padding: '1rem',
        borderTop: `1px solid ${isDark ? '#ffffff33' : '#00000033'}`,
        textAlign: 'center',
        width: '100%',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ margin: 0 }}>© 2025 背景テーマ切り替えアプリ. All rights reserved.</p>
        <div style={{ marginTop: '0.5rem' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', marginRight: '1rem' }}>プライバシーポリシー</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', marginRight: '1rem' }}>利用規約</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>お問い合わせ</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;