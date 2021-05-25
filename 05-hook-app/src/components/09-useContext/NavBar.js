import React from "react";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container-fluid'>
                <div className='navbar-nav'>
                    <NavLink
                        className='nav-link'
                        activeClassName='active'
                        exact
                        to='/'
                    >
                        Home
                    </NavLink>
                    <NavLink
                        className='nav-link'
                        activeClassName='active'
                        exact
                        to='/about'
                    >
                        About
                    </NavLink>
                    <NavLink
                        className='nav-link'
                        activeClassName='active'
                        exact
                        to='/login'
                    >
                        Login
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};
