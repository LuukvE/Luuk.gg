import React from 'react';
import Link from './Link';
import s from './Header.css';

class Header extends React.Component {

  render() {
    return (
      <header className={s.header}>
          <Link className={s.title} to="/">Tournament App</Link>
      </header>
    );
  }

}

export default Header;
