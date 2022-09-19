import React,{useState} from 'react';
import {FormHelperText, Button, TextField, FormControl, InputLabel, Input, IconButton, InputAdornment} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import {signup} from '../api/user/user';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail]=useState("");
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
    const [showPassword, setShowPassword]=useState(false);
    
    let lowerCase=/(.*[a-z].*)/.test(password);
    let upperCase=/(.*[A-Z].*)/.test(password);
    let eightChars=password.length>=8;
    
    const navigate=useNavigate();
    
    const handleSignup=async(e)=>{
        e.preventDefault();

        try{
            const resp=await signup({email,username,password,confirmPassword});
            if(!resp.error){
                Swal.fire({
                    icon: 'success',
                    text: resp.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate("/login");
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
                <TextField
                    size="small"
                    variant="standard"
                    className='form-control'
                    label="닉네임"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
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
                {password && (
                    <FormHelperText>
                        <span className={lowerCase ? "text-success" : 'text-danger'}
                            >소문자 포함 </span>
                        <span className={upperCase ? "text-success" : "text-danger"}
                            >대문자 포함 </span>
                        <span className={eightChars ? "text-success" : 'text-danger'}
                            >여덟자 이상 </span>
                    </FormHelperText>  
                )}
            </div>
            <div className="form-group">
                <TextField
                    size="small"
                    type="password"
                    variant="standard"
                    className='form-control'
                    label="비밀번호 재입력"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                />
                {password && confirmPassword && (
                    <FormHelperText>
                        {password === confirmPassword ? 
                            <span className="text-success">비밀번호 일치</span>
                        :
                            <span className="text-danger">비밀번호 불일치</span>
                        }
                    </FormHelperText>
                )
                }
            </div>
            <div className="text-center mt-4">
                <Button
                    onClick={handleSignup}
                    variant="outlined"
                    disabled={!email || !username || !password || !confirmPassword || password!==confirmPassword || !upperCase || !lowerCase || !eightChars}
                >회원가입</Button>
            </div>
            <div className='mt-3 mb-3'>
                <span>이미 계정이 있습니까? </span>
                <Link to="/login">            
                    <span>로그인</span>
                </Link>
            </div>
        </div>
    );
};

export default Signup;