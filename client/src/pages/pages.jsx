import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './home';
import Detail from './detail';
import Searched from './searched';
import Login from './login';
import Signup from './signup';
import styled from 'styled-components';
import { useUserContext } from '../context/userContext';

const Pages = () => {
    const {user}=useUserContext();

    return (
        <PageStyle>
            <Routes>
                <Route 
                    path="/" 
                    element={user ? <Home /> : <Navigate to="/login" />}
                />
                <Route 
                    path="/login" 
                    element={!user ? <Login /> : <Navigate to="/" />}
                />
                <Route 
                    path="/signup" 
                    element={!user ? <Signup/> : <Navigate to="/" />}
                />
                <Route 
                    path="/searched/:word"
                    element={user ? <Searched /> : <Navigate to="/login" />}
                />
                <Route 
                    path="/detail/:id" 
                    element={user ? <Detail /> : <Navigate to="/login" />}
                />
            </Routes>
        </PageStyle>
    )
}

const PageStyle=styled.div`
    display:flex;
    align-items:center;
    min-height:70vh;
`;
export default Pages;