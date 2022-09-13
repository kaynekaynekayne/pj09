import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"rgb(54, 81, 254)"}}>
                <Link className="navbar-brand" to="/">around</Link>
            </nav>
        </header>
    );
};

export default Header;