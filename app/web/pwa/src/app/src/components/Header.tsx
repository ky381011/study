import React from 'react';

interface HeaderProps {
  isDark: boolean;
}

const Header: React.FC<HeaderProps> = ({ isDark }) => {
  return (
    <header
      style={{
        borderBottom: `1px solid ${isDark ? '#ffffff33' : '#00000033'}`,
        width: '100%',
        height: '10vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
    </header>
  );
};

export default Header;