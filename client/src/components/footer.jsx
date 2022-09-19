import React from 'react';
import {Button} from '@mui/material';
import Swal from 'sweetalert2'
import {logout} from '../api/user/user';
import { useNavigate } from 'react-router-dom';
import {useUserContext} from '../context/userContext';
import styled from 'styled-components'; 

const Footer = () => {
    const navigate=useNavigate();
    const {user,setUser}=useUserContext();

    const handleLogout=async()=>{
        const resp=await logout();
        if(!resp.error){
            Swal.fire({
                icon: 'success',
                text: resp.message,
                showConfirmButton: false,
                timer: 1500
            })
            localStorage.removeItem("user");
            setUser(null);
            navigate("/login");
        } else{
            console.log(resp);
            Swal.fire({
                icon: 'error',
                text: resp.error,
                showConfirmButton:false,
                width:'20rem',
                position:'top',
            })
        }
    }

    return (
        <FooterStyle>
            {user && 
                <Button
                    onClick={handleLogout}
                    variant="contained"
                    size="large"
                >로그아웃</Button>
            }
        </FooterStyle>
    );
};

const FooterStyle=styled.footer`
    background-color:rgb(54, 81, 254);
    width:100%;
    height:42.25px;
`;  

export default Footer;