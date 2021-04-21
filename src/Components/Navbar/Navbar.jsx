import React from 'react';
import { navbar, brand } from './navbar.module.scss';

function Navbar() {
  return (
    <nav className={navbar}>
      <span className={brand}>Weather Forecast</span>
    </nav>
  );
}
export default Navbar;
