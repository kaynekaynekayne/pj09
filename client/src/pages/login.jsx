import React,{useState} from 'react';
import {Button, TextField, FormControl, InputLabel, Input, IconButton, InputAdornment} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import {login} from '../api/user/user';
import { useUserContext } from '../context/userContext';

const Login = () => {
    const navigate=useNavigate();
    const {setUser}=useUserContext();

    const [email,setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [showPassword, setShowPassword]=useState(false);

    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            const resp=await login({email, password});
            if(!resp.error){
                Swal.fire({
                    icon: 'success',
                    text: resp.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                localStorage.setItem("user",JSON.stringify(resp.username));
                setUser(resp.username);
                navigate("/");
            } else{
                Swal.fire({
                    icon: 'error',
                    text: resp.error,
                    showConfirmButton:false,
                    width:'20rem',
                    position:'top',
                })
            }
        }catch(err){
            Swal.fire({
                icon:"error",
                text: err.message,
                showConfirmButton:false,
                width:'20rem',
                position:'top',
            })
        }
    };

    return (
        <div className="container mt-5 mb-5 col-6 justify-content-center align-items-center text-center">
            <div className="form-group">
                <TextField
                    size="small"
                    variant="standard"
                    className='form-control'
                    label="이메일"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <FormControl 
                    size='small'
                    className="form-control" 
                    variant="standard">
                    <InputLabel>비밀번호</InputLabel>
                    <Input 
                        label="비밀번호"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        endAdornment={
                        <InputAdornment position="start">
                            <IconButton 
                                edge="end"
                                onClick={()=>setShowPassword(prev=>!prev)}
                            >
                                {showPassword ?
                                    <VisibilityIcon />
                                :
                                    <VisibilityOffIcon />
                                }
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                </FormControl>
            </div>
            <div className="text-center mt-4">
                <Button
                    onClick={handleLogin}
                    variant="outlined"
                >로그인</Button>
            </div>
            <div className='mt-5 mb-5'>
                <span>계정이 없으십니까? </span>
                <Link to="/signup">            
                    <span>회원가입</span>
                </Link>
            </div>
        </div>
    );
};

export default Login;