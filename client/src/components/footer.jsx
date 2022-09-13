import React from 'react';
import {Button} from '@mui/material';
const Footer = () => {

    const handleLogout=async()=>{
        try{

        }catch(err){
        
        }
    }

    return (
        <footer style={{backgroundColor:"rgb(54, 81, 254)"}}>
            <Button
                onClick={handleLogout}
                variant="contained"
                size="large"
            >로그아웃</Button>
        </footer>
    );
};

export default Footer;