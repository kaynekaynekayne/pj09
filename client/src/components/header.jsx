import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
    return (
        <HeaderStyle>
            <nav>
                <Link to="/" style={{color:'white', textDecoration:'none'}}>around</Link>
            </nav>
        </HeaderStyle>
    );
};

const HeaderStyle=styled.header`
    width:100%;
    padding:0.8rem;
    background:rgb(54, 81, 254);
`;
export default Header;