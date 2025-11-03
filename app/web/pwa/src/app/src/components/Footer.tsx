import React from 'react';

interface FooterProps {
  isDark: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDark }) => {
  return (
    <footer
      style={{
        borderTop: `1px solid ${isDark ? '#ffffff33' : '#00000033'}`,
        width: '100%',
        height: 'calc(10vh + env(safe-area-inset-bottom))',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 'env(safe-area-inset-bottom)',
        marginBottom: '-env(safe-area-inset-bottom)',
        background: 'inherit'
      }}
    >
    </footer>
  );
};

export default Footer;