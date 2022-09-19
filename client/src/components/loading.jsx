import React from 'react'
import styled from 'styled-components';

const Loading = () => {
    return (
        <LoadSection>
            <Spinner></Spinner>
        </LoadSection>
    )
}

const LoadSection=styled.div`
    width:100%;
    // height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const Spinner=styled.div`
    width:3rem;
    height:3rem;
    border-radius:50%;
    border:0.4rem solid rgb(50, 185, 135);
    border-top:0.4rem solid whitesmoke;
    animation:spin 2s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform:rotate(360deg);
        }
    }
`;


export default Loading