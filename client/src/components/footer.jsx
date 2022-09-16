import React,{useContext} from 'react';
import {Button} from '@mui/material';
import Swal from 'sweetalert2'
import {logout} from '../api/user';
import { useNavigate } from 'react-router-dom';
import {userContext} from '../context/userContext';

const Footer = () => {
    const navigate=useNavigate();
    const {userInfo, setUserInfo}=useContext(userContext);
    
    const handleLogout=async()=>{
        const resp=await logout();
        if(!resp.error){
            Swal.fire({
                icon: 'success',
                text: resp.message,
                showConfirmButton: false,
                timer: 1500
            })
            setUserInfo(null);
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
        <footer style={{backgroundColor:"rgb(54, 81, 254)",height:"3rem"}}>
            {userInfo && 
                <Button
                    onClick={handleLogout}
                    variant="contained"
                    size="large"
                >로그아웃</Button>
            }
        </footer>
    );
};

export default Footer;