import React from 'react';
import { Link } from "react-router-dom";

import './css/home.css';

const Header = () => {
  return (
    <div className='nav_container'>
      <Link to='/' className='nav_logo'>RIDDLES!</Link>
      <div className="nav_create_container">
        <a href="/create" className="nav_create_cross_container">
          <div className="nav_create_cross vertical"></div>
          <div className="nav_create_cross horizontal"></div>
        </a>
      </div>
    </div>
  )
}

export default Header;