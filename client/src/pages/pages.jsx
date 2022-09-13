import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from './home';
import Info from './info';
import Searched from './searched';
import Login from './login';
import Signup from './signup';
import styled from 'styled-components';

const Pages = () => {
    return (
        <PageStyle>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<Signup />}/>
                <Route path="/searched/:word" element={<Searched />}/>
                <Route path="/info/:id" element={<Info />}/>
            </Routes>
        </PageStyle>
    )
}

const PageStyle=styled.div`
    width:100%;
    height:100%;
`;
export default Pages;