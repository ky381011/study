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
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
    </footer>
  );
};

export default Footer;