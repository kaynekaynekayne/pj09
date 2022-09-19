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
    display:flex;
    justify-content:center;
`;

const Spinner=styled.div`
    width:2rem;
    height:2rem;
    border-radius:50%;
    border:0.4rem solid skyblue;
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