import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      {/* NAVIGATION BAR */}

      <nav className='navbar navbar-dark bg-dark navbar-expand-sm '>
        <div className="container">
          <Link className='navbar-brand' to={'/'}><i className='fa fa-mobile text-warning me-2  '/>Contact <span className='text-warning'>Manager</span></Link>
        </div>
      </nav>
    </>
  )
}

export default NavBar;